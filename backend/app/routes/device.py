from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from datetime import datetime, timezone
from app.models.sensor import DevicePayload, SensorData
from app.services.ai_engine import AILogic
from app.services.firebase_service import get_db, send_push_notification
from app.services.sms_service import send_sms
import uuid

router = APIRouter(prefix="/device", tags=["device"])

def get_current_time():
    return datetime.now(timezone.utc).isoformat()

@router.post("/sensor-data")
async def ingest_sensor_data(payload: DevicePayload):
    try:
        db = get_db()
        device_id = payload.device_id
        timestamp = payload.timestamp or get_current_time()
        
        # 1. Store in Firebase Live Data
        live_ref = db.reference(f'devices/{device_id}/live_data')
        live_data = payload.data.dict()
        live_data['timestamp'] = timestamp
        live_ref.set(live_data)
        
        # 2. Store in Firebase History
        history_ref = db.reference(f'devices/{device_id}/history')
        history_ref.push(live_data)
        
        # Get last 20 readings for anomaly and stagnation processing
        history_records = history_ref.order_by_key().limit_to_last(20).get()
        history_list = []
        if history_records:
            for k, v in history_records.items():
                try:
                    history_list.append(SensorData(**v))
                except Exception:
                    pass
        
        # 3. Trigger Anomaly Detection
        anomalies = AILogic.detect_anomalies(payload.data, history_list)
        
        if anomalies["is_anomalous"]:
            alert_id = str(uuid.uuid4())
            alert_msg = "Anomaly Detected: "
            if anomalies.get("turbidity_spike"): alert_msg += "Turbidity Spike. "
            if anomalies.get("ph_breach"): alert_msg += "pH limit breached. "
            if anomalies.get("tds_spike"): alert_msg += "TDS Spike. "
            
            alert_payload = {
                "id": alert_id,
                "timestamp": timestamp,
                "message": alert_msg,
                "severity": "high",
                "acknowledged": False
            }
            db.reference(f'devices/{device_id}/alerts/{alert_id}').set(alert_payload)
            # In production, check user preferences and device tokens to send actual push/sms
            send_sms("+11234567890", f"URGENT: {alert_msg}")

        # 4. Compute Health Score
        # For simplicity, calculate a dummy stagnation hours (e.g. 5 hours) or fetch true time difference
        stagnation_hours = 0.0
        health_result = AILogic.calculate_health_score(payload.data, stagnation_hours)
        
        # Save Health Score
        db.reference(f'analytics/health_scores/{device_id}').set({
            "score": health_result["score"],
            "status": health_result["status"],
            "timestamp": timestamp
        })
        
        # Auto-Quarantine & System State Logic
        system_state_ref = db.reference(f'devices/{device_id}/system_state')
        current_state = system_state_ref.get() or {"valve": "OPEN", "forensic_report": None}
        
        if health_result["score"] < 40 and current_state.get("valve") != "QUARANTINED":
            # Initiate Lockdown
            system_state_ref.update({"valve": "QUARANTINED"})
            # Generate AI Report synchronously (for hackability)
            report = AILogic.generate_forensic_report(payload.data, health_result["risk_reason"])
            system_state_ref.update({"forensic_report": report})
            
        elif health_result["score"] >= 80 and current_state.get("valve") == "QUARANTINED":
            # Auto-reset if safe for demo purposes
            system_state_ref.update({"valve": "OPEN", "forensic_report": None})

        if health_result["status"] == "Unsafe":
             send_sms("+11234567890", f"ALERT: Water is UNSAFE. Score {health_result['score']}. {health_result['risk_reason']}")

        return {"status": "success", "health_score": health_result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{device_id}/live")
async def get_live_data(device_id: str):
    db = get_db()
    data = db.reference(f'devices/{device_id}/live_data').get()
    if not data:
        raise HTTPException(status_code=404, detail="Live data not found")
    return {"device_id": device_id, "data": data}

@router.get("/{device_id}/history")
async def get_history(device_id: str, limit: int = 50):
    db = get_db()
    data = db.reference(f'devices/{device_id}/history').order_by_key().limit_to_last(limit).get()
    if not data:
        return {"device_id": device_id, "history": []}
    
    # format dicts into a list of items
    result = []
    for k, v in data.items():
        v['id'] = k
        result.append(v)
    return {"device_id": device_id, "history": result}

@router.get("/{device_id}/health-score")
async def get_health_score(device_id: str):
    db = get_db()
    data = db.reference(f'analytics/health_scores/{device_id}').get()
    if not data:
        # Fallback to computing from live data
        live_data = db.reference(f'devices/{device_id}/live_data').get()
        if not live_data:
             raise HTTPException(status_code=404, detail="No data available for device to compute score.")
        
        try:
             sensor_data = SensorData(**live_data)
             score_result = AILogic.calculate_health_score(sensor_data, 0.0)
             return score_result
        except Exception:
             raise HTTPException(status_code=500, detail="Error computing score from raw data.")
    return {
        "score": data.get("score"),
        "status": data.get("status"),
        "risk_reason": data.get("risk_reason", "")
    }

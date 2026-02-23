from fastapi import APIRouter
from app.services.firebase_service import get_db

router = APIRouter(prefix="/reports", tags=["reports"])

@router.post("/generate-report")
async def generate_report(device_id: str):
    db = get_db()
    history_data = db.reference(f'devices/{device_id}/history').get()
    
    if not history_data:
        return {
            "device_id": device_id,
            "status": "No data available",
            "summary": {}
        }
    
    records = list(history_data.values())
    total_records = len(records)
    
    avg_ph = sum(r.get('pH', 0) for r in records) / total_records
    avg_tds = sum(r.get('tds', 0) for r in records) / total_records
    avg_turbidity = sum(r.get('turbidity', 0) for r in records) / total_records
    
    # Count anomalies
    alerts_data = db.reference(f'devices/{device_id}/alerts').get()
    anomaly_count = len(alerts_data) if alerts_data else 0
    
    return {
        "device_id": device_id,
        "summary": {
            "total_records": total_records,
            "average_pH": round(avg_ph, 2),
            "average_TDS": round(avg_tds, 2),
            "average_turbidity": round(avg_turbidity, 2),
            "total_anomalies": anomaly_count
        }
    }

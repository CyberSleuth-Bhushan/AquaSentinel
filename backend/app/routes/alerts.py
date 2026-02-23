from fastapi import APIRouter, HTTPException
from typing import List
from app.models.sensor import AlertAcknowledge
from app.services.firebase_service import get_db

router = APIRouter(prefix="/alerts", tags=["alerts"])

@router.get("/")
async def get_alerts(device_id: str):
    db = get_db()
    data = db.reference(f'devices/{device_id}/alerts').get()
    if not data:
        return {"device_id": device_id, "alerts": []}
    
    result = []
    for k, v in data.items():
        v['id'] = k
        result.append(v)
    return {"device_id": device_id, "alerts": result}

@router.post("/acknowledge")
async def acknowledge_alert(device_id: str, payload: AlertAcknowledge):
    db = get_db()
    alert_ref = db.reference(f'devices/{device_id}/alerts/{payload.alert_id}')
    alert = alert_ref.get()
    
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
        
    alert_ref.update({"acknowledged": True})
    return {"status": "success", "message": "Alert acknowledged", "alert_id": payload.alert_id}

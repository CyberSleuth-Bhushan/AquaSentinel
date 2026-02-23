from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone
import random
from app.models.sensor import DevicePayload, SensorData
from app.routes.device import ingest_sensor_data
from app.services.firebase_service import get_db

router = APIRouter(prefix="/simulate", tags=["simulation"])

class SimulationRequest(BaseModel):
    device_id: str
    scenario: str # "rust", "chemical_leak", "reset"

@router.post("/")
async def simulate_threat(req: SimulationRequest):
    """
    Injects anomalous data to trigger the Hackathon AI Forensics feature.
    """
    try:
        if req.scenario == "rust":
            # High turbidity, slightly low pH, high TDS
            data = SensorData(
                pH=random.uniform(6.0, 6.4),
                turbidity=random.uniform(55.0, 85.0), # massive spike
                tds=random.uniform(600, 800),
                temperature=random.uniform(22.0, 24.0),
                flow_rate=random.uniform(1.0, 3.0)
            )
        elif req.scenario == "chemical_leak":
            # Extreme pH drop, extreme TDS, normal turbidity
            data = SensorData(
                pH=random.uniform(3.5, 4.5),
                turbidity=random.uniform(2.0, 4.0),
                tds=random.uniform(1200, 1500), # massive spike
                temperature=random.uniform(25.0, 27.0),
                flow_rate=random.uniform(5.0, 8.0)
            )
        elif req.scenario == "reset":
            # Normal data, resets quarantine
            data = SensorData(
                pH=random.uniform(7.0, 7.4),
                turbidity=random.uniform(0.1, 0.5),
                tds=random.uniform(150, 250),
                temperature=random.uniform(20.0, 22.0),
                flow_rate=random.uniform(10.0, 15.0)
            )
            # Reset quarantine status manually in firebase
            db = get_db()
            db.reference(f'devices/{req.device_id}/system_state/valve').set('OPEN')
            db.reference(f'devices/{req.device_id}/system_state/forensic_report').set(None)
        else:
            raise HTTPException(status_code=400, detail="Unknown scenario")

        payload = DevicePayload(
            device_id=req.device_id,
            timestamp=datetime.now(timezone.utc).isoformat(),
            data=data
        )
        # Call the existing ingest endpoint logic programmatically
        return await ingest_sensor_data(payload)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

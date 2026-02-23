from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class SensorData(BaseModel):
    pH: float = Field(..., ge=0, le=14, description="pH level (0-14)")
    turbidity: float = Field(..., ge=0, description="Turbidity in NTU")
    tds: float = Field(..., ge=0, description="Total Dissolved Solids in ppm")
    temperature: float = Field(..., description="Water temperature in Celsius")
    flow_rate: float = Field(0, description="Water flow rate in L/min")

class DevicePayload(BaseModel):
    device_id: str
    timestamp: Optional[str] = None
    data: SensorData

class HealthScoreResponse(BaseModel):
    score: int
    status: str
    risk_reason: Optional[str] = None

class AlertAcknowledge(BaseModel):
    alert_id: str

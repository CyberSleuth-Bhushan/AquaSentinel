from pydantic import BaseModel
from typing import List, Dict, Optional

class ChatMessage(BaseModel):
    role: str
    content: str
    
class ContextMetrics(BaseModel):
    score: float
    status: str
    pH: float
    turbidity: float
    tds: float
    temperature: float
    flow_rate: float

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    context: Optional[ContextMetrics] = None

class ChatResponse(BaseModel):
    response: str

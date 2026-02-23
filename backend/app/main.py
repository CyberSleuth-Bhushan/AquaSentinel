from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from app.routes import device, alerts, reports, chat, simulation
from app.config import settings
from app.services.firebase_service import init_firebase

app = FastAPI(
    title="Smart Water Monitoring API",
    description="Backend for IoT Water Quality Monitoring System",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In a real app, you would use Dependency Injection to verify Firebase tokens
async def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key != settings.API_KEY:
        raise HTTPException(status_code=403, detail="Invalid API Key")
    return x_api_key

# Initialize Firebase on startup
@app.on_event("startup")
async def startup_event():
    init_firebase()

# Include Routers (Secured with API Key for demonstration)
app.include_router(device.router, dependencies=[Depends(verify_api_key)])
app.include_router(simulation.router, dependencies=[Depends(verify_api_key)])
app.include_router(alerts.router, dependencies=[Depends(verify_api_key)])
app.include_router(reports.router, dependencies=[Depends(verify_api_key)])
app.include_router(chat.router, dependencies=[Depends(verify_api_key)])

@app.get("/")
def read_root():
    return {"message": "Water Quality Monitoring API is running."}

# Run with: uvicorn app.main:app --reload

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import random
import math

router = APIRouter(prefix="/services", tags=["services"])

class LocationQuery(BaseModel):
    lat: float
    lng: float
    issue_type: str # e.g. "turbidity_spike", "tds_spike", "ph_breach", "leak_detected"

class ServicePerson(BaseModel):
    id: str
    name: str
    profession: str
    rating: float
    distance_km: str
    phone: str
    estimated_arrival_mins: int

def get_profession_for_issue(issue_type: str) -> str:
    if "turbidity" in issue_type or "tds" in issue_type:
        return "Tank & Filter Cleaner"
    elif "ph" in issue_type:
        return "Chemical Treatment Specialist"
    elif "leak" in issue_type:
        return "Master Plumber"
    else:
        return "General Water Technician"

@router.post("/nearby", response_model=List[ServicePerson])
async def get_nearby_services(query: LocationQuery):
    """
    Mock endpoint that generates local service people based on the user's GPS coords.
    In a real app, this would query Google Places API or a dedicated provider database.
    """
    try:
        profession = get_profession_for_issue(query.issue_type)
        
        # Generate 3 mock professionals dynamically
        names = ["Rajesh Kumar", "Amit Patel", "Suresh Sharma", "Vikram Singh", "Priya Desai", "Rahul Verma"]
        results = []
        
        for i in range(3):
            selected_name = random.choice(names)
            names.remove(selected_name) # prevent duplicates
            
            # Mock slight coordinate shifts into distances
            dist_km = round(random.uniform(0.5, 5.0), 1)
            eta = int(dist_km * random.uniform(3, 8)) # ~3-8 mins per km based on traffic
            rating = round(random.uniform(4.1, 5.0), 1)
            
            person = ServicePerson(
                id=f"prov_{random.randint(1000,9999)}",
                name=selected_name,
                profession=profession,
                rating=rating,
                distance_km=f"{dist_km} km",
                phone=f"+91 98{random.randint(10000000,99999999)}",
                estimated_arrival_mins=eta
            )
            results.append(person)
            
        # Sort by distance
        results.sort(key=lambda x: float(x.distance_km.split()[0]))
        
        return results

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

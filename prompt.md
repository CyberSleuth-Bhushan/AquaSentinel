PROJECT TITLE:

Smart Household Tank & Tap Water Quality Monitoring System

OBJECTIVE

Build a complete full-stack IoT water monitoring web platform with:

ESP32 device data ingestion

FastAPI backend

Firebase Realtime Database

Firebase Authentication

Firebase Cloud Messaging

React frontend dashboard

AI-based water health scoring

SMS alert fallback support

Admin + Household user roles

This must be a production-grade scalable implementation.

1️⃣ TECH STACK (MANDATORY)

Frontend:

React (Vite preferred)

React Router

Axios

Recharts (for graphs)

Context API or Redux

Tailwind CSS

Backend:

Python

FastAPI

Pydantic models

JWT authentication

Uvicorn server

Database:

Firebase Realtime Database

Auth:

Firebase Authentication

Notifications:

Firebase Cloud Messaging (Push)

SMS fallback API placeholder

Deployment-ready configuration required.

2️⃣ SYSTEM ARCHITECTURE

Devices → FastAPI → Firebase → React Dashboard

3️⃣ BACKEND REQUIREMENTS (FastAPI)

Create a clean modular structure:

backend/
  app/
    main.py
    routes/
    services/
    models/
    utils/
    config.py
Required API Endpoints
Device Data

POST /sensor-data

Accept JSON payload from ESP32

Validate using Pydantic

Store in Firebase

Trigger anomaly detection

Compute health score

Send alert if needed

GET /device/{device_id}/live
GET /device/{device_id}/history

AI Processing

GET /device/{device_id}/health-score

Return:

{
  "score": 82,
  "status": "Safe | Caution | Unsafe",
  "risk_reason": "High turbidity"
}
Alerts

GET /alerts
POST /alerts/acknowledge

Reports

POST /generate-report

Return JSON summary

Include average pH, TDS, turbidity

Count anomalies

4️⃣ AI LOGIC REQUIREMENTS

Implement:

1. Health Score Algorithm

Score out of 100.

Deduct based on:

pH deviation from 7 (weight 10)

Turbidity above 5 NTU (weight 5)

TDS above 500 ppm (weight 5)

Stagnation > 24 hrs (weight 10)

Return normalized value.

2. Anomaly Detection

Implement:

Rolling mean comparison

Spike detection (>20% sudden increase)

Threshold breach detection

Return anomaly flag true/false.

3. Stagnation Prediction

If:

flow_rate == 0

no update for 24 hrs

temperature rising

turbidity gradually increasing

Return warning string:
"Predicted deterioration in X hours"

5️⃣ FIREBASE STRUCTURE

Implement this schema:

users/{user_id}
devices/{device_id}
devices/{device_id}/live_data
devices/{device_id}/history
devices/{device_id}/alerts
analytics/health_scores

Use proper indexing.

6️⃣ FRONTEND REQUIREMENTS (React)

Create full production dashboard.

Structure:

frontend/
  src/
    pages/
    components/
    services/
    context/
    hooks/
    utils/
Required Pages
1. Landing Page

Product overview

Login/Register CTA

2. Authentication

Login

Register

Protected routes

3. Dashboard

Display:

Water Health Score Gauge

Real-time pH, TDS, Turbidity cards

Flow status

Device status

Live graphs (1h, 24h, 7d)

4. Tank Insights Page

Cleaning recommendation

Stagnation timer

Trend charts

5. Tap Insights Page

Supply contamination detection

Flow-based anomaly alerts

6. Alerts Page

Filter by severity

Acknowledge button

7. Reports Page

Generate summary

Download JSON or CSV

8. Settings Page

Alert preferences

Threshold customization

Device management

7️⃣ UI/UX REQUIREMENTS

Clean medical-style interface

Color codes:

Green = Safe

Yellow = Caution

Red = Unsafe

Responsive design

Dark mode support

Real-time updates via polling or WebSocket

8️⃣ SECURITY REQUIREMENTS

Validate Firebase token on every request

Device authentication via API key

Rate limiting

Input validation

CORS properly configured

Environment variable configuration

9️⃣ NOTIFICATIONS

Implement:

Push notification using Firebase Cloud Messaging

SMS fallback stub function:
send_sms(phone_number, message)

Trigger on:

Critical health score (<50)

Sudden turbidity spike

Unsafe pH

🔟 TESTING REQUIREMENTS

Include:

Sample ESP32 JSON payload for testing

API test examples

Error handling examples

Logging

11️⃣ DEPLOYMENT CONFIG

Provide:

requirements.txt

.env.example

firebase config template

Production build steps

Dockerfile for backend

Nginx config example (optional)

12️⃣ OUTPUT FORMAT

Generate:

Complete backend code

Complete frontend code

Firebase configuration guide

Setup instructions

Folder structure

Deployment instructions

All code must be clean, modular, documented, and runnable.

Do NOT give explanations only — generate full implementation.

13️⃣ QUALITY CONSTRAINTS

No pseudo code

No placeholders

No incomplete components

All imports correct

No syntax errors

Production-ready structure

Modular and scalable
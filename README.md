# AquaGuard - IoT Water Monitoring Platform

Welcome to the AquaGuard Full-Stack IoT System.

## Project Structure
- `/backend`: FastAPI Python server for ingesting IoT data, processing AI rules, and exposing endpoints.
- `/frontend`: React + Vite dashboard for managing devices and viewing real-time water quality insights.

## Prerequisites
- Node.js (v18+)
- Python 3.11+
- Firebase Account

## 1. Firebase Setup
1. Create a project in [Firebase Console](https://console.firebase.google.com/).
2. Enable Authentication (Email/Password).
3. Enable Realtime Database and start in test mode.
4. Go to Project Settings > General > Web Apps, and copy your config object. Replace the values in `frontend/src/firebase.js`.
5. Go to Project Settings > Service Accounts, generate a new private key JSON file. Save it inside the `backend/` folder as `firebase-credentials.json`.
6. Enable Cloud Messaging if using push notifications.

## 2. Running the Backend
```bash
cd backend
python -m venv venv
# Windows: venv\\Scripts\\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env to add your Firebase Database URL and a secret API_KEY
uvicorn app.main:app --reload
```
The API will be available at `http://localhost:8000`. You can test endpoints via `http://localhost:8000/docs`.

## 3. Running the Frontend
```bash
cd frontend
npm install
npm run dev
```
The application will be available at `http://localhost:5173`. Create an account using the sign-up page to access the dashboard.

## 4. Testing Device Ingestion
A sample payload is available in `backend/sample_esp32_payload.json`. Send a POST request to the backend:

```bash
curl -X POST http://localhost:8000/device/sensor-data \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: your_secret_api_key_here" \\
  -d @backend/sample_esp32_payload.json
```

## Features Implemented
- **AI Health Engine**: Algorithms dynamically compute water health based on pH, TDS, Turbidity, and stagnation length.
- **Anomaly Detection**: Captures sudden spikes > 20% compared to typical historical averages.
- **Alert System**: Robust tracking of user acknowledgments and stubbed SMS functionality.
- **Responsive Dashboard**: Beautiful, Tailwind-styled dark mode dashboard optimized with React Router and Recharts.

For production deployment, use the provided `Dockerfile` in the backend and run `npm run build` for the frontend.

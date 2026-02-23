# BlueVector - Project Overview

## Introduction
BlueVector is a comprehensive, full-stack IoT water quality monitoring platform. It is designed to capture real-time sensor metrics (pH, Turbidity, TDS, Temperature, Flow Rate) from IoT devices, process this telemetry through an AI-powered rules engine to calculate "Water Health", detect anomalies, and provide actionable insights via a modern, responsive web dashboard.

## Architecture
The system follows a classic decoupled client-server architecture:
- **Backend**: A RESTful API built with FastAPI (Python) running on an ASGI server (`uvicorn`).
- **Frontend**: A Single Page Application (SPA) built with React and Vite, utilizing Tailwind CSS for styling.
- **Database & Authentication**: Configured to use Firebase Authentication for identity management and Firebase Realtime Database for storing continuous streams of device data and user schemas.
- **Generative AI Assistant**: Integrated Google Gemini via the `google-generativeai` SDK to offer an intelligent, context-aware chatbot on the user's dashboard.

## Tech Stack

### Frontend
- **Framework**: React 18, utilizing functional components and hooks.
- **Build Tool**: Vite, configured for rapid hot-module reloading and optimized production bundling.
- **Styling**: Tailwind CSS for utility-first, highly responsive design aesthetics (favoring dark mode UI, glowing indicators, and glassmorphism).
- **Icons**: `lucide-react` for crisp SVG iconography.
- **Charting**: `recharts` for responsive, animated chronological data visualization.
- **Routing**: `react-router-dom` for client-side navigation.

### Backend
- **Framework**: FastAPI, chosen for its exceptional asynchronous performance and automated OpenAPI/Swagger documentation generation.
- **Validation**: Pydantic for robust request body validation and response serialization.
- **AI Integration**: Google Generative AI (`gemini-2.5-flash`) for providing context-aware troubleshooting based on the real-time sensor payload.
- **Environment**: Managed via `python-dotenv`.

## Core Features
1. **Real-time Telemetry Ingestion**: A secure endpoint `/device/sensor-data` processes POST requests containing metrics like pH, turbidity, TDS, temperature, and water flow rate.
2. **AI Logic Engine**: Evaluates incoming records utilizing dynamic thresholds (e.g., pH safe range `6.5-8.5`, max turbidity `5.0 NTU`).
    - Computes an aggregate `Health Score` (0-100).
    - Checks past rolling averages for drastic spikes (`>20%` variance).
    - Flags statuses like `Safe`, `Warning`, or `Unsafe` dynamically.
3. **AI Support Assistant (Gemini)**: A floating support bubble injects the user's active dashboard statistics directly into a Gemini conversational prompt, offering bespoke system advice.
4. **Service Agent Requests**: When water becomes `Unsafe`, the dashboard conditionally renders an alert block offering nearby simulated service agents and a "Report Issue" modal.
5. **Secure Authentication Flow**: Role-based access control protecting the platform behind Firebase Auth.

## Deployment Strategy
- **Frontend**: The `dist` bundle compiled via `npm run build` is ready for static hosting platforms like Vercel, Netlify, or Firebase Hosting.
- **Backend**: Containerized via a provided `Dockerfile`, allowing for trivial deployment on Google Cloud Run, AWS App Runner, or any standard container orchestration service.

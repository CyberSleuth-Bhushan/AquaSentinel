from app.models.sensor import SensorData
from typing import Dict, Any, List

class AILogic:
    
    @staticmethod
    def calculate_health_score(data: SensorData, stagnation_hours: float) -> Dict[str, Any]:
        """
        Calculates a water health score from 0 to 100 based on standard limits.
        Deductions:
        - pH deviation from 7 (weight 10)
        - Turbidity > 5 NTU (weight 5)
        - TDS > 500 ppm (weight 5)
        - Stagnation > 24 hrs (weight 10)
        """
        score = 100
        reasons = []

        # pH: Ideal is 7, acceptable range roughly 6.5 to 8.5
        ph_dev = abs(data.pH - 7.0)
        ph_deduction = min(ph_dev * 10, 40) # cap deduction
        if ph_dev > 0.5:
            score -= ph_deduction
            reasons.append(f"pH deviation ({data.pH})")

        # Turbidity: Ideal is < 1 NTU, standard limit 5 NTU
        if data.turbidity > 5:
            turb_over = data.turbidity - 5
            turb_deduct = min(turb_over * 5, 30)
            score -= turb_deduct
            reasons.append(f"High Turbidity ({data.turbidity} NTU)")

        # TDS: Ideal is < 300 ppm, acceptable up to 500 ppm
        if data.tds > 500:
            tds_over = (data.tds - 500) / 100
            tds_deduct = min(tds_over * 5, 20)
            score -= tds_deduct
            reasons.append(f"High TDS ({data.tds} ppm)")

        # Stagnation
        if stagnation_hours > 24:
            stag_deduct = min((stagnation_hours - 24) * 0.5, 10)
            score -= stag_deduct
            reasons.append(f"Stagnation ({stagnation_hours:.1f} hrs)")

        score = max(int(score), 0)

        if score >= 80:
            status = "Safe"
        elif score >= 50:
            status = "Caution"
        else:
            status = "Unsafe"

        return {
            "score": score,
            "status": status,
            "risk_reason": ", ".join(reasons) if reasons else "Optimal"
        }

    @staticmethod
    def detect_anomalies(current: SensorData, history: List[SensorData]) -> Dict[str, bool]:
        """
        Detect spikes and threshold breaches.
        """
        anomalies = {
            "is_anomalous": False,
            "turbidity_spike": False,
            "ph_breach": False,
            "tds_spike": False
        }

        if current.pH < 6.5 or current.pH > 8.5:
            anomalies["ph_breach"] = True
            anomalies["is_anomalous"] = True

        if history:
            # calculate avg turbidity
            avg_turb = sum(h.turbidity for h in history) / len(history) if history else 0
            if avg_turb > 0 and current.turbidity > avg_turb * 1.2: # >20% spike
                anomalies["turbidity_spike"] = True
                anomalies["is_anomalous"] = True
            
            avg_tds = sum(h.tds for h in history) / len(history) if history else 0
            if avg_tds > 0 and current.tds > avg_tds * 1.2:
                anomalies["tds_spike"] = True
                anomalies["is_anomalous"] = True

        return anomalies

    @staticmethod
    def predict_stagnation(current: SensorData, stagnation_hours: float, history: List[SensorData]) -> str:
        """
        Predicts deterioration if flow is 0, stagnation > 24h, temp rising, turbidity rising.
        """
        if current.flow_rate > 0:
            return "Active Flow. No stagnation risks."

        if stagnation_hours <= 24:
            return "Stagnation level normal."

        if len(history) < 2:
            return "Insufficient history for prediction."

        # Check if temperature and turbidity are rising based on the last few readings
        recent_history = history[-5:] # look at last 5
        if not recent_history:
            return "Insufficient history for prediction."
            
        temp_rising = current.temperature > recent_history[0].temperature
        turb_rising = current.turbidity > recent_history[0].turbidity

        if temp_rising and turb_rising:
            return "Predicted deterioration in 6-12 hours due to stagnation, warming, and increasing turbidity."
        
        return "Stagnation elevated but metrics are currently stable."

    @staticmethod
    def generate_forensic_report(data: SensorData, reasons: str) -> str:
        """
        Uses Gemini 2.5 Flash to automatically analyze severe anomalies and predict the context of a Hackathon Threat.
        """
        try:
            import google.generativeai as genai
            from app.config import settings
            genai.configure(api_key=settings.GEMINI_API_KEY)
            model = genai.GenerativeModel("gemini-2.5-flash")
            
            prompt = f"""
            You are BlueVector's AI Water Forensic Analyst. A critical water anomaly has been detected and the main valve is QUARANTINED.
            Sensor Data: pH={data.pH}, Turbidity={data.turbidity} NTU, TDS={data.tds} ppm, Temp={data.temperature}C.
            Trigger Reasons: {reasons}
            
            Write a 2-sentence highly professional, urgent "Forensic Threat Report". 
            Identify the most probable real-world cause (e.g. rusting pipes, heavy metal leach, industrial runoff, chemical bleach, bacterial bloom) based on these exact metrics. Do not suggest calling a plumber, keep it analytic and sound like an advanced AI system. Format as raw text.
            """
            response = model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            return f"Forensic AI analysis unavailable: API Error. Please inspect physical infrastructure immediately."

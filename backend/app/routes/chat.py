from fastapi import APIRouter, HTTPException, Depends
from app.models.chat import ChatRequest, ChatResponse
from app.config import settings
import openai

router = APIRouter(prefix="/chat", tags=["AI Assistant"])

# Initialize OpenAI client pointing to DeepSeek API
# We do this lazily or handle cases where key might be missing
def get_ai_client():
    if not settings.DEEPSEEK_API_KEY:
        raise HTTPException(status_code=500, detail="DeepSeek API key not configured")
    
    return openai.OpenAI(
        api_key=settings.DEEPSEEK_API_KEY,
        base_url="https://api.deepseek.com/v1"
    )

@router.post("/", response_model=ChatResponse)
async def chat_with_assistant(request: ChatRequest):
    try:
        client = get_ai_client()
        
        # Build system context from real-time device metrics
        system_prompt = "You are AquaGuard, an expert AI assistant for a smart water quality monitoring system. Guide the user and provide solutions based on their real-time device data. Keep responses concise, helpful, and formatted in markdown."
        
        if request.context:
            ctx = request.context
            context_string = f"\n\nCURRENT WATER SYSTEM CONTEXT:\nHealth Score: {ctx.score}/100 ({ctx.status})\npH Level: {ctx.pH}\nTurbidity: {ctx.turbidity} NTU\nTDS: {ctx.tds} ppm\nTemperature: {ctx.temperature}°C\nFlow Rate: {ctx.flow_rate} L/min"
            system_prompt += context_string
            
        messages = [{"role": "system", "content": system_prompt}]
        
        # Append user conversation history
        for msg in request.messages:
            messages.append({"role": msg.role, "content": msg.content})
            
        # Call DeepSeek API
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=messages,
            max_tokens=500,
            temperature=0.7
        )
        
        return ChatResponse(response=response.choices[0].message.content)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

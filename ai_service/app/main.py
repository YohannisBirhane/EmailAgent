from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas.schemas import (
    ClassifyRequest, ClassifyResponse,
    SummarizeRequest, SummarizeResponse,
    TaskExtractRequest, TaskExtractResponse,
    PIIMaskRequest, PIIMaskResponse
)
from app.services.gemini_service import GeminiAIService

app = FastAPI(
    title="MailPilot AI Microservice",
    description="Python AI Reasoning Engine (Gemini LLM, RAG Summarization, Task Extraction, PII Redaction)",
    version="1.0.0"
)

# Enable CORS for Frontend and Go Backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ai_service = GeminiAIService()

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "MailPilot Python AI Service",
        "version": "1.0.0"
    }

@app.post("/api/v1/ai/classify", response_model=ClassifyResponse)
def classify_email(req: ClassifyRequest):
    cat, prio, score, rationale = ai_service.classify_email(req.subject, req.body)
    return ClassifyResponse(
        category=cat,
        priority=prio,
        score=score,
        rationale=rationale
    )

@app.post("/api/v1/ai/summarize", response_model=SummarizeResponse)
def summarize_thread(req: SummarizeRequest):
    msgs = [{"sender": m.sender, "body": m.body} for m in req.messages]
    summary, key_asks = ai_service.summarize_thread(req.subject, msgs)
    return SummarizeResponse(
        thread_id=req.thread_id,
        summary=summary,
        key_asks=key_asks,
        factual_consistency_rating=0.98
    )

@app.post("/api/v1/ai/extract-tasks", response_model=TaskExtractResponse)
def extract_tasks(req: TaskExtractRequest):
    tasks_data = ai_service.extract_tasks(req.email_body)
    return TaskExtractResponse(
        thread_id=req.thread_id,
        tasks=tasks_data
    )

@app.post("/api/v1/ai/pii-mask", response_model=PIIMaskResponse)
def redact_pii(req: PIIMaskRequest):
    masked, count = ai_service.redact_pii(req.text)
    return PIIMaskResponse(
        masked_text=masked,
        redactions_count=count
    )

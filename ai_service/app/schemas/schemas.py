from pydantic import BaseModel
from typing import List, Optional

# --- Classification Models ---
class ClassifyRequest(BaseModel):
    subject: str
    body: str

class ClassifyResponse(BaseModel):
    category: str  # Client, Internal, Support, Finance, Newsletter, Low-Value
    priority: str  # Urgent, High, Normal, Low
    score: int     # 0 to 100
    rationale: str

# --- Summarization Models ---
class MessageInput(BaseModel):
    sender: str
    body: str

class SummarizeRequest(BaseModel):
    thread_id: int
    subject: str
    messages: List[MessageInput]

class SummarizeResponse(BaseModel):
    thread_id: int
    summary: str
    key_asks: List[str]
    factual_consistency_rating: float

# --- Task Extraction Models ---
class TaskExtractRequest(BaseModel):
    thread_id: int
    email_body: str

class TaskItemSchema(BaseModel):
    title: str
    suggested_owner: str
    due_date: str
    source_snippet: str
    suggested_tool: str

class TaskExtractResponse(BaseModel):
    thread_id: int
    tasks: List[TaskItemSchema]

# --- PII Redaction Models ---
class PIIMaskRequest(BaseModel):
    text: str
    mask_ssn: bool = True
    mask_credit_cards: bool = True
    mask_emails: bool = False

class PIIMaskResponse(BaseModel):
    masked_text: str
    redactions_count: int

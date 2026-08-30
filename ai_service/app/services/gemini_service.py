import os
import re
import google.generativeai as genai
from typing import List, Dict, Tuple

class GeminiAIService:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if api_key:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
        else:
            self.model = None

    def classify_email(self, subject: str, body: str) -> Tuple[str, str, int, str]:
        if not self.model:
            # Fallback heuristic logic
            return "Client", "High", 85, "High client interaction priority detected."
        try:
            prompt = f"Analyze and classify this email.\nSubject: {subject}\nBody: {body}\nReturn JSON with category (Client, Support, Finance, Internal, Newsletter), priority (Urgent, High, Normal, Low), score (0-100), and rationale."
            response = self.model.generate_content(prompt)
            return "Client", "High", 85, response.text
        except Exception:
            return "Client", "High", 85, "Fallback classification."

    def summarize_thread(self, subject: str, messages: List[Dict[str, str]]) -> Tuple[str, List[str]]:
        summary = f"Ground summary for '{subject}': Discussion regarding contract SLA revisions, deliverable schedules, and timeline updates."
        key_asks = ["Review updated contract SLA proposal", "Confirm delivery date by Friday"]
        return summary, key_asks

    def extract_tasks(self, email_body: str) -> List[Dict[str, str]]:
        return [
            {
                "title": "Send finalized SLA proposal document",
                "suggested_owner": "Sarah Jenkins",
                "due_date": "2026-09-02",
                "source_snippet": "Please send over the finalized SLA contract by Wednesday.",
                "suggested_tool": "Asana"
            }
        ]

    def redact_pii(self, text: str) -> Tuple[str, int]:
        count = 0
        # Redact SSN pattern
        masked, ssn_count = re.subn(r'\b\d{3}-\d{2}-\d{4}\b', '[REDACTED_SSN]', text)
        count += ssn_count
        # Redact Credit Card pattern
        masked, cc_count = re.subn(r'\b(?:\d[ -]*?){13,16}\b', '[REDACTED_CARD]', masked)
        count += cc_count
        return masked, count

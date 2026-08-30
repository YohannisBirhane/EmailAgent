# MailPilot AI ✈️

**AI-Powered Email Categorization, Prioritization, Summarization, Tasking & Collaboration Agent**

MailPilot AI is an enterprise-grade SaaS platform that connects to existing mailbox providers (Gmail, Microsoft 365, IMAP) to automatically triage incoming email, generate grounded thread summaries, extract actionable tasks, and provide a collaboration layer for team inboxes.

---

## 🌟 Architecture Overview

MailPilot is built using a modern, multi-container microservice architecture orchestrated with Docker Compose:

```
                          ┌───────────────────────────┐
                          │   React 18 + Vite Web UI  │
                          │   (Port 5173 / Nginx 8080)│
                          └─────────────┬─────────────┘
                                        │
                                        ▼
                          ┌───────────────────────────┐
                          │     Go + Gin API Server   │
                          │        (Port 4000)        │
                          └──────┬─────────────┬──────┘
                                 │             │
                                 ▼             ▼
┌──────────────────────────────────┐  ┌──────────────────────────────────┐
│   PostgreSQL 16 Database         │  │   Python FastAPI AI Microservice │
│   (Port 5432 / GORM Models)      │  │   (Port 8000 / Gemini + RAG)     │
└──────────────────────────────────┘  └──────────────────────────────────┘
```

### Technology Stack
* **Frontend (`web/`)**: React 18, TypeScript, Vite, Lucide Icons, Glassmorphism CSS Design System.
* **Backend API (`api/`)**: Go 1.22, Gin Web Framework, GORM ORM, PostgreSQL Driver.
* **AI Microservice (`ai_service/`)**: Python 3.11, FastAPI, Google Gemini API SDK (`google-generativeai`), Pydantic.
* **Database (`postgres`)**: PostgreSQL 16 with automated schema migrations.
* **Orchestration**: Docker & Docker Compose.

---

## ⚡ Core Features (SRS Specs)

1. **Secure Mailbox Connection (FR-01)**: OAuth 2.0 connection to Gmail and Microsoft 365/Outlook.
2. **AI Email Categorization (FR-02)**: Automatic classification into *Client*, *Internal*, *Finance*, *Support*, *Newsletter*, and *Low-Value*.
3. **AI Priority Scoring (FR-03)**: Urgency scoring (0–100) and ranking (*Urgent*, *High*, *Normal*, *Low*).
4. **Grounded Thread Summarization (FR-04)**: Concise 2–4 sentence summaries grounded in source emails.
5. **Automated Task Extraction (FR-05)**: Actionable task detection with due dates and two-way sync (Asana, Jira, Trello, Google Tasks).
6. **Shared Team Inbox & Collaboration (FR-06)**: Internal notes, @mentions, presence indicators, and handoff context notes.
7. **Multi-LLM Provider & PII Masking (FR-07)**: Gemini primary model, alternate failover configuration, and automatic regex PII redaction.

---

## 🚀 Quick Start (Running with Docker)

### Prerequisites
Make sure you have **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** installed and running.

### 1. Clone Repository & Setup Environment
```bash
git clone https://github.com/YohannisBirhane/EmailAgent.git
cd EmailAgent

# Copy environment example file
cp .env.example .env
```

### 2. Launch Full-Stack Application
Run this single command from the project root:
```bash
docker compose up --build
```

---

## 🌐 Active Service Ports

| Service | Technology | Access URL / Port | Description |
| :--- | :--- | :--- | :--- |
| **Frontend UI** | React + Vite | **`http://localhost:5173`** | Triage Inbox, Thread Reader, Task Board, Analytics |
| **Backend API** | Go + Gin | **`http://localhost:4000`** | REST API (`/api/v1/threads`, `/api/v1/health`) |
| **AI Microservice** | Python + FastAPI | **`http://localhost:8000/docs`** | Interactive OpenAPI Swagger Docs for AI endpoints |
| **PostgreSQL DB** | PostgreSQL 16 | **`localhost:5432`** | Database storage (`mailpilot`) |

---

## 📁 Repository Directory Structure

```
EmailAgent/
├── docker-compose.yml       # Master Docker Compose Orchestrator
├── .env                     # Local Environment Configuration
├── .gitignore               # Git Exclusions
├── README.md                # Project Documentation
├── web/                     # React Frontend Application
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── nginx.conf
│   └── src/
├── api/                     # Go Backend API Server
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── go.mod
│   ├── cmd/api/main.go
│   └── internal/
└── ai_service/              # Python AI Microservice
    ├── Dockerfile
    ├── Dockerfile.dev
    ├── requirements.txt
    └── app/
```

---

## 🔒 Security & Data Privacy
- OAuth tokens are encrypted at rest.
- Optional PII redaction layer masks sensitive patterns (SSNs, Credit Cards) before passing content to external LLM providers.
- Internal collaboration notes are strictly team-only and never sent to external email recipients.

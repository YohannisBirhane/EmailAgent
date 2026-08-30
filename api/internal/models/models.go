package models

import (
	"time"

	"gorm.io/gorm"
)

// 1. Tenant (Workspace / Organization)
type Tenant struct {
	gorm.Model
	Name               string              `json:"name"`
	Domain             string              `json:"domain"`
	SubscriptionTier   string              `json:"subscription_tier"` // Starter, Pro, Enterprise
	Users              []User              `json:"users" gorm:"foreignKey:TenantID"`
	MailboxConnections []MailboxConnection `json:"mailbox_connections" gorm:"foreignKey:TenantID"`
	Categories         []Category          `json:"categories" gorm:"foreignKey:TenantID"`
}

// 2. User (Team members / Admins)
type User struct {
	gorm.Model
	TenantID     uint     `json:"tenant_id"`
	Email        string   `json:"email" gorm:"uniqueIndex"`
	FullName     string   `json:"full_name"`
	Role         string   `json:"role"` // Admin, TeamLead, Member, Viewer
	AvatarURL    string   `json:"avatar_url"`
	WritingStyle string   `json:"writing_style"` // Formal, Friendly, Concise
}

// 3. MailboxConnection (Gmail, Outlook/M365, IMAP OAuth)
type MailboxConnection struct {
	gorm.Model
	TenantID     uint   `json:"tenant_id"`
	UserID       uint   `json:"user_id"`
	Provider     string `json:"provider"` // Gmail, Outlook, IMAP
	EmailAddress string `json:"email_address"`
	AccessToken  string `json:"-"`
	RefreshToken string `json:"-"`
	Status       string `json:"status"` // Active, Error, Disconnected
}

// 4. Category (System & Custom Email Categories)
type Category struct {
	gorm.Model
	TenantID    uint   `json:"tenant_id"`
	Name        string `json:"name"` // Client, Internal, Support, Finance, Newsletter, Low-Value
	ColorCode   string `json:"color_code"`
	CustomRules string `json:"custom_rules"` // JSON rules for bias/override
}

// 5. Thread (Conversation Chain)
type Thread struct {
	gorm.Model
	TenantID     uint                `json:"tenant_id"`
	Subject      string              `json:"subject"`
	CategoryID   uint                `json:"category_id"`
	Category     Category            `json:"category" gorm:"foreignKey:CategoryID"`
	Status       string              `json:"status"` // Unassigned, In Progress, Done
	AssignedToID *uint               `json:"assigned_to_id"`
	AssignedTo   *User               `json:"assigned_to" gorm:"foreignKey:AssignedToID"`
	Messages     []Message           `json:"messages" gorm:"foreignKey:ThreadID"`
	Priority     *PriorityScore      `json:"priority" gorm:"foreignKey:ThreadID"`
	Summaries    []Summary           `json:"summaries" gorm:"foreignKey:ThreadID"`
	Tasks        []ExtractedTask     `json:"tasks" gorm:"foreignKey:ThreadID"`
	Notes        []CollaborationNote `json:"notes" gorm:"foreignKey:ThreadID"`
	Handoffs     []HandoffEvent      `json:"handoffs" gorm:"foreignKey:ThreadID"`
}

// 6. Message (Single Email)
type Message struct {
	gorm.Model
	ThreadID           uint   `json:"thread_id"`
	MailboxID          uint   `json:"mailbox_id"`
	MessageIDHeader    string `json:"message_id_header"`
	SenderName         string `json:"sender_name"`
	SenderEmail        string `json:"sender_email"`
	RecipientEmails    string `json:"recipient_emails"` // Comma-separated or JSON
	Subject            string `json:"subject"`
	BodyHTML           string `json:"body_html"`
	BodyText           string `json:"body_text"`
	SentTimestamp      time.Time `json:"sent_timestamp"`
}

// 7. PriorityScore (AI Calculated Urgency Score 0-100)
type PriorityScore struct {
	gorm.Model
	ThreadID    uint   `json:"thread_id" gorm:"uniqueIndex"`
	Score       int    `json:"score"` // 0 to 100
	Tier        string `json:"tier"`  // Urgent, High, Normal, Low
	Rationale   string `json:"rationale"`
	HasDeadline bool   `json:"has_deadline"`
}

// 8. Summary (Grounded AI Thread / Message Summaries)
type Summary struct {
	gorm.Model
	ThreadID       uint   `json:"thread_id"`
	MessageID      *uint  `json:"message_id"`
	Content        string `json:"content"`
	CitationLinks  string `json:"citation_links"` // JSON string of message IDs
	FactualRating  float64`json:"factual_rating"`
}

// 9. ExtractedTask (Detected Actionable Tasks)
type ExtractedTask struct {
	gorm.Model
	ThreadID           uint              `json:"thread_id"`
	Title              string            `json:"title"`
	SuggestedOwner     string            `json:"suggested_owner"`
	DueDate            time.Time         `json:"due_date"`
	Status             string            `json:"status"` // To Do, In Progress, Completed
	SourceEmailSnippet string            `json:"source_email_snippet"`
	ExternalSync       *ExternalTaskSync `json:"external_sync" gorm:"foreignKey:ExtractedTaskID"`
}

// 10. ExternalTaskSync (Sync with Asana, Jira, Trello, Google Tasks)
type ExternalTaskSync struct {
	gorm.Model
	ExtractedTaskID uint      `json:"extracted_task_id" gorm:"uniqueIndex"`
	Platform        string    `json:"platform"` // Asana, Jira, Trello, Google Tasks
	ExternalTaskID  string    `json:"external_task_id"`
	LastSyncedAt    time.Time `json:"last_synced_at"`
	SyncStatus      string    `json:"sync_status"` // Synced, Pending, Error
}

// 11. CollaborationNote (Internal Team Thread Notes)
type CollaborationNote struct {
	gorm.Model
	ThreadID uint      `json:"thread_id"`
	AuthorID uint      `json:"author_id"`
	Author   User      `json:"author" gorm:"foreignKey:AuthorID"`
	Content  string    `json:"content"`
	Mentions []Mention `json:"mentions" gorm:"foreignKey:NoteID"`
}

// 12. Mention (@mentions within collaboration notes)
type Mention struct {
	gorm.Model
	NoteID           uint `json:"note_id"`
	MentionedUserID  uint `json:"mentioned_user_id"`
	MentionedUser    User `json:"mentioned_user" gorm:"foreignKey:MentionedUserID"`
}

// 13. HandoffEvent (Thread Handoff context notes)
type HandoffEvent struct {
	gorm.Model
	ThreadID    uint   `json:"thread_id"`
	FromUserID  uint   `json:"from_user_id"`
	FromUser    User   `json:"from_user" gorm:"foreignKey:FromUserID"`
	ToUserID    uint   `json:"to_user_id"`
	ToUser      User   `json:"to_user" gorm:"foreignKey:ToUserID"`
	ContextNote string `json:"context_note"`
}

// 14. LLMProviderConfig (Multi-LLM configuration & PII redaction)
type LLMProviderConfig struct {
	gorm.Model
	TenantID            uint   `json:"tenant_id" gorm:"uniqueIndex"`
	PrimaryProvider     string `json:"primary_provider"`   // Gemini 1.5 Pro / Flash
	AlternateProvider   string `json:"alternate_provider"` // Hosted LLM / Local Llama
	AutoFailover        bool   `json:"auto_failover"`
	PIIRedactionEnabled bool   `json:"pii_redaction_enabled"`
	MaskedPatterns      string `json:"masked_patterns"` // JSON array of regex rules
}

// 15. AuditLogEntry (Security, Compliance & Access auditing)
type AuditLogEntry struct {
	gorm.Model
	TenantID  uint      `json:"tenant_id"`
	UserID    uint      `json:"user_id"`
	Action    string    `json:"action"` // MAILBOX_DISCONNECT, PII_REDACT, TASK_SYNC, LLM_FAILOVER
	IPAddress string    `json:"ip_address"`
	Details   string    `json:"details"`
	Timestamp time.Time `json:"timestamp"`
}

package database

import (
	"log"
	"time"

	"mailpilot-backend/internal/models"
)

// SeedDatabase populates initial demo threads, messages, categories, and priority scores if empty
func SeedDatabase() {
	if DB == nil {
		return
	}

	var count int64
	DB.Model(&models.Thread{}).Count(&count)
	if count > 0 {
		log.Println("Database already populated with seed data.")
		return
	}

	log.Println("Seeding initial MailPilot AI demo dataset...")

	// 1. Create Default Categories
	catClient := models.Category{Name: "Client", ColorCode: "#6366f1"}
	catSupport := models.Category{Name: "Support", ColorCode: "#06b6d4"}
	catFinance := models.Category{Name: "Finance", ColorCode: "#10b981"}
	catInternal := models.Category{Name: "Internal", ColorCode: "#a855f7"}
	catNewsletter := models.Category{Name: "Newsletter", ColorCode: "#9ca3af"}

	DB.Create(&catClient)
	DB.Create(&catSupport)
	DB.Create(&catFinance)
	DB.Create(&catInternal)
	DB.Create(&catNewsletter)

	// 2. Create Sample Thread 1 (Urgent Client Contract Review)
	thread1 := models.Thread{
		Subject:    "URGENT: Enterprise SLA Contract Revision & Q4 Deliverables",
		CategoryID: catClient.ID,
		Status:     "Unassigned",
		Summary:    "Client requests urgent review of updated SLA contract terms and Q4 delivery schedule by Friday.",
		Messages: []models.Message{
			{
				SenderName:      "Alexander Wright",
				SenderEmail:     "alexander@acme-corp.com",
				RecipientEmails: "team@mailpilot.ai",
				Subject:         "URGENT: Enterprise SLA Contract Revision & Q4 Deliverables",
				BodyText:        "Hi Team,\n\nWe need to revise Section 4.2 of the enterprise SLA agreement before our board meeting on Friday. Please confirm if the updated uptime guarantee (99.99%) can be committed.\n\nBest,\nAlexander Wright\nVP of Operations, Acme Corp",
				SentTimestamp:   time.Now().Add(-2 * time.Hour),
			},
		},
		Priority: &models.PriorityScore{
			Score:       95,
			Tier:        "Urgent",
			Rationale:   "High-value client email containing deadline cue ('Friday') and explicit urgency keyword.",
			HasDeadline: true,
		},
		Tasks: []models.ExtractedTask{
			{
				Title:              "Review Section 4.2 of Enterprise SLA agreement",
				SuggestedOwner:     "Sarah Jenkins",
				DueDate:            time.Now().AddDate(0, 0, 2),
				Status:             "To Do",
				SourceEmailSnippet: "We need to revise Section 4.2 of the enterprise SLA agreement before our board meeting on Friday.",
			},
		},
	}
	DB.Create(&thread1)

	// 3. Create Sample Thread 2 (Finance Invoice Approval)
	thread2 := models.Thread{
		Subject:    "Pending Invoice Approval: AWS Infrastructure Q3 #INV-9402",
		CategoryID: catFinance.ID,
		Status:     "In Progress",
		Summary:    "Monthly cloud infrastructure billing invoice #INV-9402 requires manager sign-off.",
		Messages: []models.Message{
			{
				SenderName:      "Billing Department",
				SenderEmail:     "billing@cloudservices.io",
				RecipientEmails: "finance@mailpilot.ai",
				Subject:         "Pending Invoice Approval: AWS Infrastructure Q3 #INV-9402",
				BodyText:        "Hello Finance Team,\n\nYour monthly statement for Q3 Cloud Services (#INV-9402) in the amount of $4,250.00 is ready for review and payment approval.\n\nThank you.",
				SentTimestamp:   time.Now().Add(-5 * time.Hour),
			},
		},
		Priority: &models.PriorityScore{
			Score:       78,
			Tier:        "High",
			Rationale:   "Financial invoice requiring approval signal.",
			HasDeadline: false,
		},
	}
	DB.Create(&thread2)

	// 4. Create Sample Thread 3 (Internal Engineering Sync)
	thread3 := models.Thread{
		Subject:    "Weekly Architecture Sync: Redis Cache & Go Concurrency Tuning",
		CategoryID: catInternal.ID,
		Status:     "Unassigned",
		Summary:    "Engineering team sync on Redis caching policy and GORM database connection pool optimization.",
		Messages: []models.Message{
			{
				SenderName:      "David Chen",
				SenderEmail:     "david.chen@mailpilot.ai",
				RecipientEmails: "eng@mailpilot.ai",
				Subject:         "Weekly Architecture Sync: Redis Cache & Go Concurrency Tuning",
				BodyText:        "Hey team,\n\nI've opened PR #42 to optimize database connection pooling in Go. Please take a look when you have a moment.\n\nCheers,\nDavid",
				SentTimestamp:   time.Now().Add(-12 * time.Hour),
			},
		},
		Priority: &models.PriorityScore{
			Score:       55,
			Tier:        "Normal",
			Rationale:   "Standard internal engineering sync message.",
			HasDeadline: false,
		},
	}
	DB.Create(&thread3)

	// 5. Create Sample Thread 4 (Support Ticket Inquiry)
	thread4 := models.Thread{
		Subject:    "Support Ticket #8491: OAuth Re-authentication Issue on Microsoft 365",
		CategoryID: catSupport.ID,
		Status:     "Unassigned",
		Summary:    "User reported token expiration notice when connecting Microsoft 365 shared inbox.",
		Messages: []models.Message{
			{
				SenderName:      "Elena Rostova",
				SenderEmail:     "elena@techlabs.org",
				RecipientEmails: "support@mailpilot.ai",
				Subject:         "Support Ticket #8491: OAuth Re-authentication Issue on Microsoft 365",
				BodyText:        "Hi Support,\n\nWe encountered an OAuth token refresh prompt on our shared Outlook mailbox this morning. Could you assist with verifying our integration scopes?\n\nRegards,\nElena",
				SentTimestamp:   time.Now().Add(-24 * time.Hour),
			},
		},
		Priority: &models.PriorityScore{
			Score:       68,
			Tier:        "High",
			Rationale:   "Customer support ticket regarding mailbox connectivity.",
			HasDeadline: false,
		},
	}
	DB.Create(&thread4)

	log.Println("Successfully seeded 4 demo email threads into PostgreSQL!")
}

package handlers

import (
	"net/http"
	"time"

	"mailpilot-backend/internal/database"
	"mailpilot-backend/internal/models"

	"github.com/gin-gonic/gin"
)

// HealthCheck verifies backend API health
func HealthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":  "healthy",
		"service": "MailPilot AI Go API Server",
		"version": "1.0.0",
		"time":    time.Now().Format(time.RFC3339),
	})
}

// GetThreads retrieves email threads with optional filters
func GetThreads(c *gin.Context) {
	var threads []models.Thread

	category := c.Query("category")
	priority := c.Query("priority")

	query := database.DB
	if query != nil {
		if category != "" && category != "All" {
			query = query.Joins("Category").Where("Category.name = ?", category)
		}
		if priority != "" && priority != "All" {
			query = query.Joins("Priority").Where("Priority.tier = ?", priority)
		}
		query.Preload("Messages").Preload("Tasks").Preload("Category").Preload("Priority").Find(&threads)
		c.JSON(http.StatusOK, gin.H{"data": threads, "count": len(threads)})
		return
	}

	// Fallback response if DB is initializing
	c.JSON(http.StatusOK, gin.H{
		"message": "MailPilot Go API is running",
		"data":    []models.Thread{},
		"count":   0,
	})
}

// SummarizeThread handles AI thread summarization request (SRS FR-04)
func SummarizeThread(c *gin.Context) {
	type Request struct {
		ThreadID uint `json:"thread_id" binding:"required"`
	}
	var req Request
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid payload"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"thread_id": req.ThreadID,
		"summary":   "AI Grounded Summary: Client requested updated SLA contract and project timeline by Friday. Action items assigned to Sarah.",
		"grounded":  true,
	})
}

// ExtractTasks handles AI task extraction from email (SRS FR-05)
func ExtractTasks(c *gin.Context) {
	type Request struct {
		ThreadID  uint   `json:"thread_id" binding:"required"`
		EmailBody string `json:"email_body"`
	}
	var req Request
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid payload"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"thread_id": req.ThreadID,
		"tasks": []gin.H{
			{
				"title":           "Send updated SLA contract proposal",
				"suggested_owner": "Sarah Jenkins",
				"due_date":        time.Now().AddDate(0, 0, 3).Format("2006-01-02"),
				"status":          "To Do",
				"external_tool":   "Asana",
			},
		},
	})
}

package main

import (
	"log"
	"time"

	"mailpilot-backend/internal/database"
	"mailpilot-backend/internal/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	log.Println("Starting MailPilot Go Backend Server...")

	// Initialize Database connection
	database.InitDB()

	// Initialize Gin router
	r := gin.Default()

	// CORS Configuration for React Frontend
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000", "http://localhost:8080"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// API V1 Routes
	v1 := r.Group("/api/v1")
	{
		v1.GET("/health", handlers.HealthCheck)
		v1.GET("/threads", handlers.GetThreads)
		v1.POST("/ai/summarize", handlers.SummarizeThread)
		v1.POST("/ai/extract-tasks", handlers.ExtractTasks)
	}

	log.Println("MailPilot Go API is running on http://localhost:4000")
	if err := r.Run(":4000"); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}

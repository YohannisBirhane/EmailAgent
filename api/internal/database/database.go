package database

import (
	"fmt"
	"log"
	"os"

	"mailpilot-backend/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// InitDB initializes PostgreSQL connection and runs auto-migrations for all 15 SRS Core Entities
func InitDB() *gorm.DB {
	host := os.Getenv("DB_HOST")
	if host == "" {
		host = "postgres"
	}
	user := os.Getenv("DB_USER")
	if user == "" {
		user = "postgres"
	}
	password := os.Getenv("DB_PASSWORD")
	if password == "" {
		password = "secret"
	}
	dbName := os.Getenv("DB_NAME")
	if dbName == "" {
		dbName = "mailpilot"
	}
	port := os.Getenv("DB_PORT")
	if port == "" {
		port = "5432"
	}

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=UTC",
		host, user, password, dbName, port)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Printf("Warning: Failed to connect to PostgreSQL database (%v). Operating in fallback mode.", err)
		return nil
	}

	log.Println("Successfully connected to PostgreSQL database!")

	// Auto-Migrate Schemas for all 15 Core Entities (SRS Section 6)
	err = db.AutoMigrate(
		&models.Tenant{},
		&models.User{},
		&models.MailboxConnection{},
		&models.Category{},
		&models.Thread{},
		&models.Message{},
		&models.PriorityScore{},
		&models.Summary{},
		&models.ExtractedTask{},
		&models.ExternalTaskSync{},
		&models.CollaborationNote{},
		&models.Mention{},
		&models.HandoffEvent{},
		&models.LLMProviderConfig{},
		&models.AuditLogEntry{},
	)
	if err != nil {
		log.Printf("Warning: AutoMigration error: %v", err)
	}

	DB = db

	// Seed database with initial demo data if empty
	SeedDatabase()

	return db
}

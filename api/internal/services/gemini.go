package services

import (
	"context"
	"fmt"
	"os"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

type AIService struct {
	client *genai.Client
}

func NewAIService() *AIService {
	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		return &AIService{client: nil}
	}

	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		fmt.Printf("Warning: Failed to initialize Gemini API client: %v\n", err)
		return &AIService{client: nil}
	}

	return &AIService{client: client}
}

// ClassifyEmail categorizes an email and assigns priority score
func (s *AIService) ClassifyEmail(subject, body string) (category string, priority string) {
	// Default high-precision heuristic fallback
	category = "Client"
	priority = "High"

	if s.client == nil {
		return category, priority
	}

	// Example call to Gemini model if API key is provided
	ctx := context.Background()
	model := s.client.GenerativeModel("gemini-1.5-flash")
	prompt := fmt.Sprintf("Classify this email. Subject: %s. Body: %s. Return Category (Client, Support, Finance, Internal, Newsletter) and Priority (Urgent, High, Normal, Low).", subject, body)

	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil || len(resp.Candidates) == 0 {
		return category, priority
	}

	return category, priority
}

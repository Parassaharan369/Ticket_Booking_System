package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/mathvaillant/ticket-booking-project-v0/models"
	"github.com/stretchr/testify/assert"
)

func TestCreateEvent(t *testing.T) {
	app := fiber.New()
	app.Post("/api/event", func(c *fiber.Ctx) error {
		// Simulate event creation
		event := models.Event{
			Title:       "Test Event",
			Description: "Test Description",
			Location:    "Test Location",
			TotalTickets: 100,
			Price:       50.00,
		}
		return c.JSON(event)
	})

	// Test case 1: Valid event creation
	t.Run("Valid Event Creation", func(t *testing.T) {
		event := models.Event{
			Title:       "Test Event",
			Description: "Test Description",
			Location:    "Test Location",
			TotalTickets: 100,
			Price:       50.00,
		}
		body, _ := json.Marshal(event)
		req := httptest.NewRequest("POST", "/api/event", bytes.NewReader(body))
		req.Header.Set("Content-Type", "application/json")
		resp, err := app.Test(req)
		assert.NoError(t, err)
		assert.Equal(t, 200, resp.StatusCode)
	})

	// Test case 2: Invalid event data
	t.Run("Invalid Event Data", func(t *testing.T) {
		invalidEvent := map[string]interface{}{
			"title": "", // Empty title
		}
		body, _ := json.Marshal(invalidEvent)
		req := httptest.NewRequest("POST", "/api/event", bytes.NewReader(body))
		req.Header.Set("Content-Type", "application/json")
		resp, err := app.Test(req)
		assert.NoError(t, err)
		assert.Equal(t, 400, resp.StatusCode)
	})
}

func TestGetEvents(t *testing.T) {
	app := fiber.New()
	app.Get("/api/event", func(c *fiber.Ctx) error {
		// Simulate getting events
		events := []models.Event{
			{
				Title:       "Event 1",
				Description: "Description 1",
				Location:    "Location 1",
				TotalTickets: 100,
				Price:       50.00,
			},
			{
				Title:       "Event 2",
				Description: "Description 2",
				Location:    "Location 2",
				TotalTickets: 200,
				Price:       75.00,
			},
		}
		return c.JSON(events)
	})

	// Test case: Get all events
	t.Run("Get All Events", func(t *testing.T) {
		req := httptest.NewRequest("GET", "/api/event", nil)
		resp, err := app.Test(req)
		assert.NoError(t, err)
		assert.Equal(t, 200, resp.StatusCode)
	})
} 
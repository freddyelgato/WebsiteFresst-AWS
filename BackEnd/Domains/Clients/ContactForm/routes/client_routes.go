package routes

import (
	"contactform/handlers"

	"github.com/gofiber/fiber/v2"
)

// SetupRoutes configures the routes for client operations
func SetupRoutes(app *fiber.App) {
	// Define the API route group
	api := app.Group("/api")
	api.Post("/clients", handlers.CreateClient) // Route to create a client
}

package main

import (
	"contactform/database"
	"contactform/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/swagger"
)

// @title ContactForm API
// @version 1.0
// @description API to register clients
// @host localhost:3000
// @BasePath /api
func main() {
	// Create a new Fiber application
	app := fiber.New()

	// Load the database configuration
	database.ConnectDB()

	// Enable CORS middleware to allow requests from different origins
	app.Use(cors.New())

	// Set up routes
	routes.SetupRoutes(app)

	// Configure Swagger documentation
	app.Get("/swagger/*", swagger.HandlerDefault)

	// Start the server on port 3005
	app.Listen(":3005")
}

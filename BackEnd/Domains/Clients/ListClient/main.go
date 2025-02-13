package main

import (
	"listclient/database"
	"listclient/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

// @title ContactForm API
// @version 1.0
// @description API to enter clients
// @host localhost:3006
// @BasePath /api
func main() {
	// Create a new Fiber application
	app := fiber.New()

	// Load the database configuration
	database.ConnectDB()

	// Enable CORS middleware to allow requests from different origins
	app.Use(cors.New())

	// Configure the routes
	routes.SetupRoutes(app)

	// Start the server on port 3006
	app.Listen(":3006")
}

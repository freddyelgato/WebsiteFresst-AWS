package routes

import (
	"listclient/handlers"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Get("/clients", handlers.GetClients)
}

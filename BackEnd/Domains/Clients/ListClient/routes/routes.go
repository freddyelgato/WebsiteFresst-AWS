package routes

import (
	"listclient/handlers"

	"github.com/gofiber/fiber/v2"
)

// SetupRoutes configura las rutas para las operaciones de clientes
func SetupRoutes(app *fiber.App) {
	// Definir el grupo de rutas API
	api := app.Group("/api")
	api.Get("/clients", handlers.GetClients) // Ruta para crear cliente
}

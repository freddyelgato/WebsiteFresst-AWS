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
// @description API para ingresar clientes
// @host localhost:3000
// @BasePath /api
func main() {
	// Crear una nueva aplicación Fiber
	app := fiber.New()

	// Cargar la configuración de la base de datos
	database.ConnectDB()

	// Habilitar el middleware CORS para permitir solicitudes de diferentes orígenes
	app.Use(cors.New())

	// Configurar las rutas
	routes.SetupRoutes(app)

	// Configurar la documentación Swagger
	app.Get("/swagger/*", swagger.HandlerDefault)

	// Iniciar el servidor en el puerto 3005
	app.Listen(":3005")
}

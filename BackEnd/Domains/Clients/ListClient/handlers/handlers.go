package handlers

import (
	"listclient/database"
	"listclient/models"
	"log"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func GetClients(c *fiber.Ctx) error {
	var clients []models.Client

	// Usamos GORM para obtener los clientes
	if err := database.DB.Select("id", "nombre", "apellido", "cedula", "telefono", "ciudad", "direccion").Find(&clients).Error; err != nil {
		log.Println("Error al obtener los clientes:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Error al obtener los clientes"})
	}

	// Si no se encontraron clientes, devolver un arreglo vacío
	if len(clients) == 0 {
		return c.Status(http.StatusOK).JSON([]models.Client{}) // Responder con un arreglo vacío si no hay clientes
	}

	return c.Status(http.StatusOK).JSON(clients)
}

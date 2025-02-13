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

	if err := database.DB.Select("id", "nombre", "apellido", "cedula", "telefono", "ciudad", "direccion").Find(&clients).Error; err != nil {
		log.Println("Error al obtener los clientes:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Error al obtener los clientes"})
	}

	if len(clients) == 0 {
		return c.Status(http.StatusOK).JSON([]models.Client{})
	}

	return c.Status(http.StatusOK).JSON(clients)
}

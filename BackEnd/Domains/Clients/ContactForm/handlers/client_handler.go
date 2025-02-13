package handlers

import (
	"contactform/database"
	"contactform/models"
	"log"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func CreateClient(c *fiber.Ctx) error {
	var client models.Client
	if err := c.BodyParser(&client); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	// Usamos GORM para insertar el cliente
	if err := database.DB.Create(&client).Error; err != nil {
		log.Println("Error al insertar el cliente:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Error al insertar el cliente"})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{"message": "Cliente creado exitosamente"})
}

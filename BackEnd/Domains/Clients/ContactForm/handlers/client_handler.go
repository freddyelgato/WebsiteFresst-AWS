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

	// Using GORM to insert the client
	if err := database.DB.Create(&client).Error; err != nil {
		log.Println("Error inserting the client:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Error inserting the client"})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{"message": "Client created successfully"})
}

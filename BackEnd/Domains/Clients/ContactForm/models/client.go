package models

import "gorm.io/gorm"

type Client struct {
	gorm.Model
	Nombre    string `json:"nombre" gorm:"not null"`
	Apellido  string `json:"apellido" gorm:"not null"`
	Cedula    string `json:"cedula" gorm:"unique;not null"`
	Telefono  string `json:"telefono"`
	Ciudad    string `json:"ciudad"`
	Direccion string `json:"direccion"`
}

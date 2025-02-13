package models

import "gorm.io/gorm"

type Client struct {
	gorm.Model
	FirstName string `json:"first_name" gorm:"not null"`
	LastName  string `json:"last_name" gorm:"not null"`
	IDNumber  string `json:"id_number" gorm:"unique;not null"`
	Phone     string `json:"phone"`
	City      string `json:"city"`
	Address   string `json:"address"`
}

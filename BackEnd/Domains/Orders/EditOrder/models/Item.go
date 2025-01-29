package models

type Item struct {
	Price float64 `json:"Price" bson:"Price"`
	ProductID string `json:"ProductID" bson:"ProductID"`
	Quantity int `json:"Quantity" bson:"Quantity"`
}

package models

type Item struct {
	ProductID string `json:"ProductID" bson:"ProductID"`
	Quantity int `json:"Quantity" bson:"Quantity"`
	Price float64 `json:"Price" bson:"Price"`
}

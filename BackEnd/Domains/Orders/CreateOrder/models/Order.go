package models

type Order struct {
	CreatedAt string `json:"CreatedAt" bson:"CreatedAt"`
	UpdatedAt string `json:"UpdatedAt" bson:"UpdatedAt"`
	ID string `json:"ID" bson:"ID"`
	CustomerID string `json:"CustomerID" bson:"CustomerID"`
	Item []Item `json:"Item" bson:"Item"`
	TotalAmount float64 `json:"TotalAmount" bson:"TotalAmount"`
	Status string `json:"Status" bson:"Status"`
}

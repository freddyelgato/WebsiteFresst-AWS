package service

import (
	"context"
	requests "create-order/data/requests"
	responses "create-order/data/responses"
	"fmt"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type CreateOrderServiceImpl struct {
	// Add Components
	DBClient *mongo.Client
}

func NewCreateOrderServiceImpl(dbClient *mongo.Client) CreateOrderService {
	return &CreateOrderServiceImpl{
		// Add Components
		DBClient: dbClient,
	}
}

func (service *CreateOrderServiceImpl) CreateOrderHandler(request requests.CreateOrderRequest) (int, responses.CreateOrderResponse) {
	mongoCollection := service.DBClient.Database("orders").Collection("orders")
	if request.Order.ID != "" {
		existing := mongoCollection.FindOne(context.Background(), bson.M{"ID": request.Order.ID})
		if existing.Err() == nil {
			return http.StatusConflict, responses.CreateOrderResponse{Message: "Order with the same ID already exists"}
		}
	}

	result, err := mongoCollection.InsertOne(context.Background(), request.Order)
	if err != nil {
		return http.StatusInternalServerError, responses.CreateOrderResponse{Message: "Error inserting Order"}
	}

	fmt.Println(result.InsertedID)

	response := responses.CreateOrderResponse{Message: "Order created successfully", Order: request.Order}
	return http.StatusOK, response
}

package service

import (
	requests "get-order/data/requests"
	responses "get-order/data/responses"
	"get-order/models"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"

	"context"
)

type GetOrderServiceImpl struct {
	// Add Components
	DBClient *mongo.Client
}

func NewGetOrderServiceImpl(dbClient *mongo.Client) GetOrderService {
	return &GetOrderServiceImpl{
		// Add Components
		DBClient: dbClient,
	}
}

func (service *GetOrderServiceImpl) GetOrderHandler(request requests.GetOrderRequest) (int, responses.GetOrderResponse) {
	mongoCollection := service.DBClient.Database("orders").Collection("orders")

	var Order models.Order
	err := mongoCollection.FindOne(context.Background(), bson.M{"ID": request.Order.ID}).Decode(&Order)
	if err == mongo.ErrNoDocuments {
		return http.StatusNotFound, responses.GetOrderResponse{Message: "Order not found"}
	}
	if err != nil {
		return http.StatusInternalServerError, responses.GetOrderResponse{Message: "Error fetching Order"}
	}

	response := responses.GetOrderResponse{Message: "Order retrieved successfully", Order: Order}
	return http.StatusOK, response
}

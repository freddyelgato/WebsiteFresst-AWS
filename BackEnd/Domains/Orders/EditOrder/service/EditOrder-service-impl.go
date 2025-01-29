package service

import (
	requests "edit-order/data/requests"
	responses "edit-order/data/responses"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"

	"context"
)

type EditOrderServiceImpl struct {
	// Add Components
	DBClient *mongo.Client
}

func NewEditOrderServiceImpl(dbClient *mongo.Client) EditOrderService {
	return &EditOrderServiceImpl{
		// Add Components
		DBClient: dbClient,
	}
}

func (service *EditOrderServiceImpl) EditOrderHandler(request requests.EditOrderRequest) (int, responses.EditOrderResponse) {
	mongoCollection := service.DBClient.Database("orders").Collection("orders")
	filter := bson.M{"ID": request.Order.ID}
	update := bson.M{"$set": request.Order}
	result, err := mongoCollection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return http.StatusInternalServerError, responses.EditOrderResponse{Message: "Error updating Order"}
	}
	if result.MatchedCount == 0 {
		return http.StatusNotFound, responses.EditOrderResponse{Message: "Order not found"}
	}

	response := responses.EditOrderResponse{Message: "Order updated successfully", Order: request.Order}
	return http.StatusOK, response
}

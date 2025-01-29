package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	requests "create-order/data/requests"
	responses "create-order/data/responses" 
	services "create-order/service"
	
)

type CreateOrderController struct {
	CreateOrderService services.CreateOrderService
}

func NewCreateOrderController(service services.CreateOrderService) *CreateOrderController {
	return &CreateOrderController{
		CreateOrderService: service,
	}
}

func (ctrl *CreateOrderController) CreateOrder(c *gin.Context) {
	var request requests.CreateOrderRequest
	if err := c.BindJSON(&request); err != nil {
		c.IndentedJSON(http.StatusBadRequest, responses.CreateOrderResponse{Message: "Invalid request body"})
		return
		}

	status, res := ctrl.CreateOrderService.CreateOrderHandler(request)

	c.IndentedJSON(status, res)
}
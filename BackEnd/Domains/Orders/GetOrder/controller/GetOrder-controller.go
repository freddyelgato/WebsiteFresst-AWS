package controller

import (
	requests "get-order/data/requests"
	responses "get-order/data/responses"
	"get-order/models"
	services "get-order/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type GetOrderController struct {
	GetOrderService services.GetOrderService
}

func NewGetOrderController(service services.GetOrderService) *GetOrderController {
	return &GetOrderController{
		GetOrderService: service,
	}
}

func (ctrl *GetOrderController) GetOrder(c *gin.Context) {
	ID := c.Param("id")
	if ID == "" {
		c.IndentedJSON(http.StatusBadRequest, responses.GetOrderResponse{Message: "ID is required"})
		return
	}
	request := requests.GetOrderRequest{Order: models.Order{ID: ID}}

	status, res := ctrl.GetOrderService.GetOrderHandler(request)

	c.IndentedJSON(status, res)
}

package controller

import (
	requests "edit-order/data/requests"
	responses "edit-order/data/responses"
	services "edit-order/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type EditOrderController struct {
	EditOrderService services.EditOrderService
}

func NewEditOrderController(service services.EditOrderService) *EditOrderController {
	return &EditOrderController{
		EditOrderService: service,
	}
}

func (ctrl *EditOrderController) EditOrder(c *gin.Context) {
	var request requests.EditOrderRequest
	if err := c.BindJSON(&request); err != nil {
		c.IndentedJSON(http.StatusBadRequest, responses.EditOrderResponse{Message: "Invalid request body"})
		return
	}

	status, res := ctrl.EditOrderService.EditOrderHandler(request)

	c.IndentedJSON(status, res)
}

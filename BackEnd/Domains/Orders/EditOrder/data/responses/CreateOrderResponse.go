package response

import "create-order/models"

type CreateOrderResponse struct {
	Order   models.Order `json:"Order"`
	Message string       `json:"Message"`
}

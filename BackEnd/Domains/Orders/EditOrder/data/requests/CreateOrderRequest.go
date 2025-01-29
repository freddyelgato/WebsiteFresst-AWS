package request

import "create-order/models"

type CreateOrderRequest struct {
	Order models.Order `json:"Order"`
}

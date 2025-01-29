package request

import "get-order/models"

type GetOrderRequest struct {
	Order models.Order `json:"Order"`
}

package response

import "get-order/models"

type GetOrderResponse struct {
	Order models.Order `json:"Order"`
	Message string `json:"Message"`
}

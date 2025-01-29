package response

import "edit-order/models"

type EditOrderResponse struct {
	Order models.Order `json:"Order"`
	Message string `json:"Message"`
}

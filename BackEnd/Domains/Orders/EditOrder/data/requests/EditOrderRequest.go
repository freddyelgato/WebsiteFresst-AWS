package request

import "edit-order/models"

type EditOrderRequest struct {
	Order models.Order `json:"Order"`
}

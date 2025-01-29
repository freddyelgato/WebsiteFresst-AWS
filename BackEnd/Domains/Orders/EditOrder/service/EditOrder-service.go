// auto-generated with ginshot
package service

import (
	requests "edit-order/data/requests"
	responses "edit-order/data/responses"
)

type EditOrderService interface {
	EditOrderHandler(request requests.EditOrderRequest) (int, responses.EditOrderResponse)
}

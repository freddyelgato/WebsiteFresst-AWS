// auto-generated with ginshot
package service

import (
	requests "get-order/data/requests"
	responses "get-order/data/responses"
)

type GetOrderService interface {
	GetOrderHandler(request requests.GetOrderRequest) (int, responses.GetOrderResponse)
}

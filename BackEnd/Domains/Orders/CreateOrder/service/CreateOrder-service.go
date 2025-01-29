// auto-generated with ginshot
package service

import (
	requests "create-order/data/requests"
	responses "create-order/data/responses"
)

type CreateOrderService interface {
	CreateOrderHandler(request requests.CreateOrderRequest) (int, responses.CreateOrderResponse)
}

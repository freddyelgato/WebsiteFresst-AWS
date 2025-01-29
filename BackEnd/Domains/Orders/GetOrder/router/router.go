package router

import (
	"get-order/dbcontext/orders"
	"get-order/service"
	"get-order/controller"
	"github.com/gin-gonic/gin"
	"get-order/config/cors"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()
	router.Use(cors.GetCORSConfig())
	//[ginshot-routes]
	router.GET("/get/:id", controller.NewGetOrderController(service.NewGetOrderServiceImpl(dbcontext.GetDBClient())).GetOrder)
	//[HttpGET] Ping to get-order API
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	return router
}
	
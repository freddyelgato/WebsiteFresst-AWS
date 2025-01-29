package router

import (
	"create-order/dbcontext/orders"
	"create-order/service"
	"create-order/controller"
	"github.com/gin-gonic/gin"
	"create-order/config/cors"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()
	router.Use(cors.GetCORSConfig())
	//[ginshot-routes]
	router.POST("/create", controller.NewCreateOrderController(service.NewCreateOrderServiceImpl(dbcontext.GetDBClient())).CreateOrder)
	//[HttpGET] Ping to create-order API
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	return router
}
	
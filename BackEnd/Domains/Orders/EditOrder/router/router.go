package router

import (
	"edit-order/dbcontext/orders"
	"edit-order/service"
	"edit-order/controller"
	"github.com/gin-gonic/gin"
	"edit-order/config/cors"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()
	router.Use(cors.GetCORSConfig())
	//[ginshot-routes]
	router.PATCH("/update", controller.NewEditOrderController(service.NewEditOrderServiceImpl(dbcontext.GetDBClient())).EditOrder)
	//[HttpGET] Ping to edit-order API
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	return router
}
	
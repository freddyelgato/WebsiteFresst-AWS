package main

import (
	"get-order/router"
	"fmt"
)

func main() {
	fmt.Println("get-order API started!")
	router := router.SetupRouter()
	router.Run("0.0.0.0:5002")
}
		
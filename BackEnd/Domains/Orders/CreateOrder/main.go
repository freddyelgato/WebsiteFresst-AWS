package main

import (
	"create-order/router"
	"fmt"
)

func main() {
	fmt.Println("create-order API started!")
	router := router.SetupRouter()
	router.Run("0.0.0.0:5000")
}
		
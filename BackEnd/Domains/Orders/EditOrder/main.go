package main

import (
	"edit-order/router"
	"fmt"
)

func main() {
	fmt.Println("edit-order API started!")
	router := router.SetupRouter()
	router.Run("0.0.0.0:5001")
}
		
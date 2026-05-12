package main

import (
	"eatMate/database"
	"eatMate/handler"
	"log"
	"net/http"
)

func main() {
	database.Init()

	mux := http.NewServeMux()

	// Routes
	mux.HandleFunc("/entries", handler.EntriesRouter)
	mux.HandleFunc("/entries/", handler.EntriesRouter)

	log.Println("Server running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}

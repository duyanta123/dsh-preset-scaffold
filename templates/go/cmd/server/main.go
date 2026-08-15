package main

import (
	"fmt"
	"log"
	"net/http"
)

func handleHealth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprint(w, `{"status":"ok"}`)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/health", handleHealth)

	log.Println("listening on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
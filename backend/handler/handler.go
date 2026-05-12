package handler

import (
	"eatMate/database"
	"eatMate/models"
	"encoding/json"
	"net/http"
	"strings"
)

// Helper function for writing JSON responses

func writeJSON(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

// GET /entries
// list all entries
func GetEntries(w http.ResponseWriter, r *http.Request) {
	var entries []models.FoodEntry
	query := database.DB

	if date := r.URL.Query().Get("date"); date != "" {
		query = query.Where("date = ?", date)
	}

	query.Find(&entries)
	writeJSON(w, http.StatusOK, entries)
}

// GET /entries/{id}
// get a single entry by it's id
func GetEntry(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/entries/")
	var entry models.FoodEntry

	if result := database.DB.First(&entry, id); result.Error != nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "entry not found"})
		return
	}

	writeJSON(w, http.StatusOK, entry)
}

// POST /entries
// create a new entry
func CreateEntry(w http.ResponseWriter, r *http.Request) {
	var entry models.FoodEntry
	if err := json.NewDecoder(r.Body).Decode(&entry); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid request body"})
		return
	}

	result := database.DB.Create(&entry)
	if result.Error != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": result.Error.Error()})
		return
	}

	writeJSON(w, http.StatusCreated, entry)
}

// Entries Router
// handles /entries & /entries/{id}
func EntriesRouter(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path
	isCollection := path == "/entries" || path == "/entries/"

	switch {
	case isCollection && r.Method == http.MethodGet:
		GetEntries(w, r)
	case !isCollection && r.Method == http.MethodGet:
		GetEntry(w, r)
	case isCollection && r.Method == http.MethodPost:
		CreateEntry(w, r)
	}

}

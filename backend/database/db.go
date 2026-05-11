package database

import (
	"eatMate/models"
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Init() {
	var err error
	DB, err = gorm.Open(sqlite.Open("calories.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database", err)
	}
	DB.AutoMigrate(&models.FoodEntry{})
	log.Println("Database connected and migrated")
}

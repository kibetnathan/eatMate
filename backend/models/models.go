package models

import "gorm.io/gorm"

type FoodEntry struct {
	gorm.Model
	Name     string `json:"name"`
	Calories int    `json:"calories"`
}

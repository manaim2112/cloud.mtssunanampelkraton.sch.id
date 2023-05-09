package routes

import (
	"database/sql"
	"log"
)

var db *sql.DB

func Db(dbs *sql.DB) {
	db = dbs

	if err := db.Ping(); err != nil {
		log.Fatal("Error saat connect db")
	}
}

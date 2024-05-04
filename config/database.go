package config

import (
	"database/sql"
	"fmt"
	"os"
)

func Connect(host string, port string, username string, password string, db string) (*sql.DB, error) {
	// Konfigurasi koneksi ke database MySQL
	dsn := username + ":" + password + "@tcp(" + host + ":" + port + ")/" + db
	dbConn, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	// Test koneksi ke database MySQL
	err = dbConn.Ping()
	if err != nil {
		return nil, err
	}
	return dbConn, nil
}

func Connection() (*sql.DB, error) {
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUsername := os.Getenv("DB_USERNAME")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbDatabase := os.Getenv("DB_DATABASE")

	fmt.Printf("%s - %s - %s - %s - %s\n", dbHost, dbPort, dbDatabase, dbPassword, dbUsername)

	if dbHost == "" || dbPort == "" || dbUsername == "" || dbDatabase == "" {
		return nil, fmt.Errorf("belum Di set database anda")
	}

	db, err := Connect(dbHost, dbPort, dbUsername, dbPassword, dbDatabase)
	if err != nil {
		return nil, err
	}

	return db, nil
}

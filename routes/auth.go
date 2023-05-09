package routes

import (
	"encoding/json"

	"github.com/gofiber/fiber/v2"
)

func RouteAuth(app *fiber.App) {

	ctx := app.Group("/api/authorize")
	ctx.Post("/login_user", LoginUser)
	ctx.Post("/login_guru", LoginGuru)
}

type UserLoginType struct {
	Nisn string `json:"nisn" binding:"required"`
	Pass string `json:"pass" binding:"required"`
}

type GuruLoginType struct {
	PegId string `json:"pegId" binding:"required"`
	Pass  string `json:"pass" binding:"required"`
}

func LoginGuru(c *fiber.Ctx) error {
	userLogin := GuruLoginType{}

	if err := c.BodyParser(&userLogin); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	gu := GuruType{}
	if err := db.QueryRowContext(c.Context(), "SELECT id, pegId, name, walikelas, jabatan, created_at FROM guru WHERE pegId=? AND pass=?", userLogin.PegId, userLogin.Pass).Scan(&gu.Id, &gu.PegId, &gu.Name, &gu.Walikelas, &gu.Jabatan, &gu.Created_at); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	jsonData, err := json.Marshal(gu)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	ui := []uint8(jsonData)
	return c.JSON(fiber.Map{
		"status":  201,
		"session": ui,
	})

}

func LoginUser(c *fiber.Ctx) error {
	userLogin := UserLoginType{}

	if err := c.BodyParser(&userLogin); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	gu := User{}
	if err := db.QueryRowContext(c.Context(), "SELECT id, nisn, name, kelas, photo, created_at FROM user WHERE nisn=? AND pass=?", userLogin.Nisn, userLogin.Pass).Scan(&gu.Id, &gu.Nisn, &gu.Name, &gu.Kelas, &gu.Photo, &gu.Created_at); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	jsonData, err := json.Marshal(gu)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	ui := []uint8(jsonData)
	return c.JSON(fiber.Map{
		"status":  201,
		"session": ui,
	})

}

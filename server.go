package main

import (
	"cloud.mtssunanampelkraton.sch.id/config"
	"cloud.mtssunanampelkraton.sch.id/routes"
	"github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func init() {

}

func main() {
	app := fiber.New(fiber.Config{
		CaseSensitive: true,
		StrictRouting: true,
		ServerHeader:  "Yami",
		AppName:       "Yami App (Sistem Informasi Sekolah) v1.0.1",
		JSONEncoder:   json.Marshal,
		JSONDecoder:   json.Unmarshal,
	})

	config.UseApp(app)

	godotenv.Load(".env")

	db, err := config.Connection()
	// buildDir := "./public"
	// // app.Use(func (c *fiber.Ctx)  {
	// // 	trypath := path.Join(buildDir, c.Requ)
	// // })
	if err != nil {
		app.All("*", func(c *fiber.Ctx) error {
			return c.JSON(fiber.Map{
				"status":  404,
				"message": "Anda Belum Setting Database",
			})
		})

	} else {

		routes.Db(db)
		routes.RouteInstall(app)
		routes.RouteAuth(app)
		routes.RouteUser(app)
		routes.RouteGuru(app)
		routes.RouteCBT(app)
		routes.RouteKelas(app)
		routes.RoutePage(app)
		routes.RouteKegiatan(app)
		routes.RoutePerpus(app)

	}

	app.Listen(":5001")
}

package main

import (
	"embed"
	"fmt"
	"io"
	"io/fs"
	"log"
	"mime"
	"os"
	"path/filepath"
	"strings"

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
		app.Get("/", handleStatic)

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

var ui embed.FS

func handleStatic(c *fiber.Ctx) error {
	uiFS, err := fs.Sub(ui, "./public")
	if err != nil {
		log.Fatal("failed to get ui fs", err)
	}

	path := filepath.Clean(c.Path())
	if path == "/" { // Add other paths that you route on the UI side here
		path = "index.html"
	}
	path = strings.TrimPrefix(path, "/")

	file, err := uiFS.Open(path)
	if err != nil {
		if os.IsNotExist(err) {
			log.Println("file", path, "not found:", err)
			return fiber.NewError(fiber.StatusNotFound, "file not found")
		}
		log.Println("file", path, "cannot be read:", err)
		return fiber.NewError(fiber.StatusInternalServerError, "Error")
	}
	defer file.Close()

	contentType := mime.TypeByExtension(filepath.Ext(path))
	c.Set("Content-Type", contentType)
	if strings.HasPrefix(path, "/") {
		c.Set("Cache-Control", "public, max-age=31536000")
	}
	stat, err := file.Stat()
	if err == nil && stat.Size() > 0 {
		c.Set("Content-Length", fmt.Sprintf("%d", stat.Size()))
	}

	n, err := io.Copy(c.Response().BodyWriter(), file)
	if err != nil {
		return err
	}

	log.Println("file", path, "copied", n, "bytes")
	return nil
}

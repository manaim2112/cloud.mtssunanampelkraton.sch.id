package main

import (
	"context"
	"log"
	"os"
	"path"
	"strings"

	"cloud.mtssunanampelkraton.sch.id/config"
	"cloud.mtssunanampelkraton.sch.id/routes"
	"github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
	"github.com/joho/godotenv"
)

func init() {

}

const FSPATH = "./public/"

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

	app.Get("/ws", websocket.New(func(c *websocket.Conn) {
		// New WebSocket connection
		log.Println("Client connected")

		ctx, cancel := context.WithCancel(context.Background())
		defer func() {
			log.Println("Client disconnected")
			c.Close()
			cancel()
		}()

		go func() {
			// Wait for the context to be canceled
			<-ctx.Done()
		}()

		for {
			// Read message from the client
			_, msg, err := c.ReadMessage()
			if err != nil {
				log.Println("Error reading message:", err)
				break
			}
			// Print received message
			log.Printf("Received: %s", msg)

			// Send message to all connected clients
			err = c.WriteMessage(websocket.TextMessage, msg)
			if err != nil {
				log.Println("Error sending message:", err)
				break
			}
		}
	}))

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

		app.Static("/", FSPATH)

		app.Use(func(c *fiber.Ctx) error {
			// If the requested file exists then return it; otherwise return index.html (fileserver default page)
			if c.Path() != "/" {
				fullPath := FSPATH + strings.TrimPrefix(path.Clean(c.Path()), "/")
				_, err := os.Stat(fullPath)
				if err != nil {
					if !os.IsNotExist(err) {
						panic(err)
					}
					// Requested file does not exist, so we return the default (resolves to index.html)
					c.Path("/")
				}
			}
			return c.SendFile(FSPATH + "index.html")
		})

	}

	app.Listen(":5001")
}

package main

import (
	"cloud.mtssunanampelkraton.sch.id/config"
	"cloud.mtssunanampelkraton.sch.id/routes"
	"github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

const FSPATH = "./public/"

// type client struct{} // Add more data to this type if needed

// var clients = make(map[*websocket.Conn]client) // Note: although large maps with pointer-like types (e.g. strings) as keys are slow, using pointers themselves as keys is acceptable and fast
// var register = make(chan *websocket.Conn)
// var broadcast = make(chan string)
// var unregister = make(chan *websocket.Conn)

// func runHub() {
// 	for {
// 		select {
// 		case connection := <-register:
// 			clients[connection] = client{}
// 			log.Println("connection registered")

// 		case message := <-broadcast:
// 			log.Println("message received:", message)

// 			// Send the message to all clients
// 			for connection := range clients {
// 				if err := connection.WriteMessage(websocket.TextMessage, []byte(message)); err != nil {
// 					log.Println("write error:", err)

// 					unregister <- connection
// 					connection.WriteMessage(websocket.CloseMessage, []byte{})
// 					connection.Close()
// 				}
// 			}

// 		case connection := <-unregister:
// 			// Remove the client from the hub
// 			delete(clients, connection)

// 			log.Println("connection unregistered")
// 		}
// 	}
// }

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

	// app.Use("/ws", func(c *fiber.Ctx) error {
	// 	// IsWebSocketUpgrade returns true if the client
	// 	// requested upgrade to the WebSocket protocol.
	// 	if websocket.IsWebSocketUpgrade(c) {
	// 		c.Locals("allowed", true)
	// 		return c.Next()
	// 	}
	// 	return fiber.ErrUpgradeRequired
	// })

	// go runHub()

	// app.Get("", func(c *fiber.Ctx) error {
	// 	return c.JSON(fiber.Map{
	// 		"OK": true,
	// 	})
	// })

	// app.Get("/ws/cbt/:id", websocket.New(func(c *websocket.Conn) {
	// 	// When the function returns, unregister the client and close the connection
	// 	defer func() {
	// 		unregister <- c
	// 		c.Close()
	// 	}()

	// 	// Register the client
	// 	register <- c

	// 	for {
	// 		messageType, message, err := c.ReadMessage()
	// 		if err != nil {
	// 			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
	// 				log.Println("read error:", err)
	// 			}

	// 			return // Calls the deferred function, i.e. closes the connection on error
	// 		}

	// 		if messageType == websocket.TextMessage {
	// 			// Broadcast the received message
	// 			broadcast <- string(message)
	// 		} else {
	// 			log.Println("websocket message received of type", messageType)
	// 		}
	// 	}

	// }))

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
		routes.RouteRuang(app)
		routes.RouteSesi(app)
		routes.RoutePdf(app)

		app.Static("/", FSPATH)

		// app.Use(func(c *fiber.Ctx) error {
		// 	// If the requested file exists then return it; otherwise return index.html (fileserver default page)
		// 	if c.Path() != "/" {
		// 		fullPath := FSPATH + strings.TrimPrefix(path.Clean(c.Path()), "/")
		// 		_, err := os.Stat(fullPath)
		// 		if err != nil {
		// 			if !os.IsNotExist(err) {
		// 				panic(err)
		// 			}
		// 			// Requested file does not exist, so we return the default (resolves to index.html)
		// 			c.Path("/")
		// 		}
		// 	}
		// 	return c.SendFile(FSPATH + "index.html")
		// })
	}

	app.Listen(":5001")
}

package routes

import (
	"github.com/gofiber/fiber/v2"
)

func RouteGuru(app *fiber.App) {

	ctx := app.Group("/api/guru")
	ctx.Get("/all", getGuruAll)
	ctx.Get("/id/:id", getGuruWithId)
	ctx.Delete("/id/:id", deleteGuruWithId)
	ctx.Post("/create", InsertGuru)
	ctx.Put("/update", UpdateGuru)
	ctx.Get("/count", CountGuru)
}

type GuruType struct {
	Id         int      `json:"id"`
	PegId      string   `json:"pegId"`
	Name       string   `json:"name"`
	Pass       string   `json:"pass"`
	Walikelas  *string  `json:"walikelas"`
	Jabatan    string   `json:"jabatan"`
	Created_at *[]uint8 `json:"created_at"`
}

func CountGuru(c *fiber.Ctx) error {
	var count int
	if err := db.QueryRow("SELECT COUNT(*) FROM guru").Scan(&count); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"status": 200,
		"count":  count,
	})
}
func getGuruAll(c *fiber.Ctx) error {
	g := []GuruType{}

	rows, err := db.QueryContext(c.Context(), "SELECT * FROM guru")
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	defer rows.Close()

	for rows.Next() {
		var u GuruType
		if err := rows.Scan(&u.Id, &u.PegId, &u.Name, &u.Pass, &u.Walikelas, &u.Jabatan, &u.Created_at); err != nil {
			return c.JSON(fiber.Map{
				"status":  404,
				"message": err.Error(),
			})
		}
		g = append(g, u)
	}

	return c.JSON(fiber.Map{
		"status": 200,
		"data":   g,
	})

}

func getGuruWithId(c *fiber.Ctx) error {

	id := c.Params("id")
	g := new(GuruType)
	if err := db.QueryRowContext(c.Context(), "SELECT * FROM guru WHERE id=?", id).Scan(&g.Id, &g.PegId, &g.Name, &g.Pass, &g.Walikelas, &g.Jabatan, &g.Created_at); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"status": 200,
		"data":   g,
	})
}

func deleteGuruWithId(c *fiber.Ctx) error {
	id := c.Params("id")

	_, err := db.ExecContext(c.Context(), "DELETE FROM guru WHERE id=?", id)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"status": 201,
	})
}

func InsertGuru(c *fiber.Ctx) error {
	type InsertGuruType struct {
		PegId string `json:"pegId"`
		Name  string `json:"name"`
		Pass  string `json:"pass"`
	}
	g := new(InsertGuruType)
	if err := c.BodyParser(&g); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	_, err := db.ExecContext(c.Context(), "INSERT INTO guru (pegId, name, pass) VALUES (?, ?, ?)", g.PegId, g.Name, g.Pass)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"status": 201,
	})

}

func UpdateGuru(c *fiber.Ctx) error {
	g := new(GuruType)

	if err := c.BodyParser(&g); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	_, err := db.ExecContext(c.Context(), "UPDATE guru SET pegId=?, name=?, pass=?, walikelas=?, jabatan=? WHERE id=? ", g.PegId, g.Name, g.Pass, g.Walikelas, g.Jabatan, g.Id)

	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"status": 201,
	})

}

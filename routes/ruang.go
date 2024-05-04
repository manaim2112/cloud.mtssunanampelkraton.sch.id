package routes

import "github.com/gofiber/fiber/v2"

func RouteRuang(app *fiber.App) {
	ctx := app.Group("/api/ruang")
	ctx.Get("/all", getRuangAll)
	ctx.Put("/update", UpdateRuang)
	ctx.Post("/create", InsertRuang)
	ctx.Delete("/id/:id", DeleteRuang)
	ctx.Get("/count", CountRuang)
}

type RuangType struct {
	Id   *int    `json:"id"`
	Name *string `json:"name"`
}

func CountRuang(c *fiber.Ctx) error {
	var count int
	if err := db.QueryRow("SELECT COUNT(*) FROM ruang").Scan(&count); err != nil {
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

func getRuangAll(c *fiber.Ctx) error {

	rw, err := db.QueryContext(c.Context(), "SELECT * FROM ruang")
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	defer rw.Close()
	Ruang := []RuangType{}
	for rw.Next() {
		var k RuangType
		if err := rw.Scan(&k.Id, &k.Name); err != nil {
			return c.JSON(fiber.Map{
				"status":  404,
				"message": err.Error(),
			})
		}
		Ruang = append(Ruang, k)
	}
	return c.JSON(fiber.Map{
		"status": 200,
		"data":   Ruang,
	})
}

func UpdateRuang(c *fiber.Ctx) error {
	Ruang := new(RuangType)

	if err := c.BodyParser(&Ruang); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	_, err := db.ExecContext(c.Context(), "UPDATE ruang SET name=? WHERE id=?", Ruang.Name, Ruang.Id)
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

func InsertRuang(c *fiber.Ctx) error {
	h := new(RuangType)
	if err := c.BodyParser(h); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	_, err := db.ExecContext(c.Context(), "INSERT INTO ruang (name) VALUES (?)", h.Name)
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

func DeleteRuang(c *fiber.Ctx) error {
	id := c.Params("id")

	_, err := db.ExecContext(c.Context(), "DELETE FROM ruang WHERE id=?", id)
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

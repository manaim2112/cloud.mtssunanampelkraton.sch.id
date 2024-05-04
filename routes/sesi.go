package routes

import "github.com/gofiber/fiber/v2"

func RouteSesi(app *fiber.App) {
	ctx := app.Group("/api/sesi")
	ctx.Get("/all", getSesiAll)
	ctx.Put("/update", UpdateSesi)
	ctx.Post("/create", InsertSesi)
	ctx.Delete("/id/:id", DeleteSesi)
	ctx.Get("/count", CountSesi)
}

type SesiType struct {
	Id   *int    `json:"id"`
	Name *string `json:"name"`
}

func CountSesi(c *fiber.Ctx) error {
	var count int
	if err := db.QueryRow("SELECT COUNT(*) FROM sesi").Scan(&count); err != nil {
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

func getSesiAll(c *fiber.Ctx) error {

	rw, err := db.QueryContext(c.Context(), "SELECT * FROM sesi")
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	defer rw.Close()
	Sesi := []SesiType{}
	for rw.Next() {
		var k SesiType
		if err := rw.Scan(&k.Id, &k.Name); err != nil {
			return c.JSON(fiber.Map{
				"status":  404,
				"message": err.Error(),
			})
		}
		Sesi = append(Sesi, k)
	}
	return c.JSON(fiber.Map{
		"status": 200,
		"data":   Sesi,
	})
}

func UpdateSesi(c *fiber.Ctx) error {
	Sesi := new(SesiType)

	if err := c.BodyParser(&Sesi); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	_, err := db.ExecContext(c.Context(), "UPDATE sesi SET name=? WHERE id=?", Sesi.Name, Sesi.Id)
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

func InsertSesi(c *fiber.Ctx) error {
	h := new(SesiType)
	if err := c.BodyParser(h); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	_, err := db.ExecContext(c.Context(), "INSERT INTO sesi (name) VALUES (?)", h.Name)
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

func DeleteSesi(c *fiber.Ctx) error {
	id := c.Params("id")

	_, err := db.ExecContext(c.Context(), "DELETE FROM sesi WHERE id=?", id)
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

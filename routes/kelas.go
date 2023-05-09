package routes

import "github.com/gofiber/fiber/v2"

func RouteKelas(app *fiber.App) {
	ctx := app.Group("/api/kelas")
	ctx.Get("/all", getKelasAll)
	ctx.Put("/update", UpdateKelas)
	ctx.Post("/create", InsertKelas)
	ctx.Delete("/id/:id", DeleteKelas)
	ctx.Get("/count", CountKelas)
}

type KelasType struct {
	Id   *int    `json:"id"`
	Kode *string `json:"kode"`
	Name *string `json:"name"`
}

func CountKelas(c *fiber.Ctx) error {
	var count int
	if err := db.QueryRow("SELECT COUNT(*) FROM kelas").Scan(&count); err != nil {
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

func getKelasAll(c *fiber.Ctx) error {

	rw, err := db.QueryContext(c.Context(), "SELECT * FROM kelas")
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	defer rw.Close()
	kelas := []KelasType{}
	for rw.Next() {
		var k KelasType
		if err := rw.Scan(&k.Id, &k.Kode, &k.Name); err != nil {
			return c.JSON(fiber.Map{
				"status":  404,
				"message": err.Error(),
			})
		}
		kelas = append(kelas, k)
	}
	return c.JSON(fiber.Map{
		"status": 200,
		"data":   kelas,
	})
}

func UpdateKelas(c *fiber.Ctx) error {
	kelas := new(KelasType)

	if err := c.BodyParser(&kelas); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	_, err := db.ExecContext(c.Context(), "UPDATE kelas SET name=? WHERE id=?", kelas.Name, kelas.Id)
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

func InsertKelas(c *fiber.Ctx) error {
	h := new(KelasType)
	if err := c.BodyParser(h); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	_, err := db.ExecContext(c.Context(), "INSERT INTO kelas (kode, name) VALUES (?, ?)", h.Kode, h.Name)
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

func DeleteKelas(c *fiber.Ctx) error {
	id := c.Params("id")

	_, err := db.ExecContext(c.Context(), "DELETE FROM kelas WHERE id=?", id)
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

package routes

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func RouteKegiatan(app *fiber.App) {
	ctx := app.Group("/api/kegiatan")
	ctx.Get("/terbaru", getupdateKegiatan)
	ctx.Get("/page/:page", getKegiatanWithTen)
	ctx.Post("/create", InsertKegiatan)
	ctx.Put("/update", UpdateKegiatan)
	ctx.Delete("/id/:id", DeleteKegiatan)
	ctx.Get("/id/:id", getKegiatanWithId)
	ctx.Get("/count", CountKegiatan)
}

type KegiatanType struct {
	Id         *int     `json:"id"`
	Name       *string  `json:"name"`
	Thumb      *string  `json:"thumb"`
	Content    *string  `json:"content"`
	Created_at *[]uint8 `json:"created_at"`
	Updated_at *[]uint8 `json:"updated_at"`
}

func CountKegiatan(c *fiber.Ctx) error {
	var count int
	if err := db.QueryRow("SELECT COUNT(*) FROM kegiatan").Scan(&count); err != nil {
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

func getupdateKegiatan(c *fiber.Ctx) error {
	k := []KegiatanType{}

	row, err := db.QueryContext(c.Context(), "SELECT * FROM kegiatan ORDER BY id DESC LIMIT 5")
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	defer row.Close()
	for row.Next() {
		var h KegiatanType
		if err := row.Scan(&h.Id, &h.Name, &h.Thumb, &h.Content, &h.Created_at, &h.Updated_at); err != nil {
			return c.JSON(fiber.Map{
				"status":  404,
				"message": err.Error(),
			})
		}
		k = append(k, h)
	}

	return c.JSON(fiber.Map{
		"status": 200,
		"data":   k,
	})
}

func getKegiatanWithId(c *fiber.Ctx) error {
	id := c.Params("id")

	kegiatan := new(KegiatanType)
	if err := db.QueryRowContext(c.Context(), "SELECT * FROM kegiatan WHERE id=?", id).Scan(&kegiatan.Id, &kegiatan.Name, &kegiatan.Thumb, &kegiatan.Content, &kegiatan.Created_at, &kegiatan.Updated_at); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"status": 200,
		"data":   kegiatan,
	})
}

func InsertKegiatan(c *fiber.Ctx) error {
	k := new(KegiatanType)
	if err := c.BodyParser(&k); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	_, err := db.ExecContext(c.Context(), "INSERT INTO kegiatan (name, thumb, content) VALUES (?, ?, ?)", k.Name, k.Thumb, k.Content)
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

func UpdateKegiatan(c *fiber.Ctx) error {
	k := new(KegiatanType)
	if err := c.BodyParser(&k); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	_, err := db.ExecContext(c.Context(), "UPDATE kegiatan SET name=?, thumb=?, content=? WHERE id=?", k.Name, k.Thumb, k.Content, k.Id)
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

func DeleteKegiatan(c *fiber.Ctx) error {
	id := c.Params("id")

	_, er := db.ExecContext(c.Context(), "DELETE FROM kegiatan WHERE id=?", id)
	if er != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": er.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"status": 201,
	})
}

func getKegiatanWithTen(c *fiber.Ctx) error {
	keg := []KegiatanType{}
	page := c.Params("page")
	num, err := strconv.Atoi(page)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	pages := (num - 1) * 10
	str := strconv.Itoa(pages)
	row, err := db.QueryContext(c.Context(), "SELECT * FROM kegiatan ORDER BY id DESC LIMIT 10 OFFSET "+str)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	defer row.Close()
	for row.Next() {
		var k KegiatanType
		if err := row.Scan(&k.Id, &k.Name, &k.Thumb, &k.Content, &k.Created_at, &k.Updated_at); err != nil {
			return c.JSON(fiber.Map{
				"status":  404,
				"message": err.Error(),
			})
		}

		keg = append(keg, k)
	}

	return c.JSON(fiber.Map{
		"status": 200,
		"data":   keg,
	})
}

package routes

import "github.com/gofiber/fiber/v2"

func RoutePage(app *fiber.App) {

	ctx := app.Group("/api/page")
	ctx.Get("/all", getPageAll)
	ctx.Get("/id/:id", getWithId)
	ctx.Post("/create", InsertPage)
	ctx.Put("/update", updatePage)
	ctx.Delete("/id/:id", DeletePage)
}

type PageType struct {
	Id         *int     `json:"id"`
	Name       *string  `json:"name"`
	Thumb      *string  `json:"thumn"`
	Menu       *bool    `json:"menu"`
	Content    *string  `json:"content"`
	Created_at *[]uint8 `json:"created_at"`
	Updated_at *[]uint8 `json:"updated_at"`
}

func getPageAll(c *fiber.Ctx) error {
	page := []PageType{}

	row, err := db.QueryContext(c.Context(), "SELECT * FROM pages")
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	defer row.Close()
	for row.Next() {
		var h PageType
		if err := row.Scan(&h.Id, &h.Name, &h.Thumb, &h.Menu, &h.Content, &h.Created_at, &h.Updated_at); err != nil {
			return c.JSON(fiber.Map{
				"status":  404,
				"message": err.Error(),
			})
		}
		page = append(page, h)
	}

	return c.JSON(fiber.Map{
		"status": 200,
		"data":   page,
	})
}

func getWithId(c *fiber.Ctx) error {
	id := c.Params("id")
	p := new(PageType)
	if err := db.QueryRowContext(c.Context(), "SELECT * FROM pages WHERE id =?", id).Scan(&p.Id, &p.Name, &p.Thumb, &p.Menu, &p.Content, &p.Created_at, &p.Updated_at); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"status": 200,
		"data":   p,
	})
}
func InsertPage(c *fiber.Ctx) error {
	p := new(PageType)
	if err := c.BodyParser(&p); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	_, err := db.ExecContext(c.Context(), "INSERT INTO pages (name, thumb, menu, content) VALUES (?, ?, ?, ?)", p.Name, p.Thumb, p.Menu, p.Content)
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
func updatePage(c *fiber.Ctx) error {

	p := new(PageType)
	if err := c.BodyParser(p); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	_, err := db.ExecContext(c.Context(), "UPDATE pages SET name=?, thumb=?, menu=?, content=?", p.Name, p.Thumb, p.Menu, p.Content)

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

func DeletePage(c *fiber.Ctx) error {
	id := c.Params("id")

	_, err := db.ExecContext(c.Context(), "DELETE FROM pages WHERE id=?", id)
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

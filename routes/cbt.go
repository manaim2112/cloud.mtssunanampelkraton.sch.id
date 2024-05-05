package routes

import (
	"database/sql"
	"io"
	"io/ioutil"
	"mime/multipart"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
)

func RouteCBT(app *fiber.App) {
	ctx := app.Group("/api/cbt")
	ctx.Get("/image/:name", getImageCBT)
	ctx.Get("/list", getCBT_listWithGuruId)
	ctx.Get("/list/id/:id", getCBT_listWithId)
	ctx.Get("/list/kelas/:kelas", getCBT_listWithKelas)
	ctx.Get("/list/all", getCBT_listAll)
	ctx.Post("/list/create", InsertCBT_list)
	ctx.Put("/list/update", UpdateCBT_list)
	ctx.Put("/list/update_acak", UpdateCBT_listInAcak)
	ctx.Put("/list/update_priority", UpdateCBT_listInPriority)
	ctx.Put("/list/update_start_end", UpdateCBT_listInMulaiBerakhir)
	ctx.Put("/list/update_code", UpdateCBT_listCode)
	ctx.Put("/list/update_creator", UpdateCBT_listCreator)
	ctx.Delete("/list/id/:id", DeleteCBT_list)
	ctx.Get("/list/count", CountList)
	ctx.Get("/list/code/id/:id", getCodeInCBT_listWithId)

	ctx.Get("/soal", getCBT_soalWithListId)
	ctx.Get("/soal/id/:id", getCBT_soalWithId)
	ctx.Post("/soal/create", InsertCBT_soal)
	ctx.Post("/soal/create_many", InsertCBT_soalMany)
	ctx.Put("/soal/update", UpdateCBT_soal)
	ctx.Delete("/soal/id/:id", DeleteCBT_soal)
	ctx.Delete("/soal/withlist/id/:id", DeleteAllCBT_soal)
	ctx.Post("/soal/upload_foto", uploadFotoSoal)
	ctx.Static("/soal/image", "./uploads/image")

	ctx.Get("/result/list/:listid", getCBT_resultWithListId)
	ctx.Get("/result/user/:userid", getCBT_resultWithUserId)
	ctx.Get("/result/list/:listid/user/:userid", getCBT_resultWithListIdAndUserId)
	ctx.Get("/result/list/:listid/user/:userid/time", getCBT_resultTimeWithListIdAndUserId)
	ctx.Get("/result/id/:id", getCBT_resultWithId)
	ctx.Post("/result/create", InsertCBT_result)
	ctx.Put("/result/update", UpdateCBT_result)
	ctx.Put("result/update/withId", UpdateAnswerCBT_resultWIthId)
	ctx.Delete("/result/id/:id", DeleteCBT_result)
	ctx.Delete("/result/withlist/id/:id", DeleteCBT_resultWithList)

}

type CBT_soalType struct {
	Id          *int     `json:"id"`
	CBT_list_id *int     `json:"CBT_list_id"`
	Num         *int     `json:"num"`
	Question    *string  `json:"question"`
	Tipe        *string  `json:"tipe"`
	Options     *string  `json:"options"`
	Answer      *string  `json:"answer"`
	Score       *string  `json:"score"`
	Created_at  *[]uint8 `json:"created_at"`
}

type CBT_listType struct {
	Id         *int     `json:"id"`
	Name       *string  `json:"name"`
	Jenis      *string  `json:"jenis"`
	Durasi     *string  `json:"durasi"`
	Min_durasi *string  `json:"min_durasi"`
	Mulai      *string  `json:"mulai"`
	Berakhir   *string  `json:"berakhir"`
	Acak       *bool    `json:"acak"`
	Code       *string  `json:"code"`
	Priority   *bool    `json:"priority"`
	Tokelas    *string  `json:"tokelas"`
	Creator    int      `json:"creator"`
	Created_at *[]uint8 `json:"created_at"`
	Updated_at *[]uint8 `json:"updated_at"`
}

type CBT_resultType struct {
	Id         *int     `json:"id"`
	Idlist     *int     `json:"idlist"`
	Iduser     *int     `json:"iduser"`
	Process    *string  `json:"process"`
	Score      *int     `json:"score"`
	Answer     *string  `json:"answer"`
	Created_at *[]uint8 `json:"created_at"`
}

func getImageCBT(c *fiber.Ctx) error {
	// Extract the image name from the path parameters
	imageName := c.Params("name")

	// Assuming your images are stored in a directory named "images"
	// You can adjust the path to match your actual directory structure
	imagePath := "./uploads/image/" + imageName

	// Read the image file
	image, err := ioutil.ReadFile(imagePath)
	if err != nil {
		// Return an error response if the image file cannot be read
		return c.Status(fiber.StatusNotFound).SendString("Image not found")
	}

	// Set the appropriate content type header for an image
	c.Set(fiber.HeaderContentType, "image/jpeg") // Adjust content type based on your image format

	// Send the image in the response
	return c.Send(image)

}

func CountList(c *fiber.Ctx) error {
	var count int
	if err := db.QueryRow("SELECT COUNT(*) FROM cbt_list").Scan(&count); err != nil {
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

func getCBT_listWithGuruId(c *fiber.Ctx) error {
	id := c.Query("guruid")
	rows, err := db.QueryContext(c.Context(), "SELECT * FROM cbt_list WHERE creator=?", id)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	defer rows.Close()

	list := []CBT_listType{}

	for rows.Next() {
		var u CBT_listType
		if err := rows.Scan(&u.Id, &u.Name, &u.Jenis, &u.Durasi, &u.Min_durasi, &u.Mulai, &u.Berakhir, &u.Acak, &u.Code, &u.Priority, &u.Tokelas, &u.Creator, &u.Created_at, &u.Updated_at); err != nil {
			return c.JSON(fiber.Map{
				"status":  404,
				"message": err.Error(),
			})
		}

		list = append(list, u)
	}

	return c.JSON(fiber.Map{
		"status": 200,
		"data":   list,
	})

}

func getCBT_listAll(c *fiber.Ctx) error {
	rows, err := db.QueryContext(c.Context(), "SELECT * FROM cbt_list")
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	defer rows.Close()

	list := []CBT_listType{}

	for rows.Next() {
		var u CBT_listType
		if err := rows.Scan(&u.Id, &u.Name, &u.Jenis, &u.Durasi, &u.Min_durasi, &u.Mulai, &u.Berakhir, &u.Acak, &u.Code, &u.Priority, &u.Tokelas, &u.Creator, &u.Created_at, &u.Updated_at); err != nil {
			return c.JSON(fiber.Map{
				"status":  404,
				"message": err.Error(),
			})
		}

		list = append(list, u)
	}

	return c.JSON(fiber.Map{
		"status": 200,
		"data":   list,
	})

}

func getCBT_listWithId(c *fiber.Ctx) error {
	g := c.Params("id")

	u := new(CBT_listType)
	if err := db.QueryRowContext(c.Context(), "SELECT * FROM cbt_list WHERE id=?", g).Scan(&u.Id, &u.Name, &u.Jenis, &u.Durasi, &u.Min_durasi, &u.Mulai, &u.Berakhir, &u.Acak, &u.Code, &u.Priority, &u.Tokelas, &u.Creator, &u.Created_at, &u.Updated_at); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"status": 200,
		"data":   u,
	})

}

func InsertCBT_list(c *fiber.Ctx) error {

	g := CBT_listType{}
	if err := c.BodyParser(&g); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	row, err := db.ExecContext(c.Context(), "INSERT INTO cbt_list (name, jenis, durasi, min_durasi, code, tokelas, creator) VALUES (?, ?, ?, ?, ?, ?, ?)", g.Name, g.Jenis, g.Durasi, g.Min_durasi, g.Code, g.Tokelas, g.Creator)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	count, err := row.RowsAffected()
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"status":  201,
		"success": count,
	})
}
func UpdateCBT_list(c *fiber.Ctx) error {

	g := CBT_listType{}
	if err := c.BodyParser(&g); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	row, err := db.ExecContext(c.Context(), "UPDATE cbt_list SET name=?, jenis=?, durasi=?, min_durasi=?, tokelas=? WHERE id=?", g.Name, g.Jenis, g.Durasi, g.Min_durasi, g.Tokelas, g.Id)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	count, err := row.RowsAffected()
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"status":  201,
		"success": count,
	})
}

func UpdateCBT_listInMulaiBerakhir(c *fiber.Ctx) error {
	g := CBT_listType{}
	if err := c.BodyParser(&g); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	_, err := db.ExecContext(c.Context(), "UPDATE cbt_list SET mulai=?, berakhir=? WHERE id=?", g.Mulai, g.Berakhir, g.Id)
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

func UpdateCBT_listInAcak(c *fiber.Ctx) error {
	g := CBT_listType{}
	if err := c.BodyParser(&g); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	_, err := db.ExecContext(c.Context(), "UPDATE cbt_list SET acak=? WHERE id=?", g.Acak, g.Id)
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

func UpdateCBT_listCode(c *fiber.Ctx) error {
	g := CBT_listType{}
	if err := c.BodyParser(&g); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	_, err := db.ExecContext(c.Context(), "UPDATE cbt_list SET code=? WHERE id=?", g.Code, g.Id)
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

func UpdateCBT_listInPriority(c *fiber.Ctx) error {
	g := CBT_listType{}
	if err := c.BodyParser(&g); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	_, err := db.ExecContext(c.Context(), "UPDATE cbt_list SET priority=? WHERE id=?", g.Priority, g.Id)
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

func DeleteCBT_list(c *fiber.Ctx) error {
	id := c.Params("id")

	stmt, err := db.BeginTx(c.Context(), nil)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	defer stmt.Rollback()

	_, err = db.ExecContext(c.Context(), "DELETE FROM cbt_result WHERE idlist=?", id)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	_, err = db.ExecContext(c.Context(), "DELETE FROM cbt_soal WHERE CBT_list_id=?", id)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	_, err = db.ExecContext(c.Context(), "DELETE FROM cbt_list WHERE id=?", id)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	if err := stmt.Commit(); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"status": 201,
	})
}

func getCBT_soalWithListId(c *fiber.Ctx) error {
	listid := c.Query("listid")

	l := []CBT_soalType{}

	rows, err := db.QueryContext(c.Context(), "SELECT * FROM cbt_soal WHERE CBT_list_id=?", listid)

	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	defer rows.Close()
	for rows.Next() {
		var p CBT_soalType
		if err := rows.Scan(&p.Id, &p.CBT_list_id, &p.Num, &p.Question, &p.Tipe, &p.Options, &p.Answer, &p.Score, &p.Created_at); err != nil {
			return c.JSON(fiber.Map{
				"status":  404,
				"message": err.Error(),
			})
		}
		l = append(l, p)
	}

	return c.JSON(fiber.Map{
		"status": 200,
		"data":   l,
	})
}

func getCodeInCBT_listWithId(c *fiber.Ctx) error {
	id := c.Params("id")
	p := new(CBT_listType)
	if err := db.QueryRowContext(c.Context(), "SELECT code FROM cbt_list WHERE id=?", id).Scan(&p.Code); err != nil {
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

func getCBT_listWithKelas(c *fiber.Ctx) error {
	kelas := c.Params("kelas")
	p := []CBT_listType{}
	row, err := db.QueryContext(c.Context(), "SELECT id, jenis, name, durasi, min_durasi, mulai, berakhir,acak, code, priority FROM cbt_list WHERE tokelas LIKE ?", "%"+kelas+"%")
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	for row.Next() {
		var j CBT_listType
		if err := row.Scan(&j.Id, &j.Jenis, &j.Name, &j.Durasi, &j.Min_durasi, &j.Mulai, &j.Berakhir, &j.Acak, &j.Code, &j.Priority); err != nil {
			return c.JSON(fiber.Map{
				"status":  404,
				"message": err.Error(),
			})
		}

		p = append(p, j)
	}

	return c.JSON(fiber.Map{
		"status": 200,
		"data":   p,
	})
}

func getCBT_soalWithId(c *fiber.Ctx) error {
	id := c.Params("id")

	p := CBT_soalType{}

	if err := db.QueryRowContext(c.Context(), "SELECT * FROM cbt_soal WHERE id=?", id).Scan(&p.Id, &p.CBT_list_id, &p.Num, &p.Question, &p.Tipe, &p.Options, &p.Answer, &p.Score, &p.Created_at); err != nil {
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

func InsertCBT_soalMany(c *fiber.Ctx) error {
	gh := new([]CBT_soalType)
	if err := c.BodyParser(&gh); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	stmt, err := db.PrepareContext(c.Context(), "INSERT INTO cbt_soal (CBT_list_id, question, tipe, options, answer, score) VALUES (?, ?, ?, ?, ?, ?)")
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	defer stmt.Close()

	var num int
	for _, u := range *gh {
		_, err := stmt.Exec(u.CBT_list_id, u.Question, u.Tipe, u.Options, u.Answer, u.Score)
		if err == nil {
			num++
		}
	}

	return c.JSON(fiber.Map{
		"status":  201,
		"message": num,
	})
}
func InsertCBT_soal(c *fiber.Ctx) error {
	u := new(CBT_soalType)
	if err := c.BodyParser(&u); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal mendapatkan data",
		})
	}
	_, err := db.ExecContext(c.Context(), "INSERT INTO cbt_soal (CBT_list_id, question, tipe, options, answer, score) VALUES (?, ?, ?, ?, ?, ?)", u.CBT_list_id, u.Question, u.Tipe, u.Options, u.Answer, u.Score)
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

func DeleteCBT_soal(c *fiber.Ctx) error {
	id := c.Params("id")
	_, err := db.ExecContext(c.Context(), "DELETE FROM cbt_soal WHERE id=?", id)

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

func DeleteAllCBT_soal(c *fiber.Ctx) error {
	id := c.Params("id")
	_, err := db.ExecContext(c.Context(), "DELETE FROM cbt_soal WHERE CBT_list_id = ?", id)
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

func UpdateCBT_soal(c *fiber.Ctx) error {
	soal := new(CBT_soalType)
	if err := c.BodyParser(&soal); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	_, err := db.ExecContext(c.Context(), "UPDATE cbt_soal SET question=?, options=?, answer=?, score=? WHERE id=?", soal.Question, soal.Options, soal.Answer, soal.Score, soal.Id)
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

func getCBT_resultWithListId(c *fiber.Ctx) error {
	listid := c.Params("listid")

	rows, err := db.QueryContext(c.Context(), "SELECT * FROM cbt_result WHERE idlist =?", listid)

	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	defer rows.Close()
	result := []CBT_resultType{}
	for rows.Next() {
		var r CBT_resultType
		if err := rows.Scan(&r.Id, &r.Idlist, &r.Iduser, &r.Process, &r.Score, &r.Answer, &r.Created_at); err != nil {
			return c.JSON(fiber.Map{
				"status":  404,
				"message": err.Error(),
			})
		}

		result = append(result, r)
	}

	return c.JSON(fiber.Map{
		"status": 200,
		"data":   result,
	})
}

func getCBT_resultTimeWithListIdAndUserId(c *fiber.Ctx) error {
	listid := c.Params("listid")
	userid := c.Params("userid")
	row := db.QueryRowContext(c.Context(), "SELECT created_at FROM cbt_result WHERE idlist =? AND iduser=? LIMIT 1", listid, userid)

	var createdAtStr string // Menggunakan string untuk menyimpan nilai datetime sebagai string
	err := row.Scan(&createdAtStr)
	if err != nil {
		if err == sql.ErrNoRows {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"status":  404,
				"message": "Data not found",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  500,
			"message": err.Error(),
		})
	}

	createdAt, err := time.Parse("2006-01-02 15:04:05", createdAtStr) // Parsing string ke time.Time
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  500,
			"message": err.Error(),
		})
	}

	// Konversi waktu ke zona waktu lokal server
	createdAt = createdAt.Local()

	currentTime := time.Now()

	return c.JSON(fiber.Map{
		"status":       200,
		"created_at":   createdAt,
		"current_time": currentTime,
	})
}

func getCBT_resultWithListIdAndUserId(c *fiber.Ctx) error {
	listid := c.Params("listid")
	userid := c.Params("userid")

	rows, err := db.QueryContext(c.Context(), "SELECT * FROM cbt_result WHERE idlist =? AND iduser=?", listid, userid)

	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	defer rows.Close()
	result := []CBT_resultType{}
	for rows.Next() {
		var r CBT_resultType
		if err := rows.Scan(&r.Id, &r.Idlist, &r.Iduser, &r.Process, &r.Score, &r.Answer, &r.Created_at); err != nil {
			return c.JSON(fiber.Map{
				"status":  404,
				"message": err.Error(),
			})
		}

		result = append(result, r)
	}

	return c.JSON(fiber.Map{
		"status": 200,
		"data":   result,
	})
}
func getCBT_resultWithUserId(c *fiber.Ctx) error {
	userid := c.Params("userid")

	rows, err := db.QueryContext(c.Context(), "SELECT * FROM cbt_result WHERE iduser =?", userid)

	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	defer rows.Close()
	result := []CBT_resultType{}
	for rows.Next() {
		var r CBT_resultType
		if err := rows.Scan(&r.Id, &r.Idlist, &r.Iduser, &r.Process, &r.Score, &r.Answer, &r.Created_at); err != nil {
			return c.JSON(fiber.Map{
				"status":  404,
				"message": err.Error(),
			})
		}

		result = append(result, r)
	}

	return c.JSON(fiber.Map{
		"status": 200,
		"data":   result,
	})
}
func getCBT_resultWithId(c *fiber.Ctx) error {
	id := c.Params("id")
	var r CBT_resultType
	if err := db.QueryRowContext(c.Context(), "SELECT * FROM cbt_result WHERE id =?", id).Scan(&r.Id, &r.Idlist, &r.Iduser, &r.Process, &r.Score, &r.Answer, &r.Created_at); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"status": 200,
		"data":   r,
	})
}

func InsertCBT_result(c *fiber.Ctx) error {
	result := CBT_resultType{}
	if err := c.BodyParser(&result); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	_, err := db.ExecContext(c.Context(), "INSERT INTO cbt_result (idlist, iduser, process, answer, score) VALUES (?, ?, ?, ?, ?)", result.Idlist, result.Iduser, result.Process, result.Answer, result.Score)
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

func DeleteCBT_result(c *fiber.Ctx) error {
	id := c.Params("id")

	_, err := db.ExecContext(c.Context(), "DELETE FROM cbt_result WHERE id=?", id)
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
func DeleteCBT_resultWithList(c *fiber.Ctx) error {
	id := c.Params("id")

	_, err := db.ExecContext(c.Context(), "DELETE FROM cbt_result WHERE idlist=?", id)
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

func UpdateCBT_result(c *fiber.Ctx) error {
	result := new(CBT_resultType)
	if err := c.BodyParser(&result); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	_, err := db.ExecContext(c.Context(), "UPDATE cbt_result SET process=?, answer=? WHERE idlist=? AND iduser=?", "finish", result.Answer, result.Idlist, result.Iduser)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"status":  201,
		"message": "berhasil mengupdate",
	})
}
func UpdateCBT_listCreator(c *fiber.Ctx) error {
	result := new(CBT_listType)
	if err := c.BodyParser(&result); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	_, err := db.ExecContext(c.Context(), "UPDATE cbt_list SET creator=? WHERE id=?", result.Creator, result.Id)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"status":  201,
		"message": "berhasil mengupdate",
	})

}
func UpdateAnswerCBT_resultWIthId(c *fiber.Ctx) error {
	result := new(CBT_resultType)
	if err := c.BodyParser(&result); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	_, err := db.ExecContext(c.Context(), "UPDATE cbt_result SET answer=? WHERE id=?", result.Answer, result.Id)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"status":  201,
		"message": "berhasil mengupdate",
	})
}

func uploadFotoSoal(c *fiber.Ctx) error {
	file, err := c.FormFile("photo")
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal Mengambil gambar",
			"error":   err.Error(),
		})
	}
	// Simpan file di server
	if err := saveFileSoal(file); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal Menyimpan gambar",
			"error":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"status": 201,
		"src":    "/cbt/image/" + file.Filename + ".png",
	})
}

func saveFileSoal(file *multipart.FileHeader) error {
	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	// Simpan file di folder "uploads"
	dst, err := os.Create("./uploads/image/" + file.Filename)
	if err != nil {
		return err
	}
	defer dst.Close()

	if _, err = src.Seek(0, 0); err != nil {
		return err
	}
	if _, err = io.Copy(dst, src); err != nil {
		return err
	}
	return nil
}

package routes

import (
	"io"
	"mime/multipart"
	"os"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func RouteUser(r *fiber.App) {
	ctx := r.Group("/api/user")

	ctx.Get("/kelas/:kelas", getUserWithParamKelas)
	ctx.Get("/ruang/:ruang", getUserWithParamRuang)

	ctx.Get("/all", getUserAll)
	ctx.Static("/photo", "./uploads/photo_user")
	ctx.Post("/upload_foto", uploadFoto)
	ctx.Put("/update", UpdateUserWithId)
	ctx.Get("/id/:id", getUserWithId)
	ctx.Delete("/id/:id", DeleteUser)
	ctx.Post("/createmany", InsertUserMany)
	ctx.Post("/create", InsertUser)
	ctx.Get("/count", CountUser)

}

type User struct {
	Id         *int16   `json:"id"`
	Nisn       *string  `json:"nisn"`
	Pass       *string  `json:"pass"`
	Name       *string  `json:"name"`
	Kelas      *string  `json:"kelas"`
	Ruang      *string  `json:"ruang"`
	Sesi       *string  `json:"sesi"`
	Photo      *string  `json:"photo"`
	Created_at *[]uint8 `json:"created_at"`
}

func CountUser(c *fiber.Ctx) error {
	var count int
	if err := db.QueryRow("SELECT COUNT(*) FROM user").Scan(&count); err != nil {
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

func uploadFoto(c *fiber.Ctx) error {
	file, err := c.FormFile("photo")
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal Mengambil gambar",
			"error":   err.Error(),
		})
	}
	// Simpan file di server
	if err := saveFile(file); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal Menyimpan gambar",
			"error":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"status": 201,
	})
}

func saveFile(file *multipart.FileHeader) error {
	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	// Simpan file di folder "uploads"
	dst, err := os.Create("./uploads/photo_user/" + file.Filename)
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

func getUserAll(c *fiber.Ctx) error {
	g := []User{}

	u, err := db.QueryContext(c.Context(), "SELECT * FROM user")
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal Mengambil Data",
			"error":   err.Error(),
		})
	}

	defer u.Close()

	for u.Next() {
		var p User
		if err := u.Scan(&p.Id, &p.Nisn, &p.Pass, &p.Name, &p.Kelas, &p.Ruang, &p.Sesi, &p.Photo, &p.Created_at); err != nil {
			return c.JSON(fiber.Map{
				"status":  404,
				"message": "Gagal Mengambil Data",
				"error":   err.Error(),
			})
		}
		g = append(g, p)
	}

	return c.JSON(fiber.Map{
		"status": 200,
		"data":   g,
	})

}

func getUserWithParamRuang(c *fiber.Ctx) error {
	ruang := c.Params("ruang")

	rows, err := db.Query("SELECT * FROM user WHERE ruang = ? ", ruang)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal Mengambil Data",
			"data":    []string{},
		})
	}

	defer rows.Close()
	user := []User{}
	for rows.Next() {
		var Us User
		if err := rows.Scan(&Us.Id, &Us.Nisn, &Us.Pass, &Us.Name, &Us.Kelas, &Us.Ruang, &Us.Sesi, &Us.Photo, &Us.Created_at); err != nil {
			return c.JSON(fiber.Map{
				"status":  401,
				"message": "Gagal pengambilan data dengan di scan",
				"data":    []string{},
			})
		}
		user = append(user, Us)
	}
	return c.JSON(fiber.Map{
		"status": 200,
		"data":   user,
	})
}
func getUserWithParamKelas(c *fiber.Ctx) error {
	kelas := c.Params("kelas")

	rows, err := db.Query("SELECT * FROM user WHERE kelas = ? ", kelas)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal Mengambil Data",
			"data":    []string{},
		})
	}

	defer rows.Close()
	user := []User{}
	for rows.Next() {
		var Us User
		if err := rows.Scan(&Us.Id, &Us.Nisn, &Us.Pass, &Us.Name, &Us.Kelas, &Us.Ruang, &Us.Sesi, &Us.Photo, &Us.Created_at); err != nil {
			return c.JSON(fiber.Map{
				"status":  401,
				"message": "Gagal pengambilan data dengan di scan",
				"data":    []string{},
			})
		}
		user = append(user, Us)
	}
	return c.JSON(fiber.Map{
		"status": 200,
		"data":   user,
	})
}

func getUserWithId(c *fiber.Ctx) error {
	user := new(User)
	Id := c.Params("id")
	if err := db.QueryRow("SELECT * FROM user WHERE id =?", Id).Scan(&user.Id, &user.Nisn, &user.Pass, &user.Name, &user.Kelas, &user.Ruang, &user.Sesi, &user.Photo, &user.Created_at); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal Mengambil Data",
			"data":    []string{},
		})
	}

	return c.JSON(fiber.Map{
		"status": 200,
		"data":   user,
	})

}

func UpdateUserWithId(c *fiber.Ctx) error {
	user := new(User)
	if err := c.BodyParser(user); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal Mengambil Data",
			"data":    []string{},
		})
	}
	_, err := db.ExecContext(c.Context(), "UPDATE user SET nisn=?, pass=?, name=?, kelas=?, ruang=?, sesi=?, photo=? WHERE id = ?", user.Nisn, user.Pass, user.Name, user.Kelas, user.Ruang, user.Sesi, user.Photo, user.Id)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal Mengupdate Data",
			"data":    []string{},
		})
	}
	return c.JSON(fiber.Map{
		"status":  202,
		"message": "Berhasil Di update",
	})

}

func DeleteUser(c *fiber.Ctx) error {
	Id := c.Params("id")

	_, err := db.ExecContext(c.Context(), "DELETE FROM user WHERE id=?", Id)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal menghapus pengguna",
			"data":    []string{},
		})
	}

	return c.JSON(fiber.Map{
		"status":  202,
		"message": "Berhasil Di Hapus",
	})
}

func InsertUserMany(c *fiber.Ctx) error {
	user := new([]User)
	if err := c.BodyParser(&user); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal mendapatkan data",
			"error":   err.Error(),
		})
	}
	stmt, err := db.PrepareContext(c.Context(), "INSERT INTO user (nisn, pass, name, kelas, ruang, sesi) VALUES (?, ?, ?, ?, ?, ?)")
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal Memasukkan data",
			"error":   err.Error(),
		})
	}

	defer stmt.Close()
	var num int
	for _, u := range *user {
		_, err := stmt.Exec(u.Nisn, u.Pass, u.Name, u.Kelas, u.Ruang, u.Sesi)
		if err == nil {
			num++
		}
	}
	numstr := strconv.Itoa(num)
	return c.JSON(fiber.Map{
		"status":  201,
		"message": "Berhasil Di tambahkan sebanyak " + numstr,
	})
}

func InsertUser(c *fiber.Ctx) error {
	u := new(User)

	if err := c.BodyParser(&u); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal mengambil user",
			"data":    []string{},
		})
	}
	_, err := db.ExecContext(c.Context(), "INSERT INTO user (nisn, pass, name, kelas, ruang, sesi) VALUES (?, ?, ?, ?)", u.Nisn, u.Pass, u.Name, u.Kelas, u.Ruang, u.Sesi)

	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal mengambil user",
			"error":   err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"status":  202,
		"message": "Berhasil menambahkan",
	})

}

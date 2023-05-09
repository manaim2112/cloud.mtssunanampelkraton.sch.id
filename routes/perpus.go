package routes

import (
	"io"
	"mime/multipart"
	"os"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func RoutePerpus(app *fiber.App) {
	ctx := app.Group("/api/perpus")
	ctx.Get("/book/page/:page", getPerpusBookInPage)
	ctx.Get("/book/search", searchPerpusBookWithName)
	ctx.Get("/book/id/:id", getPerpusBookWithId)
	// ctx.Get("/book/terbaru", getPerpusBookUptodate)
	ctx.Post("/book/create", InsertPerpusBook)
	ctx.Put("/book/update", UpdatePerpusBook)
	ctx.Delete("/book/id/:id", DeletePerpusBook)
	ctx.Post("/book/upload_foto", uploadFotoBook)
	ctx.Static("/book/photo", "./uploads/photo_book")
	ctx.Get("/book/count", CountBook)

	p := ctx.Group("/pinjam")
	p.Get("/userid/:userid", getPerpusPinjamWithUserId)
	p.Get("/belum_dikembalikan", getPerpusPinjamBook)
	p.Post("/create", InsertPerpusPinjam)
	p.Put("/kembalikan", KembalikanPerpusPinjam)
	p.Delete("/id/:id", DeletePerpusPinjam)
}

type PerpusBookType struct {
	Id              *int     `json:"id"`
	Isbn            *string  `json:"isbn"`
	Online          *bool    `json:"online"`
	Judul           *string  `json:"judul"`
	Pengarang       *string  `json:"pengarang"`
	Penerbit        *string  `json:"penerbit"`
	Tahun_terbit    *string  `json:"tahun_terbit"`
	Jumlah          *string  `json:"jumlah"`
	Jumlah_tersedia *string  `json:"jumlah_tersedia"`
	Created_at      *[]uint8 `json:"created_at"`
	Updated_at      *[]uint8 `json:"updated_at"`
}

type PerpusPinjamType struct {
	Id              *int     `json:"id"`
	Id_buku         *int     `json:"id_buku"`
	Id_anggota      *int     `json:"id_anggota"`
	Tanggal_pinjam  *string  `json:"tanggal_pinjam"`
	Tanggal_kembali *string  `json:"tanggal_kembali"`
	Status          *string  `json:"status"`
	Created_at      *[]uint8 `json:"created_at"`
	Updated_at      *[]uint8 `json:"updated_at"`
}
type BookWithPinjamType struct {
	Id              *int     `json:"id"`
	Id_anggota      *int     `json:"id_anggota"`
	Name            *string  `json:"name"`
	Id_book         *string  `json:"id_book"`
	Bookname        *string  `json:"bookname"`
	Tanggal_pinjam  *[]uint8 `json:"tanggal_pinjam"`
	Tanggal_kembali *[]uint8 `json:"tanggal_kembali"`
	Status          *string  `json:"status"`
	Created_at      *[]uint8 `json:"created_at"`
	Updated_at      *[]uint8 `json:"updated_at"`
}

func CountBook(c *fiber.Ctx) error {
	var count int
	if err := db.QueryRow("SELECT COUNT(*) FROM PERPUS_book").Scan(&count); err != nil {
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
func getPerpusBookInPage(c *fiber.Ctx) error {
	page := c.Params("page")
	num, err := strconv.Atoi(page)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	if num < 1 {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Pastikan page valid",
		})
	}
	pages := (num - 1) * 10
	str := strconv.Itoa(pages)
	row, err := db.QueryContext(c.Context(), "SELECT * FROM PERPUS_book ORDER BY id DESC LIMIT 10 OFFSET "+str)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	defer row.Close()
	books := []PerpusBookType{}
	for row.Next() {
		var b PerpusBookType
		if err := row.Scan(&b.Id, &b.Isbn, &b.Online, &b.Judul, &b.Pengarang, &b.Penerbit, &b.Tahun_terbit, &b.Jumlah, &b.Jumlah_tersedia, &b.Created_at, &b.Updated_at); err != nil {
			return c.JSON(fiber.Map{
				"status":  404,
				"message": err.Error(),
			})
		}

		books = append(books, b)
	}

	return c.JSON(fiber.Map{
		"status": 200,
		"data":   books,
	})
}

func searchPerpusBookWithName(c *fiber.Ctx) error {
	v := c.Query("v")
	row, err := db.QueryContext(c.Context(), "SELECT * FROM PERPUS_book WHERE isbn LIKE ? OR judul LIKE ? OR pengarang LIKE ? OR penerbit LIKE ?", "%"+v+"%", "%"+v+"%", "%"+v+"%", "%"+v+"%")
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	defer row.Close()
	books := []PerpusBookType{}
	for row.Next() {
		var b PerpusBookType
		if err := row.Scan(&b.Id, &b.Isbn, &b.Online, &b.Judul, &b.Pengarang, &b.Penerbit, &b.Tahun_terbit, &b.Jumlah, &b.Jumlah_tersedia, &b.Created_at, &b.Updated_at); err != nil {
			return c.JSON(fiber.Map{
				"status":  404,
				"message": err.Error(),
			})
		}

		books = append(books, b)
	}
	return c.JSON(fiber.Map{
		"status": 200,
		"data":   books,
	})
}

func getPerpusBookWithId(c *fiber.Ctx) error {
	id := c.Params("id")

	b := new(PerpusBookType)
	if err := db.QueryRowContext(c.Context(), "SELECT * FROM PERPUS_book WHERE id=?", id).Scan(&b.Id, &b.Isbn, &b.Online, &b.Judul, &b.Pengarang, &b.Penerbit, &b.Tahun_terbit, &b.Jumlah, &b.Jumlah_tersedia, &b.Created_at, &b.Updated_at); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"status": 200,
		"data":   b,
	})

}

func InsertPerpusBook(c *fiber.Ctx) error {
	book := new(PerpusBookType)
	if err := c.BodyParser(&book); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	_, err := db.ExecContext(c.Context(), "INSERT INTO PERPUS_book (isbn, online, judul, pengarang, penerbit, tahun_terbit, jumlah, jumlah_tersedia) VALUES (?,?,?,?,?,?,?,?)", book.Isbn, book.Online, book.Judul, book.Pengarang, book.Penerbit, book.Tahun_terbit, book.Jumlah, book.Jumlah_tersedia)
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

func UpdatePerpusBook(c *fiber.Ctx) error {
	book := new(PerpusBookType)
	if err := c.BodyParser(&book); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	_, err := db.ExecContext(c.Context(), "UPDATE PERPUS_book SET isbn=?, online=?, judul=?, pengarang=?, penerbit=?, tahun_terbit=?, jumlah=?, jumlah_tersedia=? WHERE id=?", book.Isbn, book.Online, book.Judul, book.Pengarang, book.Penerbit, book.Tahun_terbit, book.Jumlah, book.Jumlah_tersedia, book.Id)
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

func DeletePerpusBook(c *fiber.Ctx) error {
	id := c.Params("id")

	_, err := db.ExecContext(c.Context(), "DELETE FROM PERPUS_book WHERE id=?", id)
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

func getPerpusPinjamBook(c *fiber.Ctx) error {
	page := c.Query("page")
	num, err := strconv.Atoi(page)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	if num < 1 {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Periksa dengan benar",
		})
	}
	pages := (num - 1) * 10
	str := strconv.Itoa(pages)

	pinjam := []BookWithPinjamType{}

	row, err := db.QueryContext(c.Context(), `
		SELECT 
			PERPUS_peminjaman.id, 
			PERPUS_peminjaman.id_anggota, 
			user.name as name, 
			PERPUS_peminjaman.id_buku, 
			PERPUS_book.judul as bookname, 
			PERPUS_peminjaman.tanggal_pinjam, 
			PERPUS_peminjaman.tanggal_kembali, 
			PERPUS_peminjaman.status, 
			PERPUS_peminjaman.created_at, 
			PERPUS_peminjaman.updated_at 
		FROM 
			PERPUS_peminjaman 
		LEFT JOIN 
			user ON PERPUS_peminjaman.id_anggota = user.id
		LEFT JOIN 
			PERPUS_book ON PERPUS_peminjaman.id_buku = PERPUS_book.id
		WHERE 
			PERPUS_peminjaman.status = 'Dipinjam'
		ORDER BY 
			PERPUS_peminjaman.id DESC
		LIMIT 10
		OFFSET `+str)

	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	defer row.Close()
	for row.Next() {
		var h BookWithPinjamType
		if err := row.Scan(&h.Id, &h.Id_anggota, &h.Name, &h.Id_book, &h.Bookname, &h.Tanggal_pinjam, &h.Tanggal_kembali, &h.Status, &h.Created_at, &h.Updated_at); err != nil {
			return c.JSON(fiber.Map{
				"status":  404,
				"message": err.Error(),
			})
		}
		pinjam = append(pinjam, h)

	}
	return c.JSON(fiber.Map{
		"status": 200,
		"data":   pinjam,
	})
}
func getPerpusPinjamWithUserId(c *fiber.Ctx) error {
	page := c.Query("page")
	userid := c.Params("userid")
	num, err := strconv.Atoi(page)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	if num < 1 {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Periksa dengan benar",
		})
	}
	pages := (num - 1) * 10
	str := strconv.Itoa(pages)

	pinjam := []BookWithPinjamType{}

	row, err := db.QueryContext(c.Context(), `
		SELECT 
			PERPUS_peminjaman.id, 
			PERPUS_peminjaman.id_anggota, 
			user.name as name, 
			PERPUS_peminjaman.id_buku, 
			PERPUS_book.judul as bookname, 
			PERPUS_peminjaman.tanggal_pinjam, 
			PERPUS_peminjaman.tanggal_kembali, 
			PERPUS_peminjaman.status, 
			PERPUS_peminjaman.created_at, 
			PERPUS_peminjaman.updated_at 
		FROM 
			PERPUS_peminjaman 
		LEFT JOIN 
			user ON PERPUS_peminjaman.id_anggota = user.id
		LEFT JOIN 
			PERPUS_book ON PERPUS_peminjaman.id_buku = PERPUS_book.id
		WHERE 
			PERPUS_peminjaman.id_anggota = ?
		ORDER BY 
			PERPUS_peminjaman.id DESC
		LIMIT 10
		OFFSET `+str, userid)

	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	defer row.Close()
	for row.Next() {
		var h BookWithPinjamType
		if err := row.Scan(&h.Id, &h.Id_anggota, &h.Name, &h.Id_book, &h.Bookname, &h.Tanggal_pinjam, &h.Tanggal_kembali, &h.Status, &h.Created_at, &h.Updated_at); err != nil {
			return c.JSON(fiber.Map{
				"status":  404,
				"message": err.Error(),
			})
		}
		pinjam = append(pinjam, h)

	}
	return c.JSON(fiber.Map{
		"status": 200,
		"data":   pinjam,
	})
}

func InsertPerpusPinjam(c *fiber.Ctx) error {
	pinjam := new(PerpusPinjamType)
	if err := c.BodyParser(&pinjam); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	stmt, err := db.BeginTx(c.Context(), nil)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	defer stmt.Rollback()

	book := new(PerpusBookType)
	if err := stmt.QueryRow("SELECT jumlah_tersedia FROM PERPUS_book WHERE id=?", pinjam.Id_buku).Scan(&book.Jumlah_tersedia); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	jmlbook, err := strconv.Atoi(*book.Jumlah_tersedia)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	if jmlbook < 1 {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Maaf Buku Sudah Terpinjam semua",
		})
	}
	ne := jmlbook - 1
	strNe := strconv.Itoa(ne)
	_, err = stmt.ExecContext(c.Context(), "UPDATE PERPUS_book SET jumlah_tersedia=?", strNe)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	_, err = stmt.ExecContext(c.Context(), "INSERT INTO PERPUS_peminjaman (id_buku, id_anggota, tanggal_pinjam, tanggal_kembali) VALUES (?, ?, ?, ?)", pinjam.Id_buku, pinjam.Id_anggota, pinjam.Tanggal_pinjam, pinjam.Tanggal_kembali)
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

func KembalikanPerpusPinjam(c *fiber.Ctx) error {
	pinjam := new(PerpusPinjamType)
	if err := c.BodyParser(&pinjam); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	stmt, err := db.BeginTx(c.Context(), nil)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	defer stmt.Rollback()

	_, err = stmt.ExecContext(c.Context(), "UPDATE PERPUS_peminjaman SET status=? WHERE id_anggota = ?", "Kembali", pinjam.Id_anggota)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	book := new(PerpusBookType)
	if err := stmt.QueryRow("SELECT jumlah_tersedia FROM PERPUS_book WHERE id=?", pinjam.Id_buku).Scan(&book.Jumlah_tersedia); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	num, err := strconv.Atoi(*book.Jumlah_tersedia)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}
	jml := num + 1
	str := strconv.Itoa(jml)
	_, err = stmt.Exec("UPDATE PERPUS_book SET jumlah_tersedia=?", str)
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
func DeletePerpusPinjam(c *fiber.Ctx) error {
	id := c.Params("id")

	_, err := db.ExecContext(c.Context(), "DELETE FROM PERPUS_peminjaman WHERE id =?", id)
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

func uploadFotoBook(c *fiber.Ctx) error {
	file, err := c.FormFile("photo")
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal Mengambil gambar",
			"error":   err.Error(),
		})
	}
	// Simpan file di server
	if err := saveFileBook(file); err != nil {
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

func saveFileBook(file *multipart.FileHeader) error {
	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	// Simpan file di folder "uploads"
	dst, err := os.Create("./uploads/photo_book/" + file.Filename)
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

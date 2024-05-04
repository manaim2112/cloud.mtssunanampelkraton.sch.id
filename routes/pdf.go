package routes

import (
	"fmt"
	"strconv"
	"time"

	"github.com/TigorLazuardi/tanggal"
	"github.com/go-pdf/fpdf"
	"github.com/gofiber/fiber/v2"
)

func RoutePdf(app *fiber.App) {

	ctx := app.Group("/api/pdf")
	ctx.Get("/kehadiran/mapel/:mapel/sesi/:sesi/ruang/:ruang", getKehadiran)
	ctx.Get("/beritaacara/mapel/:mapel/sesi/:sesi/ruang/:ruang", getBeritaAcara)
}

func getBeritaAcara(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"status": "OKE",
	})
}
func getKehadiran(c *fiber.Ctx) error {
	// mendapatkan data mapel
	g := c.Params("mapel")
	sesi := c.Params("sesi")
	ruang := c.Params("ruang")
	u := new(CBT_listType)
	if err := db.QueryRowContext(c.Context(), "SELECT * FROM CBT_list WHERE id=?", g).Scan(&u.Id, &u.Name, &u.Jenis, &u.Durasi, &u.Min_durasi, &u.Mulai, &u.Berakhir, &u.Acak, &u.Code, &u.Priority, &u.Tokelas, &u.Creator, &u.Created_at, &u.Updated_at); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": err.Error(),
		})
	}

	// Mendapatkan pengguna dari sesi dan ruang
	rows, err := db.Query("SELECT * FROM user WHERE ruang = ? AND sesi = ?", ruang, sesi)
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
	// Membuat objek PDF baru
	pdf := fpdf.New("P", "mm", "A4", "")

	// Menambahkan halaman baru
	pdf.AddPage()

	// Menambahkan header
	pdf.SetFont("Arial", "B", 16)
	pdf.Cell(40, 10, "Asesmen Madrasah Berbasis Komputer (AM-BK)")
	pdf.Ln(5)
	pdf.SetFont("Arial", "B", 12)
	pdf.Cell(40, 10, "Tahun Pelajaran 2024/2025")
	pdf.Ln(5)

	// Menambahkan header
	pdf.SetFont("Arial", "", 12)
	pdf.Ln(20)

	// Membuat tabel user
	userData := [][]string{
		{"", "Nisn", "Nama Lengkap", "kelas", "Tanda Tangan"},
		{"1", "2039213", "SUKD-1", "7G", ""},
		{"2", "2039213", "SUKD-2", "7G", ""},
		{"3", "2039213", "SUKD-3", "7G", ""},
		{"4", "2039213", "SUKD-4", "7G", ""},
		{"5", "2039213", "SUKD-5", "7G", ""},
		{"6", "2039213", "SUKD-6", "7G", ""},
		{"7", "2039213", "SUKD-7", "7G", ""},
		{"8", "2039213", "SUKD-8", "7G", ""},
		{"9", "2039213", "SUKD-9", "7G", ""},
		{"10", "2039213", "SUKD-10", "7G", ""},
		{"11", "2039213", "SUKD-11", "7G", ""},
		// Tambahkan data pengguna lainnya di sini
	}
	// Menentukan lebar kolom dan ratakan ke kiri
	colWidths := []float64{10.0, 40.0, 70.0, 20.0, 50.0}

	pdf.CellFormat(50.0, 10.0, "Satuan Pendidikan", "0", 0, "L", false, 0, "")
	pdf.CellFormat(70.0, 10.0, ": MTs Sunan Ampel Kraton", "0", 0, "L", false, 0, "")
	pdf.CellFormat(20.0, 10.0, "Sesi ", "0", 0, "L", false, 0, "")
	pdf.CellFormat(50.0, 10.0, ": "+sesi, "0", 0, "L", false, 0, "")
	pdf.Ln(5)
	pdf.CellFormat(50.0, 10.0, "Mata Ujian ", "0", 0, "L", false, 0, "")
	pdf.CellFormat(70.0, 10.0, ": "+*u.Name, "0", 0, "L", false, 0, "")
	pdf.CellFormat(20.0, 10.0, "Ruang", "0", 0, "L", false, 0, "")
	pdf.CellFormat(50.0, 10.0, ": "+ruang, "0", 0, "L", false, 0, "")
	pdf.Ln(-1)

	// Menambahkan header tabel
	pdf.SetFont("Arial", "B", 12)
	for k, str := range userData[0] {
		pdf.CellFormat(colWidths[k], 7, str, "1", 0, "C", false, 0, "")
	}
	pdf.Ln(-1)

	// Menambahkan data pengguna lainnya
	pdf.SetFont("Arial", "", 12)
	for k, row := range user {
		absen := strconv.Itoa(k + 1)
		pdf.CellFormat(colWidths[0], 7, absen, "1", 0, "C", false, 0, "")
		pdf.CellFormat(colWidths[1], 7, *row.Nisn, "1", 0, "C", false, 0, "")
		pdf.CellFormat(colWidths[2], 7, *row.Name, "1", 0, "C", false, 0, "")
		pdf.CellFormat(colWidths[3], 7, *row.Kelas, "1", 0, "C", false, 0, "")
		pdf.CellFormat(colWidths[4], 7, "", "1", 0, "C", false, 0, "")
		pdf.Ln(-1)
	}

	tgl, _ := tanggal.Papar(time.Now(), "Pasuruan", tanggal.WIB)
	format := []tanggal.Format{
		tanggal.LokasiDenganKoma,
		tanggal.Hari,
		tanggal.NamaBulan,
		tanggal.Tahun,
	}
	ss := tgl.Format(" ", format)
	// Menambahkan tanda tangan
	pdf.Ln(10)
	// Menambahkan tanda tangan di kiri
	pdf.CellFormat(50.0, 10.0, "", "0", 0, "C", false, 0, "")
	pdf.CellFormat(90.0, 10.0, "", "0", 0, "L", false, 0, "")
	pdf.CellFormat(50.0, 10.0, ss, "0", 0, "C", false, 0, "")
	pdf.Ln(-1)
	pdf.CellFormat(50.0, 10.0, "Pengawas", "0", 0, "C", false, 0, "")
	pdf.CellFormat(90.0, 10.0, "", "0", 0, "L", false, 0, "")
	pdf.CellFormat(50.0, 10.0, "Proktor", "0", 0, "C", false, 0, "")
	pdf.Ln(30)
	pdf.CellFormat(50.0, 10.0, "____________________", "0", 0, "C", false, 0, "")
	pdf.CellFormat(90.0, 10.0, "", "0", 0, "L", false, 0, "")
	pdf.CellFormat(50.0, 10.0, "____________________", "0", 0, "C", false, 0, "")
	// Mengirimkan PDF ke client sebagai tanggapan HTTP
	c.Set("Content-Type", "application/pdf")
	err1 := pdf.Output(c.Response().BodyWriter())
	if err1 != nil {
		fmt.Println("Error generating PDF:", err)
		return err
	}

	return nil
}

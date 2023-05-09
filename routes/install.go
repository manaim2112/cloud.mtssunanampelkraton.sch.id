package routes

import (
	"os"

	"cloud.mtssunanampelkraton.sch.id/config"
	_ "github.com/go-sql-driver/mysql"

	"github.com/gofiber/fiber/v2"
)

func RouteInstall(App *fiber.App) {
	ctx := App.Group("/api/install")
	ctx.Post("/settingDB", SetENV)
	ctx.Post("/table_user", InstallTableUser)
	ctx.Post("/table_kelas", InstallTableKelas)
	ctx.Post("/table_guru", InstallTableGuru)
	ctx.Post("/table_cbt", InstallTableCBT)
	ctx.Post("/table_page", InstallTablePage)
	ctx.Post("/table_materi", InstallTableMateri)
	ctx.Post("/table_kegiatan", InstallTableKegiatan)
	ctx.Post("/table_perpus", InstallTablePerpus)
	ctx.Post("/insert_new_user", InsertNewUser)
}

func SetENV(c *fiber.Ctx) error {
	type SettingEnv struct {
		DB_HOST     string `json:"DB_HOST"`
		DB_PORT     string `json:"DB_PORT"`
		DB_USERNAME string `json:"DB_USERNAME"`
		DB_PASSWORD string `json:"DB_PASSWORD"`
		DB_DATABASE string `json:"DB_DATABASE"`
	}

	p := new(SettingEnv)
	if err := c.BodyParser(p); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "gagal mengambil data",
		})
	}
	dbs, err := config.Connect(p.DB_HOST, p.DB_PORT, p.DB_USERNAME, p.DB_PASSWORD, p.DB_DATABASE)

	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "tidak dapat terhubung dengan database",
		})
	}
	defer dbs.Close()
	os.Setenv("DB_HOST", p.DB_HOST)
	os.Setenv("DB_PORT", p.DB_PORT)
	os.Setenv("DB_USERNAME", p.DB_USERNAME)
	os.Setenv("DB_PASSWORD", p.DB_PASSWORD)
	os.Setenv("DB_DATABASE", p.DB_DATABASE)

	return c.JSON(fiber.Map{
		"status":  202,
		"message": "Berhasil menyimpan data database",
	})
}

func InstallTableUser(c *fiber.Ctx) error {

	_, err := db.ExecContext(c.Context(), `
		CREATE TABLE IF NOT EXISTS user (
			id INT NOT NULL AUTO_INCREMENT,
			nisn VARCHAR(15) NOT NULL UNIQUE,
			pass VARCHAR(255) NOT NULL,
			name VARCHAR(50) NOT NULL,
			kelas VARCHAR(10) NOT NULL,
			photo VARCHAR(150) NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			PRIMARY KEY (id)
		)
	`)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "gagal membuat table user",
		})
	}

	return c.JSON(fiber.Map{
		"status":  201,
		"message": "Berhasil membuat table user",
	})
}

func InstallTableKelas(c *fiber.Ctx) error {

	_, err := db.ExecContext(c.Context(), `
		CREATE TABLE IF NOT EXISTS kelas (
			id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
			kode VARCHAR(10) NOT NULL,
			name VARCHAR(50) NOT NULL
		);
	`)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "gagal membuat table Kelas",
			"error":   err,
		})
	}

	return c.JSON(fiber.Map{
		"status":  201,
		"message": "Berhasil membuat table kelas",
	})

}

func InstallTableGuru(c *fiber.Ctx) error {

	_, err := db.ExecContext(c.Context(), `
		CREATE TABLE IF NOT EXISTS guru (
			id INT NOT NULL AUTO_INCREMENT,
			pegId VARCHAR(10) NOT NULL UNIQUE,
			name VARCHAR(50) NOT NULL,
			pass VARCHAR(255) NOT NULL,
			walikelas VARCHAR(10) NULL,
			jabatan VARCHAR(50) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			PRIMARY KEY (id)
		);
	`)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "gagal membuat table guru",
		})
	}
	return c.JSON(fiber.Map{
		"status":  201,
		"message": "Berhasil membuat table guru",
	})
}

func InstallTableCBT(c *fiber.Ctx) error {

	smt, err := db.BeginTx(c.Context(), nil)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "gagal membuat table CBT",
		})
	}
	defer smt.Rollback()

	_, err = smt.ExecContext(c.Context(), `
		CREATE TABLE IF NOT EXISTS CBT_soal (
			id INT AUTO_INCREMENT PRIMARY KEY,
			CBT_list_id INT NOT NULL,
			num INT NULL,
			question TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
			tipe VARCHAR(50) NOT NULL,
			options TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
			answer TEXT,
			score INT NOT NULL,
			created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
		);
	`)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "gagal membuat table CBT",
			"error":   err.Error(),
		})
	}
	_, err = smt.ExecContext(c.Context(), `
		CREATE TABLE IF NOT EXISTS CBT_list (
			id INT AUTO_INCREMENT PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			jenis VARCHAR(50) NOT NULL,
			durasi VARCHAR(10) NOT NULL,
			min_durasi VARCHAR(10) NOT NULL,
			mulai varchar(100),
			berakhir varchar(100),
			acak BOOLEAN,
			code VARCHAR(20) NOT NULL,
			priority BOOLEAN,
			tokelas TEXT NOT NULL,
			creator INT NOT NULL,
			created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
		);
	  
	`)

	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "gagal membuat table CBT",
			"error":   err.Error(),
		})
	}

	_, err = smt.ExecContext(c.Context(), `
		CREATE TABLE IF NOT EXISTS CBT_result (
			id INT AUTO_INCREMENT PRIMARY KEY,
			idlist INT NOT NULL,
			iduser INT NOT NULL,
			process varchar(15),
			score INT NOT NULL,
			answer TEXT NOT NULL,
			created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
		);
	  
	`)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "gagal membuat table CBT",
			"error":   err.Error(),
		})
	}
	if err1 := smt.Commit(); err1 != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "gagal membuat table CBT",
			"error":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"status":  201,
		"message": "Berhasil membuat table CBT",
	})

}

func InstallTablePage(c *fiber.Ctx) error {

	_, err := db.ExecContext(c.Context(), `
		CREATE TABLE IF NOT EXISTS pages (
			id INT AUTO_INCREMENT PRIMARY KEY,
			name varchar(150) NOT NULL,
			thumb varchar(150) NULL,
			menu BOOLEAN,
			content TEXT,
			created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
		);
	`)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "gagal membuat table halaman",
			"error":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"status":  201,
		"message": "Berhasil membuat table halaman",
	})
}

func InstallTableMateri(c *fiber.Ctx) error {

	stmt, err := db.BeginTx(c.Context(), nil)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "gagal membuat table Materi",
		})
	}
	defer stmt.Rollback()
	_, err = stmt.ExecContext(c.Context(), `
		CREATE TABLE IF NOT EXISTS MATERI_data (
			id INT AUTO_INCREMENT PRIMARY KEY,
			name VARCHAR(150) NOT NULL,
			category varchar(50) NULL,
			content TEXT,
			creator VARCHAR(10) NOT NULL,
			thumb varchar(150) NULL,
			tag VARCHAR(225) NULL,
			created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
		)
	`)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "gagal membuat table Materi",
			"error":   err.Error(),
		})
	}

	_, err = stmt.ExecContext(c.Context(), `
		CREATE TABLE IF NOT EXISTS MATERI_category (
			id INT AUTO_INCREMENT PRIMARY KEY,
			name VARCHAR(150) NOT NULL,
			created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

		)
	`)

	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "gagal membuat table Materi",
			"error":   err.Error(),
		})
	}

	if err := stmt.Commit(); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "gagal membuat table Materi",
			"error":   err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"status":  201,
		"message": "Berhasil membuat table Materi",
	})
}

func InstallTableKegiatan(c *fiber.Ctx) error {

	_, err := db.ExecContext(c.Context(), `
		CREATE TABLE IF NOT EXISTS kegiatan (
			id INT AUTO_INCREMENT PRIMARY KEY,
			name VARCHAR(150) NOT NULL,
			thumb VARCHAR(225) NULL,
			content TEXT,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

		)
	`)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "gagal membuat table kegiatan",
			"error":   err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"status":  201,
		"message": "Berhasil membuat table kegiatan",
	})
}

func InstallTablePerpus(c *fiber.Ctx) error {

	stmt, err := db.BeginTx(c.Context(), nil)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "gagal membuat table perpus",
			"error":   err.Error(),
		})
	}
	defer stmt.Rollback()

	_, err = stmt.ExecContext(c.Context(), `
		CREATE TABLE IF NOT EXISTS PERPUS_book (
			id INT AUTO_INCREMENT PRIMARY KEY,
			isbn VARCHAR(50) NULL,
			online BOOLEAN NULL,
			judul VARCHAR(255) NOT NULL,
			pengarang VARCHAR(255) NOT NULL,
			penerbit VARCHAR(255) NOT NULL,
			tahun_terbit INT NOT NULL,
			jumlah INT NOT NULL,
			jumlah_tersedia INT NOT NULL,
			created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
		)
	`)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "gagal membuat table perpus",
			"error":   err.Error(),
		})
	}
	_, err = stmt.Exec(`
		CREATE TABLE IF NOT EXISTS PERPUS_peminjaman (
			id INT AUTO_INCREMENT PRIMARY KEY,
			id_buku INT NOT NULL,
			id_anggota INT NOT NULL,
			tanggal_pinjam DATE NOT NULL,
			tanggal_kembali DATE NOT NULL,
			status ENUM('Dipinjam', 'Kembali') NOT NULL DEFAULT 'Dipinjam',
			created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
		);
	`)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "gagal membuat table perpus",
			"error":   err.Error(),
		})
	}

	if err1 := stmt.Commit(); err1 != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "gagal membuat table perpus",
			"error":   err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"status":  201,
		"message": "Berhasil membuat table perpus",
	})
}

func InsertNewUser(c *fiber.Ctx) error {
	_, err := db.ExecContext(c.Context(), `
		INSERT INTO guru (pegId, name, pass, jabatan) VALUES (?, ?, ?, ?)
	`, 12345, "admin", "1234", "operator")

	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "gagal menambahkan data admin",
			"error":   err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"status":  201,
		"message": "Berhasil menambahkan admin",
	})
}

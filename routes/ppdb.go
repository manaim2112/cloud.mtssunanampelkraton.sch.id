package routes

import "github.com/gofiber/fiber/v2"

func RoutePpdb(App *fiber.App) {
	App.Get("/v1/register_step_1", registerStep1)
}

type UserDetailType struct {
	Id            *int    `json:"id"`
	UserId        *int    `json:"userid"`
	Fullname      *string `json:"fullname"`
	Alamat        *string `json:"alamat"`
	Kodepos       *string `json:"kodepost"`
	Nokk          *string `json:"nokk"`
	Kk_photo      *string `json:"kk_photo"`
	Nik           *string `json:"nik"`
	Tgl_tmp_lahir *string `json:"tgl_tmp_lahir"`
	Ijazah_photo  *string `json:"ijazah_photo"`
	UserDetailFamilyFather
	UserDetailFamilyMother
}

type UserDetailFamilyFather struct {
	Ayah_name           *string `json:"ayah_name"`
	Ayah_alamat         *string `json:"ayah_alamat"`
	Ayah_nik            *string `json:"ayah_nik"`
	Ayah_nik_photo      *string `json:"ayah_nik_photo"`
	Ayah_tgl_tmp_lahir  *string `json:"ayah_tgl_tmp_lahir"`
	Ayah_max_pendidikan *string `json:"ayah_max_pendidikan"`
	Ayah_pekerjaan      *string `json:"ayah_pekerjaan"`
	Ayah_penghasilan    *string `json:"ayah_penghasilan"`
	Ayah_status         *string `json:"ayah_status"`
}
type UserDetailFamilyMother struct {
	Ibu_name           *string `json:"ibu_name"`
	Ibu_alamat         *string `json:"ibu_alamat"`
	Ibu_nik            *string `json:"ibu_nik"`
	Ibu_nik_photo      *string `json:"ibu_nik_photo"`
	Ibu_tgl_tmp_lahir  *string `json:"ibu_tgl_tmp_lahir"`
	Ibu_max_pendidikan *string `json:"ibu_max_pendidikan"`
	Ibu_pekerjaan      *string `json:"ibu_pekerjaan"`
	Ibu_penghasilan    *string `json:"ibu_penghasilan"`
	Ibu_status         *string `json:"ibu_status"`
}

func registerStep1(c *fiber.Ctx) error {
	newUser := new(User)
	if err := c.BodyParser(&newUser); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal Mengambil data",
			"error":   err.Error(),
		})
	}

	rows, err := db.ExecContext(c.Context(), "INSERT INTO user (nisn, pass, name, kelas, photo) VALUES (?, ?, ?, ?, ?)", newUser.Nisn, newUser.Pass, newUser.Name, newUser.Kelas, newUser.Photo)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal Mengambil data",
			"error":   err.Error(),
		})
	}
	id, err := rows.LastInsertId()
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal Mengambil data",
			"error":   err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"status":  201,
		"message": id,
	})
}

func register_step_2(c *fiber.Ctx) error {
	newDetailUser := UserDetailType{}
	if err := c.BodyParser(&newDetailUser); err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal Mengambil data",
			"error":   err.Error(),
		})
	}

	_, err := db.ExecContext(c.Context(), "INSERT INTO user_detail WHERE (userId, fullname, alamat, kodepos, nokk, kk_photo, nik, tgl_tmp_lahir, ijazah_photo, ayah_name, ayah_nik_photo, ayah_nik, ayah_alamat, ayah_tgl_tmp_lahir, ayah_penghasilan, ayah_pekerjaan, ayah_status, ayah_max_pendidikan, ibu_name, ibu_nik_photo, ibu_nik, ibu_alamat, ibu_tgl_tmp_lahir, ibu_penghasilan, ibu_pekerjaan, ibu_status, ibu_max_pendidikan) VALUES (?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", newDetailUser.UserId,
		newDetailUser.Fullname,
		newDetailUser.Alamat,
		newDetailUser.Kodepos,
		newDetailUser.Nokk,
		newDetailUser.Kk_photo,
		newDetailUser.Nik,
		newDetailUser.Tgl_tmp_lahir,
		newDetailUser.Ijazah_photo,
		newDetailUser.Ayah_name,
		newDetailUser.Ayah_nik_photo,
		newDetailUser.Ayah_nik,
		newDetailUser.Ayah_alamat,
		newDetailUser.Ayah_tgl_tmp_lahir,
		newDetailUser.Ayah_penghasilan,
		newDetailUser.Ayah_pekerjaan,
		newDetailUser.Ayah_status,
		newDetailUser.Ayah_max_pendidikan,
		newDetailUser.Ibu_name,
		newDetailUser.Ibu_nik_photo,
		newDetailUser.Ibu_nik,
		newDetailUser.Ibu_alamat,
		newDetailUser.Ibu_tgl_tmp_lahir,
		newDetailUser.Ibu_penghasilan,
		newDetailUser.Ibu_pekerjaan,
		newDetailUser.Ibu_status,
		newDetailUser.Ibu_max_pendidikan,
	)
	if err != nil {
		return c.JSON(fiber.Map{
			"status":  404,
			"message": "Gagal Memasukkan data",
			"error":   err.Error(),
		})
	}

	_, err = db.ExecContext(c.Context(), "INSERT INTO paymet_history ()")

	return c.JSON(fiber.Map{
		"status":  201,
		"message": "Berhasil Melakukan Pendaftaran, silahkan lanjut proses pembayaran",
	})

}

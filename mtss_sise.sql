-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 05, 2024 at 12:46 AM
-- Server version: 10.6.16-MariaDB-0ubuntu0.22.04.1-log
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mtss_sise`
--

-- --------------------------------------------------------

--
-- Table structure for table `cbt_list`
--

CREATE TABLE `cbt_list` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `jenis` varchar(50) NOT NULL,
  `durasi` varchar(10) NOT NULL,
  `min_durasi` varchar(10) NOT NULL,
  `mulai` varchar(100) DEFAULT NULL,
  `berakhir` varchar(100) DEFAULT NULL,
  `acak` tinyint(1) DEFAULT NULL,
  `code` varchar(20) NOT NULL,
  `priority` tinyint(1) DEFAULT NULL,
  `tokelas` text NOT NULL,
  `creator` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cbt_list`
--

INSERT INTO `cbt_list` (`id`, `name`, `jenis`, `durasi`, `min_durasi`, `mulai`, `berakhir`, `acak`, `code`, `priority`, `tokelas`, `creator`, `created_at`, `updated_at`) VALUES
(1, 'Try Out ', 'AMBK', '35', '20', NULL, NULL, 1, 'ZKQ', 1, '9A, 9B, 9C, 9D, 9E, 9F, 9G, 9H', 0, '2024-04-28 01:08:45', '2024-05-03 10:49:22'),
(2, 'Try Out 2', 'AMBK', '35', '20', NULL, NULL, 1, 'QTE', 1, '9A, 9B, 9C, 9D, 9E, 9F, 9G, 9H', 0, '2024-05-04 00:46:15', '2024-05-04 00:46:15');

-- --------------------------------------------------------

--
-- Table structure for table `cbt_result`
--

CREATE TABLE `cbt_result` (
  `id` int(11) NOT NULL,
  `idlist` int(11) NOT NULL,
  `iduser` int(11) NOT NULL,
  `process` varchar(15) DEFAULT NULL,
  `score` int(11) NOT NULL,
  `answer` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cbt_result`
--

INSERT INTO `cbt_result` (`id`, `idlist`, `iduser`, `process`, `score`, `answer`, `created_at`) VALUES
(8, 1, 1, 'START', 0, '[[60,null],[25,null],[8,null],[98,null],[3,null],[40,null],[97,null],[18,null],[14,null],[47,null],[12,null],[11,null],[74,null],[54,null],[85,null],[57,null],[16,null],[81,null],[80,null],[50,null],[28,null],[49,null],[87,null],[53,null],[89,null],[10,null],[68,null],[9,null],[61,null],[79,null],[83,null],[35,null],[48,null],[84,null],[41,null],[27,null],[38,null],[33,null],[39,null],[91,null],[24,null],[66,null],[2,null],[70,null],[52,null],[22,null],[59,null],[26,null],[71,null],[13,null],[45,null],[7,null],[23,null],[15,null],[99,null],[51,null],[78,null],[6,null],[55,null],[17,null],[64,null],[19,null],[73,null],[94,null],[4,null],[76,null],[43,null],[65,null],[92,null],[72,null],[86,null],[58,null],[62,null],[93,null],[32,null],[42,null],[46,null],[56,null],[69,null],[37,null],[63,null],[20,null],[30,null],[90,null],[100,null],[1,null],[75,null],[96,null],[31,null],[36,null],[29,null],[34,null],[44,null],[95,null],[67,null],[77,null],[82,null],[5,null],[21,null],[88,null]]', '2024-05-03 22:38:27');

-- --------------------------------------------------------

--
-- Table structure for table `cbt_soal`
--

CREATE TABLE `cbt_soal` (
  `id` int(11) NOT NULL,
  `CBT_list_id` int(11) NOT NULL,
  `num` int(11) DEFAULT NULL,
  `question` text DEFAULT NULL,
  `tipe` varchar(50) NOT NULL,
  `options` text DEFAULT NULL,
  `answer` text DEFAULT NULL,
  `score` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cbt_soal`
--

INSERT INTO `cbt_soal` (`id`, `CBT_list_id`, `num`, `question`, `tipe`, `options`, `answer`, `score`, `created_at`) VALUES
(81, 1, NULL, '<p>Dalam sidang BPUPKI pertama, Ir. Soekarno mengemukakan pendapatnya tentang....</p>', 'pilgan', '[\"Proklamasi\",\"Dasar negara\",\"Undang-Undang\",\"Undang-Undang Dasar\"]', '[1]', 2, '2023-05-10 00:35:25'),
(82, 1, NULL, '<p>Berikut yang bukan termasuk makna Pancasila sebagai dasar negara.......</p>', 'pilgan', '[\"Pergaulan rakyat\",\"Partisipasi warga negara\",\"Permusuhan antar negara\",\"Kegiatan penyelenggaraan negara\"]', '[2]', 2, '2023-05-10 00:35:29'),
(83, 1, NULL, '<p>Pengertian norma adalah.....</p>', 'pilgan', '[\"Kaidah hidup yang dijadikan pedoman tingkah laku dalam hidup masyarakat\",\"Perbuatan yang dilakukan berulang-ulang dalam hal yang sama dan diterima dalam masyarakat\",\"Kebiasaan masyarakat yang dianggap baik dilakukan secara turun temurun pada daerah setempat\",\"Serangkaian aturan yang diadakan agar kehidupan di lingkungan dapat berjalan dengan baik dan tertib\"]', '[0]', 2, '2023-05-10 00:35:30'),
(84, 1, NULL, '<p>Perhatikan pernyataan berikut ini!</p><p>1. Dibuat oleh lembaga yang berwenang</p><p>2. Sanksi mengikat dan memaksa (tegas)</p><p>3. Bersumber dari hati nurani</p><p>4. Menjamin rasa keadilan dan ketertiban masyarakat </p><p>5. Bersumber dari Tuhan</p><p>6. Bersumber dari pergaulan masyarakat</p><p>Berdasarkan pernyataan di atas, yang merupakan ciri dari norma hukum adalah.....</p>', 'pilgan', '[\"1, 2 dan 3\",\"2, 3 dan 4\",\"1, 2 dan 4\",\"4, 5 dan 6\"]', '[2]', 2, '2023-05-10 00:35:31'),
(85, 1, NULL, '<p>Tujuan dibentuknya konstitusi adalah......</p>', 'pilgan', '[\"Memberikan perlindungan bagi negara lain\",\"Memberikan jaminan keamanan bagi penduduk\",\"Memberikan jaminan kehidupan yang layak bagi penduduk negara tersebut\",\"Memudahkan suatu bangsa untuk melangsungkan kehidupan berbangsa dan bernegara\"]', '[3]', 2, '2023-05-10 00:35:31'),
(86, 1, NULL, '<p>Kedaulatan ditangan rakyat dan dilaksanakan menurut UUD\". Hal ini merupakan bunyi dari....</p>', 'pilgan', '[\"Pasal 1 ayat 2 UUD 1945\",\"Pasal 1 ayat 3 UUD 1945\",\"Pasal 2 ayat 1 UUD 1945\",\"Pasal 2 ayat 2 UUD 1945\"]', '[0]', 2, '2023-05-10 00:35:34'),
(87, 1, NULL, '<p>Keberagaman suku bangsa, agama, ras dan budaya di Indonesia merupakan akibat dari perbedaan.......</p>', 'pilgan', '[\"Latar belakang historis\",\"Kondisi geografis Indonesia\",\"Potensi sumber daya alam\",\"Pengaruh budaya asing\"]', '[1]', 2, '2023-05-10 00:35:35'),
(88, 1, NULL, '<p>Berikut yang bukan faktor-faktor penyebab perbedaan suku, agama, ras dan antargolongan di Indonesia yaitu.......</p>', 'pilgan', '[\"Pulau-pulaunya terpisah oleh laut\",\"Berada diantara benua Asia dan benua Afrika\",\"Masuknya agama-agama besar di Indonesia\",\"Banyaknya kerajaan tua yang pernah berjaya di Indonesia\"]', '[1]', 2, '2023-05-10 00:35:38'),
(89, 1, NULL, '<p>Hal yang membuat gotong royong berbeda dari bentuk kerjasama lainnya adalah.......</p>', 'pilgan', '[\"Saling menguntungkan\",\"Dilakukan tanpa pamrih\",\"Dilakukan bersama-sama\",\"Dapat dilakukan di berbagai situasi\"]', '[1]', 2, '2023-05-10 00:35:38'),
(90, 1, NULL, '<p>Tujuan pembangunan nasional Indonesia tercantum jelas dalam........</p>', 'pilgan', '[\"Pembukaan UUD 1945 alinea IV\",\"Pembukaan UUD 1945 alinea III\",\"Batang tubuh UUD 1945\",\"Piagam Jakarta\"]', '[0]', 2, '2023-05-10 00:35:38'),
(91, 1, NULL, '<p>Negara Indonesia menerapkan otonomi daerah sebagai bentuk desentralisasi setiap daerah, otonomi diberikan kewenangan yang luas dalam bidang......</p>', 'pilgan', '[\"Kebijakan fiskal dan moneter\",\"Kebijakan politik luar negeri\",\"Kebijakan pertahanan dan keamanan\",\"Pengelolaan daerah sesuai dengan potensi yang dimiliki\"]', '[3]', 2, '2023-05-10 00:35:38'),
(92, 1, NULL, '<p>Salah satu fungsi daerah bagi NKRI adalah membantu meningkatkan kehidupan masyarakat melalui pemanfaatan potensi sumber daya daerah. Contoh fungsi tersebut adalah.....</p>', 'pilgan', '[\"Mensukseskan vaksin Corona\",\"Mendistribusikan KIS\",\"Mengembangkan potensi wisata daerah\",\"Menyelenggarakan Pilkada\"]', '[2]', 2, '2023-05-10 00:35:38'),
(93, 1, NULL, '<p>Pancasila sebagai ideologi tidak diciptakan oleh negara, melainkan.....</p>', 'pilgan', '[\"Dibuat oleh rakyat Indonesia untuk pedoman hidup yang langgeng\",\"Ditemukan dalam sanubari rakyat Indonesia\",\"Digali dari harta kekayaan rohani, moral dan budaya masyarakat Indonesia sendiri\",\"Nilai-nilainya mengandung arti yang dalam dalam perjuangan bangsa Indonesia\"]', '[2]', 2, '2023-05-10 00:35:39'),
(94, 1, NULL, '<p>Pancasila sebagai dasar negara mengandung arti bahwa Pancasila menjadi......</p>', 'pilgan', '[\"Nilai-nilai yang di dalamnya mengandung unsur-unsur kenegaraan yang tinggi\",\"Suatu asas kerohanian\",\"Sumber acuan dalam menyusun etika kehidupan berbangsa bagi rakyat Indonesia\",\"Landasan politik yang tidak bermoral\"]', '[2]', 2, '2023-05-10 00:35:39'),
(95, 1, NULL, '<p>Suatu konstitusi dikatakan fleksibel atau luwes jika.....</p>', 'pilgan', '[\"Dibuat oleh lembaga konstitusi\",\"Mudah mengikuti perkembangan zaman\",\"Sulit untuk dilakukan  perubahan\",\"Dicantumkan dalam naskah tertulis\"]', '[1]', 2, '2023-05-10 00:35:41'),
(96, 1, NULL, '<p>Kekuasaan <em>legislatif</em> adalah kekuasaan untuk.......</p>', 'pilgan', '[\"Membuat undang-undang\",\"Yang mengadili pelanggaran UU\",\"Pelaksana undang-undang\",\"Menilai pertanggung jawaban presiden\"]', '[0]', 2, '2023-05-10 00:35:42'),
(97, 1, NULL, '<p>Berdasarkan UU No.12 Tahun 2011 tentang pembentukan peraturan Perundang-undangan, urutan yang benar jenis dan hierarki peraturan perundang-undangan Indonesia adalah........</p>', 'pilgan', '[\"UUDâ€™45, Ketetapan MPR, UU, PP, Kepres, Perda Provinsi, dan Perda Kabupaten\",\"Ketetapan MPR, UU, PP,  UUDâ€™45, Kepres, Perda Provinsi, dan Perda Kabupaten\",\"UUDâ€™45, Ketetapan MPR, Perda Provinsi,  UU, PP, Kepres, dan Perda Kabupaten\",\"UU, PP, Kepres, Perda Provinsi, UUDâ€™45, Ketetapan MPR,  dan Perda Kabupaten\"]', '[0]', 2, '2023-05-10 00:35:42'),
(98, 1, NULL, '<p>Budi Utomo merupakan organisasi pertama di Indonesia yang perjuangan lebih bersifat nasionalis dibandingkan organisasi-organisasi perjuangan sebelumnya yang bersifat kedaerahan. Budi Utomo didirikan pada tanggal.......</p>', 'pilgan', '[\"2 Mei 1908\",\"20 Mei 1908\",\"2 Mei 1928\",\"20 Mei 1928\"]', '[1]', 2, '2023-05-10 00:35:43'),
(99, 1, NULL, '<p>Setia dan bangga terhadap bangsa Indonesia merupakan salah satu nilai luhur yang terkandung dalam sumpah pemuda yaitu........</p>', 'pilgan', '[\"Sikap rela berkorban\",\"Persatuan\",\"Cinta terhadap bangsa dan tanah air\",\"Menerima dan menghargai perbedaan\"]', '[2]', 2, '2023-05-10 00:35:43'),
(100, 1, NULL, '<p>Faktor-faktor yang mempengaruhi pembentuk identitas bangsa Indonesia dalam rangka NKRI  antara lain seperti berikut.....</p>', 'pilgan', '[\"Masyarakat\",\"pimpinan daerah\",\"Bhinneka tunggal ika \",\"Budaya luar\"]', '[2]', 2, '2023-05-10 00:35:43'),
(101, 1, NULL, '<p>Pengakuan adanya Tuhan seperti yang terdapat dalam Pancasila menunjukkan bahwa......</p>', 'pilgan', '[\"Negara Indonesia adalah negara agama\",\"Negara Indonesia menganut sekularisme\",\"Negara Indonesia menganut paham atheisme\",\"Negara mangakui adanya kehidupan religius yang diwujudkan dalam agama\"]', '[2]', 2, '2023-05-10 00:35:46'),
(102, 1, NULL, '<p>Arti Pancasila yaitu......</p>', 'pilgan', '[\"Perintah lima\",\"Lima petunjuk\",\"Lima asas\",\"Lima faktor\"]', '[3]', 2, '2023-05-10 00:35:48'),
(103, 1, NULL, '<p>Ideologi Pancasila bersumber pada.......Indonesia</p>', 'pilgan', '[\"Nilai-nilai luhur budaya bangsa\",\"Budaya bangsa\",\"kepribadian bangsa\",\"suku budaya bangsa\"]', '[0]', 2, '2023-05-10 00:35:49'),
(104, 1, NULL, '<p>Bagian dalam UUD  â€™45 yang tidak dapat diubah oleh siapapun, termasuk MPR adalahâ€¦â€¦â€¦</p>', 'pilgan', '[\"Pembukaan\",\"Batang tubuh\",\"Pasal-pasal\",\"Penjelasan\"]', '[0]', 2, '2023-05-10 00:35:49'),
(105, 1, NULL, '<p>Negara kita adalah negara demokrasi. Hal ini sesuai dengan Pancasila Sila ....</p>', 'pilgan', '[\"pertama\",\"kedua\",\"ketiga\",\"Keempat\"]', '[3]', 2, '2023-05-10 00:35:51'),
(106, 1, NULL, '<p>Makna sebuah negara memiliki kedaulatan adalah.....</p>', 'pilgan', '[\"Memiliki kekayaan yang melimpah\",\"Memiliki negara yang maju\",\"Memiliki kewenangan untuk mempengaruhi negara lain\",\"Menjadi negara yang merdeka dan sejajar dengan negara lain\"]', '[3]', 2, '2023-05-10 00:35:51'),
(107, 1, NULL, '<p>Wujud nyata Indonesia melaksanakan kedaulatan keluar adalahâ€¦â€¦â€¦.</p>', 'pilgan', '[\"Terbentuknya organisasi regional maupun internasional\",\"Terbentuknya masyarakat internasional\",\"Kemampuan Indonesia mengusir penjajah\",\"Kemampuan Indonesia melaksanakan politik luar negeri yang bebas aktif\"]', '[3]', 2, '2023-05-10 00:35:54'),
(108, 1, NULL, '<p>Peraturan perundang-undangan tertinggi di Indonesia  adalah.....</p>', 'pilgan', '[\"Ketetapan MPR \",\"Undang-undang \",\"UUD 1945 \",\"Pancasila \"]', '[2]', 2, '2023-05-10 00:35:54'),
(109, 1, NULL, '<p>Keberagaman suku bangsa, ras, agama dan budaya dapat dijadikan sebagaiâ€¦â€¦â€¦</p>', 'pilgan', '[\"Pemicu pertentangan\",\"Penghalang kemajuan\",\"Pemisah persatuan dan kesatuan \",\"Perekat persatuan dan kesatuan\"]', '[3]', 2, '2023-05-10 00:35:54'),
(110, 1, NULL, '<p>Masyarakat Indonesia disebut etnik pluralistik karena merupakan masyarakatâ€¦â€¦.</p>', 'pilgan', '[\"Persatuan suku-suku bangsa yang kuat\",\"Agama dan kepercayaannya bervariasi\",\"Terdiri dari keanekaragaman suku bangsa\",\"Beraneka ragam adat istiadatnya\"]', '[2]', 2, '2023-05-10 00:35:55'),
(241, 1, NULL, '<p>Berikut ini yang termasuk hewan Vertebrata   adalah â€¦</p>', 'pilgan', '[\"aves&nbsp;&nbsp;\",\"ciliate\",\"flagellate&nbsp;\",\"protozoa\"]', '[0]', 2, '2023-05-10 22:07:47'),
(242, 1, NULL, '<p>Pada Tumbuh- tumbuhan pengambilan oksigen melalui â€¦</p>', 'pilgan', '[\"Stomata\",\"Akar\",\"Batang\",\"dahan\"]', '[0]', 2, '2023-05-10 22:07:48'),
(243, 1, NULL, '<p>Melestarikan keturunan agar tidak punah termasuk dalam ciri makhluk hidup yaitu â€¦</p>', 'pilgan', '[\"Berkembangbiak\",\"makan \",\"tumbuh\",\"bergerak\"]', '[0]', 2, '2023-05-10 22:07:49'),
(244, 1, NULL, '<p>Gerak   berpindah dari tempat  satu ketempat lain  disebut gerak&nbsp;â€¦</p>', 'pilgan', '[\"Aktif&nbsp;&nbsp;\",\"refleks\",\"Lurus\",\"Pasif\"]', '[0]', 2, '2023-05-10 22:07:49'),
(245, 1, NULL, '<p>Pemasangan rel kereta api harus diberi celah guna  menghindari akibat dari â€¦</p>', 'pilgan', '[\"pemanasan global\",\"pendinginan\",\"pemuaian\",\"termostat\"]', '[2]', 2, '2023-05-10 22:07:50'),
(246, 1, NULL, '<p>Besaran-besaran yang satuannya sudah ditentukan disebut besaran&nbsp;&nbsp; â€¦</p>', 'pilgan', '[\"Skalar\",\"Turunan\",\"Vektor&nbsp;&nbsp;\",\"Pokok\"]', '[3]', 2, '2023-05-10 22:07:52'),
(247, 1, NULL, '<p>Yang bukan merupakan besaran turunan dibawah ini adalah â€¦</p>', 'pilgan', '[\"Suhu\",\"Volume&nbsp;\",\"Massa jenis\",\"Kecepatan\"]', '[0]', 2, '2023-05-10 22:07:53'),
(248, 1, NULL, '<p>Sistem Internasional (SI) disebut juga sistem MKS yang diambil dari satuanâ€¦</p>', 'pilgan', '[\"Panjang ,Massa, waktu&nbsp;&nbsp;\",\"Massa, Percepatan, waktu\",\"Panjang, Volume ,waktu\",\"Kecepatan, Massa , waktu\"]', '[3]', 2, '2023-05-10 22:07:54'),
(249, 1, NULL, '<p>Bentuk berubah, dan Volume tetap, ini sifat dari zat&nbsp;â€¦</p>', 'pilgan', '[\"&nbsp;cair&nbsp;\",\"&nbsp;padat\",\" padat dan gas\",\"gas\"]', '[0]', 2, '2023-05-10 22:07:54'),
(250, 1, NULL, '<p>Satuan dari kuat arus adalah â€¦</p>', 'pilgan', '[\"Kalvin\",\"Volt\",\" Ampere\",\"Kilogram\"]', '[2]', 2, '2023-05-10 22:07:55'),
(251, 1, NULL, '<p>Zat yang tak dapat diuraikan lagi menjadi zat yang lebih sederhana disebut â€¦</p>', 'pilgan', '[\"larutan\",\"Senyawa\",\"Unsur\",\"Zat murni\"]', '[2]', 2, '2023-05-10 22:07:56'),
(252, 1, NULL, '<p>Yang bukan termasuk ciri-ciri makhluk hidup adalah&nbsp; â€¦</p>', 'pilgan', '[\"Bernapas\",\"Tidak bergerak\",\"Makan\",\"Tumbuh\"]', '[1]', 2, '2023-05-10 22:07:56'),
(253, 1, NULL, '<p>Hewan yang bernapas dengan paru-paru dan kulit adalah&nbsp;â€¦</p>', 'pilgan', '[\"Mamalia\",\" reptilian\",\" Ampibia\",\"Primata\"]', '[2]', 2, '2023-05-10 22:07:56'),
(254, 1, NULL, '<p>Populasi adalahâ€¦</p>', 'pilgan', '[\"Kumpulan komunitas\",\" Kumpulan biosfer\",\" Kumpulan ekosistem\",\"Kumpulan individu\"]', '[3]', 2, '2023-05-10 22:07:56'),
(255, 1, NULL, '<p>Sesuatu yang memiliki massa dan menempati ruang disebutâ€¦</p>', 'pilgan', '[\"Sifat\",\" Warna\",\" Bentuk\",\"Zat\"]', '[3]', 2, '2023-05-10 22:07:57'),
(256, 1, NULL, '<p>Tumbuhan mampu berfotosintesis, maka tumbuhan disebutâ€¦</p>', 'pilgan', '[\"Karnovora\",\" Herbivora\",\" Produsen\",\"Konsumen\"]', '[2]', 2, '2023-05-10 22:07:57'),
(257, 1, NULL, '<p>Dibawah ini adalah konservasi insitu, kecualiâ€¦</p>', 'pilgan', '[\"Cagar alam&nbsp;\",\" Taman nasional\",\" Suaka margasatwa&nbsp;\",\" Kebun Raya Bogor\"]', '[3]', 2, '2023-05-10 22:07:58'),
(258, 1, NULL, '<p>Berikut ini adalah hewan yang dilindungi pemerintahâ€¦</p>', 'pilgan', '[\"Sapi, komodo dan harimau\",\" Cendrawasih, harimau dan gajah\",\" Jalak, kerbau, dan gajah\",\" Orang utan, angsa dan ayam\"]', '[1]', 2, '2023-05-10 22:07:58'),
(259, 1, NULL, '<p>Kebiasaan tubuh yang condong kekiri atau kekanan dapat menyebabkan kelainan tulang punggung yang disebut juga â€¦</p>', 'pilgan', '[\"kifosis\",\"  skoliosis\",\"  Lordosis\",\"retak tulang\"]', '[1]', 2, '2023-05-10 22:07:58'),
(260, 1, NULL, '<p>Makanan bergerak masuk kelambung akibat kontraksi otot memanjang dan melingkar dikerongkongan. Kontraksi ini disebut gerak&nbsp;â€¦&nbsp;</p>', 'pilgan', '[\"peristaltik\",\" melingkar\",\" lurus\",\" parabola\"]', '[0]', 2, '2023-05-10 22:07:58'),
(281, 2, NULL, '<p>Letak astronomis Negara Indonesia adalah... </p>', 'pilgan', '[\"95<sup>o</sup>BT-141<sup>o</sup>BT dan 6<sup>o</sup>LU- 11<sup>o</sup>LS\",\"95<sup>o</sup>BT-141<sup>o</sup>BB dan 6<sup>o</sup>LS- 11<sup>o</sup>LU\",\"95<sup>o</sup>BB-114<sup>o</sup>BT dan 6<sup>o</sup>LU- 11<sup>o</sup>LS\",\"95<sup>o</sup>BB-141<sup>o</sup>BB dan 6<sup>o</sup>LS- 11<sup>o</sup>LU\"]', '[0]', 2, '2023-05-10 22:10:15'),
(282, 2, NULL, '<p>Jumlah penduduk Kabupaten Gemah ripah tahun 2018 adalah 1.500.000 jiwa. Jika laus wilayah kabupaten Gemah ripah adalah 2.500 km<sup>2</sup>, maka angka kepadatan penduduknya adalahâ€¦</p>', 'pilgan', '[\"250 jiwa / km<sup>2</sup>\",\"375 jiwa / km<sup>2</sup>\",\"500 jiwa / km<sup>2</sup>\",\"600 jiwa / km<sup>2</sup>\"]', '[3]', 2, '2023-05-10 22:10:15'),
(283, 2, NULL, '<p>Para remaja yang mengidolakan seorang seorang penyanyi akan mengikuti gaya berpakaian penyanyi tersebut. Faktor   pendorong dari proses interaksi sosial tersebut adalah â€¦</p>', 'pilgan', '[\"identifikasi \",\"simpati\",\" imitasi\",\"Sugesti\"]', '[2]', 2, '2023-05-10 22:10:16'),
(284, 2, NULL, '<p>Letak 23 1/2â—¦ LU sampai 23 1/2â—¦ LS dalam pembagian iklim, termasuk dalam iklim ..</p>', 'pilgan', '[\"sedang\",\"subtropis\",\"dingin\",\"tropis\"]', '[3]', 2, '2023-05-10 22:10:16'),
(285, 2, NULL, '<p>Perpindahan penduduk dari suatu tempat ke tempat yang lain disebut ...</p>', 'pilgan', '[\"migrasi\",\"emigrasi.\",\" penglaju.\",\"urbanisasi\"]', '[0]', 2, '2023-05-10 22:10:17'),
(286, 2, NULL, '<p>Pencatatan penduduk di daerah yang terbatas dan mengenai hal tertentu disebut ...</p>', 'pilgan', '[\"Sensus penduduk\",\"Survey penduduk\",\"Sensus de jure\",\"Registrasi penduduk\"]', '[1]', 2, '2023-05-10 22:10:22'),
(287, 2, NULL, '<p>Sejumlah barang atau jasa yang akan dijual  (ditawarkan ) oleh produsen pada waktu tertentu dengan berbagai tingkat harga disebut dengan ...</p>', 'pilgan', '[\"permintaan\",\"penawaran\",\"harga\",\"harga keseimbangan\"]', '[1]', 2, '2023-05-10 22:10:26'),
(288, 2, NULL, '<p>Berikut pasar yang terjadi apabila seluruh penawaran terhadap sejenis barang pada pasar dikuasai oleh seseorang penjual  atau sejumlah penjual tertentu disebut pasar ...</p>', 'pilgan', '[\"monopoli\",\"oligopoly\",\"Monopolistic\",\"persaingan sempurna\"]', '[2]', 2, '2023-05-10 22:10:28'),
(289, 2, NULL, '<p>Peta yang mempunyai skala 1 : 100 sampai 1 : 5.000 dan biasanya digunakan untuk menggambarkan peta tanah atau peta dalam sertifikat tanah adalah peta ...</p>', 'pilgan', '[\"kadaster.\",\"skala besar\",\"skala menengah\",\"skala kecil.\"]', '[3]', 2, '2023-05-10 22:10:31'),
(290, 2, NULL, '<p>Simbol warna yang menunjukkan suatu daerah yang memiliki ketinggian antara 200-400 m di atas permukaan  air laut adalah warna ...</p>', 'pilgan', '[\"cokelat\",\"kuning\",\"biru\",\"Hijau muda\"]', '[3]', 2, '2023-05-10 22:10:32'),
(291, 2, NULL, '<p>Indonesia berada di antara dua benua, yaitu Benua Asia yang terletak di sebelah utara Indonesia dan Benua Australia yang terletak di sebelah selatan Indonesia merupakan  letak .... Indonesia...</p>', 'pilgan', '[\"Astronomis\",\"Geologis      \",\"Ekonomis\",\"Geografi\"]', '[0]', 2, '2023-05-10 22:10:34'),
(292, 2, NULL, '<p>Tidak sebandingnya alat pemenuh kebutuhan dengan jumlah kebutuhan menyebabkan terjadinya â€¦</p>', 'pilgan', '[\"kelangkaan\",\"supply\",\"permintaan\",\"keseimbangan\"]', '[0]', 2, '2023-05-10 22:10:34'),
(293, 2, NULL, '<p>Pak Jaja jatuh sakit sehingga dokter menyuruhnya untuk membeli obat, maka obat bagi Pak Jaja berdasarkan waktunya disebut sebagai kebutuhan ...</p>', 'pilgan', '[\"individu\",\"primer\",\"mendatang\",\"sekarang\"]', '[3]', 2, '2023-05-10 22:10:34'),
(294, 2, NULL, '<p>Barang yang tersedia dalam jumlah berlimpah melebihi jumlah yang dibutuhkan masyarakat, sehingga bisa didapatkan tanpa pengorbanan disebut dengan barang ...</p>', 'pilgan', '[\"ekonomi\",\"konsumsi\",\"bebas\",\"substitusi\"]', '[2]', 2, '2023-05-10 22:10:34'),
(295, 2, NULL, '<p>Berusaha dengan pengorbanan yang sekecil-kecilnya untuk mendapatkan hasil yang sebesar-besarnya disebut â€¦</p>', 'pilgan', '[\"prinsip ekonomi.\",\"tujuan ekonomi\",\"motif ekonomi\",\"tindakan ekonomi\"]', '[0]', 2, '2023-05-10 22:10:37'),
(296, 2, NULL, '<p>Daerah pantai biasanya dimanfaatkan penduduk untuk ...</p>', 'pilgan', '[\"Sawah tadah hujan\",\"Usaha peternakan\",\"Pembuatan tambak ikan\",\"Areal perkebunan\"]', '[2]', 2, '2023-05-10 22:10:39'),
(297, 2, NULL, '<p>Berikut yang termasuk jenis fauna Indonesia  peralihan adalah...</p>', 'pilgan', '[\"Kukus\",\"Gagah\",\"Harimau\",\"Badak\"]', '[0]', 2, '2023-05-10 22:10:39'),
(298, 2, NULL, '<p>Berikut Negara di kawasam Asia Tenggara yang tidak memiliki wilayah lautan adalah ...</p>', 'pilgan', '[\"Vietnam\",\"Laos\",\"Thailand\",\"Singapura\"]', '[1]', 2, '2023-05-10 22:10:39'),
(299, 2, NULL, '<p>Negara di Asia yang termasuk Negara maju dan mendapat julukan  â€œNegeri Matahari Terbit adalah ...</p>', 'pilgan', '[\"Jepang\",\"Siingapura\",\"Thailand\",\"Vietnam\"]', '[0]', 2, '2023-05-10 22:10:39'),
(300, 2, NULL, '<p>Demi mempertahankan solidaritas kelompok, seorang siswa ikut-ikutan membolos sekolah. Penyimpangan yang dilakukan siswsa tersebut disebabkan oleh factor ...</p>', 'pilgan', '[\"Teman bermain\",\"Disorganisasi keluarga\",\"Kebutuhan kelompok\",\"Tidak adanya norma\"]', '[0]', 2, '2023-05-10 22:10:40'),
(301, 2, NULL, '<p>Brunei  Darussalam merupakan Negara kecil dan kaya di kawasan Asia Tenggara. Kegiatan perekonomian yang menjadi  sumber pendapatan utama Negara tersebut adalah...</p>', 'pilgan', '[\"industri.\",\"perkebunan\",\"perdagangan\",\"pertambangan\"]', '[3]', 2, '2023-05-10 22:10:40'),
(302, 2, NULL, '<p>Indonesia dan Myanmar menjalin kerjasama dalam keamanan untuk melawan terorisme .Kerjasama tersebut merupakan salah satu bentuk kerjasama Internasional yaitu â€¦</p>', 'pilgan', '[\"bilateral.\",\"regonal\",\"multilateral\",\"antar regional\"]', '[0]', 2, '2023-05-10 22:10:40'),
(303, 2, NULL, '<p>Sungai terluas di dunia terdapat di Benua Amerika, yaitu â€¦</p>', 'pilgan', '[\"Sungai Mekong.\",\"Sunga Missisipi\",\"Sungai Kolorado\",\"Sungai Amazon\"]', '[1]', 2, '2023-05-10 22:10:40'),
(304, 2, NULL, '<p>Bendungan Aswan  terletak di Negara ...</p>', 'pilgan', '[\"Mesir\",\"Kenya\",\"Inggrs\",\"Amerika Serikat\"]', '[0]', 2, '2023-05-10 22:10:41'),
(305, 2, NULL, '<p>Gold, Gospel, dan Glory merupakan semboyan yang melandasi kegiatan penjelajahan samudra bangsa-bangsa Eropa.   Dalam perkembangannya semboyan gold memunculkan paham ...</p>', 'pilgan', '[\"komunitas.\",\"imperialiis.\",\"Nasionalis\",\"merkantilis\"]', '[3]', 2, '2023-05-10 22:10:41'),
(306, 2, NULL, '<p>Daratan luas yang dinamakan Benua Hitam adalah Benua ...</p>', 'pilgan', '[\"Asia        \",\"Antartika.\",\"Afrika\",\"Amerikka\"]', '[2]', 2, '2023-05-10 22:10:41'),
(307, 2, NULL, '<p>Jarak yang terdekat antara Benua Asia dari Amerika terdapat â€¦</p>', 'pilgan', '[\"Selat Bering        \",\"Laut Okkhotak.\",\"Selat Gibraltar\",\"Laut Jepang\"]', '[0]', 2, '2023-05-10 22:10:46'),
(308, 2, NULL, '<p>Menjelang pilkada untuk pemilihan Bupati, partai-partai melakukan kerjasama dengan tujuan memenangkan pilkada. Kerja sama yang dilakukan beberapa partai ini termasuk bentuk â€¦</p>', 'pilgan', '[\"koersii        \",\"kooptasi.\",\"Bargaining\",\"koalisi\"]', '[3]', 2, '2023-05-10 22:10:49'),
(309, 2, NULL, '<p>Perubahan sosial selalu terjadi dalam kehidupan manusia. Perubahan sosial yang berlangsung  secara lambat dan memerlukan waktu yang lama. Di dalamnya juga terdapat serentetan perubaha-perubahan kecil yang saling mengikuti secara lambat disebut â€¦</p>', 'pilgan', '[\"evolusi        \",\"revolusiii\",\"planned change\",\"unplanned change\"]', '[0]', 2, '2023-05-10 22:10:52'),
(310, 2, NULL, '<p>Satu lingkungan dimana manusia , hewan dan tumbuhan sampai dengan mikroorganisme tinggal disebut â€¦</p>', 'pilgan', '[\"ekosistem      \",\"komuniitas\",\"lingkunan abiotik\",\"lingkungan biotik.\"]', '[3]', 2, '2023-05-10 22:10:53'),
(321, 2, NULL, '<p>Hukum belajar ilmu tajwid adalahâ€¦</p>', 'pilgan', '[\"Wajib kifayah\",\"Wajib ain\",\"Sunnah\",\"Mubah\"]', '[0]', 2, '2023-05-13 02:28:30'),
(322, 2, NULL, '<p>Menerapkan ilmu tajwid ketika membaca Al Qurâ€™an  hukumnya adalahâ€¦</p>', 'pilgan', '[\"Fardhu kifayah\",\"Fardhu ain\",\"Sunnah\",\"Mubah\"]', '[1]', 2, '2023-05-13 02:28:31'),
(323, 2, NULL, '<p>Huruf-huruf hijaiyah yang diketahui dalam pelajaran anda berjumlahâ€¦</p>', 'pilgan', '[\"27\",\"28\",\"29\",\"30\"]', '[2]', 2, '2023-05-13 02:28:31'),
(324, 2, NULL, '<p>Pembagian makhorijul Huruf (tempat-tempat  keluar huruf) itu teringkas menjadiâ€¦</p>', 'pilgan', '[\"2 mawadhiâ€™\",\"3 mawadhiâ€™\",\"4 mawadhiâ€™\",\"5 mawadhiâ€™\"]', '[3]', 2, '2023-05-13 02:28:32'),
(325, 2, NULL, '<p>Al- Halqi adalah tempat keluar huruf  yang ada pada bagianâ€¦</p>', 'pilgan', '[\"Tenggorokan\",\"Lidah\",\"Lobang mulud\",\"Bibir dua\"]', '[0]', 2, '2023-05-13 02:28:33'),
(326, 2, NULL, '<p>Ronggo hidung merupakan tempat keluar huruf Nun dan Mim bertasydid (gunnah) yang menjadi arti dariâ€¦</p>', 'pilgan', '[\"Al- Jauf\",\"Al -Lisan\",\"Asy- Syafatain\",\"Al-Khoisyum\"]', '[3]', 2, '2023-05-13 02:28:35'),
(327, 2, NULL, '<p>Tempat keluarnya huruf Ù Ùˆ Ø¨ Ù…  adalah â€¦</p>', 'pilgan', '[\"Al- Jauf\",\"Al -Lisan\",\"Asy- Syafatain\",\"Al-Khoisyum\"]', '[2]', 2, '2023-05-13 02:28:36'),
(328, 2, NULL, '<p>Suara Nun mati yang ada diakhir kalimat bakan karena waqof disebutâ€¦</p>', 'pilgan', '[\"Nun Mati\",\"Tanwin\",\"Mim mati\",\"sukun\"]', '[1]', 2, '2023-05-13 02:28:37'),
(329, 2, NULL, '<p>Hukum Nun mati dan tanwin ketika bertemu semua huruf hijaiyah adaâ€¦macam</p>', 'pilgan', '[\"2\",\"3\",\"4\",\"5\"]', '[3]', 2, '2023-05-13 02:28:37'),
(330, 2, NULL, '<p>  Ø¡ Ù‡Ù€ Ø­ Ø¹ Ø® Øº huruf-huruf ini terkenal dengan sebutan hurufâ€¦</p>', 'pilgan', '[\"Halqi\",\"Idghom\",\"Iqlab\",\"Ikhfaâ€™\"]', '[0]', 2, '2023-05-13 02:28:38'),
(331, 2, NULL, '<p>Ù…ÙÙ†Ù’ Ø¨ÙŽØ¹Ù’Ø¯Ù Nun sukun bertemu huruf Baâ€™ dalam contoh ini disebut bacaanâ€¦</p>', 'pilgan', '[\"Idzhar halqi\",\"Idghom bigunnah\",\"Iqlab\",\"Ikhfaâ€™ haqiqi\"]', '[2]', 2, '2023-05-13 02:28:39'),
(332, 2, NULL, '<p>Yang cocok menjadi contoh bacaan idzhar wajib adalahâ€¦</p>', 'pilgan', '[\"Ø£Ù„Ø¯Ù‘ÙÙ†Ù’ÙŠÙŽØ§\",\"Ù…ÙŽÙ†Ù’ ÙŠÙŽÙ‚ÙØ¤Ù„Ù\",\"Ù…ÙÙ†Ù’ Ø±ÙŽØ¨Ù‘ÙÙ‡ÙÙ…Ù’\",\"Ø£ÙŽÙ†Ù’Ø¨ÙÙŠÙŽØ§Ø¡ÙÙ‡Ù€Ù…Ù’\"]', '[0]', 2, '2023-05-13 02:28:39'),
(333, 2, NULL, '<p>Alif lam taâ€™rif (Ø§Ù„) ketika bertemu huruf hijaiyah ada 2 bacaan yaituâ€¦</p>', 'pilgan', '[\"Tiga\",\"Empat\",\"Lima\",\"Enam2\"]', '[1]', 2, '2023-05-13 02:28:39'),
(334, 2, NULL, '<p>  Ù‚ Ø· Ø¨ Ø¬ Ø¯ huruf-huruf ini terkenal dengan sebutan hurufâ€¦</p>', 'pilgan', '[\"Al qomariyah dan Al maâ€™rifat\",\"Al syamsiyah dan Al maâ€™rifat\",\"Al qomariyah dan Al syamsiyah\",\"Al maâ€™rifat dan Al qomary\"]', '[2]', 2, '2023-05-13 02:28:40'),
(335, 2, NULL, '<p>Ketika Mim mati bertemu huruf Baâ€™ dalam suatu lafadz maka dinamakan bacaanâ€¦</p>', 'pilgan', '[\"Qolqolah\",\"Halqi\",\"Idghom\",\"Ikhfaâ€™ Haqiqi\"]', '[0]', 2, '2023-05-13 02:28:40'),
(336, 2, NULL, '<p>Al-Qurâ€™an Surat  Al-Falaq terdiri dariâ€¦</p>', 'pilgan', '[\"Ikhfaâ€™ syafawi\",\"Idghom mistlain\",\"Idzhar syafawi\",\"Idghom bigunnah\"]', '[0]', 2, '2023-05-13 02:28:40'),
(337, 2, NULL, '<p>Nama lain dari bacaan idghom mimi adalahâ€¦</p>', 'pilgan', '[\"3 ayat\",\"4 ayat\",\"5 ayat\",\"6 ayat\"]', '[2]', 2, '2023-05-13 02:28:40'),
(338, 2, NULL, '<p>Al-Qurâ€™an Surat  An-Naas terdiri dariâ€¦</p>', 'pilgan', '[\"Ikhfaâ€™ syafawi\",\"Idghom mistlain\",\"Idzhar syafawi\",\"Idghom bigunnah\"]', '[1]', 2, '2023-05-13 02:28:40'),
(339, 2, NULL, '<p>Lafadz Jalalah(Ø§Ù„Ù„Ù‡) yang didahului harokat kasroh dibacaâ€¦</p>', 'pilgan', '[\"3 ayat\",\"4 ayat\",\"5 ayat\",\"6 ayat\"]', '[3]', 2, '2023-05-13 02:28:41'),
(340, 2, NULL, '<p>Apabila ada bacaan mad asli bertemu huruf hamzah dalam satu kalimat maka disebut bacaanâ€¦</p>', 'pilgan', '[\"Muroqqoqoh (tipis)\",\"Mufakhomah (tebal)\",\"Tafhkim (tebal)\",\"Jawazul wajhain (boleh tipis/tebal)\"]', '[0]', 2, '2023-05-13 02:28:41');

-- --------------------------------------------------------

--
-- Table structure for table `guru`
--

CREATE TABLE `guru` (
  `id` int(11) NOT NULL,
  `pegId` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `walikelas` varchar(10) DEFAULT NULL,
  `jabatan` varchar(50) NOT NULL DEFAULT 'guru',
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `guru`
--

INSERT INTO `guru` (`id`, `pegId`, `name`, `pass`, `walikelas`, `jabatan`, `created_at`) VALUES
(3, 'admin', 'admin', '1234', '1', 'operator', '2024-05-01 09:10:20'),
(12, 'proktor1', 'HERY', 'lab1', '1', 'guru', '2024-05-03 21:54:55'),
(13, 'proktor2', 'NAIM', 'lab2', '2', 'guru', '2024-05-03 21:55:22'),
(14, 'proktor3', 'ANAM', 'lab3', '3', 'guru', '2024-05-03 21:55:22'),
(15, 'proktor4', 'AINUL YAKIN', 'lab4', '4', 'guru', '2024-05-03 21:55:22'),
(16, 'proktor5', 'RIZKY', 'lab4', '5', 'guru', '2024-05-03 21:55:22');

-- --------------------------------------------------------

--
-- Table structure for table `kegiatan`
--

CREATE TABLE `kegiatan` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `thumb` varchar(225) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`id`, `kode`, `name`) VALUES
(1, '9A ', '9A '),
(2, '9B ', '9B '),
(3, '9C ', '9C '),
(4, '9D ', '9D '),
(5, '9E ', '9E '),
(6, '9F ', '9F '),
(7, '9G ', '9G '),
(8, '9H ', '9H ');

-- --------------------------------------------------------

--
-- Table structure for table `materi_category`
--

CREATE TABLE `materi_category` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `materi_data`
--

CREATE TABLE `materi_data` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `creator` varchar(10) NOT NULL,
  `thumb` varchar(150) DEFAULT NULL,
  `tag` varchar(225) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `thumb` varchar(150) DEFAULT NULL,
  `menu` tinyint(1) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `perpus_book`
--

CREATE TABLE `perpus_book` (
  `id` int(11) NOT NULL,
  `isbn` varchar(50) DEFAULT NULL,
  `online` tinyint(1) DEFAULT NULL,
  `judul` varchar(255) NOT NULL,
  `pengarang` varchar(255) NOT NULL,
  `penerbit` varchar(255) NOT NULL,
  `tahun_terbit` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `jumlah_tersedia` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `perpus_peminjaman`
--

CREATE TABLE `perpus_peminjaman` (
  `id` int(11) NOT NULL,
  `id_buku` int(11) NOT NULL,
  `id_anggota` int(11) NOT NULL,
  `tanggal_pinjam` date NOT NULL,
  `tanggal_kembali` date NOT NULL,
  `status` enum('Dipinjam','Kembali') NOT NULL DEFAULT 'Dipinjam',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ruang`
--

CREATE TABLE `ruang` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ruang`
--

INSERT INTO `ruang` (`id`, `name`) VALUES
(1, '1 '),
(2, '2 '),
(3, '3 '),
(4, '4 '),
(5, '5 ');

-- --------------------------------------------------------

--
-- Table structure for table `sesi`
--

CREATE TABLE `sesi` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sesi`
--

INSERT INTO `sesi` (`id`, `name`) VALUES
(1, '1'),
(2, '2 ');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nisn` varchar(15) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `kelas` varchar(10) NOT NULL,
  `ruang` varchar(10) NOT NULL,
  `sesi` varchar(10) NOT NULL,
  `photo` varchar(150) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `nisn`, `pass`, `name`, `kelas`, `ruang`, `sesi`, `photo`, `created_at`) VALUES
(1, '0095769114', '0001', 'AIRIN FAUZIA', '9A', '4', '1', NULL, '2024-04-27 16:23:46'),
(2, '3099628694', '0002', 'ARIFAH', '9A', '4', '1', NULL, '2024-04-27 16:23:46'),
(3, '0093370753', '0003', 'ARINI NUR HIDAYATI', '9A', '4', '1', NULL, '2024-04-27 16:23:46'),
(4, '0081971786', '0004', 'AULI SILVIA ROKHILI', '9A', '4', '1', NULL, '2024-04-27 16:23:46'),
(5, '0096971272', '0005', 'AZZIRA AGESLIANI', '9A', '4', '1', NULL, '2024-04-27 16:23:46'),
(6, '0081463817', '0006', 'BAIQ AIRIN NAZURAH ANWAR', '9A', '4', '1', NULL, '2024-04-27 16:23:46'),
(7, '0092759260', '0007', 'BELA AYU INSANIYAH', '9A', '4', '1', NULL, '2024-04-27 16:23:46'),
(8, '0085185057', '0008', 'DEWI FEBRIYANTI', '9A', '4', '1', NULL, '2024-04-27 16:23:46'),
(9, '0098340350', '0009', 'FAI\'QOTUL HIKMAH', '9A', '4', '1', NULL, '2024-04-27 16:23:46'),
(10, '0086326816', '0010', 'FAJRIATUL MEISILA', '9A', '4', '1', NULL, '2024-04-27 16:23:46'),
(11, '0096568209', '0011', 'FITRI AULIA', '9A', '4', '1', NULL, '2024-04-27 16:23:46'),
(12, '0091171713', '0012', 'HIDAYATUN NAFI\'AH', '9A', '4', '1', NULL, '2024-04-27 16:23:46'),
(13, '0076655080', '0013', 'IDA FITHRIYAH', '9A', '4', '1', NULL, '2024-04-27 16:23:46'),
(14, '0088988166', '0014', 'IKA TRI YULIAWANDA', '9A', '4', '1', NULL, '2024-04-27 16:23:46'),
(15, '0098051711', '0015', 'ILYATUL LAILA', '9A', '4', '1', NULL, '2024-04-27 16:23:46'),
(16, '0107795711', '0016', 'KEYSA PUTRI', '9A', '4', '1', NULL, '2024-04-27 16:23:46'),
(17, '0098494688', '0017', 'KHUSNUL KHOTIMAH', '9A', '4', '1', NULL, '2024-04-27 16:23:46'),
(18, '0086061476', '0018', 'MARTA ROSDIANA', '9A', '4', '1', NULL, '2024-04-27 16:23:46'),
(19, '0096184357', '0019', 'MAULA SILVIA MINATA', '9A', '4', '1', NULL, '2024-04-27 16:23:46'),
(20, '3098872669', '0020', 'MIFTA ULUL AZMI', '9A', '4', '1', NULL, '2024-04-27 16:23:46'),
(21, '0092777080', '0021', 'MIRZA AYU AMALIAH', '9A', '5', '1', NULL, '2024-04-27 16:23:46'),
(22, '0085349791', '0022', 'MUFIDATUL JAZILAH', '9A', '5', '1', NULL, '2024-04-27 16:23:46'),
(23, '0094056778', '0023', 'MUSTIKA HANDRIYANI', '9A', '5', '1', NULL, '2024-04-27 16:23:46'),
(24, '0097258460', '0024', 'NADIA ALHOLIFI', '9A', '5', '1', NULL, '2024-04-27 16:23:46'),
(25, '0084205653', '0025', 'NADIA SILVI YOLANDA', '9A', '5', '1', NULL, '2024-04-27 16:23:46'),
(26, '0109974446', '0026', 'NADIFATUL KAROMAH', '9A', '5', '1', NULL, '2024-04-27 16:23:46'),
(27, '0097414370', '0027', 'NAFISA BAROTUTTAKIYA', '9A', '5', '1', NULL, '2024-04-27 16:23:46'),
(28, '0089311289', '0028', 'NAMIRA ISMAWATI', '9A', '5', '1', NULL, '2024-04-27 16:23:46'),
(29, '3093589704', '0047', 'NAQIYYA IKFI FAZA AMELIYA', '9A', '5', '1', NULL, '2024-04-27 16:23:46'),
(30, '0099985887', '0049', 'NOER AZIZAH', '9A', '5', '1', NULL, '2024-04-27 16:23:46'),
(31, '0097235248', '0054', 'SAFINATUL INAYA', '9A', '5', '1', NULL, '2024-04-27 16:23:46'),
(32, '0085041087', '0059', 'SALSABILA OKTAVIANI', '9A', '5', '1', NULL, '2024-04-27 16:23:46'),
(33, '0093199562', '0066', 'SILVIATUL AMALIA', '9A', '5', '1', NULL, '2024-04-27 16:23:46'),
(34, '0096657183', '0078', 'SITI APRILLIYA AIRIN NUR ASYFA', '9A', '5', '1', NULL, '2024-04-27 16:23:46'),
(35, '0072358576', '0081', 'SITI MAISAROH', '9A', '5', '1', NULL, '2024-04-27 16:23:46'),
(36, '0098699493', '0082', 'UNZILA RIZKYKA', '9A', '5', '1', NULL, '2024-04-27 16:23:46'),
(37, '0093511444', '0086', 'USWATUN HASANAH', '9A', '5', '1', NULL, '2024-04-27 16:23:46'),
(38, '0091309516', '0092', 'VIRA AGUSTIN', '9A', '5', '1', NULL, '2024-04-27 16:23:46'),
(39, '0099266492', '0103', 'ZIDA HIMAYATUL MAULA', '9A', '5', '1', NULL, '2024-04-27 16:23:46'),
(40, '0094924843', '0117', 'ACH. RAFFI ALBURTOMY', '9B', '3', '1', NULL, '2024-04-27 16:23:46'),
(41, '0089737127', '0137', 'AHMAD UBAIDILLAH', '9B', '3', '1', NULL, '2024-04-27 16:23:46'),
(42, '0099268622', '0171', 'M. KATIBUL UMAM', '9B', '3', '1', NULL, '2024-04-27 16:23:46'),
(43, '0095511204', '0218', 'M. ALI RIDHO', '9C', '3', '1', NULL, '2024-04-27 16:23:46'),
(44, '0094290499', '0221', 'M. HARJAYA INDRA SURAHMAN', '9C', '3', '1', NULL, '2024-04-27 16:23:46'),
(45, '0088047337', '0230', 'MOCHAMAD MARTAUL WILDAN', '9C', '3', '1', NULL, '2024-04-27 16:23:46'),
(46, '3093197379', '0030', 'MUHAMMAD GABRIEL AR RIDHO', '9C', '3', '1', NULL, '2024-04-27 16:23:46'),
(47, '0083434349', '0035', 'MUHAMMAD WAHYU PRAYOGA', '9C', '3', '1', NULL, '2024-04-27 16:23:46'),
(48, '0095167824', '0051', 'M. ANDIKA RAIHAN AFANDI', '9D', '3', '1', NULL, '2024-04-27 16:23:46'),
(49, '0096609258', '0053', 'M. FATHIR AMSA REZA', '9D', '3', '1', NULL, '2024-04-27 16:23:46'),
(50, '3086610931', '0061', 'M.IQBAL RAMADHAN', '9D', '3', '1', NULL, '2024-04-27 16:23:46'),
(51, '0082103601', '0069', 'MUHAMMAD IKLIL', '9D', '3', '1', NULL, '2024-04-27 16:23:46'),
(52, '3076248606', '0073', 'MUHAMMAD SAIFIR RIJAL', '9D', '3', '1', NULL, '2024-04-27 16:23:46'),
(53, '3084439756', '0079', 'ROIHUL JINAN', '9D', '3', '1', NULL, '2024-04-27 16:23:46'),
(54, '0097127573', '0083', 'SULTON ARIFIN', '9D', '3', '1', NULL, '2024-04-27 16:23:46'),
(55, '0099058846', '0101', 'ANDRI KURNIAWAN', '9E', '3', '1', NULL, '2024-04-27 16:23:46'),
(56, '3096179628', '0114', 'M. SAKTIAJI EKA MAULANA', '9E', '3', '1', NULL, '2024-04-27 16:23:46'),
(57, '0075690323', '0124', 'MUHAMMAD FAHRIL ROKIBUL AKBAR', '9E', '3', '1', NULL, '2024-04-27 16:23:46'),
(58, '0089521067', '0135', 'RIFKI SAUKI ALI', '9E', '3', '1', NULL, '2024-04-27 16:23:46'),
(59, '0074279550', '0146', 'AHMAD DHANI NOVAL HOIRON', '9F', '3', '1', NULL, '2024-04-27 16:23:46'),
(60, '3080606960', '0147', 'AHMAD NUR FUAD', '9F', '3', '1', NULL, '2024-04-27 16:23:46'),
(61, '0095916411', '0150', 'M. ALDI', '9F', '3', '1', NULL, '2024-04-27 16:23:46'),
(62, '0098980246', '0151', 'M. ALI FAHMI', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(63, '0091261241', '0152', 'M. ALVI NURRAHMAN', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(64, '0083447274', '0153', 'M. DIMAS ILFALAKH', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(65, '0088492633', '0154', 'M. IBNU ABBAS', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(66, '0094651803', '0155', 'M. IDRIS', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(67, '0091275046', '0157', 'M. JAMALI', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(68, '0072954636', '0158', 'M. KHOIRIL MAJID', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(69, '0081067907', '0162', 'M. RIFQI MAULUDIN', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(70, '0087784982', '0164', 'M. SALMAN AL FARISI', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(71, '0099541261', '0167', 'M. SOHBI', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(72, '0083199675', '0169', 'M.FIRMAN MAULANA', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(73, '0088499785', '0170', 'M.KEVIN FERDIANSYAH', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(74, '3084767612', '0172', 'MAULANA HILMI', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(75, '3095086635', '0173', 'MISBAHUL RIZAL', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(76, '0095304078', '0176', 'MOH ALBADRU TAMAM', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(77, '0085431320', '0177', 'MUCH. FARCHANUL UMAM', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(78, '0087067474', '0179', 'MUHAMMAD ALI RIDHO', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(79, '0083609616', '0180', 'MUHAMMAD DANIL ASLAM', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(80, '0097216992', '0181', 'MUHAMMAD FAJAR SIDDIQ', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(81, '0084220971', '0182', 'MUHAMMAD HAMZAH', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(82, '0084517348', '0183', 'MUHAMMAD MARVEL KHAIDAR', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(83, '0096427848', '0185', 'MUHAMMAD RAFI', '9F', '3', '2', NULL, '2024-04-27 16:23:46'),
(84, '0095402363', '0212', 'MUHAMMAD RAMADHANI', '9F', '4', '2', NULL, '2024-04-27 16:23:46'),
(85, '0072682381', '0217', 'MUHAMMAD RIZKI ROMADHONI', '9F', '4', '2', NULL, '2024-04-27 16:23:46'),
(86, '0083367948', '0234', 'MUHAMMAD SUFIYULLOH', '9F', '4', '2', NULL, '2024-04-27 16:23:46'),
(87, '0083231873', '0235', 'MUHAMMAD SYAHRU ROMADHON', '9F', '4', '2', NULL, '2024-04-27 16:23:46'),
(88, '3089494583', '0236', 'MUHAMMAD YUNUS', '9F', '4', '2', NULL, '2024-04-27 16:23:46'),
(89, '0087425111', '0237', 'MUHAMMAD ZIDAN IRFANI', '9F', '4', '2', NULL, '2024-04-27 16:23:46'),
(90, '0083744277', '0238', 'MUKHAMMAD FAJRUL AMININ', '9F', '4', '2', NULL, '2024-04-27 16:23:46'),
(91, '0086491785', '0239', 'NU\'MAN ILZAM', '9F', '4', '2', NULL, '2024-04-27 16:23:46'),
(92, '0088276044', '0240', 'SAMSUL RIZAL ANNASIH', '9F', '4', '2', NULL, '2024-04-27 16:23:46'),
(93, '0097276112', '0241', 'A. ROBITUL FAWAID', '9G', '4', '2', NULL, '2024-04-27 16:23:46'),
(94, '0082376143', '0242', 'ABD. AZIZ', '9G', '4', '2', NULL, '2024-04-27 16:23:46'),
(95, '0089363885', '0243', 'ABD. MUJIB', '9G', '4', '2', NULL, '2024-04-27 16:23:46'),
(96, '0087319281', '0244', 'AHMAD HASAN', '9G', '4', '2', NULL, '2024-04-27 16:23:46'),
(97, '0089935054', '0245', 'EGI PRASETIO', '9G', '4', '2', NULL, '2024-04-27 16:23:46'),
(98, '0086295694', '0246', 'ILHAM RAMADHAN', '9G', '4', '2', NULL, '2024-04-27 16:23:46'),
(99, '0085089523', '0249', 'M. ANDIKA RAHMAN', '9G', '4', '2', NULL, '2024-04-27 16:23:46'),
(100, '0083642266', '0250', 'M. BAHRIL AMRIAN', '9G', '4', '2', NULL, '2024-04-27 16:23:46'),
(101, '0082508068', '0251', 'M. JUNIOR PRATAMA', '9G', '4', '2', NULL, '2024-04-27 16:23:46'),
(102, '0095671467', '0252', 'M. MAULANA MULTAZAM', '9G', '4', '2', NULL, '2024-04-27 16:23:46'),
(103, '0082007457', '0254', 'M. NUR HIDAYATULLOH', '9G', '4', '2', NULL, '2024-04-27 16:23:46'),
(104, '0098855120', '0255', 'M. RISKI CANDRAKIRANA', '9G', '4', '2', NULL, '2024-04-27 16:23:46'),
(105, '0098353258', '0257', 'M. SULTHON NAJI JULIANTO', '9G', '4', '2', NULL, '2024-04-27 16:23:46'),
(106, '0081441348', '0259', 'M.HIZGIL', '9G', '5', '2', NULL, '2024-04-27 16:23:46'),
(107, '0086900447', '0260', 'MISBAHUL ULUM', '9G', '5', '2', NULL, '2024-04-27 16:23:46'),
(108, '0087419338', '0262', 'MOCH ULUL ALBAB', '9G', '5', '2', NULL, '2024-04-27 16:23:46'),
(109, '3088701619', '0264', 'MUCHAMAD KURNIA FAJAR IRMANSYAH', '9G', '5', '2', NULL, '2024-04-27 16:23:47'),
(110, '0086079057', '0265', 'MUHAMAD ARIEF PRATAMA', '9G', '5', '2', NULL, '2024-04-27 16:23:47'),
(111, '0095377550', '0266', 'MUHAMAD KHOIRUL', '9G', '5', '2', NULL, '2024-04-27 16:23:47'),
(112, '0084501355', '0267', 'MUHAMMAD ARIF SETIAWAN', '9G', '5', '2', NULL, '2024-04-27 16:23:47'),
(113, '0086554185', '0269', 'MUHAMMAD FAJAR HABIBI', '9G', '5', '2', NULL, '2024-04-27 16:23:47'),
(114, '0095779214', '0270', 'MUHAMMAD GOLEB', '9G', '5', '2', NULL, '2024-04-27 16:23:47'),
(115, '0083352990', '0273', 'MUHAMMAD ROMZI', '9G', '5', '2', NULL, '2024-04-27 16:23:47'),
(116, '0092732325', '0274', 'MUHAMMAD WAFA IZUL ULUM', '9G', '5', '2', NULL, '2024-04-27 16:23:47'),
(117, '0082753984', '0276', 'SALMAN AL-FARISI', '9G', '5', '2', NULL, '2024-04-27 16:23:47'),
(118, '0081063856', '0277', 'SHOHIBUN NI\'AM', '9G', '5', '2', NULL, '2024-04-27 16:23:47'),
(119, '0092313883', '0278', 'SIFAUL KULUP', '9G', '5', '2', NULL, '2024-04-27 16:23:47'),
(120, '0084233961', '0279', 'ZAINUL ARIFIN', '9G', '5', '2', NULL, '2024-04-27 16:23:47'),
(121, '0094914353', '0280', 'ZULFAN RIZKY', '9G', '5', '2', NULL, '2024-04-27 16:23:47'),
(122, '0089636969', '0258', 'M. ZAENI', '9G', '5', '2', NULL, '2024-04-27 16:23:47'),
(123, '0093804353', '0261', 'MOCH ROYKHAN MUBAROK', '9G', '5', '2', NULL, '2024-04-27 16:23:47'),
(124, '0077538048', '0263', 'MOH. RIZKIANSYAH', '9G', '5', '2', NULL, '2024-04-27 16:23:47'),
(125, '0072799464', '0268', 'MUHAMMAD DAVA IZZULHAQ', '9G', '5', '2', NULL, '2024-04-27 16:23:47'),
(126, '3085382316', '0271', 'MUHAMMAD RIDHO ALFRIDO', '9G', '5', '2', NULL, '2024-04-27 16:23:47'),
(127, '0083966128', '0272', 'MUHAMMAD RIDWAN', '9G', '5', '2', NULL, '2024-04-27 16:23:47'),
(128, '0069295023', '0275', 'NURUL HUDA', '9G', '5', '2', NULL, '2024-04-27 16:23:47'),
(129, '0094093726', '0109', 'A. FIRIYADIL JINAN', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(130, '0082223811', '0111', 'ABD. AZIZ YULIANTO', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(131, '0095688611', '0120', 'ACHMAD AGIL ASSUDAISY', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(132, '0078830178', '0121', 'ACHMAD FAHMIN ILMI ANANTO', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(133, '0085343445', '0123', 'ACHMAD YAQUT AL MUJAHID', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(134, '0093045161', '0125', 'ADAM PRIHAMBODO', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(135, '0063164765', '0134', 'ADITYA FERDIANSYAH AHMAD', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(136, '0088048449', '0136', 'AHMAD IRFAN RAMADANI', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(137, '0083447991', '0148', 'AHMAD WAHYU ZAKI SAPUTRA', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(138, '3093155044', '0156', 'AKBAR DWI MAULANA', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(139, '0095149579', '0159', 'ALI AKBAR RAFRANJANI', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(140, '0086426198', '0160', 'FARIS ROBIUL ANWAR', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(141, '3084856976', '0161', 'M. AINUR ROFIK', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(142, '0092226256', '0163', 'M. ANDIKA ARIYANTO', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(143, '0087691640', '0165', 'M. ARIFIN ILHAM', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(144, '0084710102', '0168', 'M. BASID', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(145, '0097651591', '0174', 'M. LUKMAN HAKIM', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(146, '0085460348', '0175', 'M. VICKY ANDRIANSYAH', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(147, '0085868743', '0178', 'MOCHAMMAD ANAS AZHARI', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(148, '0082338611', '0184', 'MOHAMMAD REDI KURNIAWAN', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(149, '0072151939', '0186', 'MUCHAMAD DANANG RIVIANSYAH', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(150, '3092831015', '0187', 'MUH. IDRIS ABDULLOH', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(151, '3086357175', '0188', 'MUHAMAD JEINAL ABIDIN', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(152, '0089656938', '0189', 'MUHAMAD WAHYU PERMADI', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(153, '0083686544', '0190', 'MUHAMMAD ALI RIDHO', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(154, '0095611940', '0191', 'MUHAMMAD AMINULLOH', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(155, '0083903014', '0192', 'MUHAMMAD ASHFIYAK', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(156, '0087461976', '0193', 'MUHAMMAD FIRDAUS', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(157, '0099549717', '0194', 'MUHAMMAD KHAULAN ARDILLAH', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(158, '0087099903', '0195', 'MUHAMMAD SAIFUL RIZAL', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(159, '0087383115', '0196', 'MUHAMMAD SU\'UDI', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(160, '0083629092', '0197', 'MUHAMMAD UBAIDILLAH', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(161, '0095953336', '0198', 'MUKHAMMAD GABRIEL ABDUL ALEM', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(162, '0081976306', '0199', 'MUKHAMMAD ILHAM ANDRIANSYAH', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(163, '0082712401', '0200', 'MUKHAMMAD KHOIRUL ANWAR', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(164, '0083510340', '0201', 'SIGIT AJRIL MAULANA', '9B', '1', '1', NULL, '2024-04-27 16:23:47'),
(165, '0096965352', '0202', 'A. DEMAS ARIYANTA', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(166, '0077050117', '0203', 'ABDUL ALIM ROMADHONI', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(167, '0089106172', '0204', 'ACH.QUSYAIRI', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(168, '0081601193', '0205', 'AHMAD MAZANI', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(169, '0073438542', '0206', 'AHMAD MUJETABAH', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(170, '0083014903', '0207', 'AKHMAD DIWANGGA', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(171, '0099816901', '0208', 'ALFIN FEBRIAN AHMAD', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(172, '0098644346', '0209', 'AMINUR ROZIQIN', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(173, '0087300657', '0210', 'ANDHIKA AIDY TRIO UTAMA', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(174, '0088212304', '0211', 'HAIKAL ABDULLAH FAQIH', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(175, '0093665521', '0213', 'HAMDAN RIPQI', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(176, '0089835935', '0214', 'HARIS', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(177, '0099875143', '0215', 'HOIRUL ANWAR', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(178, '0084504318', '0216', 'HOLILUR ROHMAN', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(179, '0085691423', '0219', 'M. AMIN MASRURO', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(180, '0095464756', '0220', 'M. FAHRI', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(181, '0084159355', '0222', 'M. NOVAL SYARIF', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(182, '0085062799', '0223', 'M. SALMAN ALFARIZ', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(183, '0081430992', '0224', 'M. TAUFIQUR ROHMAN', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(184, '0088131121', '0225', 'M. TAZAKA ALIL QODAR', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(185, '0083640490', '0226', 'M. WAHYU ADITYA PRATAMA', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(186, '0087581953', '0227', 'MAULITDIN', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(187, '0098250361', '0228', 'MOCH. ANSORI', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(188, '0078082650', '0229', 'MOCH. MUHSI ARISANDI', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(189, '0084217903', '0231', 'MUCHAMMAD TEGAR ARIFIANTO', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(190, '0083073225', '0232', 'MUCHAMMAD ULIL ABSOR', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(191, '0087742053', '0233', 'MUHAMMAD AZKIYA\'', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(192, '0079790806', '0029', 'MUHAMMAD FAISAL SETIAWAN', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(193, '0084732628', '0031', 'MUHAMMAD QORIBULLOH AKBAR', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(194, '0083539137', '0032', 'MUHAMMAD REZA', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(195, '0087921991', '0033', 'MUHAMMAD ROBITULLOH', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(196, '0084475651', '0034', 'MUHAMMAD SYAHRUL HASAN', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(197, '0093488926', '0036', 'MUKHAMMAD ZAINUL ULUM', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(198, '0096475936', '0037', 'SLAMET HIDAYAT', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(199, '0082066749', '0038', 'SYAKIR NUMANI', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(200, '0076880784', '0039', 'TARIK ALBI', '9C', '1', '2', NULL, '2024-04-27 16:23:47'),
(201, '0075996748', '0040', 'A. RIDO ATO\'ADDIN', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(202, '0097343640', '0041', 'ACHMAD ZAKARIA', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(203, '3087364366', '0042', 'AHMAD HOIRON NASIRIN', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(204, '0097688567', '0043', 'AKHMAD YANUAR ABDILLAH', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(205, '0081412247', '0044', 'AMAR MAKKUR', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(206, '0081137608', '0045', 'FAIZUL MUHTAR', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(207, '0085402579', '0046', 'KHOIRUL AMILUDDIN', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(208, '0091691974', '0048', 'KHOIRUL ANAM', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(209, '0086895380', '0050', 'M. ABD WASI\'', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(210, '3080324985', '0052', 'M. ATIRIL LA\'ALI', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(211, '0087515788', '0055', 'M. FATHURROZZI', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(212, '0088068561', '0056', 'M. KHAFID SARIFUDDIN', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(213, '0083531728', '0057', 'M. KHOIRUL WILDAN', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(214, '0085697972', '0058', 'M. SOBIRIN', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(215, '0085074126', '0060', 'M. SOFYAN AL FAREZA', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(216, '0089651218', '0062', 'MOCH WILDAN ZUBAIDI', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(217, '0085521639', '0063', 'MOCH. REIVAN HERLAMBANG', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(218, '0093730957', '0064', 'MOCHAMMAD IQBAL RAFI AFNAN', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(219, '0084092661', '0065', 'MOCHAMMAD ROYKHAN', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(220, '0085851121', '0067', 'MOH. SAIFULLOH', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(221, '0091579080', '0068', 'MU\'ALFI FAHRI FAROGHI', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(222, '0072230938', '0070', 'MUHAMMAD IQBAL KHOIRONI', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(223, '0096769316', '0071', 'MUHAMMAD ISMAIL HASANI', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(224, '0084275054', '0072', 'MUHAMMAD MUQORROBIN ARZAQ', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(225, '0081407470', '0074', 'MUKHAMMAD FARIS', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(226, '0081010409', '0075', 'NONO SATRIO WIJOYO', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(227, '0081726031', '0076', 'NOVEL DANIAL AZKA', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(228, '3097119125', '0077', 'NU\'\'MAN MUKHAMMAD HUDA', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(229, '0091460205', '0080', 'SULTAN ABU BAKAR', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(230, '0088851746', '0084', 'SYAHRUL MUZACKI', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(231, '3085786478', '0085', 'SYAHRUL ROMADHONI', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(232, '3093167847', '0087', 'TONI EFENDI', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(233, '0082032834', '0088', 'WAHYU AJI ALVAN PUTRA SATRIA', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(234, '0089246766', '0089', 'WAHYU CANDRA ADI NINGRAT', '9D', '2', '1', NULL, '2024-04-27 16:23:47'),
(235, '0083403743', '0090', 'ABD. HAMID', '9E', '2', '1', NULL, '2024-04-27 16:23:47'),
(236, '0072812723', '0091', 'ABDULLOH', '9E', '2', '1', NULL, '2024-04-27 16:23:47'),
(237, '3098859401', '0093', 'ACHMAD FADLY  RAMADHANY', '9E', '2', '1', NULL, '2024-04-27 16:23:47'),
(238, '0089358947', '0094', 'AGUS SETIAWAN', '9E', '2', '1', NULL, '2024-04-27 16:23:47'),
(239, '0092656252', '0095', 'AHMAD MAULANA ALI AKBAR', '9E', '2', '1', NULL, '2024-04-27 16:23:47'),
(240, '0084454560', '0096', 'AHMAD RIZKI TOFANI', '9E', '2', '1', NULL, '2024-04-27 16:23:47'),
(241, '0094810977', '0097', 'AHMAD SAMHAR BAMBANG PRASETIYO', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(242, '0096680283', '0098', 'AKHMAT TAUFIQUR ROHMAN', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(243, '0085839769', '0099', 'ALIEF NOER HIDAYAT PRATAMA', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(244, '0098371877', '0100', 'ANANDA SAFA RIZQILLAH', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(245, '0078232379', '0102', 'ARIS TUTAILES', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(246, '0082699439', '0104', 'IKROM FERDIANSYAH ROHMANI', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(247, '3085156024', '0105', 'M. ANDIKA RIFQI MAULANA', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(248, '0091206709', '0106', 'M. IMRON ROSYADI', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(249, '3099255942', '0107', 'M. IRHAM ZUHDI FAHMI', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(250, '0078765314', '0108', 'M. ISMAIL', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(251, '0097476207', '0110', 'M. KHOIRUL ANAM', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(252, '0099807342', '0112', 'M. NARJUL MUBAROK', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(253, '0093137823', '0113', 'M. NASRULLOH', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(254, '0085311498', '0115', 'M. YAHYA NUR ROMADONI', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(255, '0096575770', '0116', 'MOCH. MUWAFI FAIRUS ABADI', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(256, '0084573554', '0118', 'MOH. RIZIQ', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(257, '0085772276', '0119', 'MOKHAMAD ADAM MALIKUR ROMA', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(258, '0097187636', '0122', 'MUHAMMAD AMINUR ROHMAN', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(259, '0099441335', '0126', 'MUHAMMAD IHSANUDIN', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(260, '0086351115', '0127', 'MUHAMMAD MUKHLAS', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(261, '0095683971', '0128', 'MUHAMMAD MUZAKY ZAKARYA', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(262, '0082670104', '0129', 'MUHAMMAD NAZRIL ILHAM', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(263, '0094724666', '0130', 'MUKHAMMAD AHADUL MAJIID', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(264, '0082940351', '0131', 'NAUFAL ILYES . R', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(265, '0083688294', '0132', 'NURUS SYAFI\' AL HADI', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(266, '0083080385', '0133', 'RAFI MAHMUDI', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(267, '0086182222', '0138', 'RIZKI HIDAYATULLOH', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(268, '0086628184', '0139', 'SONY HAMDANI', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(269, '0095267699', '0140', 'ZIDANIL ARDAN', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(270, '0084021962', '0141', 'M. DIMAS ASRORI', '9E', '2', '2', NULL, '2024-04-27 16:23:47'),
(271, '0082131893', '0142', 'ABD.ROZZAQ', '9F', '2', '2', NULL, '2024-04-27 16:23:47'),
(272, '0081054785', '0143', 'ACH.ZAKY YUSRON AL MUSYARROF', '9F', '2', '2', NULL, '2024-04-27 16:23:47'),
(273, '0094078556', '0144', 'ACHMAD AGUS SYA\'BANI', '9F', '2', '2', NULL, '2024-04-27 16:23:47'),
(274, '0085017810', '0145', 'ACHMAD NAHIJUDDIN', '9F', '2', '2', NULL, '2024-04-27 16:23:47'),
(275, '0072054976', '0149', 'BAMBANG NUR MAULANA', '9F', '2', '2', NULL, '2024-04-27 16:23:47'),
(276, '0086768650', '0166', 'M. SALMAN AL FARIZI', '9F', '2', '2', NULL, '2024-04-27 16:23:47'),
(277, '0074104615', '0247', 'IMAM UROIDI', '9G', '2', '2', NULL, '2024-04-27 16:23:47'),
(278, '0085941763', '0248', 'M FURQONUL YAQIN', '9G', '2', '2', NULL, '2024-04-27 16:23:47'),
(279, '0093549043', '0253', 'M. MUKHDOR', '9G', '2', '2', NULL, '2024-04-27 16:23:47'),
(280, '0089036077', '0256', 'M. SULAIMAN ZAMZANI', '9G', '2', '2', NULL, '2024-04-27 16:23:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cbt_list`
--
ALTER TABLE `cbt_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cbt_result`
--
ALTER TABLE `cbt_result`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cbt_soal`
--
ALTER TABLE `cbt_soal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guru`
--
ALTER TABLE `guru`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pegId` (`pegId`);

--
-- Indexes for table `kegiatan`
--
ALTER TABLE `kegiatan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `materi_category`
--
ALTER TABLE `materi_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `materi_data`
--
ALTER TABLE `materi_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `perpus_book`
--
ALTER TABLE `perpus_book`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `perpus_peminjaman`
--
ALTER TABLE `perpus_peminjaman`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ruang`
--
ALTER TABLE `ruang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sesi`
--
ALTER TABLE `sesi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nisn` (`nisn`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cbt_list`
--
ALTER TABLE `cbt_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cbt_result`
--
ALTER TABLE `cbt_result`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `cbt_soal`
--
ALTER TABLE `cbt_soal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=351;

--
-- AUTO_INCREMENT for table `guru`
--
ALTER TABLE `guru`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `kegiatan`
--
ALTER TABLE `kegiatan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `materi_category`
--
ALTER TABLE `materi_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `materi_data`
--
ALTER TABLE `materi_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perpus_book`
--
ALTER TABLE `perpus_book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perpus_peminjaman`
--
ALTER TABLE `perpus_peminjaman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ruang`
--
ALTER TABLE `ruang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sesi`
--
ALTER TABLE `sesi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=281;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

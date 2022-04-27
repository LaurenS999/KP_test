-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 06 Nov 2020 pada 10.01
-- Versi server: 10.1.46-MariaDB-cll-lve
-- Versi PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skdevtec_poskopizio`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) DEFAULT NULL,
  `category_delete` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_delete`) VALUES
(8, 'Pos Coffee', 0),
(9, 'Pos Susu', 0),
(10, 'Pos Fresh', 0),
(11, 'Makanan', 0),
(12, 'Promo', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `menu`
--

CREATE TABLE `menu` (
  `menu_id` int(11) NOT NULL,
  `menu_code` varchar(100) DEFAULT NULL,
  `menu_name` varchar(100) DEFAULT NULL,
  `menu_sell_price` double DEFAULT NULL,
  `menu_discount` double DEFAULT NULL,
  `menu_out_of_stock` int(11) DEFAULT NULL,
  `menu_img_ext` char(5) DEFAULT NULL,
  `menu_delete` int(11) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `menu`
--

INSERT INTO `menu` (`menu_id`, `menu_code`, `menu_name`, `menu_sell_price`, `menu_discount`, `menu_out_of_stock`, `menu_img_ext`, `menu_delete`, `category_id`, `store_id`) VALUES
(219, 'Pos Coffee', 'Excreamy Coffee', 10000, 0, 0, 'jpg', 0, 8, 1),
(220, 'Pos Susu', 'Choco Banana', 10000, 0, 0, 'jpg', 0, 9, 1),
(221, 'Pos Fresh', 'Cute Lemonade', 10000, 0, 0, 'jpg', 0, 10, 1),
(222, 'Pos Susu', 'Choco Nano', 10000, 0, 0, 'jpg', 0, 9, 1),
(223, 'Pos Coffee', 'Kosa Coffee', 10000, 0, 0, 'jpg', 0, 8, 1),
(224, 'Pos Coffee', 'Black Coffee', 10000, 0, 0, 'jpg', 0, 8, 4),
(225, 'Pos Coffee', 'Kosa Coffee', 10000, 0, 0, 'jpg', 0, 8, 4),
(226, 'Pos Coffee', 'Excreamy Coffee', 10000, 0, 0, 'jpg', 0, 8, 4),
(227, 'Pos Coffee', 'Caramel Coffee', 12000, 0, 0, 'jpg', 0, 8, 4),
(228, 'Pos Coffee', 'Hazelnut Coffee', 12000, 0, 0, 'jpg', 0, 8, 4),
(229, 'Pos Coffee', 'Tiramisu Coffee', 12000, 0, 0, 'jpg', 0, 8, 4),
(230, 'Pos Coffee', 'Vanilla Coffee', 12000, 0, 0, 'jpg', 0, 8, 4),
(231, 'Pos Coffee', 'Kosula Coffee', 10000, 0, 0, 'jpg', 0, 8, 4),
(232, 'Pos Coffee', 'Kiwi Coffee', 12000, 0, 0, 'jpg', 0, 8, 4),
(233, 'Pos Coffee', 'Banana Coffee', 12000, 0, 0, 'jpg', 0, 8, 4),
(234, 'Pos Fresh', 'Cute Lemonade', 10000, 0, 0, 'jpg', 0, 10, 4),
(235, 'Pos Susu', 'Rum Regal', 15000, 0, 0, 'jpg', 0, 9, 4),
(236, 'Pos Susu', 'Vanilla Regal', 12000, 0, 0, 'jpg', 0, 9, 4),
(237, 'Pos Susu', 'Choco Banana', 10000, 0, 0, 'jpg', 0, 9, 4),
(238, 'Pos Susu', 'Choco Classy', 10000, 0, 0, 'jpg', 0, 9, 4),
(239, 'Pos Susu', 'Choco Nano', 10000, 0, 0, 'jpg', 0, 9, 4),
(240, 'Pos Susu', 'I Purple You', 10000, 0, 0, 'jpg', 0, 9, 4),
(241, 'Pos Coffee', 'Black Coffee', 10000, 0, 0, 'jpg', 0, 8, 1),
(242, 'Pos Susu', 'Banana', 10000, 0, 0, 'jpg', 0, 9, 4),
(243, 'Pos Susu', 'Red Velvet', 10000, 0, 0, 'jpg', 0, 9, 4),
(244, 'Pos Susu', 'Manis Matcha', 10000, 0, 0, 'jpg', 0, 9, 4),
(245, 'Pos Coffee', 'Kosula Coffee', 10000, 0, 0, 'jpg', 0, 8, 1),
(246, 'Pos Susu', 'Crazy Grape', 10000, 0, 0, 'jpg', 0, 9, 4),
(247, 'Pos Susu', 'Bubbly Mood', 10000, 0, 0, 'jpg', 0, 9, 4),
(248, 'Pos Susu', 'Blue Nano', 10000, 0, 0, 'jpg', 0, 9, 4),
(249, 'Pos Coffee', 'Caramel Coffee', 12000, 0, 0, 'jpg', 0, 8, 1),
(250, 'Pos Coffee', 'Vanilla Coffee', 12000, 0, 0, 'jpg', 0, 8, 1),
(251, 'Pos Coffee', 'Hazelnut Coffee', 12000, 0, 0, 'jpg', 0, 8, 1),
(252, 'Pos Coffee', 'Tiramisu Coffee', 12000, 0, 0, 'jpg', 0, 8, 1),
(253, 'Pos Coffee', 'Kiwi Coffee', 12000, 0, 0, 'jpg', 0, 8, 1),
(254, 'Pos Coffee', 'Banana Coffee', 12000, 0, 0, 'jpg', 0, 8, 1),
(255, 'Pos Susu', 'Red Velvet', 10000, 0, 0, 'jpg', 0, 9, 1),
(256, 'Pos Susu', 'I Purple U', 10000, 0, 0, 'jpg', 0, 9, 1),
(257, 'Pos Susu', 'Manis Matcha', 10000, 0, 0, 'jpg', 0, 9, 1),
(258, 'Pos Susu', 'Banana', 10000, 0, 0, 'jpg', 0, 9, 1),
(259, 'Pos Susu', 'Crazy Grape', 10000, 0, 0, 'jpg', 0, 9, 1),
(260, 'Pos Susu', 'Bluenano', 10000, 0, 0, 'jpg', 0, 9, 1),
(261, 'Pos Susu', 'Choco Classy', 10000, 0, 0, 'jpg', 0, 9, 1),
(262, 'Pos Susu', 'Bubbly Mood', 10000, 0, 0, 'jpg', 0, 9, 1),
(263, 'Pos Susu', 'Rum Regal', 15000, 0, 0, 'jpg', 0, 9, 1),
(264, 'Pos Susu', 'Vanilla Regal', 12000, 0, 0, 'jpg', 0, 9, 1),
(265, 'Pos Coffee', 'Kosa Coffee', 10000, 0, 0, 'jpg', 0, 8, 2),
(266, 'Pos Coffee', 'Kosa Coffee', 10000, 0, 0, 'jpg', 1, 8, 2),
(267, 'Pos Coffee', 'Caramel Coffee', 12000, 0, 0, 'jpg', 0, 8, 2),
(268, 'Pos Coffee', 'Excreamy Coffee', 10000, 0, 0, 'jpg', 0, 8, 2),
(269, 'Pos Coffee', 'Vanilla Coffee', 12000, 0, 0, 'jpg', 0, 8, 2),
(270, 'Pos Coffee', 'Hazelnut Coffee', 12000, 0, 0, 'jpg', 0, 8, 2),
(271, 'Pos Coffee', 'Tiramisu Coffee', 12000, 0, 0, 'jpg', 0, 8, 2),
(272, 'Promo', 'Buy 3 Only 25k all variant', 25000, 0, 0, 'jpg', 0, 12, 1),
(273, 'Pos Coffee', 'Kiwi Coffee', 12000, 0, 0, 'jpg', 0, 8, 3),
(274, 'Pos Coffee', 'Banana Coffee', 12000, 0, 0, 'jpg', 0, 8, 3),
(275, 'Pos Susu', 'Vanilla Regal', 12000, 0, 0, 'jpg', 0, 9, 3),
(276, 'Pos Fresh', 'Cute Lemonade', 10000, 0, 0, 'jpg', 0, 10, 3),
(277, 'Pos Susu', 'Choco Banana', 10000, 0, 0, 'jpg', 0, 9, 3),
(278, 'Pos Susu', 'Manis Matcha', 10000, 0, 0, 'jpg', 0, 9, 3),
(279, 'Pos Susu', 'Banana', 10000, 0, 0, 'jpg', 0, 9, 3),
(280, 'Pos Kopi', 'Black Coffee', 10000, 0, 0, 'jpg', 0, 8, 3),
(281, 'Pos Susu', 'I Purple U', 10000, 0, 0, 'jpg', 0, 9, 3),
(282, 'Pos Susu', 'Choco Nano', 10000, 0, 0, 'jpg', 0, 9, 3),
(283, 'Pos Susu', 'Red Velvet', 10000, 0, 0, 'jpg', 0, 9, 3),
(284, 'Pos Coffee', 'Caramel Coffee', 12000, 0, 0, 'jpg', 0, 8, 3),
(285, 'Pos Susu', 'Bluenano', 10000, 0, 0, 'jpg', 0, 9, 3),
(286, 'Pos Susu', 'Crazy Grape', 10000, 0, 0, 'jpg', 0, 9, 3),
(287, 'Pos Susu', 'Rum Regal', 15000, 0, 0, 'jpg', 0, 9, 3),
(288, 'Pos Coffee', 'Kosula Coffee', 10000, 0, 0, 'jpg', 0, 8, 3),
(289, 'Pos Susu', 'Choco Classy', 10000, 0, 0, 'jpg', 0, 9, 3),
(290, 'Pos Coffee', 'Huzelnut Coffee', 12000, 0, 0, 'jpg', 0, 8, 3),
(291, 'Pos Coffee', 'Tiramisu Coffee', 12000, 0, 0, 'jpg', 0, 8, 3),
(292, 'Pos Coffee ', 'Kosa Coffee', 10000, 0, 0, 'jpg', 0, 8, 3),
(293, 'Pos Coffee', 'Excreamy Coffee', 10000, 0, 0, 'jpg', 0, 8, 3),
(294, 'Pos Coffee', 'Black Coffee', 10000, 0, 0, 'jpg', 0, 8, 2),
(295, 'Pos Coffee', 'Kiwi Coffee', 12000, 0, 0, 'jpg', 0, 8, 2),
(296, 'Pos Coffee', 'Kosula Coffee', 10000, 0, 0, 'jpg', 0, 8, 2),
(297, 'Pos Coffee', 'Banana Coffee', 12000, 0, 0, 'jpg', 0, 8, 2),
(298, 'Pos Susu', 'Red Velvet', 10000, 0, 0, 'jpg', 0, 9, 2),
(299, 'Pos Susu', 'Manis Matcha', 10000, 0, 0, 'jpg', 0, 9, 2),
(300, 'Pos Susu', 'Bubbly Mood', 10000, 0, 0, 'jpg', 0, 9, 2),
(301, 'Pos Susu', 'I Purple U', 10000, 0, 0, 'jpg', 0, 9, 2),
(302, 'Pos Susu', 'Bluenano', 10000, 0, 0, 'jpg', 1, 9, 2),
(303, 'Pos Susu', 'Bluenano', 10000, 0, 0, NULL, 1, 9, 2),
(304, 'Pos Susu', 'Bluenano', 10000, 0, 0, 'jpg', 1, 9, 2),
(305, 'Pos Susu', 'Bluenano', 10000, 0, 0, 'jpg', 0, 9, 2),
(306, 'Pos Susu', 'Bubbly Mood', 10000, 0, 0, 'jpg', 0, 9, 3),
(307, 'Pos Coffee', 'Vanilla Coffee', 12000, 0, 0, 'jpg', 0, 8, 3),
(308, 'Pos Susu', 'Choco Classy', 10000, 0, 0, 'jpg', 0, 9, 2),
(309, 'Pos Fresh', 'Cute Lemonade', 10000, 0, 0, 'jpg', 0, 10, 2),
(310, 'Pos Susu', 'Crazy Grape', 10000, 0, 0, 'jpg', 1, 9, 2),
(311, 'Pos Susu', 'Crazy Grape', 10000, 0, 0, 'jpg', 0, 9, 2),
(312, 'Pos Susu', 'Choco Banana', 10000, 0, 0, 'jpg', 0, 9, 2),
(313, 'Pos Susu', 'Choco Nano', 10000, 0, 0, 'jpg', 0, 9, 2),
(314, 'Pos Susu', 'Banana', 10000, 0, 0, 'jpg', 0, 9, 2),
(315, 'Pos Susu', 'Rum Regal', 15000, 0, 0, 'jpg', 0, 9, 2),
(316, 'Pos Susu', 'Vanilla Regal', 12000, 0, 0, 'jpg', 0, 9, 2),
(317, 'Pos Coffee', 'Kosa Coffee', 10000, 0, 0, 'jpg', 0, 8, 5),
(318, 'Pos Coffee', 'Caramel Coffee', 12000, 0, 0, 'jpg', 0, 8, 5),
(319, 'Pos Coffee', 'Excreamy Coffee', 10000, 0, 0, 'jpg', 0, 8, 5),
(320, 'Pos Coffee', 'Vanilla Coffee', 12000, 0, 0, 'jpg', 0, 8, 5),
(321, 'Pos Coffee', 'Hazelnut Coffee', 12000, 0, 0, 'jpg', 0, 8, 5),
(322, 'Pos Coffee', 'Tiramisu Coffee', 12000, 0, 0, 'jpg', 0, 8, 5),
(323, 'Pos Coffee', 'Black Coffee', 10000, 0, 0, 'jpg', 0, 8, 5),
(324, 'Pos Coffee', 'Kiwi Coffee', 12000, 0, 0, 'jpg', 0, 8, 5),
(325, 'Pos Coffee', 'Kosula Coffee', 10000, 0, 0, 'jpg', 0, 8, 5),
(326, 'Pos Coffee', 'Banana Coffee', 12000, 0, 0, 'jpg', 0, 8, 5),
(327, 'Pos Susu', 'Rum Regal', 15000, 0, 0, 'jpg', 0, 9, 5),
(328, 'Pos Susu', 'Red Velvet', 10000, 0, 0, 'jpg', 0, 9, 5),
(329, 'Pos Susu', 'Manis Matcha', 10000, 0, 0, 'jpg', 0, 9, 5),
(330, 'Pos Susu', 'Bubbly Mood', 10000, 0, 0, 'jpg', 0, 9, 5),
(331, 'Pos Susu', 'I Purple U', 10000, 0, 0, 'jpg', 0, 9, 5),
(332, 'Pos Susu', 'Bluenano', 10000, 0, 0, 'jpg', 0, 9, 5),
(333, 'Pos Susu', 'Choco Classy', 10000, 0, 0, 'jpg', 0, 9, 5),
(334, 'Pos Fresh', 'Cute Lemonade ', 10000, 0, 0, 'jpg', 0, 10, 5),
(335, 'Pos Susu', 'Crazy Grape', 10000, 0, 0, 'jpg', 0, 9, 5),
(336, 'Pos Susu', 'Choco Banana', 10000, 0, 0, 'jpg', 0, 9, 5),
(337, 'Pos Susu', 'Choco Nano', 10000, 0, 0, 'jpg', 0, 9, 5),
(338, 'Pos Susu', 'Banana', 10000, 0, 0, 'jpg', 0, 9, 5),
(339, 'Pos Susu', 'Vanilla Regal', 10000, 0, 0, 'jpg', 0, 9, 5),
(340, 'Pos coffee', 'Excreamy coffee', 10000, 0, 0, 'jpg', 0, 8, 7),
(341, 'Pos coffee', 'Kosa coffee', 10000, 0, 0, 'jpg', 0, 8, 7),
(342, 'Pos coffee', 'Black coffee', 10000, 0, 0, 'jpg', 0, 8, 7),
(343, 'Pos susu', 'Choco classy', 10000, 0, 0, 'jpg', 0, 9, 7),
(344, 'Pos susu', 'Choco Nano', 10000, 0, 0, 'jpg', 0, 9, 7),
(345, 'Pos susu', 'Choco Banana', 10000, 0, 0, 'jpg', 0, 9, 7),
(346, 'Pos susu', 'Banana', 10000, 0, 0, 'jpg', 0, 9, 7),
(347, 'Pos susu', 'Red velvet', 10000, 0, 0, 'jpg', 0, 9, 7),
(348, 'Pos susu', 'Crazy Grape', 10000, 0, 0, 'jpg', 0, 9, 7),
(349, 'Pos susu', 'Manis matcha', 10000, 0, 0, 'jpg', 0, 9, 7),
(350, 'Pos coffee', 'Kiwi coffee', 12000, 0, 0, 'jpg', 0, 8, 7),
(351, 'Pos coffee', 'Vanilla coffee', 12000, 0, 0, 'jpg', 0, 8, 7),
(352, 'Pos coffee', 'Tiramisu coffee', 12000, 0, 0, 'jpg', 0, 8, 7),
(353, 'Pos coffee', 'Hazelnut coffee', 12000, 0, 0, 'jpg', 0, 8, 7),
(354, 'Pos coffee', 'Caramel coffee', 12000, 0, 0, 'jpg', 0, 8, 7),
(355, 'Pos coffee', 'Kosula coffee', 10000, 0, 0, 'jpg', 0, 8, 7),
(356, 'Pos fresh', 'Cute lemonade', 10000, 0, 0, 'jpg', 0, 10, 7),
(357, 'Pos susu', 'I purple u', 10000, 0, 0, 'jpg', 0, 9, 7),
(358, 'Pos susu', 'Bubbly mood', 10000, 0, 0, 'jpg', 0, 9, 7),
(359, 'Pos susu', 'Blue nano', 10000, 0, 0, 'jpg', 0, 9, 7),
(360, 'Pos susu', 'Vanilla Regal', 12000, 0, 0, 'jpg', 0, 9, 7),
(361, 'Pos susu', 'Rum Regal', 15000, 0, 0, 'jpg', 0, 9, 7),
(362, 'Pos coffee', 'Banana coffee', 12000, 0, 0, 'jpg', 0, 8, 7),
(363, 'Pos coffee', 'Kosula coffee', 10000, 0, 0, 'jpg', 0, 8, 6),
(364, 'Pos coffee', 'Kosula coffee', 10000, 0, 0, 'jpg', 1, 8, 6),
(365, 'Pos coffee', 'Zio kosa', 10000, 0, 0, 'jpg', 0, 8, 6),
(366, 'Pos coffee', 'Zio excreamy', 10000, 0, 0, 'jpg', 0, 8, 6),
(367, 'Pos coffee', 'Banana coffee', 12000, 0, 0, 'jpg', 0, 8, 6),
(368, 'Pos coffee', 'Kiwi coffee', 12000, 0, 0, 'jpg', 0, 8, 6),
(369, 'Pos coffee', 'Zio caramel', 12000, 0, 0, 'jpg', 0, 8, 6),
(370, 'Pos coffee', 'Zio hazelnut', 12000, 0, 0, 'jpg', 0, 8, 6),
(371, 'Pos coffee', 'Zio tiramisu', 12000, 0, 0, 'jpg', 0, 8, 6),
(372, 'Pos coffee', 'Zio vanilla', 12000, 0, 0, 'jpg', 0, 8, 6),
(373, 'Pos susu', 'Vanilla regal', 12000, 0, 0, 'jpg', 0, 9, 6),
(374, 'Pos susu', 'Rum regal', 15000, 0, 0, 'jpg', 0, 9, 6),
(375, 'Pos fresh', 'Cute lemonade', 10000, 0, 0, 'jpg', 0, 10, 6),
(376, 'Pos susu', 'Blue nano', 10000, 0, 0, 'jpg', 0, 9, 6),
(377, 'Pos susu', 'Bubbly mood', 10000, 0, 0, 'jpg', 0, 9, 6),
(378, 'Pos susu', 'Choco classy', 10000, 0, 0, 'jpg', 0, 9, 6),
(379, 'Pos susu', 'Choconano', 10000, 0, 0, 'jpg', 0, 9, 6),
(380, 'Pos susu', 'Choco banana', 10000, 0, 0, 'jpg', 0, 9, 6),
(381, 'Pos susu', 'Banana', 10000, 0, 0, 'jpg', 0, 9, 6),
(382, 'Pos susu', 'Red velvet', 10000, 0, 0, 'jpg', 0, 9, 6),
(383, 'Pos susu', 'Manis matcha', 10000, 0, 0, 'jpg', 0, 9, 6),
(384, 'Pos susu', 'Manis matcha', 10000, 0, 0, '', 1, 9, 6),
(385, 'Pos susu', 'Crazy grape', 10000, 0, 0, 'jpg', 0, 9, 6),
(386, 'Pos susu', 'I purple U', 10000, 0, 0, 'jpg', 0, 9, 6),
(387, 'Pos coffee', 'Black coffee', 10000, 0, 0, 'jpg', 0, 8, 6),
(388, 'Pos susu', 'Blue nano', 10000, 0, 0, 'jpg', 0, 9, 8),
(389, 'Pos susu', 'Blue nano', 10000, 0, 0, 'jpg', 1, 9, 8),
(390, 'Pos susu', 'Blue nano', 10000, 0, 0, 'jpg', 1, 9, 8),
(391, 'Pos susu', 'Bubbly mood', 10000, 0, 0, 'jpg', 0, 9, 8),
(392, 'Pos susu', 'Choco classy', 10000, 0, 0, 'jpg', 0, 9, 8),
(393, 'Pos susu', 'Choconano', 10000, 0, 0, 'jpg', 0, 9, 8),
(394, 'Pos susu', 'Choco banana', 10000, 0, 0, 'jpg', 0, 9, 8),
(395, 'Pos susu', 'Banana', 10000, 0, 0, 'jpg', 0, 9, 8),
(396, 'Pos susu', 'Red Velvet', 10000, 0, 0, 'jpg', 0, 9, 8),
(397, 'Pos susu', 'Manis matcha', 10000, 0, 0, 'jpg', 0, 9, 8),
(398, 'Pos susu', 'Crazy grape', 10000, 0, 0, 'jpg', 0, 9, 8),
(399, 'Pos susu', 'I purple U', 10000, 0, 0, 'jpg', 0, 9, 8),
(400, 'Pos fresh', 'Cute lemonade', 10000, 0, 0, 'jpg', 0, 10, 8),
(401, 'Pos coffee', 'Black coffee', 10000, 0, 0, 'jpg', 0, 8, 8),
(402, 'Pos coffee', 'Black coffee', 10000, 0, 0, '', 1, 8, 8),
(403, 'Pos coffee', 'Zio excreamy', 10000, 0, 0, 'jpg', 0, 8, 8),
(404, 'Pos coffee', 'Zio kosa', 10000, 0, 0, 'jpg', 0, 8, 8),
(405, 'Pos coffee', 'Zio hazelnut', 12000, 0, 0, 'jpg', 0, 8, 8),
(406, 'Pos coffee', 'Zio tiramisu', 12000, 0, 0, 'jpg', 0, 8, 8),
(407, 'Pos coffee', 'Zio caramel', 12000, 0, 0, 'jpg', 0, 8, 8),
(408, 'Pos coffee', 'Zio vanilla', 12000, 0, 0, 'jpg', 0, 8, 8),
(409, 'Pos coffee', 'Kiwi coffee', 12000, 0, 0, 'jpg', 0, 8, 8),
(410, 'Pos coffee', 'Banana coffee', 12000, 0, 0, 'jpg', 0, 8, 8),
(411, 'Pos coffee', 'Kosula coffee', 10000, 0, 0, 'jpg', 0, 8, 8),
(412, 'Pos susu', 'Rum regal', 15000, 0, 0, 'jpg', 0, 9, 8),
(413, 'Pos susu', 'Vanilla regal', 12000, 0, 0, 'jpg', 0, 9, 8),
(414, 'Promo', 'Promo buy 2 only 15k', 15000, 0, 0, 'jpg', 0, 12, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `payment_type`
--

CREATE TABLE `payment_type` (
  `payment_type_id` int(11) NOT NULL,
  `payment_type_name` varchar(100) DEFAULT NULL,
  `payment_type_delete` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `payment_type`
--

INSERT INTO `payment_type` (`payment_type_id`, `payment_type_name`, `payment_type_delete`) VALUES
(1, 'Tunai', 0),
(2, 'OVO', 1),
(3, 'GOPAY', 1),
(4, 'ShopeePay', 1),
(5, 'Ovo', 1),
(6, 'Gopay', 1),
(7, 'Transfer BCA 7710078771', 1),
(8, 'Gopay', 0),
(9, 'OVO', 0),
(10, 'ShopeePay', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `store`
--

CREATE TABLE `store` (
  `store_id` int(11) NOT NULL,
  `store_name` varchar(100) DEFAULT NULL,
  `store_address` varchar(100) DEFAULT NULL,
  `store_latitude` varchar(100) DEFAULT NULL,
  `store_longitude` varchar(100) DEFAULT NULL,
  `store_delete` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `store`
--

INSERT INTO `store` (`store_id`, `store_name`, `store_address`, `store_latitude`, `store_longitude`, `store_delete`) VALUES
(1, 'POSKOPIZIO #1    Jln. Kusuma Bangsa No 08, Sengon, Jombang', 'Jln. Kusuma Bangsa No 08, Jombang', '-7.5442492', '112.2320627', 0),
(2, 'POSKOPIZIO #2   jln. Dr. Soetomo No.42 jombatan Jombang', 'Jln. Dr. Soetomo No.42, Jombang', '-7.5529845', '112.2332065', 0),
(3, 'POSKOPIZIO #3   jln. Adityawarman No.35A kepanjen jombang', 'Jln. Adityawarman No.35A, Jombang', '-7.549379600000001', '112.2388826', 0),
(4, 'POSKOPIZIO #4     jln. Dr. Soetomo No.09 jombatan jombang', 'Jln. Dr. Soetomo No.09, Jombang', '-7.553563', '112.23385309999999', 0),
(5, 'POSKOPIZIO #5     jln. Pattimura No.62 sengon jombang', 'Jln. Pattimura No.62, Jombang', '-7.554984900000001', '112.2267541', 0),
(6, 'POSKOPIZIO #6    Jln. Taman mojoagung  jombang', 'Jln. Sayyid sualaiman No.32 kademangan, Jombang', '-7.569202', '112.3454828', 0),
(7, 'POSKOPIZIO #7     Jln. KH. hasyim asyari No.26 kaliwungu jombang', 'Jln. KH Hasyim asyari No.26, Jombang', '-7.559549', '112.23501700000001', 0),
(8, 'POSKOPIZIO #8     jln. Raya jogoroto No.62 kalianyar jombang', 'Jln. Raya jogoroto No. 62, kalianyar Jombang', '-7.592588599999999', '112.26936959999999', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaction`
--

CREATE TABLE `transaction` (
  `transaction_id` int(11) NOT NULL,
  `transaction_date` date DEFAULT NULL,
  `transaction_time` time DEFAULT NULL,
  `transaction_status` enum('Pending','Waiting Confirmation','Accepted','Paid') DEFAULT NULL,
  `transaction_customer_name` varchar(100) DEFAULT NULL,
  `transaction_order_number` int(11) DEFAULT NULL,
  `transaction_total_amount` double DEFAULT NULL,
  `transaction_total_discount` double DEFAULT NULL,
  `transaction_total_paid` double DEFAULT NULL,
  `transaction_total_change` double DEFAULT NULL,
  `transaction_message` varchar(100) DEFAULT NULL,
  `transaction_address` varchar(100) DEFAULT NULL,
  `transaction_latitude` varchar(100) DEFAULT NULL,
  `transaction_longitude` varchar(100) DEFAULT NULL,
  `transaction_distance` double DEFAULT NULL,
  `transaction_delivery_fee_per_km` double DEFAULT NULL,
  `transaction_delivery_status` enum('On The Way','Arrived') DEFAULT NULL,
  `transaction_delivery_fee` double DEFAULT NULL,
  `transaction_delete` int(11) DEFAULT NULL,
  `store_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `cashier_id` int(11) DEFAULT NULL,
  `driver_id` int(11) DEFAULT NULL,
  `payment_type_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `transaction`
--

INSERT INTO `transaction` (`transaction_id`, `transaction_date`, `transaction_time`, `transaction_status`, `transaction_customer_name`, `transaction_order_number`, `transaction_total_amount`, `transaction_total_discount`, `transaction_total_paid`, `transaction_total_change`, `transaction_message`, `transaction_address`, `transaction_latitude`, `transaction_longitude`, `transaction_distance`, `transaction_delivery_fee_per_km`, `transaction_delivery_status`, `transaction_delivery_fee`, `transaction_delete`, `store_id`, `customer_id`, `cashier_id`, `driver_id`, `payment_type_id`) VALUES
(1, '2020-10-19', '15:52:12', 'Paid', 'Yudhistira Patrick', 1, 20000, 0, 50000, 30000, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, NULL, 2, NULL, 1),
(2, '2020-10-19', '15:52:31', 'Paid', 'adielah', 2, 10000, 0, 250000, 39000, '', '007, Jl. Dharmahusada Utara No.22, RW.02, Mojo, Kec. Gubeng, Kota SBY, Jawa Timur 60285, Indonesia', '-7.2640764', '112.77241079999999', 67, 3000, 'Arrived', 201000, 0, 1, 13, 2, 6, 1),
(3, '2020-10-20', '12:40:20', 'Paid', 'Dwi purwanto', 1, 20000, 0, 23000, 0, 'Less ice', 'Jalan Dokter Sutomo No.52c, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61411, Indonesia', '-7.5529328', '112.2329864', 1, 3000, 'Arrived', 3000, 0, 1, 36, 2, 6, 1),
(4, '2020-10-20', '12:51:38', 'Paid', 'Delia', 2, 20000, 0, 23000, 0, 'Les es', 'Jalan Dokter Sutomo No.09, Kepanjen, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, In', '-7.553563', '112.23385309999999', 1, 3000, 'Arrived', 3000, 0, 1, 68, 2, 6, 1),
(5, '2020-10-20', '13:21:26', 'Accepted', 'Delia', 1, 20000, 0, 0, 0, 'Tanpa ess', 'Jalan Dokter Sutomo No.09, Kepanjen, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, In', '-7.553563', '112.23385309999999', 1, 3000, NULL, 3000, 0, 3, 68, 1, 25, 1),
(6, '2020-10-20', '13:33:33', 'Paid', 'Delia', 1, 10000, 0, 10000, 0, '', NULL, NULL, NULL, NULL, NULL, 'Arrived', NULL, 0, 5, 68, 88, 89, 1),
(7, '2020-10-20', '13:36:27', 'Paid', 'Delia', 3, 10000, 0, 15000, 2000, '', 'Jalan Dokter Sutomo No.09, Kepanjen, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, In', '-7.553563', '112.23385309999999', 1, 3000, 'Arrived', 3000, 0, 1, 68, 2, 6, 1),
(8, '2020-10-20', '14:55:22', 'Paid', 'Delia', 1, 10000, 0, 13000, 0, 'Tanpa esss', 'Jalan Dokter Sutomo No.13a, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.5532777', '112.23322639999999', 1, 3000, 'Arrived', 3000, 0, 1, 68, 2, 23, 1),
(9, '2020-10-20', '15:01:15', 'Pending', NULL, 4, 10000, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, NULL, 2, NULL, NULL),
(10, '2020-10-20', '15:19:24', 'Waiting Confirmation', 'Debby', 1, 20000, 0, 0, 0, 'Es nya sedikit', 'Jalan Dokter Sutomo No.50-34, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.5530360000000005', '112.23304590000001', 0, 3000, NULL, 0, 0, 2, 72, NULL, NULL, 1),
(11, '2020-10-20', '15:19:39', 'Paid', 'Ahmad Rizki', 2, 10000, 0, 13000, 0, 'Tanpa gelas', 'Jalan Dokter Sutomo No.52c, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61411, Indonesia', '-7.5529328', '112.2329864', 1, 3000, 'Arrived', 3000, 0, 1, 71, 2, 23, 1),
(12, '2020-10-20', '15:28:08', 'Waiting Confirmation', 'Rika Santi ', 2, 10000, 0, 0, 0, '', 'Jl. Jakgung. Suprapto No.11, Kepanjen, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.5544941', '112.23405729999999', 0, 3000, NULL, 0, 0, 2, 76, NULL, NULL, 1),
(13, '2020-10-20', '15:30:30', 'Paid', 'Debby', 5, 20000, 0, 25000, 2000, 'Es nya sedikit', 'Jalan Dokter Sutomo No.42, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.5529845', '112.2332065', 1, 3000, 'Arrived', 3000, 0, 1, 72, 2, 6, 1),
(14, '2020-10-20', '15:33:43', 'Paid', 'Rika Santi ', 6, 10000, 0, 13000, 0, '', 'Jl. Jakgung. Suprapto No.11, Kepanjen, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.5544941', '112.23405729999999', 1, 3000, 'Arrived', 3000, 0, 1, 76, 2, 6, 1),
(15, '2020-10-20', '15:40:11', 'Waiting Confirmation', 'Delia', 3, 20000, 0, 0, 0, 'Tanpa gula', 'Jalan Dokter Sutomo No.42, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.5529845', '112.2332065', 0, 3000, NULL, 0, 0, 2, 68, NULL, NULL, 1),
(16, '2020-10-20', '15:40:18', 'Waiting Confirmation', 'Dwi purwanto', 4, 10000, 0, 0, 0, '', 'Jalan Dokter Sutomo No.50-34, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.5530360000000005', '112.23304590000001', 1, 3000, NULL, 3000, 0, 3, 36, NULL, NULL, 1),
(17, '2020-10-20', '15:40:24', 'Paid', 'Intan', 7, 20000, 0, 23000, 0, 'Tidak pake kuah', 'Jalan Dokter Sutomo No.13a, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.5532777', '112.23322639999999', 1, 3000, 'Arrived', 3000, 0, 1, 70, 2, 23, 1),
(18, '2020-10-20', '15:40:39', 'Waiting Confirmation', 'Delia', 2, 45000, 0, 0, 0, 'Tanpa regal', 'Jalan Dokter Sutomo No.50-34, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.5530360000000005', '112.23304590000001', 1, 3000, NULL, 3000, 0, 3, 68, NULL, NULL, 1),
(19, '2020-10-20', '15:41:42', 'Paid', 'Dwi purwanto', 8, 10000, 0, 13000, 0, '', 'Jalan Dokter Sutomo No.50-34, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.5530360000000005', '112.23304590000001', 1, 3000, 'Arrived', 3000, 0, 1, 36, 2, 23, 1),
(20, '2020-10-20', '15:42:36', 'Waiting Confirmation', 'Intan', 4, 100000, 0, 0, 0, 'Tidak pake kuah', 'Jalan Dokter Sutomo No.36c, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61411, Indonesia', '-7.553095', '112.23393800000001', 0, 3000, NULL, 0, 0, 2, 70, NULL, NULL, 1),
(21, '2020-10-20', '15:42:57', 'Accepted', 'Dwi purwanto', 5, 12000, 0, 0, 0, '', 'Jalan Dokter Sutomo No.50-34, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.5530360000000005', '112.23304590000001', 0, 3000, 'Arrived', 0, 0, 2, 36, 3, 24, 1),
(22, '2020-10-20', '15:44:23', 'Paid', 'Delia', 9, 20000, 0, 23000, 0, 'Tanpa lemonn', 'Jalan Dokter Sutomo No.13, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.553443000000001', '112.232942', 1, 3000, 'Arrived', 3000, 0, 1, 68, 2, 23, 1),
(23, '2020-10-21', '15:44:28', 'Paid', 'Intan', 6, 55000, 0, 60000, 2000, 'Gapake kuah', 'Jl. Pattimura No.12, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.5560979999999995', '112.22611599999999', 1, 3000, 'Arrived', 3000, 0, 1, 70, 2, 23, 1),
(24, '2020-10-20', '15:45:21', 'Waiting Confirmation', 'Delia', 7, 80000, 0, 0, 0, 'Tanpa kopi', 'Jalan Dokter Sutomo No.13a, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.5532777', '112.23322639999999', 0, 3000, NULL, 0, 0, 2, 68, NULL, NULL, 1),
(25, '2020-10-20', '15:45:51', 'Waiting Confirmation', 'Delia', 5, 60000, 0, 0, 0, 'Tanpa kiwi', 'Jalan Dokter Sutomo No.13, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.553443000000001', '112.232942', 1, 3000, NULL, 3000, 0, 3, 68, NULL, NULL, 1),
(26, '2020-10-20', '15:47:07', 'Paid', 'Pak dwi', 8, 20000, 0, 20000, 0, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 2, NULL, 3, NULL, 1),
(27, '2020-10-21', '10:53:17', 'Paid', 'Delia', 1, 10000, 0, 15000, 2000, '', 'Jalan Dokter Sutomo No.32, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.5531625', '112.23367499999999', 1, 3000, 'Arrived', 3000, 0, 1, 68, 2, 23, 1),
(28, '2020-10-21', '11:07:48', 'Paid', 'Yudhistira Patrick', 2, 10000, 0, 211000, 0, '', '007, Jl. Dharmahusada Utara No.22, RW.02, Mojo, Kec. Gubeng, Kota SBY, Jawa Timur 60285, Indonesia', '-7.2640764', '112.77241079999999', 67, 3000, 'Arrived', 201000, 0, 1, 77, 2, 23, 1),
(29, '2020-10-21', '11:20:58', 'Paid', 'Debby', 3, 22000, 0, 25000, 0, '', 'Jalan Dokter Sutomo No.42, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.5529845', '112.2332065', 1, 3000, 'Arrived', 3000, 0, 1, 72, 2, 23, 1),
(30, '2020-10-21', '11:21:24', 'Paid', 'Syarah Syahzanani', 4, 20000, 0, 25000, 2000, 'Gpl ya kak', 'Jalan Dokter Sutomo No.09, Kepanjen, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, In', '-7.553563', '112.23385309999999', 1, 3000, 'Arrived', 3000, 0, 1, 60, 2, 23, 1),
(31, '2020-10-21', '11:28:31', 'Pending', NULL, 7, 30000, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, NULL, 79, NULL, NULL),
(32, '2020-10-21', '11:52:10', 'Pending', NULL, 8, 12000, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, 43, NULL, NULL, NULL),
(33, '2020-10-21', '13:01:20', 'Accepted', 'Dwi purwanto', 9, 10000, 0, 0, 0, '', 'Jl. Empu Prapanca No.2, Kepanjen, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.550819999999999', '112.23861199999999', 1, 3000, NULL, 3000, 0, 1, 36, 80, 23, 1),
(34, '2020-10-22', '15:36:40', 'Accepted', 'Dwi purwanto', 10, 12000, 0, 0, 0, '', 'Jalan Dokter Sutomo No.9, Kepanjen, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.553553099999999', '112.2338556', 1, 3000, NULL, 3000, 0, 1, 36, 80, 23, 1),
(35, '2020-10-21', '18:45:09', 'Pending', NULL, 11, 20000, 0, NULL, NULL, NULL, '007, Jl. Dharmahusada Utara No.22, RW.02, Mojo, Kec. Gubeng, Kota SBY, Jawa Timur 60285, Indonesia', '-7.2640764', '112.77241079999999', 67, 3000, NULL, 201000, 0, 1, 77, NULL, NULL, NULL),
(36, '2020-10-26', '15:29:09', 'Accepted', 'Dwi purwanto', 11, 20000, 0, 0, 0, '', 'Jl. Kusuma Bangsa No.1, Sengon, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.5495209999999995', '112.228403', 1, 3000, NULL, 3000, 0, 1, 36, 80, 23, 1),
(37, '2020-10-24', '15:00:26', 'Accepted', 'Syafa', 1, 10000, 0, 0, 0, '', 'Jalan Dokter Sutomo No.52c, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61411, Indonesia', '-7.5529328', '112.2329864', 1, 3000, NULL, 3000, 0, 1, 85, 80, 6, 1),
(38, '2020-10-24', '15:00:45', 'Accepted', 'Fitria Nur Fadilah ', 2, 22000, 0, 0, 0, '', 'Candimulyo Jombang', '-7.534558799999999', '112.24287249999999', 2, 3000, NULL, 6000, 0, 1, 86, 80, 23, 1),
(39, '2020-10-24', '15:03:05', 'Accepted', 'Syafa', 3, 10000, 0, 0, 0, '', 'Jalan Dokter Sutomo No.52c, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61411, Indonesia', '-7.5529328', '112.2329864', 1, 3000, NULL, 3000, 0, 1, 85, 80, 23, 1),
(40, '2020-10-24', '15:06:31', 'Paid', 'Fitria Nur Fadilah ', 1, 22000, 0, 25000, 0, '', 'Jalan Dokter Sutomo No.80, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61411, Indonesia', '-7.552484', '112.232143', 1, 3000, 'Arrived', 3000, 0, 5, 86, 88, 89, 1),
(41, '2020-10-24', '15:06:39', 'Paid', 'Syafa', 2, 10000, 0, 13000, 0, '', 'Jalan Dokter Sutomo No.52c, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61411, Indonesia', '-7.5529328', '112.2329864', 1, 3000, 'Arrived', 3000, 0, 5, 85, 88, 89, 1),
(42, '2020-10-24', '15:15:07', 'Paid', 'Syafa', 4, 10000, 0, 13000, 0, '', 'Jalan Dokter Sutomo No.52c, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61411, Indonesia', '-7.5529328', '112.2329864', 1, 3000, 'Arrived', 3000, 0, 1, 85, 80, 23, 1),
(43, '2020-10-24', '15:15:23', 'Paid', 'Fitria Nur Fadilah ', 5, 10000, 0, 13000, 0, '', 'Jalan Dokter Sutomo No.58, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61411, Indonesia', '-7.552631000000001', '112.23236299999999', 1, 3000, 'Arrived', 3000, 0, 1, 86, 80, 23, 1),
(44, '2020-10-24', '15:15:27', 'Paid', 'Syarah Syahzanani', 6, 32000, 0, 35000, 0, 'Ga pake cup, plastikan saja', 'Jalan Dokter Sutomo No.13a, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.5532777', '112.23322639999999', 1, 3000, 'Arrived', 3000, 0, 1, 60, 80, 23, 1),
(45, '2020-10-24', '15:15:48', 'Paid', 'Delia', 7, 120000, 0, 123000, 0, 'Tanpa gula kak', 'Jalan Dokter Sutomo No.13a, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.5532777', '112.23322639999999', 1, 3000, 'Arrived', 3000, 0, 1, 68, 80, 23, 1),
(46, '2020-10-24', '15:15:49', 'Pending', NULL, 8, 10000, 0, NULL, NULL, NULL, 'Jalan Dokter Sutomo No.13a, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.5532777', '112.23322639999999', 0, 3000, NULL, 0, 0, 2, 70, NULL, NULL, NULL),
(47, '2020-10-24', '15:15:49', 'Paid', 'Intan', 8, 20000, 0, 23000, 0, '', 'Jalan Dokter Sutomo No.52c, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61411, Indonesia', '-7.5529328', '112.2329864', 1, 3000, 'Arrived', 3000, 0, 1, 70, 80, 23, 1),
(48, '2020-10-24', '15:32:14', 'Accepted', 'Syarah Syahzanani', 1, 60000, 0, 0, 0, 'Bsgdas', 'Jalan adityawarman No.25, Kepanjen, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Ind', '-7.547278399999999', '112.23940449999999', 1, 3000, NULL, 3000, 0, 2, 60, 83, 90, 1),
(49, '2020-10-24', '15:45:13', 'Accepted', 'Syarah Syahzanani', 9, 50000, 0, 0, 0, 'Hehe', 'Jl. Gub.Suryo VII No.J-2, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.5572747', '112.2276187', 1, 3000, 'Arrived', 3000, 0, 2, 60, 83, 90, 1),
(50, '2020-10-24', '15:52:49', 'Pending', NULL, 10, 120000, 0, NULL, NULL, NULL, 'Jl. Gub.Suryo VII No.J-2, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.5572747', '112.2276187', 1, 3000, NULL, 3000, 0, 2, 68, NULL, NULL, NULL),
(51, '2020-10-24', '18:16:19', 'Pending', NULL, 1, 12000, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 6, 20, NULL, NULL, NULL),
(52, '2020-10-24', '18:16:19', 'Pending', NULL, 1, 12000, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 6, 20, NULL, NULL, NULL),
(53, '2020-10-26', '17:21:11', 'Accepted', 'Dwi purwanto', 12, 10000, 0, 0, 0, '', 'Gg. Karya Bakti No.10, Sengon, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.54954', '112.22853669999999', 1, 3000, NULL, 3000, 0, 1, 36, 80, 6, 1),
(54, '2020-10-26', '17:32:29', 'Accepted', 'Dwi purwanto', 13, 10000, 0, 0, 0, '', 'Gg. Karya Bakti No.10, Sengon, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.54954', '112.22853669999999', 1, 3000, NULL, 3000, 0, 1, 36, 80, 23, 1),
(55, '2020-10-26', '18:05:32', 'Accepted', 'Dwi purwanto', 14, 10000, 0, 0, 0, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, 36, 80, 23, 1),
(56, '2020-10-26', '18:08:42', 'Accepted', 'Dwi purwanto', 15, 12000, 0, 0, 0, '', 'Gg. Karya Bakti No.10, Sengon, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.54954', '112.22853669999999', 1, 3000, NULL, 3000, 0, 1, 36, 80, 23, 1),
(57, '2020-10-27', '11:03:29', 'Waiting Confirmation', 'Dwi purwanto', 1, 10000, 0, 0, 0, '', 'Unnamed Road, Bulu Bandan, Karang Mojo, Plandaan, KabupatÃ©n Jombang, Jawa Timur 61456, Indonesia', '-7.474455299999999', '112.2026245', 8, 3000, NULL, 24000, 0, 1, 36, NULL, NULL, 1),
(58, '2020-10-31', '20:16:18', 'Waiting Confirmation', 'Dwi purwanto', 1, 22000, 0, 0, 0, '', 'Gg. Karya Bakti No.10, Sengon, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.54954', '112.22853669999999', 1, 3000, NULL, 3000, 0, 1, 36, NULL, NULL, 1),
(59, '2020-10-31', '08:07:45', 'Waiting Confirmation', 'Dwi purwanto', 2, 32000, 0, 0, 0, 'Doble shot espresso', 'Gg. Karya Bakti No.10, Sengon, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.54954', '112.22853669999999', 1, 3000, NULL, 3000, 0, 1, 36, NULL, NULL, 1),
(60, '2020-10-31', '08:11:54', 'Waiting Confirmation', 'Dwi purwanto', 3, 42000, 0, 0, 0, 'Doble shot espresso', 'Gg. Karya Bakti No.10, Sengon, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.54954', '112.22853669999999', 1, 3000, NULL, 3000, 0, 1, 36, NULL, NULL, 1),
(61, '2020-10-31', '08:21:27', 'Waiting Confirmation', 'Dwi purwanto', 4, 44000, 0, 0, 0, 'Doble shoot espresso', 'Gg. Karya Bakti No.10, Sengon, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.54954', '112.22853669999999', 1, 3000, NULL, 3000, 0, 1, 36, NULL, NULL, 1),
(62, '2020-11-04', '19:38:03', 'Waiting Confirmation', 'Dwi purwanto', 1, 10000, 0, 0, 0, '', 'Gg. Karya Bakti No.10, Sengon, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61419, Indonesia', '-7.54954', '112.22853669999999', 1, 3000, NULL, 3000, 0, 1, 36, NULL, NULL, 1),
(63, '2020-11-02', '13:27:12', 'Waiting Confirmation', 'adielah', 1, 10000, 0, 0, 0, '', '007, Jl. Dharmahusada Utara No.24, RW.02, Mojo, Kec. Gubeng, Kota SBY, Jawa Timur 60285, Indonesia', '-7.2653549', '112.77054', 67, 3000, NULL, 201000, 0, 1, 13, NULL, NULL, 1),
(64, '2020-11-03', '14:30:34', 'Pending', NULL, 1, 12000, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, NULL, 80, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaction_detail`
--

CREATE TABLE `transaction_detail` (
  `transaction_detail_id` int(11) NOT NULL,
  `transaction_detail_count` int(11) DEFAULT NULL,
  `transaction_detail_price` double DEFAULT NULL,
  `transaction_detail_discount` double DEFAULT NULL,
  `menu_id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `transaction_detail`
--

INSERT INTO `transaction_detail` (`transaction_detail_id`, `transaction_detail_count`, `transaction_detail_price`, `transaction_detail_discount`, `menu_id`, `transaction_id`) VALUES
(1, 1, 10000, 0, 219, 1),
(2, 1, 10000, 0, 241, 1),
(3, 1, 10000, 0, 219, 2),
(4, 1, 10000, 0, 219, 3),
(5, 2, 10000, 0, 219, 4),
(6, 2, 10000, 0, 306, 5),
(7, 1, 10000, 0, 317, 6),
(8, 1, 10000, 0, 219, 7),
(11, 1, 10000, 0, 265, 10),
(14, 1, 10000, 0, 241, 3),
(15, 1, 10000, 0, 219, 11),
(17, 1, 10000, 0, 308, 10),
(18, 1, 10000, 0, 268, 12),
(19, 1, 10000, 0, 258, 13),
(20, 1, 10000, 0, 262, 13),
(21, 1, 10000, 0, 219, 14),
(22, 1, 10000, 0, 219, 8),
(23, 2, 10000, 0, 268, 15),
(25, 1, 10000, 0, 219, 17),
(26, 1, 10000, 0, 241, 17),
(27, 3, 15000, 0, 287, 18),
(28, 1, 10000, 0, 293, 16),
(29, 1, 10000, 0, 219, 19),
(30, 10, 10000, 0, 265, 20),
(31, 1, 12000, 0, 270, 21),
(32, 2, 10000, 0, 221, 22),
(34, 8, 10000, 0, 268, 24),
(35, 5, 12000, 0, 273, 25),
(36, 2, 10000, 0, 265, 26),
(37, 1, 10000, 0, 219, 27),
(38, 1, 10000, 0, 219, 28),
(39, 1, 10000, 0, 255, 29),
(40, 1, 12000, 0, 249, 29),
(41, 1, 10000, 0, 219, 30),
(42, 1, 10000, 0, 223, 30),
(43, 3, 10000, 0, 219, 23),
(44, 1, 25000, 0, 272, 23),
(47, 1, 12000, 0, 253, 32),
(48, 1, 10000, 0, 219, 33),
(51, 2, 10000, 0, 219, 35),
(52, 1, 12000, 0, 253, 34),
(54, 1, 10000, 0, 219, 37),
(55, 1, 12000, 0, 251, 38),
(56, 1, 10000, 0, 220, 38),
(57, 1, 10000, 0, 219, 39),
(58, 1, 12000, 0, 320, 40),
(59, 1, 10000, 0, 330, 40),
(60, 1, 10000, 0, 317, 41),
(61, 1, 10000, 0, 219, 42),
(62, 1, 10000, 0, 219, 43),
(63, 1, 10000, 0, 219, 44),
(64, 1, 10000, 0, 241, 44),
(65, 1, 12000, 0, 249, 44),
(66, 10, 12000, 0, 252, 45),
(68, 2, 10000, 0, 219, 47),
(70, 6, 10000, 0, 265, 48),
(73, 1, 10000, 0, 219, 36),
(74, 5, 10000, 0, 265, 49),
(75, 12, 10000, 0, 298, 50),
(76, 1, 12000, 0, 367, 52),
(77, 1, 12000, 0, 367, 51),
(78, 1, 10000, 0, 241, 36),
(79, 1, 10000, 0, 219, 53),
(80, 1, 10000, 0, 220, 54),
(81, 1, 10000, 0, 258, 55),
(82, 1, 12000, 0, 251, 56),
(83, 1, 10000, 0, 219, 57),
(84, 1, 10000, 0, 219, 58),
(85, 1, 12000, 0, 249, 58),
(86, 1, 10000, 0, 219, 59),
(87, 1, 10000, 0, 220, 59),
(88, 1, 12000, 0, 253, 59),
(89, 1, 10000, 0, 219, 60),
(90, 1, 10000, 0, 223, 60),
(91, 1, 12000, 0, 254, 60),
(92, 1, 10000, 0, 255, 60),
(93, 1, 12000, 0, 253, 61),
(94, 1, 12000, 0, 254, 61),
(95, 1, 10000, 0, 245, 61),
(96, 1, 10000, 0, 220, 61),
(97, 1, 10000, 0, 219, 9),
(99, 1, 10000, 0, 219, 63),
(102, 1, 12000, 0, 253, 64),
(103, 1, 10000, 0, 219, 62);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `user_phone` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `user_role` varchar(100) DEFAULT NULL,
  `user_token` varchar(250) DEFAULT NULL,
  `user_delete` int(11) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`user_id`, `username`, `user_name`, `user_phone`, `email`, `password`, `user_role`, `user_token`, `user_delete`, `store_id`) VALUES
(1, 'admin', 'Administrator', '085252212221', 'admin@gmail.com', '$2y$10$NTMBWkRGxQwMTYF7g3h4h.6FZhv6EDQvCCnBftAKezZpqqfSQTFRq', 'Admin', 'f626bc67-99e5-4b7e-af9f-f57f1b510d1f', 0, NULL),
(2, 'kasir_1', 'Yudhistira Patrick', '085252212221', 'yudhistira.patrick@gmail.com', '$2a$16$JEgUkCxRxeVSZjJd1CqFDOQvam9uyJ7Yh07eBd2d/G44ve9v64pLq', 'Kasir', 'f626bc67-99e5-4b7e-af9f-f57f1b510d1f', 0, 1),
(3, 'kasir_2', 'Deby marista', '089671660840', 'Debymarista@gmail.com', '$2a$16$8SCWjFLk1hhrIlHhmTk5t.rKu93vX35PA7SSAsIW3X2c6OCw/jnP.', 'Kasir', '961b9024-5de6-47c8-91f5-e2f91d32eea4', 1, 2),
(4, 'Rika', 'Rika', '085646561346', 'Rika@gmail.com', '$2a$16$hzeWAiLwQ64RvMyxmS6GouRMlsHqR0sE2CPWweSf8Rh55BN9Zb6L6', 'Kasir', '961b9024-5de6-47c8-91f5-e2f91d32eea4', 1, 3),
(6, 'Fenny', 'Fenny', '085645103133', 'Fenny@gmail.com', '$2a$16$PZ1DsgbKNwvFl.TAauYw.Ox1gmZD2Wn6JRvoF4DPpRKJYRh6AHxlG', 'Driver', 'c52ab54b-c00b-44b2-95d4-79f3bfe3928c', 0, 1),
(7, 'driver_2', 'Driver 2', '085252212221', 'driver_2@gmail.com', '$2y$10$NTMBWkRGxQwMTYF7g3h4h.6FZhv6EDQvCCnBftAKezZpqqfSQTFRq', 'Driver', NULL, 1, 2),
(8, 'driver_3', 'Driver 3', '085252212221', 'driver_3@gmail.com', '$2a$16$fPEBxw2NARm820q89PYQ8Ol5vRn0ZRcZyt3V/Svlo8tFXVNWXIFt6', 'Driver', NULL, 1, 3),
(9, 'driver_4', 'Driver 4', '085252212221', 'driver_4@gmail.com', '$2a$16$fPEBxw2NARm820q89PYQ8Ol5vRn0ZRcZyt3V/Svlo8tFXVNWXIFt6', 'Driver', NULL, 1, 4),
(10, 'pelanggan_1', 'Pelanggan 1', '085252212221', 'pelanggan_1@gmail.com', '$2a$16$FLCs7Y5yWNIU6mjrIpUW.ORA87csTIc8HhuFDHJb6InpOITo.syOm', 'Pelanggan', '872e571e-0c2c-49d9-bd42-be30934e284e', 0, NULL),
(11, 'pelanggan_2', 'Pelanggan 2', '085252212221', 'pelanggan_2@gmail.com', '$2a$16$Ac8qzJO2tkXvjnlNEh4QZ.ABTqubT.xw/4L6mIwyfRrUj4E311Zdm', 'Pelanggan', NULL, 0, NULL),
(12, 'pelanggan_3', 'Pelanggan 3', '085252212221', 'pelanggan_3@gmail.com', '$2a$16$BIFgQiYMp.BHYy2txmAU8uBetyQCJ5TTwHMGghRloF22NlYdSMMAy', 'Pelanggan', NULL, 0, NULL),
(13, 'Prikidiel', 'adielah', '081703072928', 'ndokdila@gmail.com', '$2a$16$jmD1SDOF9D6l.KZa5RynT.oCzlrExa1o9PYej2wGt/BuT5fPQ59CC', 'Pelanggan', '3e0554a6-fe8e-4a22-9560-051b916282d0', 0, NULL),
(15, 'fajarch12', 'fajar', '085731862086', 'fajarakmal165@gmail.com', '$2a$16$E3tt7Q36qb17MFx0wMV8X.oI8y5fvMjgBYD2jtUQM0hCeJRgrVNK2', 'Pelanggan', NULL, 0, NULL),
(17, 'Sukriyah', 'anasukriyah.as@gmail.com', 'anasukriyah.as@gmail.com', 'anasukriyah.as@gmail.com', '$2a$16$XkS440NcPCswORweRqMQxeDdaEK.DhA04MyY7hjOzup2jF0A8xGKi', 'Pelanggan', NULL, 0, NULL),
(20, 'Chuna', 'Ana sukriyah', '085708112797', 'anasukriyah.as@gmail.com', '$2a$16$ea6mmMzqFYz9VYd3YkTtkeiWE1CIqLwqlJIfjVBqMYOfOT8dK.qPW', 'Pelanggan', NULL, 0, NULL),
(23, 'Nizar', 'Nizar', '082245578924', 'Nizar@gmail.com', '$2a$16$5jGVGTpCO43DgJiW5AXBreUHhddZuEltY3ClK26LRf0oGybRkY9dC', 'Driver', '0048ff17-9e80-4b4a-882e-5e508caffbdc', 0, 1),
(24, 'Rizky', 'Rizky', '+62 812-3532-0088', 'Rizky@gmail.com', '$2a$16$JqG0f751uKh1ZDei9n/UVeP4fBuo4ggZkaUoVzwQ.R.tQtwoqtExO', 'Driver', NULL, 0, 2),
(25, 'Rika', 'Rika', '+62 856-4656-1346', 'Rika@gmail.com', '$2a$16$do/XGYVCqV9T39GJa.lGIOi.q/pIK4jDZmw.8CoZXPutEpqLeUtuS', 'Driver', 'c27cfe5c-2c70-4b4e-8f67-e2394281473b', 0, 3),
(26, 'Syarah', 'Syarah', '+62 858-0685-5807', 'Syarah@gmail.com', '$2a$16$gaFzmeBZyfjw2u87AgRRBuNlD..Ic0jpPdTX66siN4aFYRDpKDivC', 'Driver', '0658618e-af32-4224-b539-a148411ba86d', 0, 4),
(27, 'Faiz', 'Ahmad Faiz', '081230853113', 'Faielf13@gmail.com', '$2a$16$v4dpjjfS6jyYM1CQurYNGeRTQmqMzvTV41uECT1TaVuBBNqvykg66', 'Pelanggan', NULL, 0, NULL),
(31, 'Neneng aprilia', 'aprilia ardiansah', '08224404643', 'apriliaardian@gmail.com', '$2a$16$9D..p2w0lGlefURqwuStsOa1fC227LaK/CzgWWP31prH1aBP3chku', 'Pelanggan', NULL, 0, NULL),
(34, 'Tespengguna', 'tespengguna', '087878967443', 'coba@gmail.com', '$2a$16$LIL31X.uackEPIPTG3C7OeCmUfBWp0GlqjccTw8GzrWI4HB7audqG', 'Pelanggan', NULL, 0, NULL),
(36, 'Dwi purwanto', 'Dwi purwanto', '085753316720', 'Dwipurwanto4055@gmail.com', '$2a$16$ESX1yPAbo7ZsLa9ZFwZPWulSKFTHFR3WM6qQsY0zmenHJeqfWUhEm', 'Pelanggan', 'b0e52f4b-89ac-471a-b68e-69f92d03ec79', 0, NULL),
(42, 'Mughni', 'Mughni', '085230773222', 'rish.mpk@gmail.com', '$2a$16$IO2CIenV9SNxCfjD66ymmufOVPFBh4gdX9Xb5D6QyRwxLe4YqTl4C', 'Pelanggan', NULL, 0, NULL),
(43, 'fennytsy_', 'Fenny Tasya Kiswanti', '085645103133', 'fennfennyta07@gmail.com', '$2a$16$ZGpMW6HcwmA2fItVrAnMBOdeCXHlVEeRIA8flvD6NKKCqPGnXno8.', 'Pelanggan', '28d81554-7a4f-46a3-9ff0-8c81ffb303c7', 0, NULL),
(53, 'Nizar adam', 'Nizar', '083834370077', 'nizarrahardi@gmail.com ', '$2a$16$hBLhN8/XUfrW0GSkX23ssusKPYhngy53Ed2I43gaoqsuKuIWjrQCa', 'Pelanggan', NULL, 0, NULL),
(59, 'Sarahsn', 'Syarah Syahzanani', '088253846881', 'syarahsn@gmail.com', '$2a$16$hiRo4o5ly8IMdnH5.x4mxOLtDKXEeihkkewAA10mSmhhhnxGpG7aC', 'Pelanggan', NULL, 0, NULL),
(60, 'Syarahsn', 'Syarah Syahzanani', '088235846881', 'syarahsn@gmail.com', '$2a$16$A4Fx.wi65s.eNYj01lsXs.HQ4R566OAhaAgsky/p.ItJThSWpIxma', 'Pelanggan', 'af72569e-59ee-40ac-9c61-670225c0e743', 0, NULL),
(61, 'Rico Bagus Kristanto', 'Rico Bagus Kristanto', '085745366001', 'ricokristanto07@gmail.com', '$2a$16$sMaqorE30824nkRkjLq06.8aWO0RWIwnbo2DQ4nwzVY/gIrHIlahi', 'Pelanggan', NULL, 0, NULL),
(62, 'Tias ', 'Febri Tias', '0881036162735', 'Febritias6@gmail.com', '$2a$16$fISlqClMpaNb2CmKBbZSTeOIlT2XeEhuQiF0hZFfdgtPAhhLikGgC', 'Pelanggan', NULL, 0, NULL),
(63, 'Tias ', 'Febri Tias', '0881036162735', 'Febritias6@gmail.com', '$2a$16$KeMkTEv/4LswNbgXCqFNKu.PRIZqoRU0JrBYvYgc10IT0MGaEUT4S', 'Pelanggan', NULL, 0, NULL),
(64, 'Ana', 'Ana', '+62 857-0811-2797', 'Ana@gmail.com', '$2a$16$RYEcvaXakcjaSrqfbWPYxuoFs9T5E2vOqS4qKc3C/D.Q6HRFIkoB.', 'Driver', NULL, 0, 6),
(65, 'Lia', 'Lia', '+62 822-4400-4643', 'Lia@gmail.com', '$2a$16$ZUZQLbfAAmVlIwde1nK6uOPQ63vgCGyMgiHsbhgwwnSgc/SIb3QxO', 'Driver', NULL, 0, 6),
(66, 'Meriya', 'Meriya Sara', '081332858767', 'meriyasara767@gmail.com', '$2a$16$zU.mbAGOeH6Pri0CJzjJZ.WCFAJCqySeo0X6vEx6fslvN3.m35/M6', 'Pelanggan', NULL, 0, NULL),
(67, 'Meriya', 'Meriya Sara', '081332858767', 'meriyasara767@gmail.com', '$2a$16$0OmM6J2LMfpdAg2kVyYlCOjSC74iFwinMx4GNsNuC5s29IDETWWOC', 'Pelanggan', NULL, 0, NULL),
(68, 'Delia', 'Delia', '085791180124', 'damayantidelia192@gmail. Com', '$2a$16$KxQ6xp7sjNUJz/1YlF26F.q5ezsKYRmSv9nMf4XwfIB/EP1durNGC', 'Pelanggan', '0658618e-af32-4224-b539-a148411ba86d', 0, NULL),
(69, 'rickxs', 'RICKY SETIAWAN', '082132645465', 'rickricksetiawan@gmail.com', '$2a$16$lzvmpGWQeDar5CrQFMEGmeA0ciZmu7xJYM4ZBViCYdDcYanTHsD0.', 'Pelanggan', 'fc3af7d9-50bf-4c50-a3f4-e27ea76eb668', 0, NULL),
(70, 'Intan', 'Intan', '085257168250', 'intancahyani520@gmail.com', '$2a$16$BeoWTyQaE2DPC7s8P5t5l.ZySqzxAbj9qmkJEsbtOTxvIu8N651oi', 'Pelanggan', '961b9024-5de6-47c8-91f5-e2f91d32eea4', 0, NULL),
(71, 'AhmadRizki', 'Ahmad Rizki', '081235320088', 'Rizkinur443@gmail.com', '$2a$16$LnAlzIxkuhCJEDCzDAhN9OAyEZdTWoCbeUTV1ZPcPer2jAYygdARG', 'Pelanggan', NULL, 0, NULL),
(72, 'debymarista_', 'Debby', '089671660840', 'xiapk1.12deby@gmail.com', '$2a$16$jokeV4gAHYiqglXtjtEzQ.5hDxH8NdiP7YjIJTpw6oY7JSPF6Q7Wq', 'Pelanggan', '0048ff17-9e80-4b4a-882e-5e508caffbdc', 0, NULL),
(73, 'Nizarrahardi', 'Nizar', '083834370077', 'nizarrahardi@gmail.com ', '$2a$16$4VC6QMZiZODkH4IlqBfXtenwHea1HYKeyUI1iD6n0SuJ1sO26Kmoy', 'Pelanggan', 'c52ab54b-c00b-44b2-95d4-79f3bfe3928c', 0, NULL),
(74, 'Rika', 'Rika', '085646561346', 'Santirika17@gmail.com', '$2a$16$COA/AQUv8988MZ5QcuOiteHXCs5aWMdIMjcz7egjFVq0bd3cOK1bm', 'Pelanggan', NULL, 0, NULL),
(75, 'Rika', 'Rika', '085646561346', 'Santirika17@gmail.com', '$2a$16$mQLIfUoRZyymUBQmrRw/N.aXfi7kLjsEFxqfwucTwo68k/iTLFsoO', 'Pelanggan', NULL, 0, NULL),
(76, 'Rika Santi ', 'Rika Santi ', '085646561346', 'santirika17@gmail.com', '$2a$16$hJemxcvbsT39UctOPwfoOua5.xpLPE.sT8aNPthrdGaf7ThQxMQbC', 'Pelanggan', 'c27cfe5c-2c70-4b4e-8f67-e2394281473b', 0, NULL),
(77, 'patrick', 'Yudhistira Patrick', '085252212221', 'yudhistira.patrick@gmail.com', '$2a$16$Bn6bK46AVw9gXrAREx/Z2urzMZHy/ytF/M7fEX4L3CTfDv.XhCzgu', 'Pelanggan', 'f626bc67-99e5-4b7e-af9f-f57f1b510d1f', 0, NULL),
(78, 'Nizar ', 'Nizae', '083834370077', 'nizarrahardi@gmail.com ', '$2a$16$qrzMmfw6ePImLOBH0pnRm.A0J/FDATyw27TuiQW58ju3s988pM.1G', 'Pelanggan', NULL, 0, NULL),
(79, 'Kedai1', 'Kedai1', '+62 856-4510-3133', 'Fenny1@gmail.com', '$2a$16$5/dyPdNYMCqAbClM4Vunf.KBE040uO..EgkUaReP7jQmyJUCh2v1O', 'Kasir', '28d81554-7a4f-46a3-9ff0-8c81ffb303c7', 1, 1),
(80, 'Kedai1', 'Kedai1', '+62 856-4510-3133', 'Fenny1@gmail.com', '$2a$16$6psv8sT1OPQVhJOKZiSLM.lkX3r0mkhxaw1IhaMofIM16qO4hW.2W', 'Kasir', 'b0e52f4b-89ac-471a-b68e-69f92d03ec79', 0, 1),
(81, 'Kedai2', 'Kedai2', '+62 896-7166-0840', 'Deby2@gmail.com', '$2a$16$fcgcjoJMRmLXCCV0XK4hj.l.n3auCM933ZwALIRvNgPi58CNyI1De', 'Kasir', NULL, 1, 2),
(82, 'Nizarrahardi', 'Nizar', '083834370077', 'nizarrahardi@gmail.com ', '$2a$16$5PR7fZRqfVgnpEKwsGNoA.cixkeciQGtOQvgjXMWsc9KIiU7YZmMW', 'Pelanggan', NULL, 0, NULL),
(83, 'Kedai2', 'Kedai2', '+62 896-7166-0843', 'Deby2@gmail.com', '$2a$16$BklRmYSp8OWQlS.4vrlgmeIcKdW/YTVc4ISLKkuxJrwrr4cmxEn6S', 'Kasir', '28d81554-7a4f-46a3-9ff0-8c81ffb303c7', 0, 2),
(84, 'Kasir3', 'Kasir3', '085753316721', 'Rika3@gmail.com', '$2a$16$5kzMe8Nzvxs5du4nGaQ2POcajy.8zjQwEjxAxXOj.WoZ6RLlSs6p6', 'Kasir', 'da716c09-9158-44f9-809b-326c722631d1', 0, 3),
(85, 'Syafa', 'Syafa', '081450226616', 'safahidayah2018@gmail.com', '$2a$16$xUb.FamZ2FXh9k74bjGylen.8.N/Tt2eJpQ/KC4euixvMaPBMRieO', 'Pelanggan', '1403dac7-3b5b-4359-a887-02af39b36556', 0, NULL),
(86, 'fitrianurfadilah', 'Fitria Nur Fadilah ', '081298072618', 'fnfadilah59@gmail.com', '$2a$16$sl3u7fOXOhlJdDjb0eoc0.xk46pnuwRd6lNpsKc9fKQKct7xgXE.a', 'Pelanggan', 'da716c09-9158-44f9-809b-326c722631d1', 0, NULL),
(87, 'Kedai5', 'Kedai5', '085257168251', 'Intancahyani50@gmail.com', '$2a$16$SxzRUNz1lqElb593HRBoJuUVXNpo1RCKWM6ZQsdrWAm1f3RIOMiN2', 'Kasir', '961b9024-5de6-47c8-91f5-e2f91d32eea4', 1, 5),
(88, 'Kedai5', 'Kedai5', '085257168251', 'Intancahyani50@gmail.com', '$2a$16$Pr/tsRePP7Zj2mEEL913oORjei4Nv8h80hHOo1V4ieU6nBix/XuH6', 'Kasir', 'b0e52f4b-89ac-471a-b68e-69f92d03ec79', 0, 5),
(89, 'Intancahyani', 'Intancahyani', '085257168252', 'Intan@gmail.com', '$2a$16$SiDUUgD4GVP4CCWipZqtV.xvUPDbmpqmQhEVHPHuv647ekXjGWDfu', 'Driver', '961b9024-5de6-47c8-91f5-e2f91d32eea4', 0, 5),
(90, 'Debby', 'Debby', '089671660840', 'Xiapk1.12deby@gmail.com', '$2a$16$lb6vzwQ181P0vfMnrcUzVeOmnldaV5E3RgmojXd/qpuCBJDyp7hhK', 'Driver', '0048ff17-9e80-4b4a-882e-5e508caffbdc', 0, 2);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indeks untuk tabel `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`menu_id`),
  ADD KEY `fk_menu_store1_idx` (`store_id`),
  ADD KEY `fk_menu_category1_idx` (`category_id`);

--
-- Indeks untuk tabel `payment_type`
--
ALTER TABLE `payment_type`
  ADD PRIMARY KEY (`payment_type_id`);

--
-- Indeks untuk tabel `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`store_id`);

--
-- Indeks untuk tabel `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `fk_transaction_users1_idx` (`cashier_id`),
  ADD KEY `fk_transaction_payment_type1_idx` (`payment_type_id`),
  ADD KEY `fk_transaction_store1_idx` (`store_id`),
  ADD KEY `fk_transaction_users2_idx` (`customer_id`),
  ADD KEY `fk_transaction_users3_idx` (`driver_id`);

--
-- Indeks untuk tabel `transaction_detail`
--
ALTER TABLE `transaction_detail`
  ADD PRIMARY KEY (`transaction_detail_id`),
  ADD KEY `fk_transaction_detail_menu1_idx` (`menu_id`),
  ADD KEY `fk_transaction_detail_transaction1_idx` (`transaction_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `fk_users_store1_idx` (`store_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `menu`
--
ALTER TABLE `menu`
  MODIFY `menu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=415;

--
-- AUTO_INCREMENT untuk tabel `payment_type`
--
ALTER TABLE `payment_type`
  MODIFY `payment_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `store`
--
ALTER TABLE `store`
  MODIFY `store_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `transaction`
--
ALTER TABLE `transaction`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT untuk tabel `transaction_detail`
--
ALTER TABLE `transaction_detail`
  MODIFY `transaction_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `fk_menu_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_menu_store1` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `fk_transaction_payment_type1` FOREIGN KEY (`payment_type_id`) REFERENCES `payment_type` (`payment_type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_transaction_store1` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_transaction_users1` FOREIGN KEY (`cashier_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_transaction_users2` FOREIGN KEY (`customer_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_transaction_users3` FOREIGN KEY (`driver_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `transaction_detail`
--
ALTER TABLE `transaction_detail`
  ADD CONSTRAINT `fk_transaction_detail_menu1` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`menu_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_transaction_detail_transaction1` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`transaction_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_store1` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

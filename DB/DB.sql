-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-06-2024 a las 21:37:05
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `test_framework_good`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_likes` (IN `p_username` VARCHAR(50), IN `p_housing_id` INT)   BEGIN
        	DECLARE user_id INT;

        	-- Obtener el ID del usuario
        	SELECT id_user INTO user_id FROM users WHERE username = p_username;

        	-- Eliminar el like si el usuario existe
        	IF user_id IS NOT NULL THEN
        		DELETE FROM likes WHERE id_user = user_id AND id_housing = p_housing_id;
        		SELECT 'Like deleted' AS message;
        	ELSE
        		SELECT 'User does not exist' AS message;
        	END IF;
        END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_likes` (IN `p_username` VARCHAR(50), IN `p_housing_id` INT)   BEGIN
        	DECLARE user_id INT;

        	-- Obtener el ID del usuario
        	SELECT id_user INTO user_id FROM users WHERE username = p_username;

        	-- Insertar el like si el usuario existe
        	IF user_id IS NOT NULL THEN
        		INSERT INTO likes (id_user, id_housing) VALUES (user_id, p_housing_id);
        		SELECT 'Like inserted' AS message;
        	ELSE
        		SELECT 'User does not exist' AS message;
        	END IF;
        END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `automation_parts`
--

CREATE TABLE `automation_parts` (
  `id_aut_parts` int(10) UNSIGNED NOT NULL,
  `name_aut_parts` varchar(100) NOT NULL,
  `img_aut_parts` varchar(100) NOT NULL,
  `description_aut_parts` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `automation_parts`
--

INSERT INTO `automation_parts` (`id_aut_parts`, `name_aut_parts`, `img_aut_parts`, `description_aut_parts`) VALUES
(1, 'All house automated', 'view/img/automation/all_house.jpg', 'Enjoy a fully automated home where convenience\r\n meets innovation, simplifying your life with seamless control of every aspect.'),
(2, 'Lighting control', 'view/img/automation/light_control.jpg', 'Illuminate your space effortlessly, with precision\r\n control over brightness and ambiance for every moment and mood.'),
(3, 'Blinds and curtains', 'view/img/automation/shutter.jpg', 'Transform your home with automated blinds and curtains,\r\n effortlessly managing natural light and privacy at your fingertips.'),
(4, 'Entertainment systems', 'view/img/automation/ent_system.jpg', 'Elevate your entertainment experience with cutting-edge\r\n systems seamlessly integrated throughout your living spaces.'),
(5, 'Virtual assistants', 'view/img/automation/virtual_assistant.jpg', 'Enhance your home with a virtual assistant, simplifying\r\n tasks and providing seamless control through intuitive voice commands.'),
(6, 'Home access control', 'view/img/automation/home_access.jpg', 'Safeguard your sanctuary with advanced access control,\r\n ensuring security and peace of mind for you and your loved ones.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
  `id_cart` int(11) NOT NULL,
  `id_line` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL,
  `id_housing` int(10) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `isActive` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cart`
--

INSERT INTO `cart` (`id_cart`, `id_line`, `id_product`, `id_user`, `id_housing`, `quantity`, `isActive`) VALUES
(1, 1, 1, 11, 1, 2, 1),
(2, 1, 2, 11, 1, 1, 1),
(3, 1, 3, 11, 1, 1, 1),
(4, 2, 1, 11, 5, 1, 1),
(5, 2, 2, 11, 5, 1, 1),
(6, 2, 3, 11, 5, 1, 1),
(7, 3, 1, 11, 1, 1, 1),
(8, 3, 2, 11, 1, 1, 1),
(9, 3, 3, 11, 1, 1, 1),
(10, 4, 1, 11, 1, 1, 1),
(11, 4, 2, 11, 1, 1, 1),
(12, 4, 3, 11, 1, 1, 1),
(13, 5, 1, 11, 1, 1, 1),
(14, 5, 2, 11, 1, 1, 1),
(15, 5, 3, 11, 1, 1, 1),
(16, 6, 1, 11, 2, 1, 1),
(17, 6, 2, 11, 2, 1, 1),
(18, 6, 3, 11, 2, 1, 1),
(19, 7, 1, 11, 2, 1, 1),
(20, 7, 2, 11, 2, 1, 1),
(21, 7, 3, 11, 2, 1, 1),
(22, 8, 1, 11, 1, 1, 1),
(23, 8, 2, 11, 1, 1, 1),
(24, 8, 3, 11, 1, 1, 1),
(25, 9, 1, 11, 2, 1, 1),
(26, 9, 2, 11, 2, 1, 1),
(27, 9, 3, 11, 2, 1, 1),
(28, 10, 1, 11, 1, 1, 1),
(29, 10, 2, 11, 1, 1, 1),
(30, 10, 3, 11, 1, 1, 1),
(31, 11, 1, 33, 1, 1, 1),
(32, 11, 2, 33, 1, 1, 1),
(33, 11, 3, 33, 1, 1, 1),
(40, 14, 1, 11, 3, 1, 1),
(41, 14, 2, 11, 3, 1, 1),
(42, 14, 3, 11, 3, 1, 1),
(43, 15, 1, 11, 3, 1, 1),
(44, 15, 2, 11, 3, 1, 1),
(45, 16, 1, 11, 1, 1, 1),
(46, 16, 2, 11, 1, 1, 1),
(48, 17, 1, 11, 3, 1, 1),
(49, 17, 2, 11, 3, 1, 1),
(50, 18, 1, 33, 3, 1, 1),
(51, 19, 1, 33, 9, 1, 1),
(52, 20, 1, 32, 1, 1, 1),
(53, 21, 1, 34, 8, 1, 1),
(54, 22, 1, 34, 5, 1, 1),
(55, 22, 2, 34, 5, 1, 1),
(56, 22, 3, 34, 5, 1, 1),
(57, 23, 1, 34, 3, 1, 1),
(58, 23, 2, 34, 3, 1, 1),
(59, 23, 3, 34, 3, 1, 1),
(60, 24, 1, 34, 2, 1, 1),
(61, 24, 2, 34, 2, 1, 1),
(62, 24, 3, 34, 2, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id_category` int(10) UNSIGNED NOT NULL,
  `name_category` varchar(100) NOT NULL,
  `img_category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id_category`, `name_category`, `img_category`) VALUES
(1, 'Luxury', 'view/img/category/luxury.jpg'),
(2, 'With sea views', 'view/img/category/sea_views.jpg'),
(3, 'With mountain views', 'view/img/category/mountain_views.jpg'),
(4, 'With balcony', 'view/img/category/balcony.jpg'),
(5, 'With garden', 'view/img/category/garden.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `city`
--

CREATE TABLE `city` (
  `id_city` int(10) UNSIGNED NOT NULL,
  `name_city` varchar(100) NOT NULL,
  `img_city` varchar(100) NOT NULL,
  `description_city` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `city`
--

INSERT INTO `city` (`id_city`, `name_city`, `img_city`, `description_city`) VALUES
(1, 'Madrid', 'view/img/cities/madrid.jpg', 'Madrid, Spain\'s largest city, boasts diverse gastronomy and climate. Globally recognized for quality\r\n                 living, it\'s a vibrant capital with rich culture and a welcoming atmosphere for residents and visitors alike.'),
(2, 'Barcelona', 'view/img/cities/barcelona.jpg', 'Barcelona, the second-largest city in Spain, captivates with its rich gastronomy and inviting\r\n                 climate. A global favorite for quality living, it harmonizes culture and lifestyle seamlessly.'),
(3, 'Valencia', 'view/img/cities/valencia.jpg', 'Valencia, Spain\'s third-largest city, boasts a captivating blend of vibrant gastronomy and a \r\n                delightful climate. Globally recognized as one of the world\'s best cities to live in, it offers a rich cultural tapestry and a warm, welcoming ambiance.'),
(4, 'Bilbao', 'view/img/cities/bilbao.jpg', 'Bilbao, a dynamic city in the Basque Country, impresses with exceptional gastronomy\r\n                 and a favorable climate. Globally acclaimed as a top city for quality living, it seamlessly blends tradition with modernity.'),
(5, 'Sevilla', 'view/img/cities/sevilla.jpg', 'Sevilla, in southern Spain, enchants with its gastronomic heritage and warm climate. Frequently \r\n                lauded as a top global city for quality living, it radiates cultural richness and timeless charm.'),
(6, 'Zaragoza', 'view/img/cities/zaragoza.jpg', 'Zaragoza, Spain\'s fourth-largest city in the northeast, charms with its gastronomic excellence\r\n                 and comfortable climate. A recurrent global favorite for quality living, it balances tradition with modernity seamlessly.'),
(7, 'Gijón', 'view/img/cities/gijon.jpg', 'Gijón, on Spain\'s northern coast, delights with fantastic gastronomy and a pleasant climate. Recognized\r\n                 as a highly desirable city globally, it offers a perfect blend of natural beauty and urban allure.'),
(8, 'Palma de Mallorca', 'view/img/cities/mallorca.jpg', 'Palma de Mallorca, on the idyllic island, impresses with incredible gastronomy and a\r\n                 delightful climate. A top global city for quality living, it combines Mediterranean charm with modern lifestyle seamlessly.'),
(9, 'Las Palmas de Gran Canaria', 'view/img/cities/laspalmas.jpg', 'Las Palmas de Gran Canaria, in the Canary Islands, excels with superb gastronomy\r\n                 and a fantastic climate. Consistently hailed as a top global city, it offers an exceptional quality of life by the Atlantic.'),
(10, 'Santander', 'view/img/cities/santander.jpg', 'Santander, on Spain\'s northern coast, thrives with exceptional gastronomy and a temperate climate.\r\n                 Repeatedly recognized as one of the world\'s best cities, it captivates with coastal beauty and cultural richness.'),
(11, 'Valladolid', 'view/img/cities/valladolid.jpg', 'Valladolid, in northwest Spain, charms with delightful gastronomy and a comfortable climate. \r\n                Acknowledged globally for quality living, it showcases historical charm and modern amenities in perfect harmony.'),
(12, 'Toledo', 'view/img/cities/toledo.jpg', 'Toledo, the historic city in central Spain, is celebrated for rich gastronomy and a pleasant climate.\r\n                 Repeatedly recognized as a top global city, it preserves cultural heritage amidst a welcoming atmosphere.'),
(13, 'Badajoz', 'view/img/cities/badajoz.jpg', 'Badajoz, in western Spain, impresses with vibrant gastronomy and a favorable climate. A recurrent\r\n                 favorite globally for quality living, it offers a perfect blend of history, culture, and contemporary appeal.'),
(14, 'Vigo', 'view/img/cities/vigo.jpg', 'Vigo, in northwest Spain, stands out with fantastic gastronomy and a pleasant climate. Consistently esteemed\r\n                 as a top global city, it combines maritime charm with modern amenities seamlessly.'),
(15, 'Murcia', 'view/img/cities/murcia.jpg', 'Murcia, in southeastern Spain, delights with outstanding culinary experiences and a delightful climate. \r\n                Repeatedly hailed as one of the best cities globally, it offers an exceptional quality of life.'),
(16, 'Pamplona', 'view/img/cities/pamplona.jpg', 'Pamplona, in the north, is celebrated for rich gastronomy and a temperate climate. Recognized as one\r\n                 of the world\'s best cities, it combines historical charm with a vibrant, welcoming atmosphere.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `extras`
--

CREATE TABLE `extras` (
  `id_extras` int(10) UNSIGNED NOT NULL,
  `name_extras` varchar(100) NOT NULL,
  `img_extras` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `extras`
--

INSERT INTO `extras` (`id_extras`, `name_extras`, `img_extras`) VALUES
(1, 'Security system', 'view/icons/extras/security_system.svg'),
(2, 'Home automation', 'view/icons/extras/automation_syst.svg'),
(3, 'Integrated sound system', 'view/icons/extras/int_sound_syst.svg'),
(4, 'Solar panels', 'view/icons/extras/solar_panel.svg'),
(5, 'Swimming pool', 'view/icons/extras/swimming_pool.svg'),
(6, 'Automatic watering system', 'view/icons/extras/aut_water_system.svg'),
(7, 'Gym', 'view/icons/extras/gym.svg'),
(8, 'Bathroom suite', 'view/icons/extras/bathroom-suite.svg'),
(9, 'Chimney', 'view/icons/extras/chimney.svg'),
(10, 'Home cinema', 'view/icons/extras/home-cinema.svg'),
(11, 'Underfloor heating', 'view/icons/extras/underfloor_heating.svg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `housings`
--

CREATE TABLE `housings` (
  `id_housing` int(10) UNSIGNED NOT NULL,
  `cadastral_ref` varchar(100) NOT NULL,
  `housing_price` int(10) UNSIGNED NOT NULL,
  `housing_m2` int(10) UNSIGNED NOT NULL,
  `housing_rooms` int(10) UNSIGNED NOT NULL,
  `housing_bedrooms` int(10) UNSIGNED NOT NULL,
  `housing_bathrooms` int(10) UNSIGNED NOT NULL,
  `garage` varchar(100) NOT NULL,
  `housing_heating` varchar(100) NOT NULL,
  `housing_address` varchar(100) NOT NULL,
  `publication_date` varchar(100) NOT NULL,
  `img_housing` varchar(300) NOT NULL,
  `visit_count` int(11) DEFAULT 0,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `id_type` int(10) UNSIGNED NOT NULL,
  `id_city` int(10) UNSIGNED NOT NULL,
  `id_operation` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `housings`
--

INSERT INTO `housings` (`id_housing`, `cadastral_ref`, `housing_price`, `housing_m2`, `housing_rooms`, `housing_bedrooms`, `housing_bathrooms`, `garage`, `housing_heating`, `housing_address`, `publication_date`, `img_housing`, `visit_count`, `latitude`, `longitude`, `id_type`, `id_city`, `id_operation`) VALUES
(1, '1111111 AA2222A 0001 AA', 350000, 300, 13, 3, 2, 'Yes', 'Natural gas', 'Av. Primera, 7', '15-04-2014', 'view/img/type/house.jpg', 16, 40.4128, -3.71183, 1, 1, 1),
(2, '2222222 BB3333B 0002 BB', 200000, 280, 10, 2, 2, 'No', 'Gas', 'C/ Bosque Encantado, 5', '15-04-2013', 'view/img/type/country_house.jpg', 6, 41.4135, 2.21297, 2, 2, 2),
(3, '3333333 CC4444C 0003 CC', 170000, 200, 7, 2, 1, 'Yes', 'Electric', 'C/ De las estrellas, 2', '15-04-2016', 'view/img/type/flat.jpg', 2, 39.4665, -0.37595, 3, 3, 2),
(4, '4444444 DD5555D 0004 DD', 100000, 120, 7, 0, 1, 'Yes', 'Electric', 'C/ Fuentes, 4', '22-11-2014', 'view/img/type/office.jpg', 0, 43.2642, -2.94524, 4, 4, 3),
(5, '5555555 EE6666E 0005 EE', 50000, 300, 5, 0, 2, 'No', 'No heating', 'Av. Septima Estación, 9', '22-11-2015', 'view/img/type/warehouse.jpg', 2, 37.3519, -5.98425, 5, 5, 4),
(6, '6666666 FF7777F 0006 FF', 250000, 220, 8, 3, 2, 'Yes', 'Natural gas', 'C/ Calle Zaragoza, 3', '29-03-2024', 'view/img/type/house.jpg', 1, 41.6488, -0.889085, 1, 6, 1),
(7, '7777777 GG8888G 0007 GG', 180000, 180, 6, 2, 1, 'No', 'Electric', 'C/ Avenida Gijón, 5', '29-03-2024', 'view/img/type/house.jpg', 1, 43.5411, -5.6643, 1, 7, 2),
(8, '8888888 HH9999H 0008 HH', 300000, 250, 9, 3, 2, 'Yes', 'Gas', 'C/ Avenida Mallorca, 8', '29-03-2024', 'view/img/type/flat.jpg', 1, 39.5696, 2.6502, 1, 8, 1),
(9, '9999999 II0000I 0009 II', 220000, 200, 7, 2, 2, 'Yes', 'Electric', 'C/ Calle Gran Canaria, 9', '29-03-2024', 'view/img/type/house.jpg', 2, 28.1248, -15.4301, 1, 9, 2),
(10, '5555555 SS6666S 0014 SS', 260000, 210, 8, 3, 2, 'Yes', 'Gas', 'C/ Avenida Santander, 14', '29-03-2024', 'view/img/type/country_house.jpg', 1, 43.4623, -3.8099, 2, 10, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `housing_automation_parts`
--

CREATE TABLE `housing_automation_parts` (
  `id_housing` int(10) UNSIGNED NOT NULL,
  `id_aut_parts` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `housing_automation_parts`
--

INSERT INTO `housing_automation_parts` (`id_housing`, `id_aut_parts`) VALUES
(1, 1),
(1, 4),
(1, 6),
(2, 2),
(2, 3),
(3, 5),
(4, 2),
(5, 2),
(6, 4),
(6, 6),
(7, 3),
(7, 5),
(8, 1),
(8, 2),
(9, 4),
(9, 6),
(10, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `housing_category`
--

CREATE TABLE `housing_category` (
  `id_housing` int(10) UNSIGNED NOT NULL,
  `id_category` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `housing_category`
--

INSERT INTO `housing_category` (`id_housing`, `id_category`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 1),
(7, 2),
(8, 3),
(9, 4),
(10, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `housing_extras`
--

CREATE TABLE `housing_extras` (
  `id_housing` int(10) UNSIGNED NOT NULL,
  `id_extras` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `housing_extras`
--

INSERT INTO `housing_extras` (`id_housing`, `id_extras`) VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 9),
(2, 10),
(3, 2),
(3, 3),
(4, 1),
(4, 4),
(5, 1),
(6, 1),
(6, 2),
(6, 10),
(7, 9),
(7, 10),
(8, 3),
(8, 4),
(9, 5),
(9, 6),
(10, 5),
(10, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `housing_products`
--

CREATE TABLE `housing_products` (
  `id_housing` int(10) UNSIGNED NOT NULL,
  `id_product` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `housing_products`
--

INSERT INTO `housing_products` (`id_housing`, `id_product`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 2),
(2, 3),
(3, 1),
(3, 2),
(3, 3),
(4, 1),
(4, 2),
(4, 3),
(5, 1),
(5, 2),
(5, 3),
(6, 1),
(6, 2),
(6, 3),
(7, 1),
(7, 2),
(7, 3),
(8, 1),
(8, 2),
(8, 3),
(9, 1),
(9, 2),
(9, 3),
(10, 1),
(10, 2),
(10, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `h_type`
--

CREATE TABLE `h_type` (
  `id_type` int(10) UNSIGNED NOT NULL,
  `name_type` varchar(100) NOT NULL,
  `img_type` varchar(100) NOT NULL,
  `description_type` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `h_type`
--

INSERT INTO `h_type` (`id_type`, `name_type`, `img_type`, `description_type`) VALUES
(1, 'House', 'view/img/type/house.jpg', 'Explore the charm of a classic home. Our traditional houses offer timeless design, comfort, and\r\n                                    functionality. Find your ideal space where warmth and practicality come together seamlessly.'),
(2, 'Country house', 'view/img/type/country_house.jpg', 'Escape to the tranquility of a country house. Our rural retreats offer a perfect blend of charm\r\n                                    and serenity. Find your idyllic countryside home, where nature seamlessly merges with comfort.'),
(3, 'Flat', 'view/img/type/flat.jpg', 'Discover the allure of apartments. Our thoughtfully designed flats provide modern living in urban\r\n                                    comfort. Find your perfect space, combining style, convenience, and a vibrant community atmosphere.'),
(4, 'Office', 'view/img/type/office.jpg', 'Elevate your workspace with us. Discover premium offices tailored to your needs. Find a professional\r\n                                    environment where innovation and productivity thrive. Redefine your work experience with our exceptional office spaces.'),
(5, 'Warehouse', 'view/img/type/warehouse.jpg', 'Unlock the potential of spacious warehouses with us. Explore our industrial properties,\r\n                                    offering expansive storage solutions for businesses. Find the perfect warehouse to elevate your operations and storage needs.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `img_housings`
--

CREATE TABLE `img_housings` (
  `id_img` int(10) UNSIGNED NOT NULL,
  `img_housings` varchar(100) NOT NULL,
  `id_housing` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `img_housings`
--

INSERT INTO `img_housings` (`id_img`, `img_housings`, `id_housing`) VALUES
(1, 'view/img/type/house.jpg', 1),
(2, 'view/img/type/house.jpg', 1),
(3, 'view/img/type/country_house.jpg', 2),
(4, 'view/img/type/country_house.jpg', 2),
(5, 'view/img/type/flat.jpg', 3),
(6, 'view/img/type/flat.jpg', 3),
(7, 'view/img/type/office.jpg', 4),
(8, 'view/img/type/office.jpg', 4),
(9, 'view/img/type/warehouse.jpg', 5),
(10, 'view/img/type/warehouse.jpg', 5),
(11, 'view/img/type/house.jpg', 6),
(12, 'view/img/type/house.jpg', 6),
(13, 'view/img/type/house.jpg', 7),
(14, 'view/img/type/house.jpg', 7),
(15, 'view/img/type/house.jpg', 8),
(16, 'view/img/type/house.jpg', 8),
(17, 'view/img/type/house.jpg', 9),
(18, 'view/img/type/house.jpg', 9),
(19, 'view/img/type/house.jpg', 9),
(20, 'view/img/type/country_house.jpg', 10),
(21, 'view/img/type/country_house.jpg', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `id_likes` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL,
  `id_housing` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `likes`
--

INSERT INTO `likes` (`id_likes`, `id_user`, `id_housing`) VALUES
(3, 11, 3),
(4, 33, 9),
(5, 11, 1),
(6, 11, 2),
(7, 33, 1),
(11, 34, 2),
(12, 32, 8),
(13, 11, 5),
(14, 11, 6),
(16, 33, 3),
(17, 11, 10),
(18, 33, 7),
(19, 34, 9),
(20, 34, 10),
(21, 34, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `line_manager`
--

CREATE TABLE `line_manager` (
  `id_line` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `line_manager`
--

INSERT INTO `line_manager` (`id_line`) VALUES
(24);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operation`
--

CREATE TABLE `operation` (
  `id_operation` int(10) UNSIGNED NOT NULL,
  `name_operation` varchar(100) NOT NULL,
  `img_operation` varchar(100) NOT NULL,
  `description_operation` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `operation`
--

INSERT INTO `operation` (`id_operation`, `name_operation`, `img_operation`, `description_operation`) VALUES
(1, 'Buy', 'view/img/operation/buy.jpg', 'Secure your dream home with us. Explore exceptional properties and find the house of your dreams. Discover a space\r\n                                    where comfort and elegance converge. Start the journey to your new home today!'),
(2, 'Rent', 'view/img/operation/rent.jpg', 'Explore our curated rentals for your ideal home. Find comfort and style in spaces tailored to you. Start your \r\n                                    leasing journey with us, discovering the perfect place for your lifestyle.'),
(3, 'Own-to-Rent', 'view/img/operation/own-to-rent.jpg', 'Own-to-rent with us, enjoying the best of both worlds. Secure a property to call home while relishing\r\n                                    the flexibility of renting. Find your ideal space and start living effortlessly today!'),
(4, 'Share', 'view/img/operation/share.jpg', 'Discover the joy of shared living. Explore our shared houses, fostering community, and creating meaningful\r\n                                    connections. Find your perfect shared space for a vibrant and inclusive lifestyle.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id_product` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `name_product` varchar(100) NOT NULL,
  `price_product` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id_product`, `stock`, `name_product`, `price_product`) VALUES
(1, 47, 'House cleaning', 300.00),
(2, 37, 'Gardening and maintenance', 250.00),
(3, 32, 'Laundry and dry cleaning services', 100.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchases`
--

CREATE TABLE `purchases` (
  `purchase_id` int(11) NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `purchase_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `purchases`
--

INSERT INTO `purchases` (`purchase_id`, `id_user`, `total_price`, `name`, `phone`, `purchase_date`) VALUES
(1, 11, 1600.00, 'alex', '696450652', '2024-06-09 11:47:59'),
(2, 11, 650.00, 'alex', '696450652', '2024-06-09 13:20:04'),
(3, 11, 650.00, 'alex', '696450652', '2024-06-09 19:48:21'),
(4, 11, 650.00, 'alex', '696450652', '2024-06-09 19:53:36'),
(5, 11, 650.00, 'alex', '696450652', '2024-06-09 19:56:11'),
(6, 11, 650.00, 'alex', '696450652', '2024-06-09 20:03:19'),
(7, 11, 650.00, 'alex', '696450652', '2024-06-09 20:13:19'),
(8, 11, 650.00, 'alex', '696450652', '2024-06-09 20:16:49'),
(9, 11, 650.00, 'alex', '696450652', '2024-06-09 20:23:01'),
(10, 33, 650.00, 'alex', '696450652', '2024-06-10 17:53:49'),
(11, 11, 650.00, 'alex', '696450652', '2024-06-10 18:10:34'),
(12, 11, 550.00, 'alex', '696450652', '2024-06-10 19:06:37'),
(13, 11, 1100.00, 'alex', '696450652', '2024-06-11 14:28:21'),
(14, 33, 600.00, 'alex', '696450652', '2024-06-12 18:09:52'),
(15, 32, 300.00, 'alex', '696450652', '2024-06-12 19:29:34'),
(16, 34, 300.00, 'alex', '696450652', '2024-06-12 19:33:08'),
(17, 34, 1950.00, 'alex', '696450652', '2024-06-12 19:35:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchase_lines`
--

CREATE TABLE `purchase_lines` (
  `purchase_line_id` int(11) NOT NULL,
  `purchase_id` int(11) DEFAULT NULL,
  `id_line` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `purchase_lines`
--

INSERT INTO `purchase_lines` (`purchase_line_id`, `purchase_id`, `id_line`) VALUES
(1, 1, 1),
(2, 1, 1),
(3, 1, 1),
(4, 1, 2),
(5, 1, 2),
(6, 1, 2),
(7, 2, 3),
(8, 2, 3),
(9, 2, 3),
(10, 3, 4),
(11, 3, 4),
(12, 3, 4),
(13, 4, 5),
(14, 4, 5),
(15, 4, 5),
(16, 5, 6),
(17, 5, 6),
(18, 5, 6),
(19, 6, 7),
(20, 6, 7),
(21, 6, 7),
(22, 7, 8),
(23, 7, 8),
(24, 7, 8),
(25, 8, 9),
(26, 8, 9),
(27, 8, 9),
(28, 9, 10),
(29, 9, 10),
(30, 9, 10),
(31, 10, 11),
(32, 10, 11),
(33, 10, 11),
(34, 11, 14),
(35, 11, 14),
(36, 11, 14),
(37, 12, 15),
(38, 12, 15),
(39, 13, 16),
(40, 13, 16),
(41, 13, 17),
(42, 13, 17),
(43, 14, 18),
(44, 14, 19),
(45, 15, 20),
(46, 16, 21),
(47, 17, 22),
(48, 17, 22),
(49, 17, 22),
(50, 17, 23),
(51, 17, 23),
(52, 17, 23),
(53, 17, 24),
(54, 17, 24),
(55, 17, 24);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(10) UNSIGNED NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(75) DEFAULT NULL,
  `type_user` varchar(50) DEFAULT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `activate` int(1) NOT NULL,
  `attempts_password` int(10) UNSIGNED DEFAULT 0,
  `otp_code` varchar(6) DEFAULT NULL,
  `otp_timestamp` timestamp NULL DEFAULT NULL,
  `login_type` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`, `email`, `type_user`, `avatar`, `activate`, `attempts_password`, `otp_code`, `otp_timestamp`, `login_type`) VALUES
(11, 'alexmj7', '$2y$12$00xymYh3Kqh6nl8NNYueTeo86vzzHpK5I.E/JmU11nSo4HXNxGsTu', 'alex.mart.juan@gmail.com', 'client', 'http://localhost/Framework/HousingProject_Framework/uploads/avatar/6668654c120b4_mi_foto.jpg', 1, 0, NULL, NULL, 'Local'),
(32, 'alexmartinezeterno7_google', '', 'alexmartinezeterno7@gmail.com', 'client', 'https://lh3.googleusercontent.com/a/ACg8ocIlhcLd1qAff6Lc9RMCEOPkrfgKIeFhKwtQUIDANPtqy7ytdg=s96-c', 1, 0, NULL, NULL, 'social_google'),
(33, 'alex.mart.juan_google', '', 'alex.mart.juan@gmail.com', 'client', 'https://lh3.googleusercontent.com/a/ACg8ocJ4WtA7YsSMIwlpBuASIjhP4OQS8Pn0JiefO5hPkujWWqsNAA=s96-c', 1, 0, NULL, NULL, 'social_google'),
(34, 'alexmartinez21_github', '', 'alexmartinez21@hotmail.es', 'client', 'https://avatars.githubusercontent.com/u/171198713?v=4', 1, 0, NULL, NULL, 'social_github'),
(35, 'alexmj13', '$2y$12$daf2cE37MDY5Ghbk8DIf0OK20qJNmjqNgr9Y3NrumHCue3VcbMWBe', 'alexmartinez21@hotm.es', 'client', 'https://i.pravatar.cc/500?u=4c8a7c0ab558df7b7c39ea4bb4b7bacf', 1, 0, NULL, NULL, 'Local');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_profile`
--

CREATE TABLE `user_profile` (
  `id_profile` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `dob` date NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `interests` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_profile`
--

INSERT INTO `user_profile` (`id_profile`, `id_user`, `first_name`, `last_name`, `dob`, `address`, `interests`) VALUES
(2, 11, 'Alex', 'Martinez', '1999-11-22', 'C/Hola', 'Me gusta jugar a la videoconsola y a futbol.');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `automation_parts`
--
ALTER TABLE `automation_parts`
  ADD PRIMARY KEY (`id_aut_parts`),
  ADD UNIQUE KEY `name_aut_parts` (`name_aut_parts`);

--
-- Indices de la tabla `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id_cart`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_housing` (`id_housing`);

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`),
  ADD UNIQUE KEY `name_category` (`name_category`);

--
-- Indices de la tabla `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id_city`),
  ADD UNIQUE KEY `name_city` (`name_city`);

--
-- Indices de la tabla `extras`
--
ALTER TABLE `extras`
  ADD PRIMARY KEY (`id_extras`),
  ADD UNIQUE KEY `name_extras` (`name_extras`);

--
-- Indices de la tabla `housings`
--
ALTER TABLE `housings`
  ADD PRIMARY KEY (`id_housing`),
  ADD UNIQUE KEY `cadastral_ref` (`cadastral_ref`),
  ADD KEY `id_type` (`id_type`),
  ADD KEY `id_city` (`id_city`),
  ADD KEY `id_operation` (`id_operation`);

--
-- Indices de la tabla `housing_automation_parts`
--
ALTER TABLE `housing_automation_parts`
  ADD PRIMARY KEY (`id_housing`,`id_aut_parts`),
  ADD KEY `id_aut_parts` (`id_aut_parts`);

--
-- Indices de la tabla `housing_category`
--
ALTER TABLE `housing_category`
  ADD PRIMARY KEY (`id_housing`,`id_category`),
  ADD KEY `id_category` (`id_category`);

--
-- Indices de la tabla `housing_extras`
--
ALTER TABLE `housing_extras`
  ADD PRIMARY KEY (`id_housing`,`id_extras`),
  ADD KEY `id_extras` (`id_extras`);

--
-- Indices de la tabla `housing_products`
--
ALTER TABLE `housing_products`
  ADD PRIMARY KEY (`id_housing`,`id_product`),
  ADD KEY `id_product` (`id_product`);

--
-- Indices de la tabla `h_type`
--
ALTER TABLE `h_type`
  ADD PRIMARY KEY (`id_type`),
  ADD UNIQUE KEY `name_type` (`name_type`);

--
-- Indices de la tabla `img_housings`
--
ALTER TABLE `img_housings`
  ADD PRIMARY KEY (`id_img`),
  ADD KEY `id_housing` (`id_housing`);

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id_likes`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_housing` (`id_housing`);

--
-- Indices de la tabla `line_manager`
--
ALTER TABLE `line_manager`
  ADD PRIMARY KEY (`id_line`);

--
-- Indices de la tabla `operation`
--
ALTER TABLE `operation`
  ADD PRIMARY KEY (`id_operation`),
  ADD UNIQUE KEY `name_operation` (`name_operation`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`),
  ADD UNIQUE KEY `name_product` (`name_product`);

--
-- Indices de la tabla `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`purchase_id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `purchase_lines`
--
ALTER TABLE `purchase_lines`
  ADD PRIMARY KEY (`purchase_line_id`),
  ADD KEY `purchase_id` (`purchase_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`id_profile`),
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `automation_parts`
--
ALTER TABLE `automation_parts`
  MODIFY `id_aut_parts` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `cart`
--
ALTER TABLE `cart`
  MODIFY `id_cart` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `city`
--
ALTER TABLE `city`
  MODIFY `id_city` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `extras`
--
ALTER TABLE `extras`
  MODIFY `id_extras` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `housings`
--
ALTER TABLE `housings`
  MODIFY `id_housing` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `h_type`
--
ALTER TABLE `h_type`
  MODIFY `id_type` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `img_housings`
--
ALTER TABLE `img_housings`
  MODIFY `id_img` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `id_likes` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `operation`
--
ALTER TABLE `operation`
  MODIFY `id_operation` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `purchases`
--
ALTER TABLE `purchases`
  MODIFY `purchase_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `purchase_lines`
--
ALTER TABLE `purchase_lines`
  MODIFY `purchase_line_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `id_profile` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `cart_ibfk_3` FOREIGN KEY (`id_housing`) REFERENCES `housings` (`id_housing`);

--
-- Filtros para la tabla `housings`
--
ALTER TABLE `housings`
  ADD CONSTRAINT `housings_ibfk_1` FOREIGN KEY (`id_type`) REFERENCES `h_type` (`id_type`),
  ADD CONSTRAINT `housings_ibfk_2` FOREIGN KEY (`id_city`) REFERENCES `city` (`id_city`),
  ADD CONSTRAINT `housings_ibfk_3` FOREIGN KEY (`id_operation`) REFERENCES `operation` (`id_operation`);

--
-- Filtros para la tabla `housing_automation_parts`
--
ALTER TABLE `housing_automation_parts`
  ADD CONSTRAINT `housing_automation_parts_ibfk_1` FOREIGN KEY (`id_housing`) REFERENCES `housings` (`id_housing`),
  ADD CONSTRAINT `housing_automation_parts_ibfk_2` FOREIGN KEY (`id_aut_parts`) REFERENCES `automation_parts` (`id_aut_parts`);

--
-- Filtros para la tabla `housing_category`
--
ALTER TABLE `housing_category`
  ADD CONSTRAINT `housing_category_ibfk_1` FOREIGN KEY (`id_housing`) REFERENCES `housings` (`id_housing`),
  ADD CONSTRAINT `housing_category_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`);

--
-- Filtros para la tabla `housing_extras`
--
ALTER TABLE `housing_extras`
  ADD CONSTRAINT `housing_extras_ibfk_1` FOREIGN KEY (`id_housing`) REFERENCES `housings` (`id_housing`),
  ADD CONSTRAINT `housing_extras_ibfk_2` FOREIGN KEY (`id_extras`) REFERENCES `extras` (`id_extras`);

--
-- Filtros para la tabla `housing_products`
--
ALTER TABLE `housing_products`
  ADD CONSTRAINT `housing_products_ibfk_1` FOREIGN KEY (`id_housing`) REFERENCES `housings` (`id_housing`),
  ADD CONSTRAINT `housing_products_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`);

--
-- Filtros para la tabla `img_housings`
--
ALTER TABLE `img_housings`
  ADD CONSTRAINT `img_housings_ibfk_1` FOREIGN KEY (`id_housing`) REFERENCES `housings` (`id_housing`);

--
-- Filtros para la tabla `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`id_housing`) REFERENCES `housings` (`id_housing`);

--
-- Filtros para la tabla `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Filtros para la tabla `purchase_lines`
--
ALTER TABLE `purchase_lines`
  ADD CONSTRAINT `purchase_lines_ibfk_1` FOREIGN KEY (`purchase_id`) REFERENCES `purchases` (`purchase_id`);

--
-- Filtros para la tabla `user_profile`
--
ALTER TABLE `user_profile`
  ADD CONSTRAINT `user_profile_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

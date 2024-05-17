-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-04-2022 a las 18:41:13
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
-- START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `concesionario`
--

-- --------------------------------------------------------

create database test_template_maps;
use test;

--
-- Estructura de tabla para la tabla `brand`
--

-- CREATE TABLE `housings` (
--     `id_housing` int UNSIGNED NOT NULL AUTO_INCREMENT,
--     `cadastral_ref` varchar(100) NOT NULL,
--     `housing_price` int UNSIGNED NOT NULL,
--     `housing_m2` int UNSIGNED NOT NULL,
--     `housing_rooms` int UNSIGNED NOT NULL,
--     `housing_bedrooms` int UNSIGNED NOT NULL,
--     `housing_bathrooms` int UNSIGNED NOT NULL,
--     `garage` varchar(100) NOT NULL,
--     `housing_heating` varchar(100) NOT NULL,
--     `housing_address` varchar(100) NOT NULL,
--     `publication_date` varchar(100) NOT NULL,
--     `img_housing` varchar(300) NOT NULL,
--     `id_type` int UNSIGNED NOT NULL,
--     `id_city` int UNSIGNED NOT NULL,
--     `id_operation` int UNSIGNED NOT NULL,
--     PRIMARY KEY (`id_housing`),
--     UNIQUE KEY (`cadastral_ref`),
--     FOREIGN KEY (`id_type`) REFERENCES `h_type`(`id_type`),
--     FOREIGN KEY (`id_city`) REFERENCES `city`(`id_city`),
--     FOREIGN KEY (`id_operation`) REFERENCES `operation`(`id_operation`)
-- );

-- INSERT INTO `housings` (`cadastral_ref`, `housing_price`, `housing_m2`, `housing_rooms`, `housing_bedrooms`, `housing_bathrooms`, `garage`, `housing_heating`, `housing_address`, `publication_date`, `img_housing`, `id_type`, `id_city`, `id_operation`) VALUES
-- ('1111111 AA2222A 0001 AA', 350000, 300, 13, 3, 2, 'Yes', 'Natural gas', 'Av. Primera, 7', '15-04-2014', 'view/img/type/house.jpg', 1, 1, 1),
-- ('2222222 BB3333B 0002 BB', 200000, 280, 10, 2, 2, 'No', 'Gas', 'C/ Bosque Encantado, 5', '15-04-2013', 'view/img/type/country_house.jpg', 2, 2, 2),
-- ('3333333 CC4444C 0003 CC', 170000, 200, 7, 2, 1, 'Yes', 'Electric', 'C/ De las estrellas, 2', '15-04-2016', 'view/img/type/flat.jpg', 3, 3, 2),
-- ('4444444 DD5555D 0004 DD', 100000, 120, 7, 0, 1, 'Yes', 'Electric', 'C/ Fuentes, 4', '22-11-2014', 'view/img/type/office.jpg', 4, 4, 3),
-- ('5555555 EE6666E 0005 EE', 50000, 300, 5, 0, 2, 'No', 'No heating', 'Av. Septima Estación, 9', '22-11-2015', 'view/img/type/warehouse.jpg', 5, 5, 4)

CREATE TABLE `housings` (
    `id_housing` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `cadastral_ref` varchar(100) NOT NULL,
    `housing_price` int UNSIGNED NOT NULL,
    `housing_m2` int UNSIGNED NOT NULL,
    `housing_rooms` int UNSIGNED NOT NULL,
    `housing_bedrooms` int UNSIGNED NOT NULL,
    `housing_bathrooms` int UNSIGNED NOT NULL,
    `garage` varchar(100) NOT NULL,
    `housing_heating` varchar(100) NOT NULL,
    `housing_address` varchar(100) NOT NULL,
    `publication_date` varchar(100) NOT NULL,
    `img_housing` varchar(300) NOT NULL,
    `visit_count` INT DEFAULT 0,
    `latitude` FLOAT,
    `longitude` FLOAT,
    `id_type` int UNSIGNED NOT NULL,
    `id_city` int UNSIGNED NOT NULL,
    `id_operation` int UNSIGNED NOT NULL,
    PRIMARY KEY (`id_housing`),
    UNIQUE KEY (`cadastral_ref`),
    FOREIGN KEY (`id_type`) REFERENCES `h_type`(`id_type`),
    FOREIGN KEY (`id_city`) REFERENCES `city`(`id_city`),
    FOREIGN KEY (`id_operation`) REFERENCES `operation`(`id_operation`)
);

INSERT INTO `housings` (`cadastral_ref`, `housing_price`, `housing_m2`, `housing_rooms`, `housing_bedrooms`, `housing_bathrooms`, `garage`, `housing_heating`, `housing_address`, `publication_date`, `img_housing`, `latitude`, `longitude`, `id_type`, `id_city`, `id_operation`) VALUES
('1111111 AA2222A 0001 AA', 350000, 300, 13, 3, 2, 'Yes', 'Natural gas', 'Av. Primera, 7', '15-04-2014', 'view/img/type/house.jpg', 40.41275, -3.71183, 1, 1, 1),
('2222222 BB3333B 0002 BB', 200000, 280, 10, 2, 2, 'No', 'Gas', 'C/ Bosque Encantado, 5', '15-04-2013', 'view/img/type/country_house.jpg', 41.41350, 2.21297, 2, 2, 2),
('3333333 CC4444C 0003 CC', 170000, 200, 7, 2, 1, 'Yes', 'Electric', 'C/ De las estrellas, 2', '15-04-2016', 'view/img/type/flat.jpg', 39.46653, -0.37595, 3, 3, 2),
('4444444 DD5555D 0004 DD', 100000, 120, 7, 0, 1, 'Yes', 'Electric', 'C/ Fuentes, 4', '22-11-2014', 'view/img/type/office.jpg', 43.26419, -2.94524, 4, 4, 3),
('5555555 EE6666E 0005 EE', 50000, 300, 5, 0, 2, 'No', 'No heating', 'Av. Septima Estación, 9', '22-11-2015', 'view/img/type/warehouse.jpg', 37.35188, -5.98425, 5, 5, 4);
-------
INSERT INTO `housings` (`cadastral_ref`, `housing_price`, `housing_m2`, `housing_rooms`, `housing_bedrooms`, `housing_bathrooms`, `garage`, `housing_heating`, `housing_address`, `publication_date`, `img_housing`, `latitude`, `longitude`, `id_type`, `id_city`, `id_operation`) VALUES
('6666666 FF7777F 0006 FF', 250000, 220, 8, 3, 2, 'Yes', 'Natural gas', 'C/ Calle Zaragoza, 3', '29-03-2024', 'view/img/type/house.jpg', 41.648822, -0.889085, 1, 6, 1);
INSERT INTO `housings` (`cadastral_ref`, `housing_price`, `housing_m2`, `housing_rooms`, `housing_bedrooms`, `housing_bathrooms`, `garage`, `housing_heating`, `housing_address`, `publication_date`, `img_housing`, `latitude`, `longitude`, `id_type`, `id_city`, `id_operation`) VALUES
('7777777 GG8888G 0007 GG', 180000, 180, 6, 2, 1, 'No', 'Electric', 'C/ Avenida Gijón, 5', '29-03-2024', 'view/img/type/house.jpg', 43.5411, -5.6643, 1, 7, 2);
INSERT INTO `housings` (`cadastral_ref`, `housing_price`, `housing_m2`, `housing_rooms`, `housing_bedrooms`, `housing_bathrooms`, `garage`, `housing_heating`, `housing_address`, `publication_date`, `img_housing`, `latitude`, `longitude`, `id_type`, `id_city`, `id_operation`) VALUES
('8888888 HH9999H 0008 HH', 300000, 250, 9, 3, 2, 'Yes', 'Gas', 'C/ Avenida Mallorca, 8', '29-03-2024', 'view/img/type/flat.jpg', 39.5696, 2.6502, 1, 8, 1);
INSERT INTO `housings` (`cadastral_ref`, `housing_price`, `housing_m2`, `housing_rooms`, `housing_bedrooms`, `housing_bathrooms`, `garage`, `housing_heating`, `housing_address`, `publication_date`, `img_housing`, `latitude`, `longitude`, `id_type`, `id_city`, `id_operation`) VALUES
('9999999 II0000I 0009 II', 220000, 200, 7, 2, 2, 'Yes', 'Electric', 'C/ Calle Gran Canaria, 9', '29-03-2024', 'view/img/type/house.jpg', 28.1248, -15.4301, 1, 9, 2);
INSERT INTO `housings` (`cadastral_ref`, `housing_price`, `housing_m2`, `housing_rooms`, `housing_bedrooms`, `housing_bathrooms`, `garage`, `housing_heating`, `housing_address`, `publication_date`, `img_housing`, `latitude`, `longitude`, `id_type`, `id_city`, `id_operation`)
VALUES ('5555555 SS6666S 0014 SS', 260000, 210, 8, 3, 2, 'Yes', 'Gas', 'C/ Avenida Santander, 14', '29-03-2024', 'view/img/type/country_house.jpg', 43.4623, -3.8099, 2, 10, 1);

CREATE TABLE `h_type` (
    `id_type` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `name_type` varchar(100) NOT NULL,
    `img_type` varchar(100) NOT NULL,
    `description_type` varchar(300) NOT NULL,
    PRIMARY KEY (`id_type`),
    UNIQUE KEY (`name_type`)
);

INSERT INTO `h_type` (`name_type`, `img_type`, `description_type`) VALUES
('House', 'view/img/type/house.jpg', "Explore the charm of a classic home. Our traditional houses offer timeless design, comfort, and
                                    functionality. Find your ideal space where warmth and practicality come together seamlessly."),
('Country house', 'view/img/type/country_house.jpg', "Escape to the tranquility of a country house. Our rural retreats offer a perfect blend of charm
                                    and serenity. Find your idyllic countryside home, where nature seamlessly merges with comfort."),
('Flat', 'view/img/type/flat.jpg', "Discover the allure of apartments. Our thoughtfully designed flats provide modern living in urban
                                    comfort. Find your perfect space, combining style, convenience, and a vibrant community atmosphere."),
('Office', 'view/img/type/office.jpg', "Elevate your workspace with us. Discover premium offices tailored to your needs. Find a professional
                                    environment where innovation and productivity thrive. Redefine your work experience with our exceptional office spaces."),
('Warehouse', 'view/img/type/warehouse.jpg', "Unlock the potential of spacious warehouses with us. Explore our industrial properties,
                                    offering expansive storage solutions for businesses. Find the perfect warehouse to elevate your operations and storage needs.")

CREATE TABLE `city` (
    `id_city` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `name_city` varchar(100) NOT NULL,
    `img_city` varchar(100) NOT NULL,
    `description_city` varchar(300) NOT NULL,
    PRIMARY KEY (`id_city`),
    UNIQUE KEY (`name_city`)
);

INSERT INTO `city` (`name_city`, `img_city`, `description_city`) VALUES
('Madrid', 'view/img/cities/madrid.jpg', "Madrid, Spain's largest city, boasts diverse gastronomy and climate. Globally recognized for quality
                 living, it's a vibrant capital with rich culture and a welcoming atmosphere for residents and visitors alike." ),
('Barcelona', 'view/img/cities/barcelona.jpg', 'Barcelona, the second-largest city in Spain, captivates with its rich gastronomy and inviting
                 climate. A global favorite for quality living, it harmonizes culture and lifestyle seamlessly.'),
('Valencia', 'view/img/cities/valencia.jpg', "Valencia, Spain's third-largest city, boasts a captivating blend of vibrant gastronomy and a 
                delightful climate. Globally recognized as one of the world's best cities to live in, it offers a rich cultural tapestry and a warm, welcoming ambiance."),
('Bilbao', 'view/img/cities/bilbao.jpg', "Bilbao, a dynamic city in the Basque Country, impresses with exceptional gastronomy
                 and a favorable climate. Globally acclaimed as a top city for quality living, it seamlessly blends tradition with modernity."),
('Sevilla', 'view/img/cities/sevilla.jpg',"Sevilla, in southern Spain, enchants with its gastronomic heritage and warm climate. Frequently 
                lauded as a top global city for quality living, it radiates cultural richness and timeless charm."),
('Zaragoza', 'view/img/cities/zaragoza.jpg',"Zaragoza, Spain's fourth-largest city in the northeast, charms with its gastronomic excellence
                 and comfortable climate. A recurrent global favorite for quality living, it balances tradition with modernity seamlessly."),
('Gijón', 'view/img/cities/gijon.jpg',"Gijón, on Spain's northern coast, delights with fantastic gastronomy and a pleasant climate. Recognized
                 as a highly desirable city globally, it offers a perfect blend of natural beauty and urban allure."),
('Palma de Mallorca', 'view/img/cities/mallorca.jpg',"Palma de Mallorca, on the idyllic island, impresses with incredible gastronomy and a
                 delightful climate. A top global city for quality living, it combines Mediterranean charm with modern lifestyle seamlessly."),
('Las Palmas de Gran Canaria', 'view/img/cities/laspalmas.jpg',"Las Palmas de Gran Canaria, in the Canary Islands, excels with superb gastronomy
                 and a fantastic climate. Consistently hailed as a top global city, it offers an exceptional quality of life by the Atlantic."),
('Santander', 'view/img/cities/santander.jpg',"Santander, on Spain's northern coast, thrives with exceptional gastronomy and a temperate climate.
                 Repeatedly recognized as one of the world's best cities, it captivates with coastal beauty and cultural richness."),
('Valladolid', 'view/img/cities/valladolid.jpg',"Valladolid, in northwest Spain, charms with delightful gastronomy and a comfortable climate. 
                Acknowledged globally for quality living, it showcases historical charm and modern amenities in perfect harmony."),
('Toledo', 'view/img/cities/toledo.jpg',"Toledo, the historic city in central Spain, is celebrated for rich gastronomy and a pleasant climate.
                 Repeatedly recognized as a top global city, it preserves cultural heritage amidst a welcoming atmosphere."),
('Badajoz', 'view/img/cities/badajoz.jpg',"Badajoz, in western Spain, impresses with vibrant gastronomy and a favorable climate. A recurrent
                 favorite globally for quality living, it offers a perfect blend of history, culture, and contemporary appeal."),
('Vigo', 'view/img/cities/vigo.jpg',"Vigo, in northwest Spain, stands out with fantastic gastronomy and a pleasant climate. Consistently esteemed
                 as a top global city, it combines maritime charm with modern amenities seamlessly."),
('Murcia', 'view/img/cities/murcia.jpg',"Murcia, in southeastern Spain, delights with outstanding culinary experiences and a delightful climate. 
                Repeatedly hailed as one of the best cities globally, it offers an exceptional quality of life."),
('Pamplona', 'view/img/cities/pamplona.jpg',"Pamplona, in the north, is celebrated for rich gastronomy and a temperate climate. Recognized as one
                 of the world's best cities, it combines historical charm with a vibrant, welcoming atmosphere.")


CREATE TABLE `operation` (
    `id_operation` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `name_operation` varchar(100) NOT NULL,
    `img_operation` varchar(100) NOT NULL,
    `description_operation` varchar(300) NOT NULL,
    PRIMARY KEY (`id_operation`),
    UNIQUE KEY (`name_operation`)
);

INSERT INTO `operation` (`name_operation`, `img_operation`, `description_operation`) VALUES
('Buy', 'view/img/operation/buy.jpg', "Secure your dream home with us. Explore exceptional properties and find the house of your dreams. Discover a space
                                    where comfort and elegance converge. Start the journey to your new home today!"),
('Rent', 'view/img/operation/rent.jpg', "Explore our curated rentals for your ideal home. Find comfort and style in spaces tailored to you. Start your 
                                    leasing journey with us, discovering the perfect place for your lifestyle."),
('Own-to-Rent', 'view/img/operation/own-to-rent.jpg', "Own-to-rent with us, enjoying the best of both worlds. Secure a property to call home while relishing
                                    the flexibility of renting. Find your ideal space and start living effortlessly today!"),
('Share', 'view/img/operation/share.jpg', "Discover the joy of shared living. Explore our shared houses, fostering community, and creating meaningful
                                    connections. Find your perfect shared space for a vibrant and inclusive lifestyle.")

CREATE TABLE `img_housings` (
    `id_img` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `img_housings` varchar(100) NOT NULL,
    `id_housing` int UNSIGNED NOT NULL,
    PRIMARY KEY (`id_img`),
    FOREIGN KEY (`id_housing`) REFERENCES `housings`(`id_housing`)
);

INSERT INTO `img_housings` (`img_housings`, `id_housing`) VALUES
('view/img/type/house.jpg', 1),
('view/img/type/house.jpg', 1),
('view/img/type/country_house.jpg', 2),
('view/img/type/country_house.jpg', 2),
('view/img/type/flat.jpg', 3),
('view/img/type/flat.jpg', 3),
('view/img/type/office.jpg', 4),
('view/img/type/office.jpg', 4),
('view/img/type/warehouse.jpg', 5),
('view/img/type/warehouse.jpg', 5),
('view/img/type/house.jpg', 6),
('view/img/type/house.jpg', 6),
('view/img/type/house.jpg', 7),
('view/img/type/house.jpg', 7),
('view/img/type/house.jpg', 8),
('view/img/type/house.jpg', 8),
('view/img/type/house.jpg', 9),
('view/img/type/house.jpg', 9),
('view/img/type/house.jpg', 9),
('view/img/type/country_house.jpg', 10),
('view/img/type/country_house.jpg', 10)
------

CREATE TABLE `category` (
    `id_category` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `name_category` varchar(100) NOT NULL,
    `img_category` varchar(100) NOT NULL,
    PRIMARY KEY (`id_category`),
    UNIQUE KEY (`name_category`)
);

INSERT INTO `category` (`name_category`, `img_category`) VALUES
('Luxury', 'view/img/category/luxury.jpg'),
('With sea views', 'view/img/category/sea_views.jpg'),
('With mountain views', 'view/img/category/mountain_views.jpg'),
('With balcony', 'view/img/category/balcony.jpg'),
('With garden', 'view/img/category/garden.jpg')

CREATE TABLE `housing_category` (
    `id_housing` int UNSIGNED NOT NULL,
    `id_category` int UNSIGNED NOT NULL,
    PRIMARY KEY (`id_housing`, `id_category`),
    FOREIGN KEY (`id_housing`) REFERENCES `housings`(`id_housing`),
    FOREIGN KEY (`id_category`) REFERENCES `category`(`id_category`)
);

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
(10, 3)
----------

CREATE TABLE `extras` (
    `id_extras` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `name_extras` varchar(100) NOT NULL,
    `img_extras` varchar(100) NOT NULL,
    PRIMARY KEY (`id_extras`),
    UNIQUE KEY (`name_extras`)
);

INSERT INTO `extras` (`name_extras`, `img_extras`) VALUES
('Security system', 'view/icons/extras/security_system.svg'),
('Home automation', 'view/icons/extras/automation_syst.svg'),
('Integrated sound system', 'view/icons/extras/int_sound_syst.svg'),
('Solar panels', 'view/icons/extras/solar_panel.svg'),
('Swimming pool', 'view/icons/extras/swimming_pool.svg'),
('Automatic watering system', 'view/icons/extras/aut_water_system.svg'),
('Gym', 'view/icons/extras/gym.svg'),
('Bathroom suite', 'view/icons/extras/bathroom-suite.svg'),
('Chimney', 'view/icons/extras/chimney.svg'),
('Home cinema', 'view/icons/extras/home-cinema.svg'),
('Underfloor heating', 'view/icons/extras/underfloor_heating.svg')

CREATE TABLE `housing_extras` (
    `id_housing` int UNSIGNED NOT NULL,
    `id_extras` int UNSIGNED NOT NULL,
    PRIMARY KEY (`id_housing`, `id_extras`),
    FOREIGN KEY (`id_housing`) REFERENCES `housings`(`id_housing`),
    FOREIGN KEY (`id_extras`) REFERENCES `extras`(`id_extras`)
);

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
(10, 9)
-----------

-- DISTINCION PAGINA WEB
CREATE TABLE `automation_parts` (
    `id_aut_parts` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `name_aut_parts` varchar(100) NOT NULL,
    `img_aut_parts` varchar(100) NOT NULL,
    `description_aut_parts` varchar(300) NOT NULL,
    PRIMARY KEY (`id_aut_parts`),
    UNIQUE KEY (`name_aut_parts`)
);

INSERT INTO `automation_parts` (`name_aut_parts`, `img_aut_parts`, `description_aut_parts`) VALUES
('All house automated', 'view/img/automation/all_house.jpg', "Enjoy a fully automated home where convenience
 meets innovation, simplifying your life with seamless control of every aspect."),
('Lighting control', 'view/img/automation/light_control.jpg', "Illuminate your space effortlessly, with precision
 control over brightness and ambiance for every moment and mood."),
('Blinds and curtains', 'view/img/automation/shutter.jpg', "Transform your home with automated blinds and curtains,
 effortlessly managing natural light and privacy at your fingertips."),
('Entertainment systems', 'view/img/automation/ent_system.jpg', "Elevate your entertainment experience with cutting-edge
 systems seamlessly integrated throughout your living spaces."),
('Virtual assistants', 'view/img/automation/virtual_assistant.jpg', "Enhance your home with a virtual assistant, simplifying
 tasks and providing seamless control through intuitive voice commands."),
('Home access control', 'view/img/automation/home_access.jpg', "Safeguard your sanctuary with advanced access control,
 ensuring security and peace of mind for you and your loved ones.");

CREATE TABLE `housing_automation_parts` (
    `id_housing` int UNSIGNED NOT NULL,
    `id_aut_parts` int UNSIGNED NOT NULL,
    PRIMARY KEY (`id_housing`, `id_aut_parts`),
    FOREIGN KEY (`id_housing`) REFERENCES `housings`(`id_housing`),
    FOREIGN KEY (`id_aut_parts`) REFERENCES `automation_parts`(`id_aut_parts`)
);

INSERT INTO `housing_automation_parts` (`id_housing`, `id_aut_parts`) VALUES
(1, 6),
(1, 4),
(1, 1),
(2, 2),
(2, 3),
(3, 5),
(4, 2),
(5, 2),
(6, 6),
(6, 4),
(7, 5),
(7, 3),
(8, 1),
(8, 2),
(9, 6),
(9, 4),
(10, 6)
---------

CREATE TABLE `users` (
  `id_user` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(25) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(75) DEFAULT NULL,
  `type_user` varchar(50) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `token_email` varchar(250) NOT NULL,
  `activate` int(1) NOT NULL
  PRIMARY KEY (`id_user`),
  UNIQUE KEY (`username`),
  UNIQUE KEY (`email`)
);

--
-- Volcado de datos para la tabla `users`
--


--------- EXAMEN
-- ALTER TABLE housings
-- ADD COLUMN visit_count INT DEFAULT 0;

-------------
--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `id_likes` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_user` int UNSIGNED NOT NULL,
  `id_housing` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id_likes`),
  FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`),
  FOREIGN KEY (`id_housing`) REFERENCES `housings`(`id_housing`)
);

--
-- Volcado de datos para la tabla `likes`
--

INSERT INTO `likes` (`id_likes`, `id_user`, `id_housing`) VALUES
(1, 60, 1),
(2, 60, 2),
(3, 60, 3),
(4, 60, 4);
-------------
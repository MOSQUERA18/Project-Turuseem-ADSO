-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-07-2024 a las 23:30:33
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto-turuseem`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aprendiz`
--

CREATE TABLE `aprendiz` (
  `Id_Aprendiz` varchar(10) NOT NULL,
  `Nom_Aprendiz` varchar(25) NOT NULL,
  `Ape_Aprendiz` varchar(25) NOT NULL,
  `Id_Ficha` varchar(10) NOT NULL,
  `Fec_Nacimiento` date NOT NULL,
  `Gen_Aprendiz` enum('F','M','O') NOT NULL,
  `Cor_Aprendiz` varchar(40) NOT NULL,
  `Tel_Aprendiz` varchar(14) NOT NULL,
  `Tot_Memorandos` int(11) NOT NULL DEFAULT 0,
  `Tot_Inasistencias` int(11) NOT NULL DEFAULT 0,
  `Patrocinio` enum('Si','No') NOT NULL,
  `CentroConvivencia` enum('Si','No') NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `aprendiz`
--

INSERT INTO `aprendiz` (`Id_Aprendiz`, `Nom_Aprendiz`, `Ape_Aprendiz`, `Id_Ficha`, `Fec_Nacimiento`, `Gen_Aprendiz`, `Cor_Aprendiz`, `Tel_Aprendiz`, `Tot_Memorandos`, `Tot_Inasistencias`, `Patrocinio`, `CentroConvivencia`, `createdat`, `updatedat`) VALUES
('1107008520', 'Juan David', 'Linares Barragán', '2671143', '2005-09-13', 'M', 'juandavidlinares2005@gmail.com', '3209455659', 0, 0, 'No', 'Si', '2024-07-15 22:03:31', '2024-07-15 22:03:31'),
('1107977447', 'Shirel Daniela', 'Oyuela S', '2671143', '2006-09-02', 'F', 'shireldanielaoyuelasaavedra@gmail.com', '3102764936', 0, 0, 'No', 'No', '2024-06-17 14:29:20', '2024-07-11 19:23:02'),
('1109413867', 'Leidy Vanessa', 'Realpe Garcia', '2870238', '2006-12-17', 'F', 'leidyrealpe203@gmail.com', '3044816610', 0, 0, 'No', 'Si', '2024-07-18 02:32:57', '2024-07-18 02:34:45'),
('121215458', 'Marlon Javier', 'Cumbe L', '2671143', '2024-08-07', 'M', 'marlon@gmail.com', '3213565845', 0, 0, 'No', 'Si', '2024-07-10 19:00:06', '2024-07-12 13:04:03'),
('25151565', 'Carlos', 'Hernandez', '151215', '2024-07-01', 'M', 'carlos@gmail.com', '3123385852', 0, 0, 'No', 'No', '2024-07-11 20:25:29', '2024-07-11 20:25:29'),
('28916532', 'Yazmin', 'Barragán Ramirez', '15448484', '2024-07-20', 'F', 'barraganramirez26@gmail.com', '3102392251', 0, 0, 'No', 'No', '2024-07-11 20:24:32', '2024-07-11 20:24:32'),
('548711315', 'Marlon Kaleth', 'Sarmiento', '2671143', '2024-07-23', 'M', 'kalethsarmiento@gmail.com', '3125545887', 0, 0, 'No', 'No', '2024-07-11 20:27:22', '2024-07-11 20:27:22'),
('554554', 'Jesus Alberto', 'Mañoso', '2671143', '2024-07-17', 'M', 'jesusmañoso@gmail.com', '321548755', 0, 0, 'Si', 'No', '2024-07-12 13:17:51', '2024-07-12 13:17:51'),
('555555', 'Argeol', 'Guio', '2824123', '2024-07-29', 'M', 'argeol@gmail.com', '3209455659', 0, 0, 'No', 'Si', '2024-07-11 20:26:29', '2024-07-11 20:26:29'),
('7846222', 'Fabian Dario', 'Murcia', '2824123', '2024-07-31', 'M', 'murcia1234@gmail.com', '3215484442', 0, 0, 'No', 'Si', '2024-07-11 20:29:43', '2024-07-12 14:25:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `areas`
--

CREATE TABLE `areas` (
  `Id_Area` int(11) NOT NULL,
  `Nom_Area` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fichas`
--

CREATE TABLE `fichas` (
  `id_ficha` int(10) NOT NULL,
  `id_programaformacion` varchar(40) NOT NULL,
  `fecha_ini_eta_lectiva` date NOT NULL,
  `fecha_fin_eta_lectiva` date NOT NULL,
  `fecha_ini_eta_productiva` date NOT NULL,
  `fecha_fin_eta_productiva` date NOT NULL,
  `cantidad_aprendices` int(3) NOT NULL,
  `id_instructor` int(10) NOT NULL,
  `tot_hombres` int(3) NOT NULL,
  `tot_mujeres` int(3) NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `fichas`
--

INSERT INTO `fichas` (`id_ficha`, `id_programaformacion`, `fecha_ini_eta_lectiva`, `fecha_fin_eta_lectiva`, `fecha_ini_eta_productiva`, `fecha_fin_eta_productiva`, `cantidad_aprendices`, `id_instructor`, `tot_hombres`, `tot_mujeres`, `createdat`, `updatedat`) VALUES
(909089, '', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', 0, 0, 0, 0, '2024-05-16 16:49:19', '2024-05-16 16:49:19'),
(2671143, '20', '2016-05-03', '2016-07-07', '2017-05-01', '2017-12-31', 30, 15, 10, 20, '2024-05-10 13:54:07', '2024-05-10 13:54:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `memorando`
--

CREATE TABLE `memorando` (
  `Id_Memorando` int(4) NOT NULL,
  `Fec_Memorando` date NOT NULL,
  `Mot_Memorando` varchar(120) NOT NULL,
  `Id_Inasistencia` int(5) NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `memorando`
--

INSERT INTO `memorando` (`Id_Memorando`, `Fec_Memorando`, `Mot_Memorando`, `Id_Inasistencia`, `createdat`, `updatedat`) VALUES
(5445, '2008-05-15', 'No asistio al turno especia por que tuvo una calamidad familiar', 447, '2024-05-29 13:07:30', '2024-05-30 20:07:02'),
(5555, '2023-05-04', 'No fue al turno por motivos de salud ', 4511, '2024-05-29 13:06:35', '2024-05-29 13:06:35'),
(7784, '2023-08-25', 'Inasistencia a turno especial', 7744, '2024-05-29 13:05:59', '2024-05-30 19:59:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal`
--

CREATE TABLE `personal` (
  `Id_persona` int(11) NOT NULL,
  `tip_documento` enum('Cc','Ti','O') NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `correo` varchar(80) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `Id_unidad` varchar(100) NOT NULL,
  `patrocinio` enum('Si','No') NOT NULL,
  `cargo` enum('Gerente','Gerente_Tecnico','Gerente_Administrativo','Lider_Unidad','Gestor_Unidad') NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personal`
--

INSERT INTO `personal` (`Id_persona`, `tip_documento`, `nombre`, `apellido`, `direccion`, `correo`, `telefono`, `Id_unidad`, `patrocinio`, `cargo`, `createdat`, `updatedat`) VALUES
(1001075625, 'Ti', 'Marcos ', 'Flores Martinez', 'Manzana K casa #99 Ibague-Tolima B/Cascada', 'marcos_09982@gmail.com', '3017833629', '11233', 'No', 'Gerente_Administrativo', '2024-05-23 17:33:30', '2024-06-06 17:24:49'),
(1007453684, 'Cc', 'Kimberly Sharlot', 'Hernandez Acosta', 'Mazana E casa #8 B/Bosque ', 'khernandezacosta06@gmail.com', '3173933137', '23233', 'Si', 'Gerente', '2024-05-23 17:15:13', '2024-06-06 17:25:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programa`
--

CREATE TABLE `programa` (
  `Id_Programa` int(11) NOT NULL,
  `Nom_Programa` varchar(50) NOT NULL,
  `Tip_Programa` enum('Tecnico','Tecnologo') NOT NULL,
  `Id_Area` int(10) NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `programa`
--

INSERT INTO `programa` (`Id_Programa`, `Nom_Programa`, `Tip_Programa`, `Id_Area`, `createdat`, `updatedat`) VALUES
(384, 'GEP', 'Tecnologo', 0, '2024-06-06 18:36:37', '2024-06-12 01:49:26'),
(567, 'ADSO', 'Tecnologo', 0, '2024-06-06 19:18:10', '2024-06-06 21:51:37'),
(1234, 'ADSO', 'Tecnico', 0, '2024-06-06 19:47:38', '2024-06-06 19:47:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidad`
--

CREATE TABLE `unidad` (
  `id_unidad` int(10) NOT NULL,
  `nom_unidad` varchar(30) NOT NULL,
  `id_area` varchar(40) NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateDat` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `unidad`
--

INSERT INTO `unidad` (`id_unidad`, `nom_unidad`, `id_area`, `createdat`, `updateDat`) VALUES
(89898, 'Porcinos', 'Pecuario', '2024-05-22 17:20:29', '2024-05-22 18:52:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `Id_User` int(11) NOT NULL,
  `Nom_User` varchar(50) NOT NULL,
  `Cor_User` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `token` varchar(120) DEFAULT NULL,
  `Confirmado` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`Id_User`, `Nom_User`, `Cor_User`, `password`, `token`, `Confirmado`, `createdAt`, `updatedAt`) VALUES
(5545454, 'Juan Carlos B', 'juanBarragan@gmail.com', '$2b$10$d.4HCyHiehWx81GcR1r45.WcIo1rSczBnQmckmB/tx8QS2Px86sDy', NULL, 1, '2024-06-10 00:15:06', '2024-06-10 00:15:14'),
(1105611421, 'Argeol Guio', 'guiopinedaargeol79@gmail.com', '$2b$10$MXZdsjm4sOXp1lUreUEjh.aPEb.OofgcDEIQ05WsYTzslfnLOQ1XO', NULL, 1, '2024-06-11 21:29:08', '2024-06-11 21:29:18'),
(1107008520, 'Juan David Linares', 'juandavidlinares2005@gmail.com', '$2b$10$a50oTY6UgSEYJNR7OsSnRO8giiENr360oS4Id4lZmGhSU8qTycOk.', '1i3397du8hekv7v8b5f', 1, '2024-06-09 22:59:20', '2024-07-18 16:01:28'),
(1107008525, 'Juan David Linares ', 'juanlinares@gmail.com', '$2b$10$nYDxNSh6CMKq.pNldNcEBuCLjtTNrL5mBZRPQ6yOvrMZ6oQWoJ2DW', NULL, 1, '2024-06-10 15:28:01', '2024-06-12 01:29:18'),
(1107008528, 'Juan David Linares', 'juandavid2005@gmail.com', '$2b$10$473Vut7/jUA2i9jM/VMbzuT5Ur1Ci3KS4CNIEpyYGeOMc4/1pezUq', NULL, 1, '2024-06-17 16:21:25', '2024-06-17 16:34:02'),
(1107977447, 'Shirel Daniela ', 'shireldanielaoyuelasaavedra@gmail.com', '$2b$10$6/ao0dzJts.ncd44wkpZwOBNhMCAfgc3FSPVFdZ.uE54aO2oT1OG2', NULL, 1, '2024-06-17 14:08:09', '2024-06-17 14:09:08');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aprendiz`
--
ALTER TABLE `aprendiz`
  ADD PRIMARY KEY (`Id_Aprendiz`),
  ADD KEY `Id_Ficha` (`Id_Ficha`),
  ADD KEY `Id_Ficha_2` (`Id_Ficha`);

--
-- Indices de la tabla `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`Id_Area`);

--
-- Indices de la tabla `memorando`
--
ALTER TABLE `memorando`
  ADD PRIMARY KEY (`Id_Memorando`),
  ADD KEY `Id_Inasistencia` (`Id_Inasistencia`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id_User`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `areas`
--
ALTER TABLE `areas`
  MODIFY `Id_Area` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

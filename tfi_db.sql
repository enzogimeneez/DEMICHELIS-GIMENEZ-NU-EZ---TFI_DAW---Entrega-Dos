-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-05-2024 a las 01:54:10
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
-- Base de datos: `tfi_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividades`
--

CREATE TABLE `actividades` (
  idActividades INT(11) AUTO_INCREMENT PRIMARY KEY,
  `descripción` longtext NOT NULL,
  `prioridad` enum('Alta','Media','Baja') NOT NULL,
  `fecha_modificacion` datetime NOT NULL,
  `estado` enum('Pendiente','Finalizado','Eliminado') DEFAULT 'Pendiente',
  `idUsuario_actual` int(11) NOT NULL,
  `idUsuario_modificacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `actividades`
--

INSERT INTO `actividades` (`idActividades`, `descripción`, `prioridad`, `fecha_modificacion`, `estado`, `idUsuario_actual`, `idUsuario_modificacion`) VALUES
(0, 'leer', 'Alta', '2024-04-29 14:35:32', 'Pendiente', 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividades_autoria`
--

CREATE TABLE `actividades_autoria` (
  `idActividades_autoria` int(11) NOT NULL,
  `descripcion` longtext NOT NULL,
  `prioridad` enum('Alta','Media','Baja') NOT NULL,
  `fecha_modificacion` datetime NOT NULL,
  `estado` enum('Pendiente','Finalizado','Eliminado') DEFAULT 'Pendiente',
  `operacion` enum('Creación','Modificación','Eliminación') DEFAULT NULL,
  `idUsuario_actual` int(11) NOT NULL,
  `idUsuario_modificacion` int(11) NOT NULL,
  `idActividad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `actividades_autoria`
--

INSERT INTO `actividades_autoria` (`idActividades_autoria`, `descripcion`, `prioridad`, `fecha_modificacion`, `estado`, `operacion`, `idUsuario_actual`, `idUsuario_modificacion`, `idActividad`) VALUES
(0, 'Corregir', 'Alta', '2024-04-29 14:37:39', 'Pendiente', 'Creación', 0, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuarios` int(11) AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(255) NOT NULL,
  `password` varchar(72) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `estado` enum('Pendiente','Finalizado','Eliminado') NOT NULL DEFAULT 'Pendiente',
  `username` varchar(255) NOT NULL,
  `rol` enum('Administrador','Ejecutor') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuarios`, `email`, `password`, `apellido`, `nombre`, `estado`, `username`, `rol`) VALUES
(0, 'cristhian@admin.com', '1234', 'Faure', 'Cristhian', '', 'CFaure', 'Administrador'),
(1, 'juanbuffa@admin.com', '1234', 'Buffa', 'Juan', 'Pendiente', 'juanbuffa', 'Administrador');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD KEY `fk_actividades_usuarios1_idx` (`idUsuario_actual`),
  ADD KEY `fk_actividades_usuarios2_idx` (`idUsuario_modificacion`);

--
-- Indices de la tabla `actividades_autoria`
--
ALTER TABLE `actividades_autoria`
  ADD PRIMARY KEY (`idActividades_autoria`),
  ADD KEY `fk_actividades_autoria_usuarios_idx` (`idUsuario_actual`),
  ADD KEY `fk_actividades_autoria_actividades1_idx` (`idActividad`),
  ADD KEY `fk_actividades_autoria_usuarios1_idx` (`idUsuario_modificacion`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD CONSTRAINT `fk_actividades_usuarios1` FOREIGN KEY (`idUsuario_actual`) REFERENCES `usuarios` (`idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_actividades_usuarios2` FOREIGN KEY (`idUsuario_modificacion`) REFERENCES `usuarios` (`idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `actividades_autoria`
--
ALTER TABLE `actividades_autoria`
  ADD CONSTRAINT `fk_actividades_autoria_actividades1` FOREIGN KEY (`idActividad`) REFERENCES `actividades` (`idActividades`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_actividades_autoria_usuarios` FOREIGN KEY (`idUsuario_actual`) REFERENCES `usuarios` (`idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_actividades_autoria_usuarios1` FOREIGN KEY (`idUsuario_modificacion`) REFERENCES `usuarios` (`idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-08-2024 a las 20:06:01
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
-- Base de datos: `veterinaria2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adopciones`
--

CREATE TABLE `adopciones` (
  `id` int(11) NOT NULL,
  `id_adoptante` int(11) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `id_mascota` int(11) DEFAULT NULL,
  `estado` enum('Adoptado','Por Adoptar','Pendiente') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_roman_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(67) NOT NULL,
  `estado` enum('Activo','Desactivo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_roman_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `estado`) VALUES
(1, 'Pequeña', 'Activo'),
(2, 'Grande', 'Desactivo'),
(3, 'Mediano', 'Activo'),
(4, 'extra grande ', 'Desactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genero`
--

CREATE TABLE `genero` (
  `id` int(11) NOT NULL,
  `nombre` varchar(67) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_roman_ci;

--
-- Volcado de datos para la tabla `genero`
--

INSERT INTO `genero` (`id`, `nombre`) VALUES
(1, 'Macho'),
(2, 'Hembra');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `id` int(11) NOT NULL,
  `raza` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `foto` varchar(45) NOT NULL,
  `genero_id` int(11) NOT NULL,
  `nombre_mas` varchar(34) DEFAULT NULL,
  `id_vacuna` enum('Vacunado','No Vacunado') DEFAULT NULL,
  `descripcion` varchar(87) DEFAULT NULL,
  `edad` int(11) NOT NULL,
  `usuario` int(11) DEFAULT NULL,
  `estado` enum('Por adoptar','Adoptado','En proceso') DEFAULT 'Por adoptar',
  `historial_medico` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_roman_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `razas`
--

CREATE TABLE `razas` (
  `id` int(11) NOT NULL,
  `nombre_r` varchar(23) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_roman_ci;

--
-- Volcado de datos para la tabla `razas`
--

INSERT INTO `razas` (`id`, `nombre_r`) VALUES
(1, 'Pincher'),
(2, 'Criollo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(54) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(213) DEFAULT NULL,
  `tipo` enum('Administrador','Usuario') DEFAULT NULL,
  `foto` varchar(768) DEFAULT NULL,
  `direccion` varchar(67) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `documento` int(11) DEFAULT NULL,
  `tipo_de_documento` enum('Cedula','Cedula Extranjera') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_roman_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `tipo`, `foto`, `direccion`, `telefono`, `documento`, `tipo_de_documento`) VALUES
(44, 'victor', 'victoria@gmail.com', '$2a$10$0ikaWXsoTZeddEx5iPo1SeXkMLX.cVY3aNcNUvr2QZdUZ4zGk80Uq', 'Usuario', 'nuche.JPG', 'calle 4 barrio los pinos ', 687686, 213414, 'Cedula'),
(45, 'victor', 'victor@gmail.com', '$2a$10$iwostklzDoWgLwlMMqeJ..bvNxwGZCPQLyBNawesvA98qsVwGVVma', 'Administrador', 'nuche.JPG', 'calle 4 barrio los pinos ', 687686, 213414, 'Cedula'),
(46, 'koko', 'kok@gmail.com', '$2a$10$5c0bP7hO7gy8LcpO.w.XF.tAaUOIayfE29gWN4YOxRHNgb/I2St4O', 'Usuario', 'princesa.JPG', 'fdgdgf', 44564, 4435, ''),
(47, 'kko', 'kpkp@gmail.com', '$2a$10$BlQ4CRXJRX.ynjf6QlunYOhy7KTtr0SA8M5QOtosV03vSA5JdYuhy', 'Administrador', 'nuche.JPG', 'ghfghf', 456456, 465465, 'Cedula'),
(48, 'kko', 'kpkp@gmail.com', '$2a$10$XcFvejay8L4RpMM/RWeGHOlXLkJ..jc7T1WPBiFFJ1gb.rQfne0ta', 'Administrador', 'nuche.JPG', 'ghfghf', 456456, 465465, 'Cedula'),
(49, 'kko', 'kpkp@gmail.com', '$2a$10$woiLTBcQvNthfDcT6dOvSeEA9WjsBn8BggGrtiGi2eYkFVupduXEa', 'Administrador', 'nuche.JPG', 'ghfghf', 456456, 465465, 'Cedula'),
(50, 'kko', 'kpkp@gmail.com', '$2a$10$/mWIayHoeFeEJompQ9xuHOzE6Ilp32f9NSpGN2CkIhtTyXRw4.l9u', 'Administrador', 'nuche.JPG', 'ghfghf', 456456, 465465, 'Cedula'),
(51, 'kko', 'kpkp@gmail.com', '$2a$10$IeAhwxyfu0ueCQ1j0J8Pu.5m7Bl.dP5eQPv10uXFlwhMZX2StA3/G', 'Administrador', 'nuche.JPG', 'ghfghf', 456456, 465465, 'Cedula');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adopciones`
--
ALTER TABLE `adopciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_adoptante` (`id_adoptante`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `genero`
--
ALTER TABLE `genero`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `raza` (`raza`),
  ADD KEY `categoria_id` (`categoria_id`),
  ADD KEY `genero_id` (`genero_id`),
  ADD KEY `adopcion` (`usuario`),
  ADD KEY `id_vacuna` (`id_vacuna`);

--
-- Indices de la tabla `razas`
--
ALTER TABLE `razas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `adopciones`
--
ALTER TABLE `adopciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `genero`
--
ALTER TABLE `genero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT de la tabla `razas`
--
ALTER TABLE `razas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `adopciones`
--
ALTER TABLE `adopciones`
  ADD CONSTRAINT `adopciones_ibfk_1` FOREIGN KEY (`id_adoptante`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `adopcion` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`raza`) REFERENCES `razas` (`id`),
  ADD CONSTRAINT `mascotas_ibfk_2` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `mascotas_ibfk_3` FOREIGN KEY (`genero_id`) REFERENCES `genero` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

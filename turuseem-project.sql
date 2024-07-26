CREATE DATABASE IF NOT EXISTS `turuseem-project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `turuseem-project`;

-- Establecer opciones de conexión
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Tabla aprendices
DROP TABLE IF EXISTS `aprendices`;
CREATE TABLE `aprendices` (
  `Id_Aprendiz` varchar(10) NOT NULL,
  `Nom_Aprendiz` varchar(30) NOT NULL,
  `Ape_Aprendiz` varchar(30) NOT NULL,
  `Id_Ficha` varchar(10) NOT NULL,
  `Fec_Nacimiento` date NOT NULL,
  `Gen_Aprendiz` enum('Masculino','Femenino','Otro') NOT NULL,
  `Cor_Aprendiz` varchar(30) NOT NULL,
  `Tel_Aprendiz` varchar(12) NOT NULL,
  `Tot_Memorandos` int NOT NULL,
  `Tot_Inasistencias` int NOT NULL,
  `Patrocinio` enum('Si','No') NOT NULL,
  `CentroConvivencia` enum('Si','No') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Aprendiz`),
  KEY `Id_Ficha` (`Id_Ficha`),
  CONSTRAINT `aprendices_ibfk_1` FOREIGN KEY (`Id_Ficha`) REFERENCES `fichas` (`Id_Ficha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla archivo_csv
DROP TABLE IF EXISTS `archivo_csv`;
CREATE TABLE `archivo_csv` (
  `Id_Archivo_Csv` int NOT NULL AUTO_INCREMENT,
  `Nom_Archivo_Csv` varchar(30) DEFAULT NULL,
  `Fec_Creacion` date DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Archivo_Csv`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla areas
DROP TABLE IF EXISTS `areas`;
CREATE TABLE `areas` (
  `Id_Area` int NOT NULL AUTO_INCREMENT,
  `Nom_Area` varchar(40) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Area`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla cargos
DROP TABLE IF EXISTS `cargos`;
CREATE TABLE `cargos` (
  `Id_Cargo` int NOT NULL AUTO_INCREMENT,
  `Nom_Cargo` varchar(40) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Cargo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla fichas
DROP TABLE IF EXISTS `fichas`;
CREATE TABLE `fichas` (
  `Id_Ficha` varchar(10) NOT NULL,
  `Fec_InicioEtapaLectiva` date NOT NULL,
  `Fec_FinEtapaLectiva` date NOT NULL,
  `Can_Aprendices` int NOT NULL,
  `Id_ProgramaFormacion` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Ficha`),
  KEY `Id_ProgramaFormacion` (`Id_ProgramaFormacion`),
  CONSTRAINT `fichas_ibfk_1` FOREIGN KEY (`Id_ProgramaFormacion`) REFERENCES `programasformacion` (`Id_ProgramaFormacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla funcionarios
DROP TABLE IF EXISTS `funcionarios`;
CREATE TABLE `funcionarios` (
  `Id_Funcionario` varchar(10) NOT NULL,
  `Nom_Funcionario` varchar(25) NOT NULL,
  `Ape_Funcionario` varchar(25) NOT NULL,
  `Genero` enum('Masculino','Femenino','Otro') NOT NULL,
  `Tel_Funcionario` varchar(15) NOT NULL,
  `Id_Cargo` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Funcionario`),
  KEY `Id_Cargo` (`Id_Cargo`),
  CONSTRAINT `funcionarios_ibfk_1` FOREIGN KEY (`Id_Cargo`) REFERENCES `cargos` (`Id_Cargo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla inasistencias
DROP TABLE IF EXISTS `inasistencias`;
CREATE TABLE `inasistencias` (
  `Id_Inasistencia` int NOT NULL AUTO_INCREMENT,
  `Fec_Inasistencia` date NOT NULL,
  `Mot_Inasistencia` varchar(50) NOT NULL,
  `Id_TurnoRutinario_Aprendiz` int DEFAULT NULL,
  `Id_TurnoEspecial` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Inasistencia`),
  KEY `Id_TurnoRutinario_Aprendiz` (`Id_TurnoRutinario_Aprendiz`),
  KEY `Id_TurnoEspecial` (`Id_TurnoEspecial`),
  CONSTRAINT `inasistencias_ibfk_1` FOREIGN KEY (`Id_TurnoRutinario_Aprendiz`) REFERENCES `turnosrutinarios_aprendices` (`Id_TurnoRutinario_Aprendiz`),
  CONSTRAINT `inasistencias_ibfk_2` FOREIGN KEY (`Id_TurnoEspecial`) REFERENCES `turnosespeciales` (`Id_TurnoEspecial`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla memorandos
DROP TABLE IF EXISTS `memorandos`;
CREATE TABLE `memorandos` (
  `Id_Memorando` int NOT NULL AUTO_INCREMENT,
  `Fec_Memorando` date NOT NULL,
  `Mot_Memorando` varchar(40) DEFAULT NULL,
  `Id_Inasistencia` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Memorando`),
  KEY `Id_Inasistencia` (`Id_Inasistencia`),
  CONSTRAINT `memorandos_ibfk_1` FOREIGN KEY (`Id_Inasistencia`) REFERENCES `inasistencias` (`Id_Inasistencia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla programasformacion
DROP TABLE IF EXISTS `programasformacion`;
CREATE TABLE `programasformacion` (
  `Id_ProgramaFormacion` int NOT NULL AUTO_INCREMENT,
  `Nom_ProgramaFormacion` varchar(60) NOT NULL,
  `Tip_ProgramaFormacion` varchar(25) NOT NULL,
  `Id_Area` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_ProgramaFormacion`),
  KEY `Id_Area` (`Id_Area`),
  CONSTRAINT `programasformacion_ibfk_1` FOREIGN KEY (`Id_Area`) REFERENCES `areas` (`Id_Area`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla talento_humano
DROP TABLE IF EXISTS `talento_humano`;
CREATE TABLE `talento_humano` (
  `Id_Talento_Humano` varchar(10) NOT NULL,
  `Nom_Talento_Humano` varchar(30) NOT NULL,
  `Ape_Talento_Humano` varchar(30) NOT NULL,
  `Genero_Talento_Humano` enum('Masculino','Femenino','Otro') NOT NULL,
  `Cor_Talento_Humano` varchar(30) NOT NULL,
  `Tel_Talento_Humano` varchar(12) NOT NULL,
  `Id_Ficha` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Talento_Humano`),
  KEY `Id_Ficha` (`Id_Ficha`),
  CONSTRAINT `talento_humano_ibfk_1` FOREIGN KEY (`Id_Ficha`) REFERENCES `fichas` (`Id_Ficha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla turnosespeciales
DROP TABLE IF EXISTS `turnosespeciales`;
CREATE TABLE `turnosespeciales` (
  `Id_TurnoEspecial` int NOT NULL AUTO_INCREMENT,
  `Nom_TurnoEspecial` varchar(30) NOT NULL,
  `Id_Talento_Humano` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_TurnoEspecial`),
  KEY `Id_Talento_Humano` (`Id_Talento_Humano`),
  CONSTRAINT `turnosespeciales_ibfk_1` FOREIGN KEY (`Id_Talento_Humano`) REFERENCES `talento_humano` (`Id_Talento_Humano`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla turnosrutinarios
DROP TABLE IF EXISTS `turnosrutinarios`;
CREATE TABLE `turnosrutinarios` (
  `Id_TurnoRutinario` int NOT NULL AUTO_INCREMENT,
  `Nom_TurnoRutinario` varchar(30) NOT NULL,
  `Id_Ficha` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_TurnoRutinario`),
  KEY `Id_Ficha` (`Id_Ficha`),
  CONSTRAINT `turnosrutinarios_ibfk_1` FOREIGN KEY (`Id_Ficha`) REFERENCES `fichas` (`Id_Ficha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla turnosrutinarios_aprendices
DROP TABLE IF EXISTS `turnosrutinarios_aprendices`;
CREATE TABLE `turnosrutinarios_aprendices` (
  `Id_TurnoRutinario_Aprendiz` int NOT NULL AUTO_INCREMENT,
  `Id_TurnoRutinario` int DEFAULT NULL,
  `Id_Aprendiz` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_TurnoRutinario_Aprendiz`),
  KEY `Id_TurnoRutinario` (`Id_TurnoRutinario`),
  KEY `Id_Aprendiz` (`Id_Aprendiz`),
  CONSTRAINT `turnosrutinarios_aprendices_ibfk_1` FOREIGN KEY (`Id_TurnoRutinario`) REFERENCES `turnosrutinarios` (`Id_TurnoRutinario`),
  CONSTRAINT `turnosrutinarios_aprendices_ibfk_2` FOREIGN KEY (`Id_Aprendiz`) REFERENCES `aprendices` (`Id_Aprendiz`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `unidades`
DROP TABLE IF EXISTS `unidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidades` (
  `Id_Unidad` varchar(5) NOT NULL,
  `Nom_Unidad` varchar(50) NOT NULL,
  `Hor_Apertura` time NOT NULL,
  `Hor_Cierre` time NOT NULL,
  `Estado` enum('Activo','Inactivo') NOT NULL,
  `Id_Area` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Unidad`),
  KEY `Id_Area` (`Id_Area`),
  CONSTRAINT `unidades_ibfk_1` FOREIGN KEY (`Id_Area`) REFERENCES `areas` (`Id_Area`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

-- Table structure for table `users`
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Id_User` int NOT NULL,
  `Nom_User` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `Cor_User` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `token` varchar(120) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Confirmado` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

-- Restaurar las opciones de conexión
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

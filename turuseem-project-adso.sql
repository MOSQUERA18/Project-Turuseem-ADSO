-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: turuseem-project
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aprendices`
--

DROP TABLE IF EXISTS `aprendices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aprendices` (
  `Id_Aprendiz` varchar(11) NOT NULL,
  `Nom_Aprendiz` varchar(30) NOT NULL,
  `Ape_Aprendiz` varchar(30) NOT NULL,
  `Id_Ficha` varchar(11) NOT NULL,
  `Fec_Nacimiento` date NOT NULL,
  `Gen_Aprendiz` enum('Masculino','Femenino','Otro') NOT NULL,
  `Cor_Aprendiz` varchar(50) NOT NULL,
  `Tel_Aprendiz` varchar(12) NOT NULL,
  `Tot_Memorandos` int NOT NULL,
  `Tot_Inasistencias` int NOT NULL,
  `Patrocinio` enum('Si','No') NOT NULL,
  `Estado` enum('Activo','Inactivo') DEFAULT 'Activo',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Aprendiz`),
  KEY `Id_Ficha` (`Id_Ficha`),
  CONSTRAINT `aprendices_ibfk_1` FOREIGN KEY (`Id_Ficha`) REFERENCES `fichas` (`Id_Ficha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aprendices`
--

LOCK TABLES `aprendices` WRITE;
/*!40000 ALTER TABLE `aprendices` DISABLE KEYS */;
/*!40000 ALTER TABLE `aprendices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `archivo_csv`
--

DROP TABLE IF EXISTS `archivo_csv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `archivo_csv` (
  `Id_Archivo_Csv` int NOT NULL AUTO_INCREMENT,
  `Nom_Archivo_Csv` varchar(30) DEFAULT NULL,
  `Archivo_Csv` varchar(35) DEFAULT NULL,
  `Fec_Creacion` date DEFAULT NULL,
  `Estado` enum('Activo','Inactivo') DEFAULT 'Activo',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Archivo_Csv`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archivo_csv`
--

LOCK TABLES `archivo_csv` WRITE;
/*!40000 ALTER TABLE `archivo_csv` DISABLE KEYS */;
/*!40000 ALTER TABLE `archivo_csv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas` (
  `Id_Area` int NOT NULL AUTO_INCREMENT,
  `Nom_Area` varchar(35) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Area`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas`
--

LOCK TABLES `areas` WRITE;
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cargos`
--

DROP TABLE IF EXISTS `cargos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargos` (
  `Id_Cargo` int NOT NULL AUTO_INCREMENT,
  `Nom_Cargo` varchar(40) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Cargo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargos`
--

LOCK TABLES `cargos` WRITE;
/*!40000 ALTER TABLE `cargos` DISABLE KEYS */;
/*!40000 ALTER TABLE `cargos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fichas`
--

DROP TABLE IF EXISTS `fichas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fichas` (
  `Id_Ficha` varchar(11) NOT NULL,
  `Fec_InicioEtapaLectiva` date NOT NULL,
  `Fec_FinEtapaLectiva` date NOT NULL,
  `Fec_FinEtapaProductiva` date NOT NULL,
  `Can_Aprendices` int NOT NULL,
  `Id_ProgramaFormacion` int DEFAULT NULL,
  `Estado` enum('Activo','Inactivo') DEFAULT 'Activo',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Ficha`),
  KEY `Id_ProgramaFormacion` (`Id_ProgramaFormacion`),
  CONSTRAINT `fichas_ibfk_1` FOREIGN KEY (`Id_ProgramaFormacion`) REFERENCES `programasformacion` (`Id_ProgramaFormacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fichas`
--

LOCK TABLES `fichas` WRITE;
/*!40000 ALTER TABLE `fichas` DISABLE KEYS */;
/*!40000 ALTER TABLE `fichas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionarios` (
  `Id_Funcionario` varchar(11) NOT NULL,
  `Nom_Funcionario` varchar(25) NOT NULL,
  `Ape_Funcionario` varchar(25) NOT NULL,
  `Genero` enum('Masculino','Femenino','Otro') NOT NULL,
  `Tel_Funcionario` varchar(12) NOT NULL,
  `Id_Cargo` int NOT NULL,
  `Estado` enum('Activo','Inactivo') DEFAULT 'Activo',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Funcionario`),
  KEY `Id_Cargo` (`Id_Cargo`),
  CONSTRAINT `funcionarios_ibfk_1` FOREIGN KEY (`Id_Cargo`) REFERENCES `cargos` (`Id_Cargo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inasistencias`
--

DROP TABLE IF EXISTS `inasistencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inasistencias` (
  `Id_Inasistencia` int NOT NULL AUTO_INCREMENT,
  `Fec_Inasistencia` date NOT NULL,
  `Mot_Inasistencia` varchar(50) NOT NULL,
  `Id_TurnoRutinario_Aprendiz` int DEFAULT NULL,
  `Id_TurnoEspecial_Aprendiz` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Inasistencia`),
  KEY `Id_TurnoRutinario_Aprendiz` (`Id_TurnoRutinario_Aprendiz`),
  KEY `Id_TurnoEspecial_Aprendiz` (`Id_TurnoEspecial_Aprendiz`),
  CONSTRAINT `inasistencias_ibfk_1` FOREIGN KEY (`Id_TurnoRutinario_Aprendiz`) REFERENCES `turnosrutinarios_aprendices` (`Id_TurnoRutinario_Aprendiz`),
  CONSTRAINT `inasistencias_ibfk_2` FOREIGN KEY (`Id_TurnoEspecial_Aprendiz`) REFERENCES `turnosespeciales_aprendices` (`Id_TurnoEspecial_Aprendiz`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inasistencias`
--

LOCK TABLES `inasistencias` WRITE;
/*!40000 ALTER TABLE `inasistencias` DISABLE KEYS */;
/*!40000 ALTER TABLE `inasistencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `memorandos`
--

DROP TABLE IF EXISTS `memorandos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memorandos`
--

LOCK TABLES `memorandos` WRITE;
/*!40000 ALTER TABLE `memorandos` DISABLE KEYS */;
/*!40000 ALTER TABLE `memorandos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programasformacion`
--

DROP TABLE IF EXISTS `programasformacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programasformacion` (
  `Id_ProgramaFormacion` int NOT NULL AUTO_INCREMENT,
  `Nom_ProgramaFormacion` varchar(65) NOT NULL,
  `Tip_ProgramaFormacion` varchar(20) DEFAULT 'Tecnologo',
  `Estado` enum('Activo','Inactivo') DEFAULT 'Activo',
  `Id_Area` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_ProgramaFormacion`),
  KEY `Id_Area` (`Id_Area`),
  CONSTRAINT `programasformacion_ibfk_1` FOREIGN KEY (`Id_Area`) REFERENCES `areas` (`Id_Area`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programasformacion`
--

LOCK TABLES `programasformacion` WRITE;
/*!40000 ALTER TABLE `programasformacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `programasformacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `talento_humano`
--

DROP TABLE IF EXISTS `talento_humano`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `talento_humano` (
  `Id_Talento_Humano` varchar(10) NOT NULL,
  `Nom_Talento_Humano` varchar(30) NOT NULL,
  `Ape_Talento_Humano` varchar(30) NOT NULL,
  `Genero_Talento_Humano` enum('Masculino','Femenino','Otro') NOT NULL,
  `Cor_Talento_Humano` varchar(30) NOT NULL,
  `Tel_Talento_Humano` varchar(12) NOT NULL,
  `Id_Ficha` varchar(11) NOT NULL,
  `Estado` enum('Activo','Inactivo') DEFAULT 'Activo',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Talento_Humano`),
  KEY `Id_Ficha` (`Id_Ficha`),
  CONSTRAINT `talento_humano_ibfk_1` FOREIGN KEY (`Id_Ficha`) REFERENCES `fichas` (`Id_Ficha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `talento_humano`
--

LOCK TABLES `talento_humano` WRITE;
/*!40000 ALTER TABLE `talento_humano` DISABLE KEYS */;
/*!40000 ALTER TABLE `talento_humano` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turnosespeciales`
--

DROP TABLE IF EXISTS `turnosespeciales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turnosespeciales` (
  `Id_TurnoEspecial` int NOT NULL AUTO_INCREMENT,
  `Fec_TurnoEspecial` date NOT NULL,
  `Hor_Inicio` time NOT NULL,
  `Hor_Fin` time NOT NULL,
  `Obs_TurnoEspecial` varchar(100) NOT NULL,
  `Id_Ficha` varchar(11) NOT NULL,
  `Img_Asistencia` varchar(50) DEFAULT NULL,
  `Id_Funcionario` varchar(11) NOT NULL,
  `Id_Unidad` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_TurnoEspecial`),
  KEY `Id_Ficha` (`Id_Ficha`),
  KEY `Id_Funcionario` (`Id_Funcionario`),
  KEY `Id_Unidad` (`Id_Unidad`),
  CONSTRAINT `turnosespeciales_ibfk_1` FOREIGN KEY (`Id_Ficha`) REFERENCES `fichas` (`Id_Ficha`),
  CONSTRAINT `turnosespeciales_ibfk_2` FOREIGN KEY (`Id_Funcionario`) REFERENCES `funcionarios` (`Id_Funcionario`),
  CONSTRAINT `turnosespeciales_ibfk_3` FOREIGN KEY (`Id_Unidad`) REFERENCES `unidades` (`Id_Unidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turnosespeciales`
--

LOCK TABLES `turnosespeciales` WRITE;
/*!40000 ALTER TABLE `turnosespeciales` DISABLE KEYS */;
/*!40000 ALTER TABLE `turnosespeciales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turnosespeciales_aprendices`
--

DROP TABLE IF EXISTS `turnosespeciales_aprendices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turnosespeciales_aprendices` (
  `Id_TurnoEspecial_Aprendiz` int NOT NULL AUTO_INCREMENT,
  `Id_TurnoEspecial` int NOT NULL,
  `Id_Aprendiz` varchar(11) NOT NULL,
  `Ind_Asistencia` enum('Si','No') DEFAULT 'Si',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_TurnoEspecial_Aprendiz`),
  KEY `Id_TurnoEspecial` (`Id_TurnoEspecial`),
  KEY `Id_Aprendiz` (`Id_Aprendiz`),
  CONSTRAINT `turnosespeciales_aprendices_ibfk_1` FOREIGN KEY (`Id_TurnoEspecial`) REFERENCES `turnosespeciales` (`Id_TurnoEspecial`),
  CONSTRAINT `turnosespeciales_aprendices_ibfk_2` FOREIGN KEY (`Id_Aprendiz`) REFERENCES `aprendices` (`Id_Aprendiz`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turnosespeciales_aprendices`
--

LOCK TABLES `turnosespeciales_aprendices` WRITE;
/*!40000 ALTER TABLE `turnosespeciales_aprendices` DISABLE KEYS */;
/*!40000 ALTER TABLE `turnosespeciales_aprendices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turnosrutinarios`
--

DROP TABLE IF EXISTS `turnosrutinarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turnosrutinarios` (
  `Id_TurnoRutinario` int NOT NULL AUTO_INCREMENT,
  `Fec_InicioTurno` date NOT NULL,
  `Fec_FinTurno` date NOT NULL,
  `Hor_InicioTurno` time NOT NULL,
  `Hor_FinTurno` time NOT NULL,
  `Obs_TurnoRutinario` varchar(100) NOT NULL,
  `Ind_Asistencia` enum('Si','No') DEFAULT 'Si',
  `Id_Aprendiz` varchar(11) NOT NULL,
  `Id_Unidad` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_TurnoRutinario`),
  KEY `Id_Aprendiz` (`Id_Aprendiz`),
  KEY `Id_Unidad` (`Id_Unidad`),
  CONSTRAINT `turnosrutinarios_ibfk_1` FOREIGN KEY (`Id_Aprendiz`) REFERENCES `aprendices` (`Id_Aprendiz`),
  CONSTRAINT `turnosrutinarios_ibfk_2` FOREIGN KEY (`Id_Unidad`) REFERENCES `unidades` (`Id_Unidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turnosrutinarios`
--

LOCK TABLES `turnosrutinarios` WRITE;
/*!40000 ALTER TABLE `turnosrutinarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `turnosrutinarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turnosrutinarios_aprendices`
--

DROP TABLE IF EXISTS `turnosrutinarios_aprendices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turnosrutinarios_aprendices` (
  `Id_TurnoRutinario_Aprendiz` int NOT NULL AUTO_INCREMENT,
  `Id_TurnoRutinario` int DEFAULT NULL,
  `Id_Aprendiz` varchar(11) NOT NULL,
  `Ind_Asistencia` enum('Si','No') DEFAULT 'Si',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_TurnoRutinario_Aprendiz`),
  KEY `Id_TurnoRutinario` (`Id_TurnoRutinario`),
  KEY `Id_Aprendiz` (`Id_Aprendiz`),
  CONSTRAINT `turnosrutinarios_aprendices_ibfk_1` FOREIGN KEY (`Id_TurnoRutinario`) REFERENCES `turnosrutinarios` (`Id_TurnoRutinario`),
  CONSTRAINT `turnosrutinarios_aprendices_ibfk_2` FOREIGN KEY (`Id_Aprendiz`) REFERENCES `aprendices` (`Id_Aprendiz`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turnosrutinarios_aprendices`
--

LOCK TABLES `turnosrutinarios_aprendices` WRITE;
/*!40000 ALTER TABLE `turnosrutinarios_aprendices` DISABLE KEYS */;
/*!40000 ALTER TABLE `turnosrutinarios_aprendices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidades`
--

DROP TABLE IF EXISTS `unidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidades` (
  `Id_Unidad` int NOT NULL AUTO_INCREMENT,
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

--
-- Dumping data for table `unidades`
--

LOCK TABLES `unidades` WRITE;
/*!40000 ALTER TABLE `unidades` DISABLE KEYS */;
/*!40000 ALTER TABLE `unidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Id_User` int NOT NULL,
  `Nom_User` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Cor_User` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `token` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Confirmado` tinyint(1) NOT NULL DEFAULT '0',
  `Estado` enum('Activo','Inactivo') COLLATE utf8mb4_general_ci DEFAULT 'Activo',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-28 21:12:58

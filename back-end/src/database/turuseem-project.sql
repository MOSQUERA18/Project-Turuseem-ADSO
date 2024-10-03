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
  `Id_Ciudad` varchar(10) DEFAULT NULL,
  `Lugar_Residencia` varchar(50) DEFAULT NULL,
  `Edad` int DEFAULT NULL,
  `Hijos` enum('Si','No') DEFAULT NULL,
  `Nom_Eps` varchar(50) DEFAULT NULL,
  `Tel_Padre` varchar(12) DEFAULT NULL,
  `Gen_Aprendiz` enum('Masculino','Femenino','Otro') NOT NULL,
  `Cor_Aprendiz` varchar(50) NOT NULL,
  `Tel_Aprendiz` varchar(12) NOT NULL,
  `Tot_Memorandos` int NOT NULL,
  `Tot_Inasistencias` int NOT NULL,
  `Patrocinio` enum('Si','No') NOT NULL,
  `Estado` enum('Activo','Inactivo') DEFAULT 'Activo',
  `Nom_Empresa` varchar(50) DEFAULT NULL,
  `CentroConvivencia` enum('Si','No') DEFAULT NULL,
  `Foto_Aprendiz` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Aprendiz`),
  KEY `Id_Ficha` (`Id_Ficha`),
  KEY `fk_Id_Ciudad` (`Id_Ciudad`),
  CONSTRAINT `aprendices_ibfk_1` FOREIGN KEY (`Id_Ficha`) REFERENCES `fichas` (`Id_Ficha`),
  CONSTRAINT `fk_Id_Ciudad` FOREIGN KEY (`Id_Ciudad`) REFERENCES `ciudades` (`Id_Ciudad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aprendices`
--

LOCK TABLES `aprendices` WRITE;
/*!40000 ALTER TABLE `aprendices` DISABLE KEYS */;
INSERT INTO `aprendices` VALUES ('1070593778','angie','Mosquera','2671143','2000-01-01','1001','Calle Falsa 123',24,'No','Salud S.A.','1234567890','Masculino','juan.perez@example.com','0987654321',2,2,'No','Activo','Empresa XYZ','No',NULL,'2024-09-22 20:54:06','2024-10-02 00:29:09'),('1108455213','anggie','capera','2824123','2000-01-01','1001','Calle Falsa 123',24,'No','Salud S.A.','1234567890','Masculino','juan.perez@example.com','0987654321',10,10,'No','Activo','Empresa XYZ','No',NULL,'2024-09-23 21:00:48','2024-10-02 00:37:45'),('5909080','edinson','Quiroga','2671143','2000-01-01','1001','Calle Falsa ',24,'No','Salud SA','1234567890','Masculino','juandavidlinares2005@gmail.com','0987654321',4,4,'No','Activo','Empresa XYZ','No',NULL,'2024-09-23 19:57:52','2024-10-02 22:33:18');
/*!40000 ALTER TABLE `aprendices` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ciudades`
--

DROP TABLE IF EXISTS `ciudades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudades` (
  `Id_Ciudad` varchar(10) NOT NULL,
  `Nom_Ciudad` varchar(50) NOT NULL,
  PRIMARY KEY (`Id_Ciudad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
INSERT INTO `fichas` VALUES ('0284854','2000-12-12','1999-02-15',23,22,'Activo','2024-09-22 19:05:02','2024-09-22 19:05:02'),('2671143','2023-01-24','2025-04-22',19,9,'Activo','2024-08-20 15:46:04','2024-08-22 18:57:25'),('2824123','2023-10-16','2025-06-23',18,20,'Activo','2024-09-18 13:24:20','2024-09-22 19:02:38'),('2870238','2024-01-23','2025-10-24',25,19,'Activo','2024-09-11 22:31:48','2024-09-11 22:32:51'),('3156414','2024-09-12','2024-09-27',12,18,'Activo','2024-09-22 19:02:32','2024-09-22 19:02:32'),('3654128','2022-02-25','2023-02-22',30,21,'Activo','2024-09-22 19:05:29','2024-09-22 19:05:29');
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
  `Estado` enum('Activo','Inactivo') DEFAULT 'Activo',
  `Correo` varchar(50) DEFAULT NULL,
  `Cargo` enum('Planta','Contratista') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Funcionario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES ('1070593778','Carlos','mosquera','Masculino','32456789','Inactivo',NULL,'Planta','2024-08-21 14:50:47','2024-09-16 22:21:43'),('1105056580','Marlon Javier','Cumbe Loaiza','Masculino','3125465871','Activo',NULL,'Planta','2024-09-18 13:33:28','2024-09-18 13:33:28');
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
  `Fec_Inasistencia` date DEFAULT NULL,
  `Mot_Inasistencia` varchar(50) DEFAULT NULL,
  `Turno_Id` int DEFAULT NULL,
  `Tipo_Inasistencia` enum('turno_rutinario','turno_especial') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Inasistencia`),
  CONSTRAINT `inasistencias_chk_1` CHECK ((`Tipo_Inasistencia` in (_utf8mb4'turno_rutinario',_utf8mb4'aprendiz')))
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inasistencias`
--

LOCK TABLES `inasistencias` WRITE;
/*!40000 ALTER TABLE `inasistencias` DISABLE KEYS */;
INSERT INTO `inasistencias` VALUES (105,'2024-09-23','Yo que voy a saber',17,'turno_rutinario','2024-10-02 01:03:59','2024-10-02 01:03:59');
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
  KEY `Id_Inasistencia` (`Id_Inasistencia`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `otros_memorandos`
--

DROP TABLE IF EXISTS `otros_memorandos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otros_memorandos` (
  `Id_OtroMemorando` int NOT NULL AUTO_INCREMENT,
  `Fec_OtroMemorando` date NOT NULL,
  `Mot_OtroMemorando` varchar(255) NOT NULL,
  `ENVIADO` tinyint(1) DEFAULT '0',
  `Referencia_Id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_OtroMemorando`)
) ENGINE=InnoDB AUTO_INCREMENT=192 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otros_memorandos`
--

LOCK TABLES `otros_memorandos` WRITE;
/*!40000 ALTER TABLE `otros_memorandos` DISABLE KEYS */;
INSERT INTO `otros_memorandos` VALUES (188,'2024-09-23','',0,104,'2024-10-02 00:52:52','2024-10-02 00:52:52'),(189,'2024-09-23','Yo que voy a saber',0,105,'2024-10-02 01:03:59','2024-10-02 01:03:59'),(190,'2024-10-24','JJDJDJDJ',0,1070593778,'2024-10-02 20:21:05','2024-10-02 20:21:05'),(191,'2024-10-29','sss',0,1070593778,'2024-10-02 20:22:37','2024-10-02 20:22:37');
/*!40000 ALTER TABLE `otros_memorandos` ENABLE KEYS */;
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
  `Tip_ProgramaFormacion` enum('Tecnologo') DEFAULT NULL,
  `Id_Area` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_ProgramaFormacion`),
  KEY `Id_Area` (`Id_Area`),
  CONSTRAINT `programasformacion_ibfk_1` FOREIGN KEY (`Id_Area`) REFERENCES `areas` (`Id_Area`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programasformacion`
--

LOCK TABLES `programasformacion` WRITE;
/*!40000 ALTER TABLE `programasformacion` DISABLE KEYS */;
INSERT INTO `programasformacion` VALUES (9,'Analisis y desarrollo de software','Tecnologo',1,'2024-08-20 15:45:25','2024-09-22 19:04:15'),(18,'Gestion de Especies Menores','Tecnologo',2,'2024-09-02 13:47:16','2024-09-18 13:20:51'),(19,'Gestion Agroempresarial','Tecnologo',1,'2024-09-11 22:32:14','2024-09-11 22:32:14'),(20,'Procesamiento de Alimentos','Tecnologo',3,'2024-09-18 13:20:33','2024-09-18 13:20:33'),(21,'despinchar','Tecnologo',4,'2024-09-22 19:04:26','2024-09-22 19:04:26'),(22,'MatasBuenas','Tecnologo',5,'2024-09-22 19:04:38','2024-09-22 19:04:38');
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
INSERT INTO `talento_humano` VALUES ('1106393696','Alexandra','Candil','Femenino','alexacandil123@gmail.com','3112154414','2824123','Activo','2024-09-18 13:37:25','2024-09-18 13:37:25'),('12344','veronica guzman','mosquera','Femenino','susana@gmail.com','89075','2671143','Activo','2024-08-21 17:26:15','2024-09-16 22:59:05');
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
  `Tot_AprendicesAsistieron` varchar(10) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `Ind_Asistencia` enum('Si','No') DEFAULT 'Si',
  `Id_Aprendiz` varchar(11) NOT NULL,
  `Id_TurnoEspecial` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_TurnoEspecial_Aprendiz`),
  KEY `Id_Aprendiz` (`Id_Aprendiz`),
  KEY `Id_TurnoEspecial` (`Id_TurnoEspecial`),
  CONSTRAINT `turnosespecialesaprendices_ibfk_1` FOREIGN KEY (`Id_Aprendiz`) REFERENCES `aprendices` (`Id_Aprendiz`),
  CONSTRAINT `turnosespecialesaprendices_ibfk_2` FOREIGN KEY (`Id_TurnoEspecial`) REFERENCES `turnosespeciales` (`Id_TurnoEspecial`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turnosrutinarios`
--

LOCK TABLES `turnosrutinarios` WRITE;
/*!40000 ALTER TABLE `turnosrutinarios` DISABLE KEYS */;
INSERT INTO `turnosrutinarios` VALUES (17,'2024-09-23','2024-09-24','07:00:00','09:00:00','quien sabe riki','No','5909080',22,'2024-09-23 19:58:09','2024-10-02 01:03:59'),(19,'2024-09-23','2024-09-24','07:00:00','09:00:00','sweetPain','Si','1070593778',22,'2024-09-23 20:58:51','2024-10-02 00:33:03'),(20,'2024-09-23','2024-09-24','07:00:00','09:00:00','alguien','Si','1108455213',25,'2024-09-23 21:01:28','2024-10-02 00:17:20'),(23,'2024-09-30','2024-10-01','07:00:00','09:00:00','LALALALA','Si','1108455213',25,'2024-09-30 22:40:41','2024-10-02 00:38:01');
/*!40000 ALTER TABLE `turnosrutinarios` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidades`
--

LOCK TABLES `unidades` WRITE;
/*!40000 ALTER TABLE `unidades` DISABLE KEYS */;
INSERT INTO `unidades` VALUES (22,'Mercasena I','07:00:00','16:00:00','Inactivo',1,'2024-08-22 16:35:07','2024-09-22 19:03:43'),(23,'montallantas','07:00:00','16:00:00','Activo',4,'2024-09-02 01:38:35','2024-09-22 19:03:14'),(24,'Yerbas','07:00:00','16:00:00','Activo',5,'2024-09-05 16:47:37','2024-09-22 19:03:34'),(25,'Pan y cafe','07:00:00','16:00:00','Activo',3,'2024-09-18 13:18:11','2024-09-22 19:03:25'),(26,'Ganaderia','07:00:00','16:00:00','Activo',2,'2024-09-18 16:38:05','2024-09-18 16:38:05');
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
  `Estado` enum('Activo','Inactivo') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'Activo',
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
INSERT INTO `users` VALUES (1234567,'marlon Sarmiento','sarmientomarlon452@gmail.com','$2a$10$lr6vajtTSXGlE54lfbtDneZG/cmatP7Oj1/YDlyf5REtA0vqS7Shi','1i5r4ric9beds2b66qf8',0,'Activo','2024-08-21 18:58:14','2024-08-21 18:58:14'),(1070593778,'Marlon Mosquera','kalethsarmiento1234@gmail.com','$2b$10$72ENMMNNVbly4G1WPh89N.HN8BpNR4BcHxdvc.qnAgsZMWorfjYiy','1i58jiccapvu9qrqtgn',1,'Activo','2024-08-08 19:18:08','2024-08-14 14:09:48'),(1107008520,'Juan David Linares','juandavidlinares2005@gmail.com','$2b$10$BTaTJcRk15gFQDBueqzwXu13ygVWeJoL5D0.VTc8JOTArzU7LfbrK','1i87tguje2c2tugu4u6',1,'Activo','2024-06-10 03:59:20','2024-09-20 14:31:38');
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

-- Dump completed on 2024-10-03 12:15:28

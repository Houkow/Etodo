CREATE DATABASE  IF NOT EXISTS `etodo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `etodo`;
-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: etodo
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.24.04.2

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
-- Table structure for table `todo`
--

DROP TABLE IF EXISTS `todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `due_time` datetime NOT NULL,
  `status` enum('not started','todo','in progress','done') DEFAULT 'not started',
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `todo_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo`
--

LOCK TABLES `todo` WRITE;
/*!40000 ALTER TABLE `todo` DISABLE KEYS */;
INSERT INTO `todo` VALUES (52,'test','test','2025-11-25 09:50:47','2026-10-10 00:00:00','todo',31),(53,'test','test','2025-11-25 22:45:05','2024-10-10 00:00:00','not started',31),(54,'testcaca','test','2025-11-25 22:45:09','2024-10-10 00:00:00','not started',31);
/*!40000 ALTER TABLE `todo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `role` enum('employee','manager') DEFAULT 'employee',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (10,'n.garde@icloud.com','$2b$10$SwFldvNeLZEkn6ASER7.U.ZsMkjKv2rOpjQCM.j0wc.SeEzbXjyzC','Nicolas','Garde','2025-11-08 19:00:59','employee'),(11,'r.t@t.fr','$2b$10$oEFLNOb3WRepWezpCJj6t.rI.zxA0hcbVcfxURtpUgB4eXFd4U03.','Garde','Nicolas','2025-11-10 00:59:31','employee'),(12,'theo@example.com','$2b$10$iqQ2bw2OIJCb/Fm5PoBt3e8yJazpiyjVSXdlRKkNREuUI0Io/VJ9K','Théo','Garde','2025-11-10 01:06:07','manager'),(14,'tga32355@gmail.com','$2b$10$0foXOE4BzENfmOa7AzOaSunFgWAh.wbhJGSpUoAtsuUSOycpNTFEu','Garde','Nicolas','2025-11-10 01:07:50','employee'),(15,'test.test@test.fr','$2b$10$eIB5OvBYZ7OTccEWp3lDqe/f7f.0YB/oVGpKuZIBUUmVP6NmzmCKi','test','test2','2025-11-11 21:46:09','employee'),(16,'theo1.mayer@epitech.eu','$2b$10$ECHWef0ZL1isS28YucPqE.a0Rrua1c/.VMDwwKU/8DCRXx9vgtMrO','Theo ','Mayer','2025-11-12 09:37:35','employee'),(18,'theo.garde.2007@gmail.com','$2b$10$bnU6Y9SIVMhcMk.t.q98jOzCGksZoy1eSBOVpZmduCO5Xk51zTwUK','Théo','Garde','2025-11-12 13:40:21','manager'),(19,'leo.lienhard@epitech.eu','$2b$10$/w4wmRGepEXnLXEZYHRAKumitUWrc/NG6L7oeGiy3CAbExj1NeD5u','Leo','lienhard','2025-11-12 14:01:54','employee'),(20,'caca.pipi@caca.fr','$2b$10$beVxWB.xP8NOCS4a4f5PiuWmoKxkj5XS.bMmzvo7n.IGYyyVl5pbm','caca','pipi','2025-11-12 17:19:51','employee'),(21,'test@gmail.com','$2b$10$dybMzX1ERP5pGKKbfEwnTe047fp8L47bzgdbTFxwkiykS/PnqWa5.','Hanniel','Maroga','2025-11-13 14:16:34','employee'),(22,'test2.test@test.fr','$2b$10$Y3ETz63j.q1Y6qq/Km0vy.MZqBUa9MPzwn/OD5ovho1mkeEtimwWe','test','test','2025-11-13 15:25:39','employee'),(23,'ta.ta@ta.mc','$2b$10$gUPUrwwh.fi689EjqvPDX.Di0vM2ojAc7lT9.m0XwdKdhRyCUm5GK','tatata','tataa','2025-11-13 16:39:33','employee'),(26,'test3@3.mc','$2b$10$dPXSW8GJ6up6sMwwu9rYFuOSRgzJ/SY.sUMQ.98Z99nntdGiRQcQW','test3','test3','2025-11-14 10:44:34','employee'),(31,'theo.garde@epitech.eu','$2b$10$M8ikuFu9MjTHejdq9wdWAuuYgW45YEehmgrOzb7A85UyfwrZM2sPS','Théo','Garde','2025-11-18 14:26:46','manager'),(33,'jean.arthur@caca.fr','$2b$10$LUEajmVFhnu9LcrWvrV3Hubu3S17ar4cciIvvupX1NX6FzZULPwtS','Jean','arthur ','2025-11-20 17:19:07','manager'),(34,'test.test@test.fra','test','test','caca','2025-11-22 17:22:22','employee'),(43,'grossemerde@merde.mc','$2b$10$IAPZ3Uo1j2lPlBT2qH2B4.DuHE/WskvIDC3/54rG8WLl/PzyAxhKS','caca','caca','2025-11-24 22:25:01','employee');
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

-- Dump completed on 2025-11-26 11:24:06

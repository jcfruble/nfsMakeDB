SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS,FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE,SQL_MODE='NO_AUTO_VALUE_ON_ZERO';
SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0;

DROP DATABASE IF EXISTS `nfssitedb`;
CREATE DATABASE `nfssitedb`;
USE `nfssitedb`;

DROP TABLE IF EXISTS `nfsgeneros`;

CREATE TABLE `nfsgeneros` (
  `idGenero` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idGenero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `nfsimages`;

CREATE TABLE `nfsimages` (
  `idImage` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `idJogo` tinyint(3) unsigned DEFAULT NULL,
  `imgs` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`idImage`),
  KEY `fkJogo` (`idJogo`),
  CONSTRAINT `fkJogo` FOREIGN KEY (`idJogo`) REFERENCES `nfsjogos` (`idJogo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `nfsjogos`;

CREATE TABLE `nfsjogos` (
  `idJogo` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) DEFAULT NULL,
  `imagem` varchar(60) DEFAULT NULL,
  `data` date DEFAULT NULL,
  `idGenero` tinyint(3) unsigned DEFAULT NULL,
  `descr` mediumtext,
  `imgini` tinyint(3) unsigned DEFAULT NULL,
  `imgend` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`idJogo`),
  KEY `fkGenero` (`idGenero`),
  CONSTRAINT `fkGenero` FOREIGN KEY (`idGenero`) REFERENCES `nfsgeneros` (`idGenero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET SQL_MODE=@OLD_SQL_MODE;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET SQL_NOTES=@OLD_SQL_NOTES;

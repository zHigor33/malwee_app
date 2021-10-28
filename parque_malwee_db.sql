-- MySQL Script generated by MySQL Workbench
-- Sat Oct 23 12:31:28 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `parque_malwee` DEFAULT CHARACTER SET utf8 ;
USE `parque_malwee` ;

-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parque_malwee`.`user` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(300) NOT NULL,
  `user_password` VARCHAR(500) NOT NULL,
  `user_name` VARCHAR(200) NOT NULL,
  `user_adm` TINYINT NOT NULL DEFAULT 0,
  `number_phone` CHAR(11) NULL,
  `profile_image` VARCHAR(1000) NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `iduser_UNIQUE` (`ID` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `number_phone_UNIQUE` (`number_phone` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`waypoint`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parque_malwee`.`waypoint` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `lat` VARCHAR(100) NOT NULL,
  `log` VARCHAR(100) NOT NULL,
  `local_name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `idwaypoint_UNIQUE` (`ID` ASC) VISIBLE,
  UNIQUE INDEX `local_name_UNIQUE` (`local_name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parque_malwee`.`event` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `event_name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `event_date` DATE NOT NULL,
  `event_time` TIME NOT NULL,
  `event_image` VARCHAR(1000) NOT NULL,
  `waypoint_ID` INT NOT NULL,
  PRIMARY KEY (`ID`, `waypoint_ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_event_waypoint1_idx` (`waypoint_ID` ASC) VISIBLE,
  CONSTRAINT `fk_event_waypoint1`
    FOREIGN KEY (`waypoint_ID`)
    REFERENCES `mydb`.`waypoint` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user_event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parque_malwee`.`user_event` (
  `user_ID` INT NOT NULL,
  `event_ID` INT NOT NULL,
  PRIMARY KEY (`user_ID`, `event_ID`),
  INDEX `fk_user_has_event_event1_idx` (`event_ID` ASC) VISIBLE,
  INDEX `fk_user_has_event_user_idx` (`user_ID` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_event_user`
    FOREIGN KEY (`user_ID`)
    REFERENCES `mydb`.`user` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_event_event1`
    FOREIGN KEY (`event_ID`)
    REFERENCES `mydb`.`event` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`activity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parque_malwee`.`activity` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `activity_name` VARCHAR(80) NOT NULL,
  `image` VARCHAR(1000) NOT NULL,
  `waypoint_ID` INT NOT NULL,
  PRIMARY KEY (`ID`, `waypoint_ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_activity_waypoint1_idx` (`waypoint_ID` ASC) VISIBLE,
  CONSTRAINT `fk_activity_waypoint1`
    FOREIGN KEY (`waypoint_ID`)
    REFERENCES `mydb`.`waypoint` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`museum`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parque_malwee`.`museum` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `artifact_name` VARCHAR(80) NOT NULL,
  `artifact_description` VARCHAR(500) NOT NULL,
  `image` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  UNIQUE INDEX `artifact_name_UNIQUE` (`artifact_name` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- SELECT table users
-- -----------------------------------------------------
SELECT * FROM `user`;

-- -----------------------------------------------------
-- DROP DATABASE
-- -----------------------------------------------------
drop database parque_malwee;

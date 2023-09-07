-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema TastyGo
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema TastyGo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `TastyGo` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `TastyGo` ;

-- -----------------------------------------------------
-- Table `TastyGo`.`user_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TastyGo`.`user_tb` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NULL DEFAULT NULL,
  `last_name` VARCHAR(50) NULL DEFAULT NULL,
  `user_name` VARCHAR(50) NULL DEFAULT NULL,
  `user_email` VARCHAR(50) NULL DEFAULT NULL,
  `user_mobile` VARCHAR(20) NULL DEFAULT NULL,
  `user_password` VARCHAR(20) NULL DEFAULT NULL,
  `role` VARCHAR(20) NULL DEFAULT 'user',
  `image` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_email` (`user_email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `TastyGo`.`address_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TastyGo`.`address_tb` (
  `address_id` INT NOT NULL AUTO_INCREMENT,
  `state` VARCHAR(20) NULL DEFAULT NULL,
  `city` VARCHAR(20) NULL DEFAULT NULL,
  `pin` CHAR(6) NULL DEFAULT NULL,
  `user_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`address_id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `address_tb_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `TastyGo`.`user_tb` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `TastyGo`.`delivery_partner_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TastyGo`.`delivery_partner_tb` (
  `delivery_partner_id` INT NOT NULL AUTO_INCREMENT,
  `delivery_partner_first_name` VARCHAR(20) NULL DEFAULT NULL,
  `delivery_partner_last_name` VARCHAR(20) NULL DEFAULT NULL,
  `status` VARCHAR(20) NULL DEFAULT NULL,
  `city` VARCHAR(20) NULL DEFAULT NULL,
  `pin` CHAR(6) NULL DEFAULT NULL,
  PRIMARY KEY (`delivery_partner_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `TastyGo`.`restaurant_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TastyGo`.`restaurant_tb` (
  `restaurant_id` INT NOT NULL AUTO_INCREMENT,
  `restaurant_name` VARCHAR(20) NULL DEFAULT NULL,
  `restaurant_type` VARCHAR(20) NULL DEFAULT NULL,
  `state` VARCHAR(20) NULL DEFAULT NULL,
  `city` VARCHAR(20) NULL DEFAULT NULL,
  `pin` CHAR(6) NULL DEFAULT NULL,
  `image` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`restaurant_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 30
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `TastyGo`.`dish_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TastyGo`.`dish_tb` (
  `dish_id` INT NOT NULL AUTO_INCREMENT,
  `restaurant_id` INT NULL DEFAULT NULL,
  `dish_type` VARCHAR(50) NULL DEFAULT NULL,
  `dish_name` VARCHAR(50) NULL DEFAULT NULL,
  `dish_price` DOUBLE NULL DEFAULT NULL,
  `dish_image` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`dish_id`),
  INDEX `restaurant_id` (`restaurant_id` ASC) VISIBLE,
  CONSTRAINT `dish_tb_ibfk_1`
    FOREIGN KEY (`restaurant_id`)
    REFERENCES `TastyGo`.`restaurant_tb` (`restaurant_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 59
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `TastyGo`.`order_menu_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TastyGo`.`order_menu_item` (
  `order_menu_id` INT NOT NULL AUTO_INCREMENT,
  `dish_id` INT NULL DEFAULT NULL,
  `qty_ordered` INT NULL DEFAULT NULL,
  `user_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`order_menu_id`),
  INDEX `dish_id` (`dish_id` ASC) VISIBLE,
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `order_menu_item_ibfk_2`
    FOREIGN KEY (`dish_id`)
    REFERENCES `TastyGo`.`dish_tb` (`dish_id`),
  CONSTRAINT `order_menu_item_ibfk_3`
    FOREIGN KEY (`user_id`)
    REFERENCES `TastyGo`.`user_tb` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `TastyGo`.`order_status_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TastyGo`.`order_status_tb` (
  `order_status_id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`order_status_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `TastyGo`.`orders_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TastyGo`.`orders_tb` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL DEFAULT NULL,
  `restaurant_id` INT NULL DEFAULT NULL,
  `dish_id` INT NULL DEFAULT NULL,
  `user_address_id` INT NULL DEFAULT NULL,
  `delivery_partner_id` INT NULL DEFAULT NULL,
  `order_status_id` INT NULL DEFAULT NULL,
  `order_datetime` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `total_amount` DOUBLE NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  INDEX `restaurant_id` (`restaurant_id` ASC) VISIBLE,
  INDEX `dish_id` (`dish_id` ASC) VISIBLE,
  INDEX `user_address_id` (`user_address_id` ASC) VISIBLE,
  INDEX `delivery_partner_id` (`delivery_partner_id` ASC) VISIBLE,
  INDEX `order_status_id` (`order_status_id` ASC) VISIBLE,
  CONSTRAINT `orders_tb_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `TastyGo`.`user_tb` (`user_id`),
  CONSTRAINT `orders_tb_ibfk_2`
    FOREIGN KEY (`restaurant_id`)
    REFERENCES `TastyGo`.`restaurant_tb` (`restaurant_id`),
  CONSTRAINT `orders_tb_ibfk_3`
    FOREIGN KEY (`dish_id`)
    REFERENCES `TastyGo`.`dish_tb` (`dish_id`),
  CONSTRAINT `orders_tb_ibfk_4`
    FOREIGN KEY (`user_address_id`)
    REFERENCES `TastyGo`.`address_tb` (`address_id`),
  CONSTRAINT `orders_tb_ibfk_5`
    FOREIGN KEY (`delivery_partner_id`)
    REFERENCES `TastyGo`.`delivery_partner_tb` (`delivery_partner_id`),
  CONSTRAINT `orders_tb_ibfk_6`
    FOREIGN KEY (`order_status_id`)
    REFERENCES `TastyGo`.`order_status_tb` (`order_status_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

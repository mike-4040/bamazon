CREATE DATABASE `bamazon`;
CREATE TABLE `products` (
    `item_id` INT(11) NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(50) NOT NULL,
    `department_name` VARCHAR(30) DEFAULT NULL,
    `price` DECIMAL(11 , 2 ) DEFAULT '0.00',
    `stock_quantity` INT(11) DEFAULT '0',
    PRIMARY KEY (`item_id`)
);
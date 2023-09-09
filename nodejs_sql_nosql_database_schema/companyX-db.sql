use companyx;


CREATE TABLE IF NOT EXISTS  `Users` (
    `id` BIGINT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `contact` VARCHAR(255) NOT NULL,
    `gender` ENUM('Male', 'Female') NOT NULL,
    `phoneNumber` VARCHAR(255) NOT NULL,
    `is_staff` TINYINT(1) NOT NULL DEFAULT 0,
    `is_admin` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `Categorys` (
    `id` BIGINT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `Products` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `price` DECIMAL(8, 2) NOT NULL,
    `quantity` INT NOT NULL,
    `available` TINYINT(1) NOT NULL DEFAULT 0,
    `size` ENUM('small', 'medium', 'large') NOT NULL,
    `created_at`  datetime DEFAULT CURRENT_TIMESTAMP,
    `category_id` BIGINT,
    FOREIGN KEY (category_id) REFERENCES Categorys(id)
);

CREATE TABLE IF NOT EXISTS `Orders` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `approval` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'False or True. Can only be modified by admins',
    `created_at`  datetime DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS `Order_items` (
    `id` BIGINT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `product_id` BIGINT NOT NULL,
    `order_id` BIGINT NOT NULL,
    `quantity` INT NOT NULL,
    `unit_price` DECIMAL(8, 2) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(id),
    FOREIGN KEY (order_id) REFERENCES Orders(id)
);



INSERT INTO Users (username, email,password,contact, gender,phoneNumber) 
VALUES ("DanielAdesoji", "Adesoji@fakegmail.com" ,"password123","Somewhere in the world", "Male", "0808954XXXX");

INSERT INTO Categorys (name, description) 
VALUES ("Phones", "Includes Samsungs, Apple Iphones and all");

INSERT INTO Products (name, description,price,quantity, available,size, category_id) 
VALUES ("Iphone 14", "Nice and sleek Phone" ,"999.99",27, 1,"medium", 2);


INSERT INTO Orders (user_id) 
VALUES(1);

INSERT INTO Order_items (product_id, order_id, quantity, unit_price)
VALUES (6,2,3,129.99);


select * from products;
select * from Order_items;

select * from Order_items where order_id=2;

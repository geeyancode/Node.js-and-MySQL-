-- drop an existing bamazon in SQL database
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL (7,2) NOT NULL,
    stock_quantity INT(5) NOT NULL,
    primary key(item_id)
);

SELECT * FROM products.stock_quantity;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ("Cannodale Roadbike", "Cycling", 1250.99, 3),
        ("Specialized Helment", "Cycling", 250.45, 3),
        ("Spalding Basketball", "Sports", 45.50, 5),
        ("Jordan 1 Basketball Shoes", "Sports", 350.45, 5),
        ("Burton Snowboard", "Winter Sports", 750.20, 10),
        ("Spyder Winter Gloves", "Winter Sports", 32.25, 10),
        ("Fishing Rod", "Outdoors", 120.50, 15),
        ("Catch Net", "Outdoors", 25.00, 15),
        ("Tent", "Outdoors", 250.90, 20),
        ("Sleeping Bag", "Outdoors", 85.25, 20 );
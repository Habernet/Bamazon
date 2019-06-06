DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(40) NOT NULL,
    price INT NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
 );

INSERT INTO products(product_name, department_name, price, stock_quantity)
    VALUES
        ('shirt', 'clothing', 20, 30),
        ('pants', 'clothing', 55, 30),
        ('underwear', 'clothing', 10, 30),
        ('socks', 'clothing', 15, 30),
        ('hoodie', 'clothing', 45, 30)
    ;
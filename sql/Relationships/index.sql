INSERT INTO products
VALUES(2, "Pencil")

CREATE TABLE orders(
    id INT NOT NULL,
    order_number: INT,
    customer_id INT,
    product_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
)

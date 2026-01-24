SELECT * FROM 'customers';

CREATE TABLE Persons (
    id int NOT NULL,
    name STRING,
    price MONEY,
    PRIMARY KEY (id)
)

INSERT INTO products (id, name)
VALUES(2, "Pencil")
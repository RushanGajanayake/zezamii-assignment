-- Task 02. #1

CREATE DATABASE zezamiiDB;

CREATE TABLE Customers (
    customer_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    phone_number VARCHAR(15),
    address VARCHAR(255),
    city VARCHAR(50),
    country VARCHAR(50),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    customer_id INT NOT NULL,
    rating DECIMAL(10,2),
    category_id INT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_status VARCHAR(50) NOT NULL,
    payment_id INT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE OrderItems (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);


-- Task 02. #2

SELECT Orders.order_id, Orders.total_amount, Orders.total_amount, Orders.order_status, Orders.payment_id, Customers.first_name, Customers.email
FROM Orders
JOIN Customers ON Orders.customer_id = Customers.customer_id;


SELECT Products.product_id, Products.name 
FROM Products
INNER JOIN OrderItems ON Products.product_id = OrderItems.product_id
WHERE OrderItems.created_date < DATEADD(day, -90, GETDATE())
GROUP BY Products.product_id

UPDATE Products
SET price= 9.90
WHERE product_id=?;



-- Task 02. #3

CREATE PROCEDURE GetCustomerOrderHistory
    @CustomerID INT
AS
BEGIN
    -- Select order history with product details
    SELECT 
        o.order_id,
        o.created_date,
        p.name,
        oi.quantity,
        oi.price,
        (oi.quantity * oi.price) AS TotalPrice
    FROM 
        Orders o
    INNER JOIN 
        OrderItems oi ON o.order_id = oi.order_id
    INNER JOIN 
        Products P ON oi.product_id = p.product_id
    WHERE 
        o.customer_id = @CustomerID
    ORDER BY 
        o.created_date DESC;
END;


EXEC GetCustomerOrderHistory @CustomerID = 1;


-- Task 02. #4

SELECT 
    c.customer_id,
    c.first_name,
    SUM(oi.quantity * oi.price) AS TotalRevenue
FROM 
    Customers c
INNER JOIN 
    Orders o ON c.customer_id = o.CustomerID
INNER JOIN 
    OrderItems oi ON o.order_id = oi.order_id
GROUP BY 
    c.customer_id, c.first_name
ORDER BY 
    TotalRevenue DESC;
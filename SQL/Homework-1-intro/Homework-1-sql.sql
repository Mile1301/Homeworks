--Employee
CREATE TABLE employee (
id serial PRIMARY KEY NOT NULL,
firstName varchar(20),
lastName varchar(20)
);

SELECT  * FROM  employee

INSERT INTO employee (firstName,lastName)
VALUES 
('Mile','Todorovski'),
('Borche','Borisovski'),
('Antonio','Pavic'),
('Filip','Tomashevski')

SELECT firstName FROM employee e 
WHERE lastname = 'Borisovski'

UPDATE employee 
SET firstName ='Mileeeeee'
WHERE firstName ='Mile'

DELETE 
FROM employee 
WHERE firstName = 'Mileeeeee'

-- BusinessEntity
CREATE TABLE BusinessEntity(
id serial PRIMARY KEY NOT NULL,
name varchar(100),
region varchar (100),
zipcode varchar (100),
SIZE varchar(10)
);
SELECT * FROM BusinessEntity 

INSERT INTO BusinessEntity (name,region,zipcode,size)
VALUES 
('SEDC','Skopski','1000',NULL),
('IWS','Pelaginiski','2000','200'),
('FAC','Kumanovski','3000','100')

UPDATE BusinessEntity 
SET SIZE= 635
WHERE id =4

--DELETE FROM businessentity WHERE name='IWS'
--DELETE FROM businessentity WHERE SIZE IS NULL 
DELETE FROM businessentity WHERE name ='SEDC' AND SIZE IS NULL 

SELECT id, name,SIZE FROM businessentity 
WHERE name ='SEDC'

--Customer
CREATE  TABLE customer(
id serial PRIMARY KEY NOT NULL,
name varchar(100),
accountNumber varchar(50),
city varchar(50),
regionName varchar(50),
phoneNumber varchar(20),
isActive boolean
);

SELECT  * FROM customer

INSERT INTO customer (name,accountNumber,city,regionName,phoneNumber,isActive)
VALUES 
('Mile','235','Skopje','Skopski','075/342-726',true),
('Borche','678','Strmosh','Probishtipski','070/200-300',true),
('Filip','902','Drachevo','Skopski','075/300-700',false),
('Antonio','567','Bogdanci','Gevgeliski','075/400-800',true)

UPDATE customer 
SET isActive=FALSE 
WHERE name='Antonio'

DELETE FROM customer 
WHERE name = 'Filip'

--Product

CREATE TABLE product (
id serial PRIMARY KEY NOT NULL,
Code varchar(50),
Name varchar (100),
Description varchar(5000),
Weight float(2),
Price float(2),
COST float(2)
)

SELECT * FROM product

INSERT INTO product (code,name,description,weight,price,cost) 
VALUES
('123','laptop','great laptop',2.2,99,80),
('456','iPhone','great iPhone14',1.25,89,800),
('789','tv','great tv',2.2345,999,80)

INSERT INTO product (code)
VALUES
('5566')

UPDATE product 
SET name='samsung s22'
WHERE code='5566'

UPDATE product 
SET description ='great android phone', weight=0.5
WHERE code='5566'

DELETE FROM product WHERE id=2

SELECT * FROM product WHERE name='laptop' LIMIT 1

--Order
CREATE TABLE orders (
id serial PRIMARY KEY NOT NULL,
orderDate date,
Status SMALLINT,
BusinessEntityId integer,
CustomerId integer,
EmployeeId integer,
TotalPrice float(2),
COMMENT varchar(500)
)

SELECT * FROM orders

INSERT INTO orders (orderDate,status,businessEntityId,customerId,EmployeeId,totalPrice,comment)
VALUES 
('12.02.2022',32000,NULL,NULL,NULL,555,'great deal')


UPDATE orders 
SET businessentityid='1'
WHERE id=1
--how TO CONNECT via sql directly

DELETE FROM orders WHERE businessentityid =1

SELECT status FROM orders WHERE id=5

--ORDER details

CREATE TABLE orderDetails (
id serial PRIMARY KEY NOT NULL,
orderId integer,
productId integer,
quantity integer,
price float(2)
)

SELECT * FROM orderdetails 

INSERT INTO orderdetails (orderid,productid,quantity,price)
VALUES 
(NULL,NULL,'4625',24)

UPDATE orderdetails 
SET quantity =0
WHERE quantity >=4624

DELETE  FROM orderdetails WHERE price >35000
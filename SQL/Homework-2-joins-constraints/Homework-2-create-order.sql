
SELECT * FROM customer c 

SELECT * FROM employee e 

SELECT * FROM businessentity b 

SELECT * FROM product p 

SELECT * FROM "Order" o 

SELECT * FROM orderdetails o 

--Homework requirement 1/6

--• Find all Employees with FirstName = Antonio
SELECT * FROM employee e 
WHERE firstname ='Antonio';
--• Find all Employees with DateOfBirth greater than ‘01.01.1979’
SELECT * FROM employee e 
WHERE dateofbirth >'1979-01-01';
--• Find all Male Employees
SELECT * FROM employee e 
WHERE gender ='M';
--• Find all Employees with LastName starting With ‘T’
SELECT * FROM employee e 
WHERE lastname LIKE 'T%';
--• Find all Employees hired in April/2010
SELECT * FROM employee e 
WHERE hiredate >='2010-04-01' AND hiredate <='2010-04-30';
--• Find all Employees with LastName starting With ‘M’ hired in
--2014
SELECT * FROM employee e 
--WHERE hiredate >='2014-01-01' AND hiredate <='2014-12-31' AND lastname LIKE 'M%'

--Homework requirement 2/6

--• Find all Employees with FirstName = starts with A ordered by LastName ascending
SELECT * FROM employee e 
WHERE firstname LIKE 'A%' 
ORDER BY lastname ASC 

--• List all Employees ordered by FirstName
SELECT * FROM employee e  
ORDER BY firstname ASC 

--• Find all Male employees ordered by HireDate, starting from the last
--hired
SELECT * FROM employee e  
WHERE  gender ='M'
ORDER BY hiredate DESC 

--Homework requirement 3/6

--• List all Business Entity region and Customer region names in single
--result set WITH duplicates
SELECT region FROM businessentity b
UNION ALL 
SELECT regionname FROM customer c; 
--• List all Business Entity region and Customer region names in single
--result set WITHOUT duplicates
SELECT region FROM businessentity b 
UNION  
SELECT regionname FROM customer c;

--• List all common region names between Business Entities and
--Customers
SELECT region FROM businessentity b 
INTERSECT   
SELECT regionname FROM customer c;

--Homework requirement 4/6

--• Provide create table script for the Order table where it won’t allow an
--orderDate before 01.01.2019

ALTER TABLE "Order" 
ADD CONSTRAINT check_orderdate CHECK (orderdate>='2018-12-01')

SELECT * FROM "Order" 

--ALTER TABLE "Order" DROP CONSTRAINT check_orderdate;
--ADD CONSTRAINT CHECK (orderdate>='2019-01-01')


--• Provide create table script for the Product table where the price will
--always be AT LEAST 20% higher than the cost
SELECT * FROM product p  

--UPDATE Product 
--SET price = "cost" * 1.2,
--ADD CONSTRAINT margin_20 CHECK (price >= "cost" * 1.2)
--WHERE 
--Code IS NOT NULL;



--• Provide create table script for the Product table where all description
--values will be UNIQUE
SELECT * FROM product p 

--had to update the same descriptions first then set unique constraints
UPDATE product 
SET description ='ha ha'
WHERE id=12

ALTER TABLE Product
ADD CONSTRAINT unique_description UNIQUE (description);


--Homework requirement 5/6

--• Create Foreign key constraints for the Order table with script

ALTER TABLE "Order" 
ADD CONSTRAINT businessentity_order FOREIGN KEY (businessentityid) REFERENCES businessentity(id) 

ALTER TABLE "Order" 
ADD CONSTRAINT customer_order FOREIGN KEY (customerid) REFERENCES customer(id)

ALTER TABLE "Order" 
ADD CONSTRAINT employee_order FOREIGN KEY (employeeid) REFERENCES employee(id)

--ALTER TABLE "Order" 
--ADD CONSTRAINTS 
--businessentity_order FOREIGN KEY (businessentityid) REFERENCES businessentity(id)
--customer_order FOREIGN KEY (customerid) REFERENCES customer(id)
--employee_order FOREIGN KEY (employeeid) REFERENCES employee(id)
--refactored code using constraints


SELECT * FROM "Order" 

--Homework requirement 6/6
SELECT * FROM customer c 

--• List all possible combinations of Customer names and Product names
--that can be ordered from a specific customer
SELECT c.name, p."name"  
FROM customer c 
CROSS JOIN product p 

--• List all Business Entities that has any order
SELECT * FROM businessentity b 
INNER JOIN "Order" o 
ON b.id =o.businessentityid 
ORDER BY "name" ASC ;

--• List all Business Entities without orders

--had TO ADD another business entity WITHOUT ORDER TO SHOW the requirement OF the task
--INSERT INTO businessentity (name,region,zipcode,size)
--VALUES ('Vitalia Pehcevo','Malesvski',235,'Small')

SELECT * FROM businessentity b 
LEFT JOIN "Order" o 
ON b.id =o.businessentityid 
WHERE o.businessentityid IS NULL 
ORDER BY b.id ASC 

--• List all Customers without orders (using Right Join and using Left join)
--had TO ADD another customer WITHOUT ORDER TO SHOW the requirement OF the task
--INSERT INTO customer (name,accountnumber ,city,regionname,phonenumber,isactive)
--VALUES ('Kam',23434676,'Skopje','Skopski',5634576,true)

SELECT * FROM customer c 
LEFT JOIN "Order" o 
ON c.id =o.customerid 
WHERE o.customerid IS NULL

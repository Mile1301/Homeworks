--User-defined functions – workshop

--• Declare function (format_product_name) for retrieving the Product
--description for specific ProductId in the following format:

--• First and second character from the Code

--• Last three characters from the Name

--• Product Price

CREATE FUNCTION format_product_name(productId integer)
RETURNS integer
LANGUAGE plpgsql
AS
$$
DECLARE
required_product integer;
BEGIN
	SELECT LEFT (p.code,2), RIGHT (p."name",3), p.price 
	INTO required_product
	FROM product
	
	RETURN required_product;
END;
$$;

SELECT format_product_name(1)

--• Divide the three different values with a dash (‘-’);

REPLACE FUNCTION format_product_name(productId integer)
RETURNS integer
LANGUAGE plpgsql
AS
$$
DECLARE
required_product integer;
BEGIN
	SELECT concat(LEFT (p.code,2),'-', RIGHT (p."name",3),'-', p.price )  
	INTO required_product
	FROM product
	
	RETURN required_product;
END;
$$;

SELECT format_product_name(5)

SELECT * FROM product p 

--User-defined functions – workshop

--NOT WORKING
--• Declare function (get_customer_orders) that returns the orders for a
--certain customer based on their customerId. Return a separate
--column for:
--• The customer’s name and account number divided by a space character
--• The customer’s city’s first three characters together with their region’s first
--three characters, divided by a backwards slash (‘/’)
--• The order id and its price, divided by a dash (‘-’)

--CREATE FUNCTION get_customer_orders(randomguy integer)
--RETURNS integer
--LANGUAGE plpgsql
--AS 
--$$
--DECLARE 
--required_order text;
--BEGIN
--	SELECT c."name"  || ' ' ||c.accountnumber ,concat(LEFT(c.city,3),'/',LEFT(c.regionname,3)), o.id ||'-'||o.totalprice 
--	INTO required_order 
--	FROM "Order" o 
--	JOIN customer c 
--	ON c.id =o.customerid
--	WHERE o.customerid =randomguy;
--	
--	RETURN required_order;
--END;
--$$;
--
--SELECT get_customer_orders(1)

--NOT WORKING

--DROP FUNCTION get_customer_orders

CREATE FUNCTION get_customer_orders(randomguy integer)
RETURNS TABLE (
"Customer N_A" TEXT,
"Required Extra Stuff" TEXT,
"Order and Price" TEXT
)
LANGUAGE plpgsql
AS 
$$
BEGIN
	RETURN QUERY
	SELECT c."name"  || ' ' ||c.accountnumber ,concat(LEFT(c.city,3),'/',LEFT(c.regionname,3)), o.id ||'-'||o.totalprice
	FROM "Order" o 
	JOIN customer c 
	ON c.id =o.customerid
	WHERE o.customerid =randomguy;
END;
$$;

SELECT * FROM get_customer_orders(2)

--Homework requirement 1/3

--• Calculate “(price + cost) / weight” for all products.

SELECT *,(price + cost) / weight AS calc FROM product p 

--• Get a round number that is higher or equal for the costs and a round
--number that is lower or equal for the prices for all products.

SELECT *,CEIL (p."cost") AS cost_ceil, floor(p.price) AS price_floor  FROM product p 

--• Get all orders and generate a random number between 0 and 100 for
--every order.

SELECT *, round(random()*100) AS random_num  FROM "Order" o 

--• Concatenate the name, region and zipcode from every business entity
--and add the delimiter ‘; ‘ between them.

SELECT concat(b."name",'; ',b.region,'; ',b.zipcode) AS required_concat  FROM businessentity b 


--Homework requirement 2/3

--• Create a function (get_employees_hired_later_than) that will return
--all employees that were hired after a provided date. Return the
--following columns:
--• The first and last name concatenated into one column with a space between
--them. The column should be named “Full name”.
--• The age that the employee was at the time he was employed. Column should
--be named “Age of employee on hiring”.
--• The national ID number concatenated with the gender, with a ‘; ‘ delimiter
--between them.

CREATE OR REPLACE FUNCTION get_employees_hired_later_than(hire_date_input date)
RETURNS TABLE (
    "Full name" text,
    "Age of employee on hiring" integer,
    "National ID and Gender" text
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        concat(e.firstname, ' ', e.lastname )::TEXT  AS "Full name",
        EXTRACT(YEAR FROM AGE(e.hiredate,e.dateofbirth))::integer AS "Age of employee on hiring",
        concat(e.gender,'; ',e.nationalidnumber)::text AS "National ID and Gender"
    FROM
        employee e
    WHERE
        e.hiredate > hire_date_input;
END;
$$;


SELECT * FROM get_employees_hired_later_than('2014-01-01')

SELECT * FROM employee e 

--Create a function (get_employee_orders) that will return all orders
--done by a specific employee. Return the following columns:

--• The first 3 letters of the name, the last 3 characters of the code and the full
--description concatenated delimited with the character ‘; ‘ of the product for
--which the order was made.
--• The quantity of the order.
--• The business entity name for which the order was made.

SELECT * FROM product p 

SELECT * FROM "Order" o 

SELECT * FROM orderdetails o 

SELECT * FROM employee e 

SELECT * FROM businessentity b 

-- making the logic for the function
--SELECT concat(e.firstname,' ',e.lastname) AS employee_full_name, concat(LEFT(p.code,3),'; ',LEFT(p."name",3),'; ',p.description) AS required_concat,od.quantity AS order_quantity ,b."name" AS businessentity_name FROM "Order" o 
--JOIN orderdetails od
--ON od.orderid =o.id 
--JOIN product p 
--ON p.id = od.productid 
--JOIN businessentity b 
--ON b.id =o.businessentityid 
--JOIN employee e 
--ON e.id =o.employeeid 

CREATE OR REPLACE FUNCTION get_employee_orders (somebody integer)
RETURNS TABLE (
"Employee_full_name" TEXT,
"Required_concat" TEXT,
"Order Quantity" integer,
"Businessentity Name" TEXT
)
LANGUAGE plpgsql
AS
$$
BEGIN
	RETURN QUERY
	SELECT concat(e.firstname,' ',e.lastname)::text, 
	concat(LEFT(p.code,3),'; ',LEFT(p."name",3),'; ',p.description)::text,
	od.quantity::integer,
	b."name"::TEXT 
	FROM "Order" o 
JOIN orderdetails od
ON od.orderid =o.id 
JOIN product p 
ON p.id = od.productid 
JOIN businessentity b 
ON b.id =o.businessentityid 
JOIN employee e 
ON e.id =o.employeeid
WHERE e.id = somebody;
END;
$$;

--had to write random name for the parameter because it was constantly saying that for example when using employeeId, 
--the parameter name was too ambigious
DROP  FUNCTION get_employee_orders

SELECT * FROM get_employee_orders(2)

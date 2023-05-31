--Workshop 1/3
--• Create a table valued function that for a specific order returns every
--column of the OrderDetails table.

CREATE OR REPLACE FUNCTION get_order_details(ord_id integer)
RETURNS TABLE (
id integer,
order_id integer,
product_id integer,
quantity integer,
price REAL
)
LANGUAGE plpgsql
AS
$$
BEGIN
	RETURN QUERY
	SELECT od.id ,od.orderid ,od.productid ,od.quantity ,od.price  FROM orderdetails od
	WHERE od.id = ord_id;
END;
$$;

SELECT * FROM get_order_details (1)

--Workshop 2/3
--• Create a function that returns all product table columns for a given
--order ID.

CREATE OR REPLACE FUNCTION get_all_products(order_id integer)
RETURNS TABLE (
id integer,
code varchar,
name varchar,
description varchar,
weight REAL,
price REAL,
"cost" REAL
)
LANGUAGE plpgsql
AS
$$
BEGIN
	RETURN QUERY
	SELECT p.id,p.code ,p."name",p.description , p.weight ,p.price , p."cost"  FROM product p
	JOIN orderdetails od 
	ON p.id = od.productid 
	JOIN "Order" o 
	ON o.id =od.orderid   
	WHERE od.orderid = order_id;
END;
$$;

SELECT * FROM get_all_products(1)

--Workshop 3/3
--• Create a table valued function that for a specific BusinessEntity and
--Customer will return list of products sold, together with the total
--quantity sold and total price per product.

CREATE OR REPLACE FUNCTION get_products(business_entity_id integer, customer_id integer)
RETURNS TABLE (
product_name varchar,
quantity integer,
total_price real
)
LANGUAGE plpgsql
AS
$$
BEGIN
	RETURN QUERY
	SELECT p."name", od.quantity ,od.price  FROM product p
	JOIN orderdetails od 
	ON p.id = od.productid 
	JOIN "Order" o 
	ON o.id =od.orderid 
	JOIN customer c 
	ON c.id =o.customerid 
	JOIN businessentity b 
	ON b.id = o.businessentityid  
	WHERE o.businessentityid = business_entity_id AND o.customerid = customer_id;
END;
$$;

DROP FUNCTION get_products

SELECT * FROM get_products(5,1)

SELECT c.id,c."name" AS customer_name,b.id,b."name" AS b_entity_name ,p."name", od.quantity ,od.price  FROM product p
	JOIN orderdetails od 
	ON p.id = od.productid 
	JOIN "Order" o 
	ON o.id =od.orderid 
	JOIN customer c 
	ON c.id =o.customerid 
	JOIN businessentity b 
	ON b.id = o.businessentityid 
	ORDER BY b.id,c.id
	
	
SELECT  * FROM customer c 

SELECT  * FROM "Order" o 

SELECT  * FROM businessentity b  

SELECT  * FROM product p 

SELECT * FROM orderdetails o 

	
	
--Workshop 1/2
--• Create a function that for a specific order returns the name of the
--product. Use row variables for the result sets of both the Product and
--OrderDetails tables.


create or replace function get_product_name (order_id int)
	returns varchar
	language plpgsql
as 
$$
declare 
	order_details orderdetails%rowtype;
	products product%rowtype;
begin 
	select * from orderdetails into order_details
	where orderid = order_id;
	select * from product into products
	where id = order_details.productid;
	
	return products.name;
end;
$$;

DROP FUNCTION get_product_name

select get_product_name (1)

SELECT * FROM get_product_name (1)


--• Create a function that for a specific product ID returns all information
--for all customers that bought it. Store the result sets of the
--intermediate tables in row variables. - - NOT WORKING 4 - leaves blank fields

CREATE OR REPLACE FUNCTION get_customer_names (product_id int)
	returns table
	(
		id int,
		name varchar,
		accountnumber varchar,
		city varchar,
		regionname varchar,
		phonenumber varchar,
		isactive bool
	)
	language plpgsql
as $$
declare
	order_details orderdetails%rowtype;
	products product%rowtype;
	orders "Order"%rowtype;
begin
	select * from product p into products
	where p.id = product_id;
	
	select * from orderdetails into order_details
	where productid = products.id;
	
	select * from "Order" o into orders
	where o.id = orders.id;
	
	return query
	select * from customer c
	where c.id = orders.customerid;
end;
$$;

DROP FUNCTION get_customer_names 

select * from get_customer_names(5)



--• Create a function that returns all information of the product
--connected to a specific order ID. Use a record to store the
--intermediate result set.


CREATE OR REPLACE FUNCTION get_product1 (order_id int)
returns table
(
	id int,
	code varchar,
	name varchar,
	description varchar,
	weight real,
	price real,
	cost real
)
language plpgsql
as $$
declare
	order_details record;
	orders record;
begin
	select * from "Order" o into orders
	where o.id = order_id;
	select * from orderdetails od into order_details
	where od.id = orders.id;
	
	return query
	select * from product p
	where p.id = order_details.productid;
end;
$$;

select * from get_product1 (5)

--Workshop 2/2

--• Create a function that:

--• Returns the totalPrice from Orders table, price from OrderDetails table and
--price from Products table for a given order ID.
--• Uses records to store the result sets.
--• Returns all three values concatenated into a string into the following format:
--‘ORDER_TOTAL_PRICE: %; ORDER_DETAIL_PRICE: %; PRODUCT_PRICE: %’.
--• Each value is to be modified by a percentage, order’s total price 20%, order
--detail’s price by 15% and product’s price by 10%. Store all three percentages
--as constants.

CREATE OR REPLACE FUNCTION get_prices (order_id int)
returns varchar
language plpgsql
as $$
declare 
	order_details record;
	orders record;
	products record;
	
	order_modifier constant numeric := 1.2;
	order_detail_modifier constant numeric := 1.15;
	product_modifier constant numeric := 1.1;
	concatened_return_sting varchar;
begin
	select * from "Order" o into orders
	where o.id = order_id;
	
	select * from orderdetails od into order_details
	where od.orderid = orders.id;
	
	select * from product p into products
	where p.id = order_details.productid;
	
	SELECT FORMAT('ORDER_TOTAL_PRICE: %s; ORDER_DETAIL_PRICE: %s; PRODUCT_PRICE: %s'
				  , orders.totalprice * order_modifier
				  , order_details.price * order_detail_modifier
				  , products.price * product_modifier
				  ) into concatened_return_sting;
	return concatened_return_sting;			  
end;
$$;

select get_prices (5)

--Create a function that returns the name of the product for a given product ID. 
--If a product does not exist with that ID, show a notice. Use an if statement to determine if the product exists.
-- MISSING RETURN IN THE SOLUTION 7

CREATE OR REPLACE FUNCTION get_product_name3 (product_id int)
returns varchar
language plpgsql
as $$
declare
	product_name varchar;
begin
	select name from product p into product_name
	where p.id = product_id;

	if found then
		return product_name;
	else 
		raise notice 'Could not find a product with the ID: %', product_id;
	end if;
RETURN product_name;
end;
$$

select get_product_name3 (-1)


--Create a function that returns the name of a product for a given order ID, 
--only if the order’s total price is above 50. 
--If it’s below than 50, raise a notice saying so. 
--If an order with that ID does not exist, show a different message.

create or replace function get_product_name4 (order_id int)
returns varchar
language plpgsql
as $$
declare
	product_name varchar;
	total_price real;
begin
	select totalprice from "Order" into total_price
	where id = order_id;
	
	if not found then
		raise notice 'Cannot find order with ID: %', order_id;
	elseif (total_price > 50) then
			select p.Name 
			from "Order" o into product_name
			join orderdetails od on o.id = od.orderid
			join product p on od.productid = p.id
			where o.id = order_id;
			return product_name;
	else 
		raise notice 'The total price (%), is less than 50!', total_price;
	end if;
end;
$$;


select get_product_name4 (1)



/*
Create a function that returns the customer’s name if an order’s quantity is less than 50, 
or the business entity’s name if it is higher than 50. Determine the order by providing its ID. If it does not exist, show a message.
*/

CREATE OR REPLACE FUNCTION get_customer_or_be_name (order_id int)
RETURNS varchar
language plpgsql
AS $$
DECLARE
	name varchar;
	order_quantity real;
BEGIN
	SELECT od.Quantity FROM orderdetails od INTO order_quantity
	WHERE orderid = order_id;
	
	IF NOT FOUND THEN
		RAISE NOTICE 'Cannot find order with ID: %', order_id;
	ELSEIF (order_quantity > 50) THEN
		SELECT b.Name INTO name
		FROM "Order" o
		JOIN BusinessEntity b ON o.businessentityid = b.id
		WHERE 
			o.id = order_id;
		return name;
	ELSE 
		SELECT b.Name INTO name
		FROM "Order" o
		JOIN Customer b ON o.customerid = b.id
		WHERE 
			o.id = order_id;
		RETURN name;
	END IF;
END;
$$;

select get_customer_or_be_name (12);


CREATE OR REPLACE FUNCTION get_order_details12 (orderid1 int)
returns table
(
	id int,
	order_id int,
	product_id int,
	quantity int,
	price real
)
language plpgsql
as
$$
begin
	return query
	select 
	* 
	from orderdetails od
	where od.id = orderid1;
end;
$$;


EXPLAIN select * 
from get_order_details12 (5) as tvf
left join product p on tvf.product_id = p.id


	

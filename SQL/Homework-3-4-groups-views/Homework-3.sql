--Workshop - Grouping facilities


--1. How can you retrieve all the information from the facilities
--table?
SELECT * FROM facilities f 

--2. How can you produce a list of facilities that charge a fee to
--members?
SELECT * FROM facilities f
WHERE f.membercost >0

--3. How can you produce a list of facilities that charge a fee to
--members, and that fee is less than 1/50th of the monthly
--maintenance cost? Return the facid, facility name, member
--cost, and monthly maintenance of the facilities in question.
SELECT facid ,"name" ,membercost ,monthlymaintenance  FROM facilities f 
WHERE f.membercost >0 AND f.membercost < (monthlymaintenance/50)


--4. How can you retrieve the details of facilities with ID 1 and 5?
--Try to do it without using the OR operator.
SELECT * FROM facilities f
WHERE f.facid IN (1,5)

--5. You'd like to get the signup date of your last member. How can
--you retrieve this information?
SELECT * FROM members m 
ORDER BY m.memid DESC 
LIMIT 1

--6. You'd like to get the first and last name of the last member(s) who
--signed up - not just the date. How can you do that?
SELECT m.firstname,m.surname,m.joindate FROM members m
ORDER BY m.memid DESC 
LIMIT 1


--7. Produce a list of the total number of slots booked per facility. 
SELECT b.facid,sum(b.slots) AS total_slots FROM bookings b 
GROUP BY b.facid 
ORDER BY b.facid 

--For now, just produce an output table consisting of facility id and slots,
--sorted by facility id.
SELECT b.facid, b.slots,f."name" FROM bookings b
JOIN facilities f 
ON f.facid =b.facid 
ORDER BY b.facid ASC 


--8. Find the total number of members (including guests) who have
--made at least one booking.
SELECT m.memid, m.firstname,m.surname, count(b.bookid) FROM members m
JOIN bookings b 
ON m.memid =b.memid 
GROUP BY m.memid 
ORDER BY m.memid ASC 

SELECT * FROM members m

SELECT * FROM bookings b 

--9. Produce a monotonically increasing numbered list of members
--(including guests), ordered by their date of joining. Remember that
--member IDs are not guaranteed to be sequential.

--QUESTION 1
SELECT m.memid, m.firstname,m.surname,m.joindate,ROW_NUMBER() OVER (ORDER BY joindate) FROM members m 
ORDER BY memid 

--10. How can you produce a list of the start times for bookings by
--members named 'David Farrell’?
SELECT b.bookid ,concat(m.firstname,' ',m.surname ) AS full_name ,b.starttime FROM members m
JOIN bookings b 
ON m.memid =b.memid 
WHERE concat(m.firstname,' ',m.surname ) = 'David Farrell'

--11. How can you produce a list of the start times for bookings
--for tennis courts, for the date '2012-09-21'? Return a list of start
--time and facility name pairings, ordered by the time.
SELECT f."name",b.starttime FROM bookings b
JOIN facilities f
ON b.facid =b.facid 
WHERE f."name" LIKE ('Tennis Court%') AND DATE(b.starttime) = '2012-09-21'
ORDER BY b.starttime 

--12. How can you output a list of all members who have
--recommended another member? Ensure that there are no
--duplicates in the list, and that results are ordered by (surname,
--firstname).

SELECT DISTINCT m.surname,m.firstname FROM members m
JOIN members m2 
ON m.memid = m2.recommendedby 

--::type allows us to typecast some column into a specifc type to be used in the query
SELECT string_agg(f.membercost::varchar(50), '; ') FROM facilities f 

SELECT string_agg(f."name" , '; ') FROM facilities f 


--Workshop - Grouping orders

--• Calculate the total amount on all orders in the SYSTEM
--SELECT * FROM orderdetails o 

SELECT sum(o.totalprice) FROM "Order" o  

--• Calculate the total amount per BusinessEntity on all orders in the
--system

SELECT b.id,b."name" , sum(o.totalprice),min(o.totalprice),max(o.totalprice),avg(o.totalprice) FROM "Order" o
JOIN businessentity b
ON o.businessentityid =b.id
GROUP BY b.id 


--• Calculate the total amount per BusinessEntity on all orders in the
--system from Customers with ID < 5

SELECT b.id, b."name" , sum(o.totalprice), avg(o.totalprice), count(*), min(o.totalprice), max(o.totalprice )  FROM "Order" o 
LEFT JOIN businessentity b 
ON o.businessentityid = b.id
WHERE o.customerid < 5
GROUP BY b.id  
 

--• Find the Maximal Order amount, and the Average Order amount per
--BusinessEntity on all orders in the system
SELECT b.id ,b."name" ,max(o.totalprice),avg(o.totalprice)  FROM "Order" o 
JOIN businessentity b 
ON o.businessentityid =b.id 
GROUP  BY b.id 

--• Find the highest order for every customer
SELECT c.id, c."name",max(o.totalprice) FROM "Order" o
JOIN customer c
ON c.id=o.customerid 
GROUP  BY c.id

--• Find the average price of orders per employee, only when the
--customer ID > 5
SELECT e.id, concat(e.firstname,' ',e.lastname) AS employee_fullname, avg(o.totalprice) FROM "Order" o 
LEFT JOIN employee e 
ON o.employeeid =e.id
WHERE o.customerid >5 
GROUP BY e.id 
 
--• Find the maximum price of an order for every customer, showing
--their name
SELECT c."name" ,max(o.totalprice)AS max_price FROM "Order" o 
LEFT JOIN customer c 
ON c.id=o.customerid 
GROUP BY c."name" 
ORDER BY max_price DESC 


--• Find the minimum price of an order for every business entity, showing
--their name, and region and zip code concatenated in one column
--SELECT concat(b."name" ,b.region ,b.zipcode) AS be_name , min(o.totalprice)  FROM "Order" o 
SELECT b."name" ||' '|| b.region ||' '|| b.zipcode AS be_name , min(o.totalprice)  FROM "Order" o 
LEFT JOIN businessentity b 
ON b.id =o.businessentityid 
GROUP BY be_name


--• Concatenate all the prices of the orders for every business entity with
--a ‘; ’ delimiter and show their names
SELECT b."name", string_agg(o.totalprice::TEXT,'; ')  FROM "Order" o
LEFT JOIN businessentity b 
ON b.id =o.businessentityid 
GROUP BY b."name" 

--• Show the quantities (from OrderDetails table) of the highest price
--order for every business entity

SELECT b.id,b."name" ,max(o.totalprice), sum(od.quantity) AS qty_sum FROM orderdetails od
JOIN "Order" o 
ON o.id =od.orderid 
JOIN businessentity b 
ON o.businessentityid =b.id 
GROUP BY b.id  
HAVING sum(od.quantity)>500 AND name LIKE 'Vitalia S%'
ORDER BY qty_sum DESC 

--• Calculate the sum of prices of orders per business entities and show
--the records where their sum is greater than 400

SELECT b.id, b."name", sum(o.totalprice)  FROM "Order" o
JOIN businessentity b 
ON o.businessentityid =b.id 
GROUP BY b.id
HAVING sum(o.totalprice)>400

--• Calculate the sum of prices per business entity on all orders from
--customers with ID < 5 and filter only records with sums less then 1000
SELECT b.id, b."name", sum(o.totalprice)  FROM "Order" o
JOIN businessentity b 
ON o.businessentityid =b.id
WHERE b.id<5
GROUP BY b.id
HAVING sum(o.totalprice)<1000 
--• Find the Maximum Order amount, and the Average Order amount per
--business entity on all orders in the system. Filter only records where
--the max price is 1.5x bigger than the average.

--QUESTION 2 - how to read newly created column names
SELECT b.id,b."name" ,max(o.totalprice),avg(o.totalprice),(max(o.totalprice)/avg(o.totalprice))AS divided,1.5 AS base,((max(o.totalprice)/avg(o.totalprice))-1.5) AS result  FROM "Order" o 
JOIN businessentity b 
ON o.businessentityid =b.id
GROUP BY b.id 
HAVING max(o.totalprice) > (avg(o.totalprice)*1.4)  

--• List all BusinessEntity names, region and zipcode next to the other
--details from the previous query
SELECT b.id,b."name"||', '||b.region||', '||b.zipcode ,max(o.totalprice),avg(o.totalprice),(max(o.totalprice)/avg(o.totalprice))AS divided,1.5 AS base,((max(o.totalprice)/avg(o.totalprice))-1.5) AS result  FROM "Order" o 
JOIN businessentity b 
ON o.businessentityid =b.id
GROUP BY b.id 
HAVING max(o.totalprice) > (avg(o.totalprice)*1.5)  



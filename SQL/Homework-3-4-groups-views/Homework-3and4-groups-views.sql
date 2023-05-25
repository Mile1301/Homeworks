-- Create the Student table
CREATE TABLE Student (
	Id serial PRIMARY KEY NOT NULL,
    FirstName varchar(20),
    LastName varchar(30),
    DateOfBirth DATE,
    EnrolledDate DATE,
    Gender varchar(10),
    NationalIDNumber varchar(20),
    StudentCardNumber varchar(20)
);

-- Create the Course table
CREATE TABLE Course (
    Id serial PRIMARY KEY NOT NULL,
    Name varchar(100),
    Credit integer,
    AcademicYear integer,
    Semester integer
);

-- Create the Teacher table
CREATE TABLE Teacher (
    Id serial PRIMARY KEY NOT NULL,
    FirstName varchar(50),
    LastName varchar(50),
    DateOfBirth DATE,
    AcademicRank varchar(50),
    HireDate DATE
);

-- Create the Grade table
CREATE TABLE Grade (
    Id serial PRIMARY KEY NOT NULL,
    StudentId integer,
    CourseId integer,
    TeacherId integer,
    Grade decimal (4, 2),
    Comment varchar(200),
    CreatedDate DATE,
    FOREIGN KEY (StudentId) REFERENCES Student(Id),
    FOREIGN KEY (CourseId) REFERENCES Course(Id),
    FOREIGN KEY (TeacherId) REFERENCES Teacher(Id)
);

-- Create the GradeDetails table
CREATE TABLE GradeDetails (
    Id serial PRIMARY KEY NOT NULL,
    GradeId integer,
    AchievementTypeId integer,
    AchievementPointegers integer,
    AchievementMaxPointegers integer,
    AchievementDate DATE,
    FOREIGN KEY (GradeId) REFERENCES Grade(Id),
    FOREIGN KEY (AchievementTypeId) REFERENCES AchievementType(Id)
);

-- Create the AchievementType table
CREATE TABLE AchievementType (
    Id serial PRIMARY KEY NOT NULL,
    Name varchar(50),
    Description varchar(200),
    ParticipationRate decimal(4, 2)
);

-- Insert records into the Student table
INSERT INTO Student (FirstName, LastName, DateOfBirth, EnrolledDate, Gender, NationalIDNumber, StudentCardNumber)
VALUES
    ('John', 'Doe', '1999-05-10', '2021-09-01', 'Male', '1234567890', 'S123456789'),
    ('Jane', 'Smith', '2000-07-15', '2022-02-28', 'Female', '0987654321', 'S987654321'),
    ('Michael', 'Johnson', '1998-12-03', '2020-08-15', 'Male', '4567890123', 'S456789012'),
    ('Emily', 'Williams', '2001-03-22', '2023-01-10', 'Female', '3210987654', 'S321098765'),
    ('David', 'Brown', '1997-09-17', '2021-06-30', 'Male', '7890123456', 'S789012345'),
    ('Sophia', 'Miller', '2002-02-08', '2022-09-05', 'Female', '2109876543', 'S210987654'),
    ('James', 'Taylor', '1999-11-28', '2020-12-20', 'Male', '5678901234', 'S567890123'),
    ('Olivia', 'Anderson', '2000-06-14', '2023-03-15', 'Female', '4321098765', 'S432109876'),
    ('Daniel', 'Clark', '1998-02-18', '2021-11-05', 'Male', '8901234567', 'S890123456'),
    ('Ava', 'Wilson', '2001-09-05', '2022-04-01', 'Female', '1098765432', 'S109876543');

-- Insert records into the Course table
INSERT INTO Course (Name, Credit, AcademicYear, Semester)
VALUES
    ('Mathematics', 4, 2021, 1),
    ('Physics', 3, 2021, 2),
    ('English Literature', 3, 2022, 1),
    ('Chemistry', 4, 2022, 2),
    ('History', 3, 2023, 1),
    ('Computer Science', 4, 2023, 2),
    ('Biology', 4, 2024, 1),
    ('Geography', 3, 2024, 2),
    ('Art', 2, 2025, 1),
    ('Economics', 3, 2025, 2);

-- Insert records into the Teacher table
INSERT INTO Teacher (FirstName, LastName, DateOfBirth, AcademicRank, HireDate)
VALUES
    ('Robert', 'Johnson', '1975-08-20', 'Associate Professor', '2010-09-01'),
    ('Karen', 'Smith', '1980-03-15', 'Assistant Professor', '2015-02-15'),
    ('Christopher', 'Davis', '1972-11-10', 'Professor', '2005-07-01'),
    ('Jennifer', 'Anderson', '1982-05-05', 'Associate Professor', '2012-12-10'),
    ('William', 'Brown', '1978-01-25', 'Professor', '2008-06-30'),
    ('Elizabeth', 'Miller', '1985-06-12', 'Assistant Professor', '2017-09-05'),
    ('Thomas', 'Wilson', '1976-09-28', 'Associate Professor', '2011-12-20'),
    ('Jessica', 'Taylor', '1983-04-14', 'Professor', '2014-03-15'),
    ('Andrew', 'Clark', '1979-02-08', 'Assistant Professor', '2009-11-05'),
    ('Sarah', 'Jones', '1984-10-01', 'Associate Professor', '2013-04-01');

-- Insert records into the Grade table
INSERT INTO Grade (StudentId, CourseId, TeacherId, Grade, Comment, CreatedDate)
VALUES
    (1, 1, 1, 85.5, 'Good job!', '2022-05-15'),
    (2, 1, 1, 92.0, 'Excellent work!', '2022-05-15'),
    (3, 2, 2, 76.5, 'Needs improvement', '2022-05-15'),
    (4, 2, 2, 88.5, 'Well done!', '2022-05-15'),
    (5, 3, 3, 79.0, 'Keep it up!', '2022-05-15'),
    (6, 3, 3, 95.0, 'Great performance!', '2022-05-15'),
    (7, 4, 4, 90.5, 'Impressive!', '2022-05-15'),
    (8, 4, 4, 82.0, 'Good effort!', '2022-05-15'),
    (9, 5, 5, 87.0, 'Nice work!', '2022-05-15'),
    (10, 5, 5, 93.5, 'Well executed!', '2022-05-15');
   
   INSERT INTO Grade (StudentId, CourseId, TeacherId, Grade, Comment, CreatedDate)
VALUES
    (1, 1, 1, 79.5, 'Good effort!', '2022-05-15'),
    (2, 2, 2, 85.0, 'Well done!', '2022-05-15'),
    (3, 3, 3, 91.5, 'Excellent work!', '2022-05-15'),
    (4, 4, 4, 76.0, 'Keep it up!', '2022-05-15'),
    (5, 5, 5, 88.0, 'Impressive!', '2022-05-15'),
    (6, 1, 1, 94.5, 'Great job!', '2022-05-15'),
    (7, 2, 2, 82.5, 'Nice work!', '2022-05-15'),
    (8, 3, 3, 90.0, 'Well executed!', '2022-05-15'),
    (9, 4, 4, 77.5, 'Good job!', '2022-05-15'),
    (10, 5, 5, 86.5, 'Needs improvement', '2022-05-15'),
    (1, 1, 1, 93.0, 'Great performance!', '2022-05-15'),
    (2, 2, 2, 81.0, 'Keep up the good work!', '2022-05-15'),
    (3, 3, 3, 89.5, 'Well deserved!', '2022-05-15'),
    (4, 4, 4, 78.0, 'Excellent performance!', '2022-05-15'),
    (5, 5, 5, 85.0, 'Good effort!', '2022-05-15'),
    (6, 1, 1, 92.5, 'Impressive work!', '2022-05-15'),
    (7, 2, 2, 80.0, 'Keep it up!', '2022-05-15'),
    (8, 3, 3, 88.5, 'Nice job!', '2022-05-15'),
    (9, 4, 4, 79.5, 'Well done!', '2022-05-15'),
    (10, 5, 5, 84.5, 'Good performance!', '2022-05-15');

INSERT INTO Grade (StudentId, CourseId, TeacherId, Grade, Comment, CreatedDate)
VALUES
    (1, 1, 1, 59.5, 'Good effort!', '2022-05-15'),
    (2, 2, 2, 65.0, 'Well done!', '2022-05-15'),
    (3, 3, 3, 81.5, 'Excellent work!', '2022-05-15'),
    (4, 4, 4, 66.0, 'Keep it up!', '2022-05-15'),
    (5, 5, 5, 98.0, 'Impressive!', '2022-05-15'),
    (6, 1, 1, 94.5, 'Great job!', '2022-05-15'),
    (7, 2, 2, 72.5, 'Nice work!', '2022-05-15'),
    (8, 3, 3, 80.0, 'Well executed!', '2022-05-15'),
    (9, 4, 4, 67.5, 'Good job!', '2022-05-15'),
    (10, 5, 5, 56.5, 'Needs improvement', '2022-05-15'),
    (1, 1, 1, 83.0, 'Great performance!', '2022-05-15'),
    (2, 2, 2, 71.0, 'Keep up the good work!', '2022-05-15'),
    (3, 3, 3, 69.5, 'Well deserved!', '2022-05-15'),
    (4, 4, 4, 68.0, 'Excellent performance!', '2022-05-15'),
    (5, 5, 5, 95.0, 'Good effort!', '2022-05-15'),
    (6, 1, 1, 82.5, 'Impressive work!', '2022-05-15'),
    (7, 2, 2, 90.0, 'Keep it up!', '2022-05-15'),
    (8, 3, 3, 98.5, 'Nice job!', '2022-05-15'),
    (9, 4, 4, 89.5, 'Well done!', '2022-05-15'),
    (10, 5, 5, 94.5, 'Good performance!', '2022-05-15');

INSERT INTO Grade (StudentId, CourseId, TeacherId, Grade, Comment, CreatedDate)
VALUES
    (1, 1, 2, 59.5, 'Good effort!', '2022-05-15'),
    (2, 2, 2, 65.0, 'Well done!', '2022-05-15'),
    (3, 3, 2, 81.5, 'Excellent work!', '2022-05-15'),
    (4, 4, 2, 66.0, 'Keep it up!', '2022-05-15'),
    (5, 5, 3, 98.0, 'Impressive!', '2022-05-15'),
    (6, 1, 4, 94.5, 'Great job!', '2022-05-15'),
    (7, 2, 5, 72.5, 'Nice work!', '2022-05-15'),
    (8, 3, 5, 80.0, 'Well executed!', '2022-05-15'),
    (9, 4, 5, 67.5, 'Good job!', '2022-05-15'),
    (10, 5, 5, 56.5, 'Needs improvement', '2022-05-15'),
    (1, 1, 5, 83.0, 'Great performance!', '2022-05-15'),
    (2, 2, 2, 71.0, 'Keep up the good work!', '2022-05-15'),
    (3, 3, 2, 69.5, 'Well deserved!', '2022-05-15'),
    (4, 4, 2, 68.0, 'Excellent performance!', '2022-05-15'),
    (5, 5, 2, 95.0, 'Good effort!', '2022-05-15'),
    (6, 1, 2, 82.5, 'Impressive work!', '2022-05-15'),
    (7, 2, 2, 90.0, 'Keep it up!', '2022-05-15'),
    (8, 3, 5, 98.5, 'Nice job!', '2022-05-15'),
    (9, 4, 4, 89.5, 'Well done!', '2022-05-15'),
    (10, 5, 5, 94.5, 'Good performance!', '2022-05-15');
   
INSERT INTO Grade (StudentId, CourseId, TeacherId, Grade, Comment, CreatedDate)
VALUES
    (4, 1, 2, 59.5, 'Good effort!', '2022-05-15'),
    (2, 2, 2, 65.0, 'Well done!', '2022-05-15'),
    (3, 3, 2, 81.5, 'Excellent work!', '2022-05-15'),
    (4, 4, 2, 66.0, 'Keep it up!', '2022-05-15'),
    (5, 5, 3, 98.0, 'Impressive!', '2022-05-15'),
    (5, 1, 4, 94.5, 'Great job!', '2022-05-15'),
    (6, 2, 5, 72.5, 'Nice work!', '2022-05-15'),
    (6, 3, 5, 80.0, 'Well executed!', '2022-05-15'),
    (6, 4, 5, 67.5, 'Good job!', '2022-05-15'),
    (10, 5, 5, 56.5, 'Needs improvement', '2022-05-15'),
    (10, 1, 5, 83.0, 'Great performance!', '2022-05-15'),
    (5, 2, 2, 71.0, 'Keep up the good work!', '2022-05-15'),
    (5, 3, 2, 69.5, 'Well deserved!', '2022-05-15'),
    (5, 4, 2, 68.0, 'Excellent performance!', '2022-05-15'),
    (5, 5, 2, 95.0, 'Good effort!', '2022-05-15'),
    (5, 1, 2, 82.5, 'Impressive work!', '2022-05-15'),
    (7, 2, 2, 90.0, 'Keep it up!', '2022-05-15'),
    (7, 3, 5, 98.5, 'Nice job!', '2022-05-15'),
    (7, 4, 4, 89.5, 'Well done!', '2022-05-15'),
    (10, 5, 5, 94.5, 'Good performance!', '2022-05-15');
   
-- Insert records into the GradeDetails table
INSERT INTO GradeDetails (GradeId, AchievementTypeId, AchievementPointegers, AchievementMaxPointegers, AchievementDate)
VALUES
    (1, 1, 10, 12, '2022-05-10'),
    (1, 2, 8, 10, '2022-05-10'),
    (2, 1, 12, 12, '2022-05-10'),
    (2, 2, 10, 10, '2022-05-10'),
    (3, 1, 7, 12, '2022-05-10'),
    (3, 2, 6, 10, '2022-05-10'),
    (4, 1, 11, 12, '2022-05-10'),
    (4, 2, 9, 10, '2022-05-10'),
    (5, 1, 6, 12, '2022-05-10'),
    (5, 2, 8, 10, '2022-05-10');
   
   

-- Insert records into the AchievementType table (continued)
INSERT INTO AchievementType (Name, Description, ParticipationRate)
VALUES
    ('Attendance', 'Attendance rate in classes', 0.1),
    ('Project', 'Score achieved in project assignments', 0.3),
    ('Quiz', 'Score achieved in quizzes', 0.2),
    ('Presentation', 'Score achieved in presentations', 0.2),
    ('Extra Credit', 'Additional points earned through extra credit assignments', 0.1),
    ('Midterm', 'Score achieved in midterm exams', 0.4),
    ('Final Exam', 'Score achieved in final exams', 0.6),
    ('Group Work', 'Score achieved in group work assignments', 0.3),
    ('Lab', 'Score achieved in laboratory work', 0.2),
    ('Essay', 'Score achieved in essay assignments', 0.3);
   
   
--   Homework requirement 1/3
   
--• Pre-requisites: database from Homework 1 with some dummy data inserted
   
   SELECT * FROM grade g  
   
   --• Calculate the count of all grades in the system
SELECT count(*)  FROM grade g 
   
   --• Calculate the count of all grades per Teacher in the system
SELECT concat(t.firstname,' ',t.lastname) AS teacher_fullname,  count(g.grade)  FROM grade g
JOIN teacher t 
ON t.id=g.teacherid  
GROUP BY teacher_fullname
   
   --• Calculate the count of all grades per Teacher in the system for first 100 Students (ID < 100)
SELECT concat(t.firstname,' ',t.lastname) AS teacher_fullname,  count(g.grade)  FROM grade g
JOIN teacher t 
ON t.id=g.teacherid 
WHERE g.studentid <=5
GROUP BY teacher_fullname
   
   --• Find the Maximal Grade, and the Average Grade per Student on all grades in the system

SELECT concat(s.firstname ,' ',s.lastname) AS student_fullname, max(g.grade),avg(g.grade)  FROM grade g 
JOIN student s 
ON g.studentid =s.id 
GROUP BY concat(s.firstname ,' ',s.lastname)
   
--   Homework requirement 2/3
   
--• Calculate the count of all grades per Teacher in the system and filter
--only grade count greater then 200
SELECT concat(t.firstname,' ',t.lastname) AS teacher_fullname,count(g.grade) AS grades_count FROM grade g 
JOIN teacher t 
ON t.id = g.teacherid 
GROUP BY teacher_fullname
HAVING count(g.grade)>16

--• Calculate the count of all grades per Teacher in the system for first
--100 Students (ID < 100) and filter teachers with more than 50 Grade count
SELECT concat(t.firstname,' ',t.lastname) AS teacher_fullname,count(g.grade) AS grades_count FROM grade g 
JOIN teacher t 
ON t.id = g.teacherid 
WHERE g.studentid <5
GROUP BY teacher_fullname
HAVING count(g.grade)>5

--• Find the Grade Count, Maximal Grade, and the Average Grade per
--Student on all grades in the system. Filter only records where
--Maximal Grade is equal to Average Grade
SELECT s.id,concat(s.firstname ,' ',s.lastname) AS student_fullname, count(g.grade),max(g.grade),avg(g.grade)  FROM grade g 
JOIN student s 
ON s.id=g.studentid 
GROUP BY s.id 
--HAVING max(g.grade)-avg(g.grade)<5

--• List Student First Name and Last Name next to the other details from
--previous query

SELECT s.id, concat(s.firstname ,' ',s.lastname) AS student_fullname, count(g.grade),max(g.grade),avg(g.grade) FROM grade g 
JOIN student s 
ON s.id=g.studentid 
GROUP BY s.id 

--Homework requirement 3/3

--• Create new view (vw_StudentGrades) that will List all StudentIds and
--count of Grades per student
CREATE VIEW vw_StudentGrades
AS 
SELECT s.id, count(g.grade) FROM grade g 
JOIN student s 
ON s.id = g.studentid 
GROUP BY s.id 

SELECT * FROM  vw_studentgrades 

DROP VIEW vw_studentgrades 

--• Change the view to show Student First and Last Names instead of
--StudentID

CREATE VIEW vw_StudentGrades
AS 
SELECT concat(s.firstname,' ',s.lastname) AS student_fullname , count(g.grade) FROM grade g 
JOIN student s 
ON s.id = g.studentid 
GROUP BY student_fullname

SELECT * FROM  vw_studentgrades 

SELECT * FROM grade g 

--• List all rows from view ordered by biggest Grade Count
SELECT * FROM  vw_studentgrades
ORDER BY count  DESC 

--• Create new view (vw_StudentGradeDetails) that will List all Students
--(FirstName and LastName) and Count the courses he passed through the exam


SELECT * FROM gradedetails g 

SELECT * FROM grade g 

CREATE VIEW vw_StudentGradeDetails
AS
SELECT s.id,concat(s.firstname,' ',s.lastname) AS student_fullname, count(g.grade) FROM grade g 
JOIN student s 
ON s.id =g.studentid 
WHERE g.grade >90
GROUP BY s.id 

SELECT * FROM vw_StudentGradeDetails
   
   
   
   
   

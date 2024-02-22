-- Generate sample students
INSERT INTO student.student
VALUES 	(202108117, "Sean Ken Cedric", "Legara", "sglegara@up.edu.ph", "CS192cs192###"),
		(202012345, "Kid", "Amogus", "kidamogus@sugo.mad", "!Ryanreynolds69420");

-- Generate sample (fictional) professors
INSERT INTO professor.professor
VALUES 	(100000001, "Weng", "Solamo", "rcsolamo@up.edu.ph", "Let's all practice AGILE!"),
		(123456789, "Wilson", "Dabass", "wmdabass@up.edu.ph", "Ma22ngMagh8ntay!");

-- Generate sample classes
INSERT INTO class.class
VALUES 	(10111110, "CS 192", 100000001, 2, 6, TIME('8:30'), TIME('10:30'), 11111111),
		(69696969, "CS 420", 123456789, 69, 4, TIME('13:00'), TIME('14:30'), 22222222);
        
-- Generate enrollments
INSERT INTO student.enrolled_to
VALUES 	(202108117, 10111110),
		(202108117, 69696969),
        (202012345, 10111110),
		(202012345, 69696969);

-- Generate sample attendance records
INSERT INTO attendance.attendance_record
VALUES 	(202108117, 10111110, 2),
		(202108117, 69696969, 69),
        (202012345, 10111110, 0),
		(202012345, 69696969, 42);




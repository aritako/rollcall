-- Generate sample students
insert into
  public.student
values
  (
    202108117,
    'Sean Ken Cedric',
    'Legara',
    'sglegara@up.edu.ph',
    'CS192cs192###'
  ),
  (
    202012345,
    'Kid',
    'Amogus',
    'kidamogus@sugo.mad',
    '!Ryanreynolds69420'
  );

-- Generate sample (fictional) professors
insert into
  public.professor
values
  (
    100000001,
    'Weng',
    'Solamo',
    'rcsolamo@up.edu.ph',
    'Let''s all practice AGILE!'
  ),
  (
    123456789,
    'Wilson',
    'Dabass',
    'wmdabass@up.edu.ph',
    'Ma22ngMagh8ntay!'
  );

-- Generate sample classes
insert into
  public.class
values
  (
    10111110,
    'CS 192',
    2,
    6,
    time '8:30',
    time '10:00',
    11111111,
    100000001
  ),
  (
    69696969,
    'CS 420',
    69,
    4,
    time '13:00',
    time '14:30',
    22222222,
    123456789
  );

-- Generate sample attendance records
insert into
  public.attendance_record
values
  (202108117, 10111110, 2),
  (202108117, 69696969, 69),
  (202012345, 10111110, 0),
  (202012345, 69696969, 42);
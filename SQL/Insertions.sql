/*Locations*/
insert into location_code values('L3K8V4', 'Newmarket', 'ON');
insert into location_code values('K1R7V8', 'Ottawa', 'ON');
insert into location_code values('A1B2C3', 'Calgary', 'AB');
insert into location_code values('Z0Y9X8', 'Yellowknife', 'NT');
insert into location_code values('K4Z5T2', 'Vancouver', 'BC');

insert into location_address values('L3K8V4', 'Database Lane', 277);
insert into location_address values('K1R7V8', 'DBMS Drive', 987);
insert into location_address values('K1R7V8', 'Primary Key Way', 123);
insert into location_address values('A1B2C3', 'Boyce-Codd Row', 683);
insert into location_address values('Z0Y9X8', 'Relation Avenue', 366);
insert into location_address values('K4Z5T2', 'Entity Set Road', 509);

/*Accounts (just the admin account to start)*/
insert into account values(default, 'Ben', 'Williams', 'admin', 'pass', 'benwilliams@cmail.carleton.ca', 1234567890);
insert into lives_at values(1, 'K1R7V8', 'DBMS Drive', 987);

/*Publishers*/
insert into publisher values(default, 'Relationship Set Publishers', 'contact@rsp.com', 2893389840, 'L3K8V4', 'Database Lane', 277);
insert into publisher values(default, 'Third Normal Form', 'third@normalform.ca', 9059530180, 'K1R7V8', 'Primary Key Way', 123);
insert into publisher values(default, 'Reduction Publishing Inc.', 'publishing@reductioninc.com', null, 'A1B2C3', 'Boyce-Codd Row', 683);
insert into publisher values(default, 'Redundancy Writers Group', 'groupmail@redundancywriters.ca', 6130001337, 'Z0Y9X8', 'Relation Avenue', 366);
insert into publisher values(default, 'Attribute Domain', 'domain@attribute.com', 7057778080, 'K4Z5T2', 'Entity Set Road', 509);

/*Authors*/
insert into author values(default, 'J.K.', 'Rowling', 'jkrowling@gmail.com', null);
insert into author values(default, 'George', 'R.R. Martin', 'grrmartin@outlook.com', 9056720879);
insert into author values(default, 'Rick', 'Riordan', 'rickr@gmail.com', 4165668220);
insert into author values(default, 'Stephen', 'King', 'stephenking@yahoo.ca', 4167552314);
insert into author values(default, 'Ahmed', 'El-Roby', 'ahmedelroby@cmail.carleton.ca', 9058221234);

/*Books + Author Relationships*/
insert into book values(1112223334, 'Harry Potter and the Sorcerer''s Stone', 'Harry Potter finds out he is a wizard and goes to Hogwarts.', 254, 10.99, 10, 1, 0.6);
insert into book values(1122334455, 'Harry Potter and the Chamber of Secrets', 'Harry Potter must save his friends sister, and has his first encounter with Lord Voldemort.', 249, 10.99, 12, 1, 0.45);
insert into book values(1234567890, 'Harry Potter and the Prisoner of Azkaban', 'Harry has a death omen, a black dog, following him around.', 317, 11.99, 16, 1, 0.45);
insert into book values(1111222233, 'Harry Potter and the Goblet of Fire', 'Harry competes in a wizarding competition with two other rival schools', 489, 14.99, 12, 3, 0.25);
insert into book values(1111122222, 'Harry Potter and the Order of the Phoenix', 'Harry continues to be threatened by Lord Voldemort.', 591, 18.99, 10, 3, 0.2);
insert into book values(2222233333, 'Harry Potter and the Half-Blood Prince', 'Harry Potter and friends go to war against Lord Voldemort', 617, 18.99, 10, 3, 0.2);
insert into book values(3333344444, 'Harry Potter and the Deathly Hallows', 'Harry and his friends leave Hogwarts to end Lord Voldemort''s reign once and for all', 654, 20.99, 13, 3, 0.15);

insert into writes values(1112223334, 1);
insert into writes values(1122334455, 1);
insert into writes values(1234567890, 1);
insert into writes values(1111222233, 1);
insert into writes values(1111122222, 1);
insert into writes values(2222233333, 1);
insert into writes values(3333344444, 1);

insert into book values(4356549101, 'A Game of Thrones', 'The first novel in the Game of Thrones series', 704, 32.95, 17, 4, 0.25);
insert into book values(1209304832, 'A Clash of Kings', 'The second book in the Game of Thrones series', 648, 30.99, 12, 4, 0.25);
insert into book values(4309053002, 'A Storm of Swords', 'The third book in the Game of Throns series', 693, 30.99, 9, 4, 0.25);

insert into writes values(4356549101, 2);
insert into writes values(1209304832, 2);
insert into writes values(4309053002, 2);

insert into book values(8483979223, 'A Made-Up Book', 'This is to show the ability of co-authoring novels', 100, 20.27, 13, 5, 1);

insert into writes values(8483979223, 3);
insert into writes values(8483979223, 4);

insert into book values(4583954340, 'Database Management Systems', 'An introduction to database management systems and SQL', 544, 99.99, 6, 2, 0.10);
insert into book values(6754324560, 'Database Design', 'Designing databases using ER diagrams', 245, 59.99, 10, 2, 0.30);

insert into writes values(4583954340, 5);
insert into writes values(6754324560, 5);

/*Genres + Book Relationships*/
insert into genre values(default, 'Mystery', 'The plot revolves around a crime that must be solved by a protagonist(s).');
insert into genre values(default, 'Fantasy', 'The plot is set in a fictional world.');
insert into genre values(default, 'Action & Adventure', 'The protagonist must achieve a certain goal while overcoming obstacles in the process.');
insert into genre values(default, 'Science & Technology', 'Non-fiction about topics and advances in different areas of science and technology.');
insert into genre values(default, 'Historical Fiction', 'Books set in the past with accurate details of the setting.');

/*Game of Thrones*/
insert into belongs_to values(4356549101, 2);
insert into belongs_to values(1209304832, 2);
insert into belongs_to values(4309053002, 2);

insert into belongs_to values(4356549101, 3);
insert into belongs_to values(1209304832, 3);
insert into belongs_to values(4309053002, 3);

/*Harry Potter*/
insert into belongs_to values(1112223334, 1);
insert into belongs_to values(1122334455, 1);
insert into belongs_to values(1234567890, 1);
insert into belongs_to values(1111222233, 1);
insert into belongs_to values(1111122222, 1);
insert into belongs_to values(2222233333, 1);
insert into belongs_to values(3333344444, 1);

insert into belongs_to values(1112223334, 2);
insert into belongs_to values(1122334455, 2);
insert into belongs_to values(1234567890, 2);
insert into belongs_to values(1111222233, 2);
insert into belongs_to values(1111122222, 2);
insert into belongs_to values(2222233333, 2);
insert into belongs_to values(3333344444, 2);

/*A Made Up Book*/
insert into belongs_to values(8483979223, 5);

/*Database Books*/
insert into belongs_to values(4583954340, 4);
insert into belongs_to values(6754324560, 4);
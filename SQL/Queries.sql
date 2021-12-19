/*
The following queries are all executed in api/src/databaseController.js
*/

/*Adds a new account to the database*/
INSERT INTO account VALUES(default, <first_name>, <last_name>, <username>, <password>, <email>, <phone_number>);

/*Finds an account with the given username/password, useful for login*/
SELECT * FROM account
WHERE username=<username> AND password=<password>;

/*Insert the location into the database*/
INSERT INTO location_code VALUES(<postal_code>, <city>, <province>);
INSERT INTO location_address VALUES(<postal_code>, <street_name>, <street_number>);

/*Add a publisher*/
INSERT INTO publisher VALUES(default, <name>, <email>, <phone_number>, <postal_code>, <street_name>, <street_number>);

/*Add an author*/
INSERT INTO author VALUES(default, <first_name>, <last_name>, <email>, <phone_number>);

/*Add a genre*/
INSERT INTO genre VALUES(default, <name>, <description>);

/*Add a book and all relationships (eg. author, genre)*/
INSERT INTO book VALUES(<isbn>, <title>, <description>, <num_pages>, <price>, <count>, <publisher_id>, <percentage_of_sales>);
INSERT INTO belongs_to VALUES(<isbn>, <genre_id>);
INSERT INTO writes VALUES(<isbn>, <author_id>);

/*Search for books matching search criteria. Procedurally built during runtime*/
SELECT * FROM book_info
WHERE UPPER(book_name) LIKE UPPER('%<search_key>%')
OR UPPER(CONCAT(first_name, ' ', last_name)) LIKE UPPER('%<search_key>%')
OR CAST(isbn AS TEXT) LIKE ('%<search_key>%')
OR UPPER(genre_name) LIKE UPPER('%<search_key>%');

/*Retrieve info for specific book*/
SELECT * FROM book_info
WHERE isbn = <isbn>

/*Retrieve all publishers/authors/genres*/
SELECT * FROM publisher;
SELECT * FROM author;
SELECT * FROM genre;

/*Create a checkout basket*/
INSERT INTO checkout_basket VALUES(default, <user_id>);

/*Add item to basket*/
INSERT INTO contains VALUES(<isbn>, <basket_id>, <count>);

/*Remove item from basket*/
DELETE FROM contains
WHERE basket_id = <basket_id> AND isbn = <isbn>;

/*Retrieve contents of basket*/
SELECT isbn, contains.count, name, book.count as max_count
FROM contains JOIN book USING(isbn)
WHERE basket_id=<basket_id>;

/*Find basket for certain user*/
SELECT * FROM checkout_basket
WHERE account_id = <user_id>;

/*Remove basket*/
DELETE FROM checkout_basket
WHERE id = <basket_id>;

/*Update item count in a basket (editing basket)*/
UPDATE contains
SET count = <new_count>
WHERE basket_id = <basket_id> AND isbn = <isbn>;
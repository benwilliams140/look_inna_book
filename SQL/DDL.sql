create table location_code(
	postal_code	char(6),
	city		varchar(15) not null,
	province	char(2)
		check (province in ('AB', 'BC', 'MB', 'NB', 'NL',
						  'NT', 'NS', 'NU', 'ON', 'PE',
						  'QC', 'SK', 'YT')),
	primary key(postal_code)
);

create table location_address(
	postal_code		char(6),
	street_name		varchar(20),
	street_number	int,
	primary key(postal_code, street_name, street_number),
	foreign key(postal_code) references location_code
		on delete cascade
);

create table publisher(
	ID				serial,
	name			varchar(15) not null,
	email			varchar(40) not null,
	phone_number	numeric(10, 0),
	postal_code		char(6),
	street_name		varchar(20),
	street_number	int,
	primary key(ID),
	foreign key(postal_code, street_name, street_number) references location_address
		on delete set null
);

create table author(
	ID				serial,
	first_name		varchar(15) not null,
	last_name		varchar(15) not null,
	email			varchar(40) not null,
	phone_number	numeric(10, 0),
	primary key(ID)
);

create table customer(
	ID				serial,
	first_name		varchar(15) not null,
	last_name		varchar(15) not null,
	username		varchar(20) not null,
	password		varchar(20) not null,
	email			varchar(40) not null,
	phone_number	numeric(10, 0),
	primary key(ID)
);

create table banking_info(
	account_number	numeric(16, 0),
	publisher_id	int not null,
	primary key(account_number),
	foreign key(publisher_id) references publisher(ID)
		on delete cascade
);

create table book(
	ISBN			numeric(10, 0),
	name			varchar(30) not null,
	description		varchar(200),
	num_pages		int check (num_pages > 0),
	price			numeric(5, 2) check (price > 0),
	publisher_id	int,
	percentage_of_sales	numeric(3, 3) check (percentage_of_sales >= 0 and percentage_of_sales <= 1),
	primary key(ISBN),
	foreign key(publisher_id) references publisher(ID)
		on delete set null
);

create table writes(
	ISBN		numeric(10, 0),
	author_id	int,
	primary key(ISBN, author_id),
	foreign key(ISBN) references book
		on delete cascade,
	foreign key(author_id) references author(ID)
		on delete cascade
);

create table genre(
	ID			serial,
	name		varchar(20) not null,
	description	varchar(150),
	primary key(ID)
);

create table belongs_to(
	ISBN			numeric(10, 0),
	genre_id		int,
	primary key(ISBN, genre_id),
	foreign key(ISBN) references book
		on delete cascade,
	foreign key(genre_id) references genre(ID)
		on delete cascade
);

create table owns(
	ISBN			numeric(10, 0),
	customer_id		int,
	count			numeric(2, 0) check(count > 0),
	primary key(ISBN, customer_id),
	foreign key(ISBN) references book
		on delete cascade,
	foreign key(customer_id) references customer(ID)
		on delete cascade
);

create table checkout_basket(
	ID		serial,
	customer_id		int,
	primary key(ID),
	foreign key(customer_id) references customer(ID)
		on delete cascade
);

create table contains(
	ISBN			numeric(10, 0),
	basket_id		int,
	count			numeric(2, 0) check(count > 0),
	primary key(ISBN, basket_id),
	foreign key(ISBN) references book
		on delete cascade,
	foreign key(basket_id) references checkout_basket(ID)
		on delete cascade
);

create table payment_info(
	card_number		numeric(16, 0),
	card_type		varchar(10) not null check (card_type in ('VISA', 'AMEX', 'MasterCard')),
	csv				numeric(3, 0) not null check (csv > 0 and csv < 1000),
	expiry			char(4) not null,
	postal_code		char(6),
	street_name		varchar(20),
	street_number 	int,
	primary key(card_number),
	foreign key(postal_code, street_name, street_number) references location_address
		on delete set null
);

create table pays_with(
	customer_id		int,
	card_number		numeric(16,0),
	primary key(customer_id, card_number),
	foreign key(customer_id) references customer(ID)
		on delete cascade,
	foreign key(card_number) references payment_info
		on delete cascade
);

create table lives_at(
	customer_id		int,
	postal_code		char(6),
	street_name		varchar(20),
	street_number	int,
	primary key(customer_id, postal_code, street_name, street_number),
	foreign key(customer_id) references customer(ID)
		on delete cascade,
	foreign key(postal_code, street_name, street_number) references location_address
		on delete cascade
);

create table book_order(
	ID				serial,
	card_number		numeric(16,0),
	customer_id		int,
	date			char(8) not null,
	primary key(ID),
	foreign key(card_number) references payment_info
		on delete set null,
	foreign key(customer_id) references customer(ID)
		on delete set null
);

create table ordered_book(
	order_id		int,
	ISBN			numeric(10, 0),
	count			numeric(2, 0) check (count > 0),
	primary key(order_id, ISBN),
	foreign key(order_id) references book_order(ID)
		on delete cascade,
	foreign key(ISBN) references book
		on delete cascade
);

create table shipment(
	order_id		int,
	status			varchar(15) check (status in ('Ordered', 'Shipped', 'Delivered')),
	expected_date	char(8),
	postal_code		char(6),
	street_name		varchar(20),
	street_number	int,
	primary key(order_id),
	foreign key(order_id) references book_order(ID)
		on delete cascade,
	foreign key(postal_code, street_name, street_number) references location_address
		on delete set null
);

insert into account values(default, 'Ben', 'Williams', 'admin', 'pass', 'benwilliams@cmail.carleton.ca', 1234567890);

select *
from account
where upper(first_name) like upper('%%')
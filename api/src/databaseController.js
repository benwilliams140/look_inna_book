const { Pool } = require('pg');

class Database {
    constructor(config) {
        this.config = config ? config : {
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'pass',
            database: 'look_inna_book'
        };

        // create connection pool to query database
        this.pool = new Pool(this.config);
        
        // handle any client-side errors
        this.pool.on('error', (err) => {
            console.error(err);
            //process.exit(-1);
        });
    }

    addNewAccount(account) {
        return new Promise((resolve, reject) => {
            this.pool.query('INSERT INTO account values(default, $1, $2, $3, $4, $5, $6) RETURNING *;',
                [account.first_name, account.last_name, account.username, account.password, account.email, account.phone_number], (err, res) => {
                    if (err) reject(err);

                    // verify account was added
                    if(res && res.rowCount === 1) {
                        resolve(res.rows[0]);
                    } else {
                        reject(new Error("Account wasn't registered"));
                    }
                });
        });
    }

    accountLogin(credentials) {
        return new Promise((resolve, reject) => {
            // query for account by username and password
            this.pool.query('SELECT * FROM account WHERE username=$1 AND password=$2;',
                [credentials.username, credentials.password], (err, res) => {
                    if(err) reject(err);

                    if(res && res.rowCount && res.rowCount === 1) {
                        resolve(res.rows[0]);
                    } else {
                        resolve(null);
                    }
            });
        });
    }

    addLocation(info) {
        return new Promise((resolve, reject) => {
            // insert postal code, city and province into location_code
            this.pool.query('INSERT INTO location_code values($1, $2, $3) RETURNING *;',
                [info.postal_code, info.city, info.province], (err, res) => {
                    //if(err) reject(err);

                    // insert postal code and street address into location_address
                    this.pool.query('INSERT INTO location_address values($1, $2, $3) RETURNING *;',
                        [info.postal_code, info.street_name, info.street_number], (err, res) => {
                            //if(err) reject(err);
                            
                            resolve();
                    });
            });
        });
    }

    addPaymentInfo(info) {
        return new Promise((resolve, reject) => {
            // insert new payment info
            this.pool.query('INSERT INTO payment_info values($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;',
                [info.card_number, info.card_type, info.csv, info.expiry, info.id, info.postal_code, info.street_name, info.street_number], (err, res) => {
                    if(err) reject(err);

                    if(res && res.rowCount === 1) {
                        resolve(res.rows[0]);
                    }
            });
        });
    }

    addLivesAt(info) {
        return new Promise((resolve, reject) => {
            // insert new relationship into lives_at
            this.pool.query('INSERT INTO lives_at values($1, $2, $3, $4) RETURNING *;',
                [info.id, info.postal_code, info.street_name, info.street_number], (err, res) => {
                    if(err) reject(err);

                    if(res && res.rowCount === 1) {
                        resolve(res.rows[0]);
                    }
            });
        });
    }

    addPublisher(info) {
        return new Promise((resolve, reject) => {
            // insert publisher into database
            this.pool.query('INSERT INTO publisher values(default, $1, $2, $3, $4, $5, $6) RETURNING *;',
                [info.name, info.email, info.phone_number, info.postal_code, info.street_name, info.street_number], (err, res) => {
                    //if(err) reject(err);

                    if(res && res.rowCount === 1) {
                        resolve(res.rows[0]);
                    }
            });
        });
    }

    addAuthor(info) {
        return new Promise((resolve, reject) => {
            // insert author into database
            this.pool.query('INSERT INTO author values(default, $1, $2, $3, $4) RETURNING *;',
                [info.first_name, info.last_name, info.email, info.phone_number], (err, res) => {
                    if(err) reject(err);

                    if(res && res.rowCount === 1) {
                        resolve(res.rows[0]);
                    }
            });
        });
    }

    addGenre(info) {
        return new Promise((resolve, reject) => {
            // insert genre into database
            this.pool.query('INSERT INTO genre values(default, $1, $2) RETURNING *;',
                [info.name, info.description], (err, res) => {
                    if(err) reject(err);

                    if(res && res.rowCount === 1) {
                        resolve(res.rows[0]);
                    }
            });
        });
    }

    addBook(info) {
        return new Promise((resolve, reject) => {
            // insert book into database
            this.pool.query('INSERT INTO book values($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;',
                [info.isbn, info.title, info.description, info.num_pages,
                    info.price, info.count, info.publisher_id, info.percentage_of_sales], (err, res) => {
                    if(err) reject(err);

                    if(res && res.rowCount === 1) {
                        // insert genre relationships
                        info.genre_ids.forEach((id) => {
                            this.pool.query('INSERT INTO belongs_to values($1, $2) RETURNING *;',
                                [info.isbn, id], (err, res) => {
                                    if(err) reject(err);
                            });
                        });

                        // insert author relationships
                        info.author_ids.forEach((id) => {
                            this.pool.query('INSERT INTO writes values($1, $2) RETURNING *;',
                                [info.isbn, id], (err, res) => {
                                    if(err) reject(err);
                            });
                        });

                        resolve(res.rows[0]);
                    }
            });
        });
    }

    searchForBooks(filter) {
        return new Promise((resolve, reject) => {
            // build the query from search options
            let query = 'SELECT * FROM book_info'
            let queryParams = [ filter.searchKey ];

            let filtering = filter.bookName || filter.author; // || filter.isbn;
            if(filtering) query += ' WHERE'

            let splitKey = filter.searchKey.split(' ');
            let counter = 2;
            if(filter.bookName) {
                query += " UPPER(book_name) LIKE UPPER('%' || $1 || '%')";
                splitKey.forEach((searchWord) => {
                    if(searchWord.length > 3) {
                        query += ` OR UPPER(book_name) LIKE UPPER('%' || $${counter++} || '%')`;
                        queryParams.push(searchWord);
                    }
                });
            }
            if(filter.bookName && filter.author) query += " OR";
            if(filter.author) {
                query += " UPPER(CONCAT(first_name, ' ', last_name)) LIKE UPPER('%' || $1 || '%')";

                splitKey.forEach((searchWord) => {
                    query += ` OR UPPER(CONCAT(first_name, ' ', last_name)) LIKE UPPER('%' || $${counter++} || '%')`;
                    queryParams.push(searchWord);
                });
            }
            if(filter.author && filter.isbn || filter.bookName && filter.isbn) query += " OR";
            if(filter.isbn) query += " CAST(isbn AS TEXT) LIKE ('%' || $1 || '%')";
            if(filter.isbn && filter.genre || filter.author && filter.genre || filter.bookName && filter.genre) query += " OR";
            if(filter.genre) query += " UPPER(genre_name) LIKE UPPER('%' || $1 || '%')";
            query += ";";

            // find books that satisfy query
            this.pool.query(query,
                filtering ? queryParams : [], (err, res) => {
                    if(err) reject(err);

                    let books = {};
                    if(res) {
                        for(let i = 0; i < res.rowCount; i++) {
                            let book = res.rows[i];
                            if(books[book.isbn]) {
                                // book is already present and has a co-author or multiple genres
                                let name = book.first_name + ' ' + book.last_name;
                                if(!books[book.isbn].authors.includes(name)) {
                                    books[book.isbn].authors.push(name);
                                }
                                if(!books[book.isbn].genres.includes(book.genre_name)) {
                                    books[book.isbn].genres.push(book.genre_name);
                                }
                            } else {
                                // book needs to be added
                                let bookObj = {
                                    name: book.book_name,
                                    authors: [
                                        book.first_name + ' ' + book.last_name
                                    ],
                                    price: book.price,
                                    genres: [
                                        book.genre_name
                                    ]
                                };
                                books[book.isbn] = bookObj;
                            }
                        }
                    }
                    resolve(books);
            });
        });
    }

    retrieveBookInfo(isbn) {
        return new Promise((resolve, reject) => {
            // query for all publishers
            this.pool.query('SELECT * FROM book_info WHERE isbn = $1;',
                [isbn], (err, res) => {
                    if(err) reject(err);

                    if(res && res.rowCount > 0) {
                        let info = res.rows[0];
                        let book = {
                            isbn: isbn,
                            title: info.book_name,
                            description: info.description,
                            num_pages: info.num_pages,
                            authors: [
                                info.first_name + ' ' + info.last_name
                            ],
                            publisher: info.publisher_name,
                            count: info.count,
                            price: info.price,
                            genres: [
                                info.genre_name
                            ]
                        };
                        for(let i = 1; i < res.rowCount; i++) {
                            info = res.rows[i];
                            let authorName = info.first_name + ' ' + info.last_name;
                            if(!book.authors.includes(authorName)) {
                                book.authors.push(info.first_name + ' ' + info.last_name);
                            }
                            if(!book.genres.includes(info.genre_name)) {
                                book.genres.push(info.genre_name);
                            }
                        }
                        resolve(book);
                    } else {
                        resolve([]);
                    }
            });
        });
    }

    retrievePublishers() {
        return new Promise((resolve, reject) => {
            // query for all publishers
            this.pool.query('SELECT * FROM publisher;',
                [], (err, res) => {
                    if(err) reject(err);

                    if(res && res.rows && res.rowCount > 0) {
                        resolve(res.rows);
                    } else {
                        resolve([]);
                    }
            });
        });
    }

    retrieveAuthors() {
        return new Promise((resolve, reject) => {
            // query for all authors
            this.pool.query('SELECT * FROM author;',
                [], (err, res) => {
                    if(err) reject(err);

                    if(res && res.rows && res.rowCount > 0) {
                        resolve(res.rows);
                    } else {
                        resolve([]);
                    }
            });
        });
    }

    retrieveGenres() {
        return new Promise((resolve, reject) => {
            // query for all genres
            this.pool.query('SELECT * FROM genre;',
                [], (err, res) => {
                    if(err) reject(err);

                    if(res && res.rows && res.rowCount > 0) {
                        resolve(res.rows);
                    } else {
                        resolve([]);
                    }
            });
        });
    }

    createBasket(userID) {
        return new Promise((resolve, reject) => {
            // insert new basket into database
            this.pool.query('INSERT INTO checkout_basket VALUES(default, $1) RETURNING *;',
                [userID], (err, res) => {
                    if(err) reject(err);

                    if(res && res.rowCount === 1) {
                        resolve(res.rows[0]);
                    }
            });
        });
    }

    addToBasket(basket, item) {
        return new Promise((resolve, reject) => {
            // insert item into the contains relation
            this.pool.query('INSERT INTO contains VALUES($1, $2, $3) RETURNING *;',
                [item.isbn, basket.id, item.count], (err, res) =>{
                    if(err) reject(err);

                    if(res && res.rowCount === 1) {
                        resolve(res.rows[0]);
                    }
            });
        });
    }

    removeFromBasket(id, isbn) {
        return new Promise((resolve, reject) => {
            // delete item from a user's checkout basket
            this.pool.query('DELETE FROM contains WHERE basket_id = $1 AND isbn = $2 RETURNING *;',
                [id, isbn], (err, res) =>{
                    if(err) reject(err);
                    
                    if(res && res.rowCount > 0) {
                        resolve(res.rows);
                    }
            });
        });
    }

    retrieveBasket(id) {
        return new Promise((resolve, reject) => {
            // query for the contents of the basket (using the contains relation)
            this.pool.query('SELECT isbn, contains.count, name, book.count as max_count FROM contains JOIN book USING(isbn) WHERE basket_id = $1;',
                [id], (err, res) => {
                    if(err) reject(err);

                    if(res && res.rowCount > 0) {
                        resolve(res.rows);
                    }
            });
        });
    }

    findBasketID(userID) {
        return new Promise((resolve, reject) => {
            // query for the basketID corresponding to the user
            this.pool.query('SELECT * FROM checkout_basket WHERE account_id = $1;',
                [userID], (err, res) => {
                    if(err) reject(err);

                    if(res && res.rowCount === 1) {
                        resolve(res.rows[0].id);
                    } else {
                        resolve(null);
                    }
            });
        });
    }

    deleteBasket(id) {
        return new Promise((resolve, reject) => {
            // delete the corresponding basket
            this.pool.query('DELETE FROM checkout_basket WHERE id = $1;',
                [id], (err, res) => {
                    if(err) reject(err);

                   resolve();
            });
        });
    }

    updateBasket(id, item) {
        return new Promise((resolve, reject) => {
            // update corresponding basket item count
            this.pool.query('UPDATE contains SET count = $1 WHERE basket_id = $2 AND isbn = $3 RETURNING *;',
                [item.count, id, item.isbn], (err, res) => {
                    if(err) reject(err);

                    if(res && res.rowCount === 1) {
                        resolve();
                    }
            });
        });
    }
};

module.exports = Database;
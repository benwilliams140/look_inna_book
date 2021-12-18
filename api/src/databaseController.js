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
            this.pool.query('INSERT INTO account values(default, $1, $2, $3, $4, $5, $6);',
                [account.firstName, account.lastName, account.username, account.password, account.email, account.phoneNumber], (err, res) => {
                    if (err) reject(err);

                    // verify account was added
                    if(res && res.rowCount && res.rowCount === 1) {
                        console.log(res);
                        this.pool.query('SELECT * FROM account WHERE username = $1',
                            [account.username], (err, res) => {
                                if(err) reject(err);

                                if(res && res.rowCount && res.rowCount === 1) {
                                    resolve(res.rows[0]);
                                } else {
                                    resolve(null);
                                }
                            });
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
            this.pool.query('INSERT INTO location_code values($1, $2, $3);',
                [info.postal_code, info.city, info.province], (err, res) => {
                    //if(err) reject(err);

                    // insert postal code and street address into location_address
                    this.pool.query('INSERT INTO location_address values($1, $2, $3);',
                        [info.postal_code, info.street_name, info.street_number], (err, res) => {
                            //if(err) reject(err);
                            
                            resolve();
                    });
            });
        });
    }

    addPublisher(info) {
        return new Promise((resolve, reject) => {
            // insert publisher into database
            this.pool.query('INSERT INTO publisher values(default, $1, $2, $3, $4, $5, $6);',
                [info.name, info.email, info.phone_number, info.postal_code, info.street_name, info.street_number], (err, res) => {
                    //if(err) reject(err);

                    if(res && res.rowCount === 1) {
                        this.pool.query('SELECT * FROM publisher WHERE email LIKE $1',
                            [info.email], (err, res) => {
                                if(err) reject(err);

                                resolve(res.rows[0]);
                        });
                    }
            });
        });
    }

    addAuthor(info) {
        return new Promise((resolve, reject) => {
            // insert author into database
            this.pool.query('INSERT INTO author values(default, $1, $2, $3, $4);',
                [info.first_name, info.last_name, info.email, info.phone_number], (err, res) => {
                    if(err) reject(err);

                    if(res && res.rowCount === 1) {
                        this.pool.query('SELECT * FROM author WHERE email LIKE $1',
                            [info.email], (err, res) => {
                                if(err) reject(err);

                                resolve(res.rows[0]);
                        });
                    }
            });
        });
    }

    addGenre(info) {
        return new Promise((resolve, reject) => {
            // insert genre into database
            this.pool.query('INSERT INTO genre values(default, $1, $2);',
                [info.name, info.description], (err, res) => {
                    if(err) reject(err);

                    if(res && res.rowCount === 1) {
                        this.pool.query('SELECT * FROM genre WHERE name like $1',
                            [info.name], (err, res) => {
                                if(err) reject(err);

                                resolve(res.rows[0]);
                        });
                    }
            });
        });
    }

    addBook(info) {
        return new Promise((resolve, reject) => {
            // insert book into database
            this.pool.query('INSERT INTO book values($1, $2, $3, $4, $5, $6, $7, $8);',
                [info.isbn, info.title, info.description, info.num_pages,
                    info.price, info.count, info.publisher_id, info.percentage_of], (err, res) => {
                    if(err) reject(err);

                    if(res && res.rowCount === 1) {
                        // insert genre relationships
                        info.genre_ids.forEach((id) => {
                            this.pool.query('INSERT INTO belongs_to values($1, $2);',
                                [info.isbn, id], (err, res) => {
                                    if(err) reject(err);
                            });
                        });

                        // insert author relationships
                        info.author_ids.forEach((id) => {
                            this.pool.query('INSERT INTO writes values($1, $2);',
                                [info.isbn, id], (err, res) => {
                                    if(err) reject(err);
                            });
                        });

                        resolve();
                    }
            });
        });
    }

    searchForBooks(filter) {
        return new Promise((resolve, reject) => {
            // build the query from search options
            //let query = 'select isbn, name, price, first_name, last_name from book natural join writes natural join author';
            let query = 'select * from book_info'

            let filtering = filter.bookName || filter.author; // || filter.isbn;
            if(filtering) query += ' where'

            if(filter.bookName) query += " upper(name) like upper('%' || $1 || '%')";
            if(filter.bookName && filter.author) query += " or"
            if(filter.author) query += " upper(last_name) like upper('%' || $1 || '%')";
            //if(filter.isbn) query += ` where upper(book_info.last_name) like upper('%' || $1 || '%')`;

            this.pool.query(query,
                filtering ? [filter.searchKey] : [], (err, res) => {
                    if(err) reject(err);

                    let books = {};
                    if(res) {
                        for(let i = 0; i < res.rowCount; i++) {
                            let book = res.rows[i];
                            if(books[book.isbn]) {
                                // book is already present and has a co-author
                                let name = book.first_name + ' ' + book.last_name;
                                books[book.isbn].authors.push(name);
                            } else {
                                // book needs to be added
                                let bookObj = {
                                    name: book.name,
                                    authors: [
                                        book.first_name + ' ' + book.last_name
                                    ],
                                    price: book.price
                                };
                                books[book.isbn] = bookObj;
                            }
                        }
                    }
                    resolve(books);
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
};

module.exports = Database;
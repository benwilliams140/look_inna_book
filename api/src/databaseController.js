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
            process.exit(-1);
        });
    }

    addNewAccount(account) {
        return new Promise((resolve, reject) => {
            this.pool.query('INSERT INTO account values(default, $1, $2, $3, $4, $5, $6);',
                [account.firstName, account.lastName, account.username, account.password, account.email, account.phoneNumber], (err, res) => {
                    if (err) reject(err);

                    // verify account was added
                    if(res.rowCount && res.rowCount === 1) {
                        this.pool.query('SELECT * FROM account WHERE username = $1',
                            [account.username], (err, res) => {
                                if(err) reject(err);

                                if(res.rowCount && res.rowCount === 1) {
                                    resolve(res.rows[0]);
                                } else {
                                    resolve(null);
                                }
                            });
                    }
                });
        });
    }

    accountLogin(credentials) {
        return new Promise((resolve, reject) => {
            this.pool.query('SELECT * FROM account WHERE username=$1 AND password=$2;',
                [credentials.username, credentials.password], (err, res) => {
                    if(err) reject(err);

                    if(res.rowCount && res.rowCount === 1) {
                        resolve(res.rows[0]);
                    } else {
                        resolve(null);
                    }
            });
        });
    }

    searchForBooks(filter) {
        return new Promise((resolve, reject) => {
            // build the query from search options
            let query = "select * from book_info";

            let filtering = filter.bookName || filter.author; // || filter.isbn;
            if(filtering) query += " where"

            if(filter.bookName) query += " upper(book_info.name) like upper('%' || $1 || '%')";
            if(filter.bookName && filter.author) query += " or"
            if(filter.author) query += " upper(book_info.last_name) like upper('%' || $1 || '%')";
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
};

module.exports = Database;
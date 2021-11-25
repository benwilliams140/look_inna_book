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

    addNewCustomer(customer) {
        console.log(customer);
        //this.pool.query("INSERT INTO customer values()")
    }

    customerLogin(credentials) {
        return new Promise((resolve, reject) => {
            this.pool.query("SELECT * FROM account WHERE username=$1 AND password=$2", [credentials.username, credentials.password], (err, res) => {
                if(err) reject(err);
                
                if(res.rowCount && res.rowCount === 1) {
                    resolve(res.rows[0]);
                } else {
                    resolve(null);
                }
            });
        });
    }
};

module.exports = Database;
# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [Create Express App](https://www.npmjs.com/package/create-nodejs-express-app).

## Prerequisites
1. You must have Node.js installed on your computed. Can be downloaded [here](https://nodejs.org/en/download/).

## Clone Instructions
1. Open a terminal and navigate to the directory you want the project to reside
2. Clone the repository with `git clone https://github.com/benwilliams140/look_inna_book.git`
3. Navigate to the backend directory with `cd look_inna_book/api`
4. Run the command `npm install`
5. Navigate to the frontend directory with `cd ../client`
6. Run the command `npm install`\
- Note: Don't worry about the vulnerabilities.

## Database Instructions
- I used [pgAdmin4](https://www.pgadmin.org/download/) and PostgreSQL to host my database.
- To bootstrap the database, complete one of the following:
    - There is a .backup file in the `SQL` directory; you can use this to easily restore the state of my database with [this process](https://o7planning.org/11913/backup-and-restore-postgres-database-with-pgadmin#a33893371)
    - If you would prefer to execute the commands yourself, the DDL and Insertions SQL files are in the `SQL` directory. Copy these commands (DDL, then insertions) to the Query tool in pgAdmin
- Ensure you change the database config to match that of your own installation (in the constructor of `./api/src/databaseController.js`)

## Run Instructions
1. In the same terminal as before, navigate to the backend application with `cd ../api`
2. Run the command `npm run dev`
3. Open a separate terminal. Navigate to the project folder, followed by the frontend application with `cd client`
4. Run the command `npm run dev`
5. This will automatically open the browser and navigate to the application's home page at `localhost:3000`

## Accessing the Admin Homepage
1. While on the customer dashboard, click `Login` and login with the following credentials:
- username: admin | password: pass

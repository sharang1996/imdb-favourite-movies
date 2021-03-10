# IMDB favourite movies


## The task
- Build a service with PHP or JavaScript (NodeJs as webserver) as the server side language
- Use MySQL, MariaDB, PostgreSQL, SQL Server or SQLite as the database

Build a single page to show everyone's favourite movies from database, it should at least show movie Title, Poster, and Plot synopsis using [OMDb API](https://www.omdbapi.com) or any other public movie API that supports IMDb ID (e.g. tt8526872)

It should also be able to add or remove list of favourite movies.

Please use the data set provided in the SQL dump in this repo as a base.
You can change original asset that you think will make the solution better.
You are allowed to use any library or framework to help you with the task.


## Steps

Step 1 : Import the users data provided using mysql -u username -p database_name < /path/to/file.sql

Step 2 : Alter the table to support basic auth
ALTER TABLE users ADD password varchar(64) DEFAULT "123456";

Step 3: Edit the .env file in the project to hold the credentials for the database and the api key

step 4: Run the command "npm install" to install the dependencies

step 5: Start the server using "npm run dev" script

step 6: Login with credentials to use the website!

Note: the default database name is test, if importing to another database edit the .env file in the project to reflect the same


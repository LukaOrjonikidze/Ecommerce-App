# Scandiweb Junior Task

To run this app on a local machine you need to have MySQL, Node.js and PHP installed.

Navigate to client directory run `npm install` and run `npm run dev` to run the react application.

Then, navigate to server directory and run `php -S localhost:8000` .
Also You will need to run the MySQL Database.

#

Finally, Create a database named scandiweb and Run this query in the database to create products table

```
CREATE TABLE products (
    SKU varchar(255),
    Name varchar(255),
    Price int,
    Type varchar(255),
    Value varchar(255),
    PRIMARY KEY (SKU)
)
```

var mysql = require("mysql");
const inquirer = require("inquirer");
const {table} = require('table');

// BELOW ARE INSTRUCTIONS FOR CREATING THE PRODUCTS TABLE

// var instructions = `CREATE TABLE products(
//     item_id INT NOT NULL AUTO_INCREMENT,
//     product_name VARCHAR(100) NOT NULL,
//     department_name VARCHAR(40) NOT NULL,
//     price INT NOT NULL,
//     stock_quantity INT NOT NULL,
//     PRIMARY KEY(item_id)
//  );`

// BELOW ARE INSTRUCTIONS FOR SEEDING THE TABLE

// var instructions = `
//     INSERT INTO products (product_name, department_name, price, stock_quantity)
//     VALUES ('shirt', 'clothing', 20, 30),
//     ('pants', 'clothing', 55, 30),
//     ('underwear', 'clothing', 10, 30),
//     ('socks', 'clothing', 15, 30),
//     ('hoodie', 'clothing', 45, 30)
//     ;`

// UPDATE `table_name` SET `column_name` = `new_value' [WHERE condition];

//  var instructions3 = `UPDATE nineties SET ? WHERE ?;`
//  var stuff = [{song_title: 'hi'},{id:1}]
function create() {
    connection.query(instructions, (err, res) => {
        if (err) {
            console.log(err)
        };
        console.log(res);
    });
};



// Build the connection
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "SQLmeajob1",
    database: "bamazon"
});

// Start the connection
connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    // Do things after the connection is made
    bamazon();
    connection.end();
};



function bamazon() {
    //Read from the database and return everything
    const read = `SELECT * FROM products`;
    connection.query(read, (err, resp) => {
        if (err) {
            console.log(err);
        };
        // Data array that will be formatted into a table
        let data = [];
        var output;
        // loop through the response and push arrays to the data array
        for(let i = 0; i < resp.length; i++) {
            var product = [resp[i].item_id.toString(), resp[i].product_name, resp[i].department_name, resp[i].price.toString(), resp[i].stock_quantity.toString()]
            data.push(product);
        };
        // Use the parsed data to make a table in the console
        output = table(data);
        console.log(output);

        // Ask questions!
        const firstQuestion = {
            type: 'input',
            name: 'purchase',
            message: ("What would you like to buy? (type the ID number): ")
        };
        const secondQuestion = {
            type: 'input',
            name: 'number',
            message: ("How many would you like to buy? (type the number): ")
        };

        inquirer
            .prompt([firstQuestion])
            .then(answers => {
                console.log(answers);
                // console log the answer...
                // Ask another question...then query the DB!
            });
    });
};
// Display all of the items for sale including ID's names, prices and products

// Prompt two messages

// Ask ID of item they would like to buy
// how many units they would like to buy

// then application should check if store has enough product
// if not app should tell the customer and prevent the order

// if store DOES have enough to fill order...fulfill their order by removing it from the DB and tell them it has been shipped
// and then display the total cost to the customer
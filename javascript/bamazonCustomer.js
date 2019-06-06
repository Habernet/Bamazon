var mysql = require("mysql");
const inquirer = require("inquirer");
const { table } = require('table');

// THIS IS NOT WORKING
const dotenv = require("dotenv");
dotenv.config();


// Get your password from .env

// Create the connection to the DB
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    password: "SQLmeajob1",
    database: "bamazon"
});


// Start the connection and program
connection.connect((err) => {
    if (err) throw err;
    promptUser();
});


promptUser = () => {
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: ["View products", "Exit"]
    }).then((answer) => {
        const custChoice = answer.choice;
        switch (custChoice) {
            case 'View products':
                viewProducts();
                break;
            case 'Exit':
                exit();
                break;
            default:
                exit();
        };
    });
};


viewProducts = () => {
    //Read from the database and return everything
    const read = `SELECT * FROM products`;
    connection.query(read, (err, resp) => {
        if (err) throw err;

        // Data array that will be formatted into a table with a header
        let data = [['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']];
        var output;
        // loop through the response and push arrays to the data array
        for (let i = 0; i < resp.length; i++) {
            var product = [resp[i].item_id.toString(), resp[i].product_name, resp[i].department_name, resp[i].price.toString(), resp[i].stock_quantity.toString()]
            data.push(product);
        };
        // Use the parsed data to make a table in the console
        output = table(data);
        console.log(output + '\n');

        // Now the user sees the products available, ask them what they would like to purchase.
        askUser();
    });
};


askUser = () => {
    const prompts = [{
        type: 'input',
        name: 'purchase',
        message: ("What would you like to buy? (type the Item ID number): ")
    }, {
        type: 'input',
        name: 'number',
        message: ("How many would you like to buy? (type a number): ")
    }];

    inquirer
        .prompt(prompts)
        .then(answers => {
            itemToBuy = answers.purchase.toString();
            numberToBuy = answers.number.toString();
            var inst = `SELECT * FROM products WHERE item_id = '` + itemToBuy + `'`;

            connection.query(inst, (err, resp) => {
                if (err) {
                    console.log(err);
                };
                // Grab the stock_quantity
                var stock = resp[0].stock_quantity;
                var price = resp[0].price;
                var productName = resp[0].product_name;


                if (numberToBuy > stock) {
                    console.log("I'm sorry! Bamazon cannot fulfill this order. There is not enough stock.");
                    promptUser();
                } else {
                    updateStock(stock, numberToBuy, itemToBuy, productName, price);
                };
            });
        });
};


updateStock = (stock, numberToBuy, itemToBuy, productName, price) => {
    connection.query(`UPDATE products SET ? WHERE ?`, [{ stock_quantity: stock - numberToBuy }, { item_id: itemToBuy }], function (err, resp) {
        if (err) throw err;
        console.log('You have successfully completed a purchase! The items will be shipped shortly. Here is your receipt!' + '\n');
        console.log("Items purchased: " + numberToBuy + " x " + productName);
        console.log("Price: " + price * numberToBuy);
        promptUser();
    });
};


exit = () => {
    // End the connection to the DB
    connection.end();
};

// TO DO
// 1. .env file to store my DB password NOT WORKING
// 2. Account for user input! Example: if the user inputs a non number on either prompt..it breaks the script!
// 3. User should be able to exit program at any time
// 4. Timeout for insufficient quantity ??
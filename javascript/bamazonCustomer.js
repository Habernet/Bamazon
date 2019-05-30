var mysql = require("mysql");
const inquirer = require("inquirer");
const { table } = require('table');


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
    afterConnection();
});

afterConnection = () => {
    //Prompt the user to find out what they want to do.
    promptUser();
};

promptUser = () => {
    inquirer.prompt([{
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: ["View products", "Exit"]
    }]).then((answer) => {
        const custChoice = answer.choice;
        switch (custChoice) {
            case 'View products':
                viewProducts();
                break;
            case 'Exit':
                exit();
                break;
            // If user selects nothing and just hits enter, program exits
            default:
                exit();
        }
    });
};


viewProducts = () => {
    //Read from the database and return everything
    const read = `SELECT * FROM products`;
    connection.query(read, (err, resp) => {
        if (err) {
            console.log(err);
        };

        // Data array that will be formatted into a table
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
    const prompts = [firstQuestion, secondQuestion]


    //This part needs work!
    inquirer
        .prompt(prompts)
        .then(answers => {
            itemToBuy = answers.purchase.toString();
            numberToBuy = answers.number.toString();
            var inst = `SELECT * FROM products WHERE item_id = '` + itemToBuy + `'`;

            // Variable for holding the stock quantity
            var stock;
            // Variable for holding how much it will cost

            connection.query(inst, (err, resp) => {
                if (err) {
                    console.log(err);
                };
                // Grab the stock_quantity
                stock = resp[0].stock_quantity;

                if (numberToBuy > stock) {
                    console.log("I'm sorry! Bamazon cannot fulfill this order. There is not enough stock.");
                } else {
                    console.log("We will now update the DB and send you a receipt of your purchase!");
                    // update the databse and send receipt to console
                };
                promptUser();
            });
        });
};







exit = () => {
    // End the connection to the DB
    connection.end();
};

// Display all of the items for sale including ID's names, prices and products

// Prompt two messages

// Ask ID of item they would like to buy
// how many units they would like to buy

// then application should check if store has enough product
// if not app should tell the customer and prevent the order

// if store DOES have enough to fill order...fulfill their order by removing it from the DB and tell them it has been shipped
// and then display the total cost to the customer



// TO DO
// 1. .env file to store my DB password
// 2. Account for user input! Example: if the user inputs a non number on either prompt..it breaks the
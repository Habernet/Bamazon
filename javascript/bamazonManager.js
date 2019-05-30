// List a set of menu options:
// View Products for Sale READ
// View Low Inventory READ WHERE UNDER A CERTAIN NUMBER
// Add to Inventory  UPDATE 
// Add New Product UPDATE ROW
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
var mysql = require("mysql");
const inquirer = require("inquirer");
const { table } = require("table");


// Create the connection to the DB
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "SQLmeajob1",
    database: "bamazon"
})

// Start the connection
connection.connect((err) => {
    if (err) throw err;
    promptUser();
});

// Prompt manager giving them opportunity to do several tasks
promptUser = () => {
    // Use inquirer and switch/case to gather input and call specific functions based on the input
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: ["View products", "View low inventory", "Add to inventory", "Add a new product", "Exit"]
    }).then((answer) => {
        const managerChoice = answer.choice;
        switch(managerChoice) {
            case 'View products':
                viewProducts();
                break;
            case 'View low inventory':
                viewLowInventory();
                break;
            case 'Add to inventory':
                addToInventory();
                break;
            case 'Add a new product':
                addNewProduct();
                break;
            case 'Exit':
                exit();
                break;
            default:
                exit();
        };
    });
};

viewProducts = () => { };

viewLowInventory = () => { };

addToInventory = () => { };

addNewProduct = () => { };

exit = () => {
    // End the connection to the DB
    connection.end();
};
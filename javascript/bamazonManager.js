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
        switch (managerChoice) {
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

viewProducts = () => {
    // If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
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
        // Ask the manager what to do after this is done
        promptUser();
    });
};

viewLowInventory = () => {
    // If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
    const read = `SELECT * FROM products WHERE stock_quantity < 5`;
    connection.query(read, (err, resp) => {
        if (err) throw err;
        let data = [['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']];
        var output;
        for (let i = 0; i < resp.length; i++) {
            var product = [resp[i].item_id.toString(), resp[i].product_name, resp[i].department_name, resp[i].price.toString(), resp[i].stock_quantity.toString()]
            data.push(product);
        };
        output = table(data);
        console.log(output + '\n');
        promptUser();
    });
};

addToInventory = () => {
    // If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.


    // Display inventory (by running viewProducts) and ask which product manager would like to add more of
    // Ask how much more
    // Update the DB and then console log "x amount has been added successfully!"


};

addNewProduct = () => {
    // If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
    // Ask the manager a set of questions in order to add the product
    // We need the following:
    // Product name, department name, price, initial stock quantity
    // Update the database with this information and console log "product has been added successfully!"
    const prompts = [{
        type: 'input',
        name: 'name',
        message: ('What is the name of the product? ')
    }, {
        type: 'input',
        name: 'dep_name',
        message: ('What is the department it is sold in? ')
    }, {
        type: 'input',
        name: 'price',
        message: ('What is the price of the product? ')
    }, {
        type: 'input',
        name: 'stock',
        message: ('What is the inital amount of stock for the product? ')
    }];

    inquirer.prompt(prompts).then(answers => {
        var inst = `INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('` + answers.name + `', ` + `'` + answers.dep_name + `', ` + answers.price + `,`  + answers.stock + `)`;
        console.log(inst);
        connection.query(inst, (err, resp) => {
            if (err) throw err;
            console.log(resp);
            console.log("You have added the product to inventory!");
            promptUser();
        });
    });


    //     --     INSERT INTO products
    // --         (product_name, department_name, price, stock_quantity)
    // --     VALUES
    // --         ('shirt', 'clothing', 20, 30)
    // --     ;
};

exit = () => {
    // End the connection to the DB
    connection.end();
};


// TO DO
//
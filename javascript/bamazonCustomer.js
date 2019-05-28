var mysql = require("mysql");

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

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  create();
  connection.end();
};

function create() {
  connection.query(instructions, (err, res) => {
    if(err) {
      console.log(err)
    };
    console.log(res);
  });
};
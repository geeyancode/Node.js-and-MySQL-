//NPM packages used in this project
//Initialize mySQL and inquirer
var mySQL = require("mysql");
var inquirer = require("inquirer");
// The console.table() method writes a table in the console view
require("console.table");
// creates a new connection to MySQL database
var connection = mysql.createConnection({
// local computer only
    host: "localhost",

    port: 8889,
    //login
    user:"root",
    password:"root",

    database: "bamazon"
});
// (options: ClientRequestArgs, oncreate: 
// (err: Error, socket: Socket) => void): Socket

connection.connect(function(err){
        //if err received print out the message below
    if(err){
        // .error, message colored red
        console.error("error connecting: " + err.stack);
    }
        //else run function below
    loadProducts();
});

// Function that will display all of the items available for sale
function getProducts() {
    // pulls all the data from MySQL products table  
    connection.query("SELECT * FROM products", function(err, res){
        //displays an error if no data found
        if(err) throw err;

        //Draw the table in the terminal using the response
        //?????????????
        console.table(res);

        // calls the function to prompt customer for their product choice
        promptCustomerForItem(res);
    });
}
// HOW TO USE INQUIRER PROMPT AND PROMISE
//
// var inquirer = require('inquirer');
// inquirer
//   .prompt([
//     /* Pass your questions in here */
//   ])
//   .then(answers => {
//     // Use user feedback for... whatever!!
//   });

function promptCustomerForItem(inventory){
    //using inquirer prompt and .then/answer
    inquirer 
    .prompt([
        {
            type: "input",
            name: "choice",
            message: "Provide the ID of the product you want to purchase",
        }
    ])
    .then(function(val) {
        // Check if the user wants to quit the program
        checkIfShouldExit(val.choice);
        var choiceId = parseInt(val.choice);
        var product = checkInventory(choiceId, inventory);
  
        // If there is a product with the id the user chose, prompt the customer for a desired quantity
        if (product) {
          // Pass the chosen product to promptCustomerForQuantity
          promptCustomerForQuantity(product);
        }
        else {
          // Otherwise let them know the item is not in the inventory, re-run loadProducts
          console.log("\nThat item is not in the inventory.");
          loadProducts();
        }
      });
  }
  
  // Prompt the customer for a product quantity
  function promptCustomerForQuantity(product) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "quantity",
          message: "How many would you like? [Quit with Q]",
          validate: function(val) {
            return val > 0 || val.toLowerCase() === "q";
          }
        }
      ])
      .then(function(val) {
        // Check if the user wants to quit the program
        checkIfShouldExit(val.quantity);
        var quantity = parseInt(val.quantity);
  
        // If there isn't enough of the chosen product and quantity, let the user know and re-run loadProducts
        if (quantity > product.stock_quantity) {
          console.log("\nInsufficient quantity!");
          loadProducts();
        }
        else {
          // Otherwise run makePurchase, give it the product information and desired quantity to purchase
          makePurchase(product, quantity);
        }
      });
  }
  
  // Purchase the desired quantity of the desired item
  function makePurchase(product, quantity) {
    connection.query(
      "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
      [quantity, product.item_id],
      function(err, res) {
        // Let the user know the purchase was successful, re-run loadProducts
        console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
        loadProducts();
      }
    );
  }
  
  // Check to see if the product the user chose exists in the inventory
  function checkInventory(choiceId, inventory) {
    for (var i = 0; i < inventory.length; i++) {
      if (inventory[i].item_id === choiceId) {
        // If a matching product is found, return the product
        return inventory[i];
      }
    }
    // Otherwise return null
    return null;
  }
  
  // Check to see if the user wants to quit the program
  function checkIfShouldExit(choice) {
    if (choice.toLowerCase() === "q") {
      // Log a message and exit the current node process
      console.log("Goodbye!");
      process.exit(0);
    }
  }
  
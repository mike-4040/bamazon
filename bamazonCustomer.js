const mysql = require('mysql');
const inquirer = require('inquirer');

let item_id;
let inv = {};

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'bamazon'
});

connection.connect(err => {
  if (err) throw err;
  else getItems();
});

function getItems() {
  connection.query(
    'SELECT item_id, product_name, price, stock_quantity FROM products',
    renderItems
  );
}

function renderItems(err, res) {
  if (err) throw err;
  console.log('\nID  Name           Price');

  res.forEach(item => {
    if (item.stock_quantity > 0) {
      inv[item.item_id] = item.stock_quantity;
      console.log(`${item.item_id}  | ${item.product_name} | ${item.price}`);
    }
  });

  if (Object.keys(inv).length === 0) {
    console.log('SOLD OUT! Store closed, sorry. Please come tomorrow.');
    connection.end(err => {
      if (err) throw err;
    });
    return;
  }
  askItem();
}

function askItem() {
  inquirer
    .prompt({
      name: 'item_id',
      type: 'input',
      message: 'Please enter ID of item you want to buy OR 0 for EXIT',
      validate: function(input) {
        input = parseInt(input);
        if (input === 0 || inv.hasOwnProperty(input)) return true;
        else return 'Please select item from the list:';
      }
    })
    .then(askQuantity);
}

function askQuantity(answer) {
  item_id = parseInt(answer.item_id);
  if (item_id === 0)
    // User want to leave store
    connection.end(err => {
      if (err) throw err;
    });
  else
    inquirer
      .prompt({
        name: 'quantity',
        type: 'input',
        message: "Please enter desired quantity or 0 if you don't want any:",
        validate: function(input) {
          if (input >= 0) return true;
          else return 'Please enter valid number';
        }
      })
      .then(sellItem);
}

function sellItem(answer) {
  const requested = parseInt(answer.quantity);
  if (requested === 0) return getItems(); //User dont't want to buy this item.
  const remaining = inv[item_id] - requested;
  if (remaining < 0) {
    console.log(`We have only ${inv[item_id]} in stock, sorry...\n`);
    askQuantity({ item_id: item_id });
  } else recordSale(item_id, remaining);
}

function recordSale(item_id, quantity) {
  connection.query(
    'UPDATE products SET stock_quantity = ? WHERE item_id = ?',
    [quantity, item_id],
    confirmSale
  );
}

function confirmSale(err) {
  console.log(err ? err : 'SOLD');
  getItems();
}

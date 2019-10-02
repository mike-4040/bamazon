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
  console.log('ID  Name           Price');
  res.forEach(item => {
    if (item.stock_quantity > 0) {
      inv[item.item_id] = item.stock_quantity;
      console.log(`${item.item_id}  | ${item.product_name} | ${item.price}`);
    }
  });
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
        else return 'Please select item from the list';
      }
    })
    .then(askQuantity);
}

function askQuantity(answer) {
  item_id = parseInt(answer.item_id);
  if (item_id === 0) connection.end();
  else
    inquirer
      .prompt({
        name: 'quantity',
        type: 'input',
        message: 'Please enter desired quantity',
        validate: function(input) {
          if (input > 0) return true;
          else return 'Please enter positive number';
        }
      })
      .then(sellItem);
}

function sellItem(answer) {
  let remaining = inv[item_id] - answer.quantity;
  if (remaining < 0) {
    console.log(`We have only ${inv[item_id]} in stock, sorry...`);
    askItem();
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

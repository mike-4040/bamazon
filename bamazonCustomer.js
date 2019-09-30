const mysql = require('mysql');
const inquirer = require('inquirer');

let item_id;
let inventory = {};

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'bamazon'
});

connection.connect(err => {
  if (err) throw err;
  getItems();
});

function getItems() {
  connection.query(
    'SELECT item_id, product_name, price, stock_quantity FROM products',
    renderItems
  );
}

function renderItems(err, res) {
  if (err) throw err;
  console.table(res);
  console.log('Item ID  Name           Price');
  res.forEach(e => {
    if (e.stock_quantity > 0) {
      inventory[e.item_id] = e.stock_quantity;
      console.log(`${e.item_id}    | ${e.product_name} | ${e.price}`);
    }
  });
  askItem();
}
function askItem() {
  inquirer
    .prompt({
      name: 'item_id',
      type: 'number',
      message: 'Please enter ID of item you want to buy OR 0 for EXIT'
    })
    .then(askQuantity);
}

function askQuantity(answer) {
  item_id = answer.item_id;
  if (item_id === 0) connection.end();
  else
    inquirer
      .prompt({
        name: 'quantity',
        type: 'number',
        message: 'Please enter desired quantity'
      })
      .then(sellItem);
}

function sellItem(answer) {
  let quantity = answer.quantity;
  console.log(item_id, quantity);
  let remaining = inventory[item_id] - quantity;
  if (remaining < 0) {
    console.log('Insufficient quantity!');
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
  askItem();
}

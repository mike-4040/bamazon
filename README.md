# bamazon

UCSD Homework - better amazon

The bamazon application is the next generation am@#on.
The most convinient way to by using CLI.

To run application Customer type: `node bamazonCustomer` and app display a list of all available items.
![Available Items](./Screenshots/AvailableItems.png)

Customer asked to enter Item ID and quantity.

App verify that Customer entered valid Item ID:

![Available Items](./Screenshots/EnterValidItemID.png)

When Customer enter desired quantity app check it against inventory.
If inventory is insufficient, app notify Customer about available quantity.
If we can fullfill the order app update database.

![Not enougth](./Screenshots/NotEnouthInStock.png)

When everithing is sold app display

![Sold Out](./Screenshots/SoldOut.png)

# Bamazon

CLI application for self-service 

## [Try it yourself!](https://mike-4040.github.io/train-table/) 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need a firebase app.
Go to [firebase](firebase.google.com) and create an account. It's very easy, just follow instructions.
Then, create a project.
When you inside the project, create an app.

### Installing

Clone the repository to your local machine.
Grab Firebase SDK snippet / Config from Firebase app setting.
Update `firebaseConfig` in `resouces/time-table.js`.
You are good to go.

## Built With

* [Bootstrap](https://getbootstrap.com/) - front-end component library.
* [jQuery](https://jquery.com/) - feature-rich JavaScript library.
* [Moment.js](https://momentjs.com/) - date and time manipulation library. 
* [Firebase](https://firebase.google.com/) - realtime database.

### Hosted

* [GitHub Pages](https://pages.github.com/) - hosting from GitHub repo.

## Planned updates

At the moment, this app is the minimum viable product.
We hope to make updates to improve the UI/UX, and add more functionality and features (such as editing the schedule).



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

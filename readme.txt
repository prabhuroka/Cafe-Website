I could not push the node modules here. So, You have to install node modules and the dependencies to properly set up and run the webpage.

The file structure is maintained to properly run the express server

Following are the dependencies:{ "dependencies": { "body-parser": "^1.20.2", "ejs": "^3.1.10", "express": "^4.19.2" } }

Webpage description: The webpage is about the UH cafe and when you set up the server with node, the webpage can be loaded from "localhost:3000" url. The webpage is designed with buttons that takes user from one page to another page smoothly. THere is a menu page ("localhost:3000/menu.html") in which user can add and remove food items to a cart and finally submit the cart. The user will get confirmation page with items and total price after the order is submitted. There is also a contact page in which the user can submit there messag e for the developer. The server.js file is set up to handle the form requests.
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { log } = require('console');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve homepage.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

// Route to serve biography.html
app.get('/biography', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'biography.html'));
});

// Route to serve menu.html
app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});
// Route to serve contact.html
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});
// Route to serve signup.html
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

//Initializing variable to be used later
let itemNames = [];
let totalPrice = 0;
// Route to handle form submission from menu.html
app.post('/submit', (req, res) => {
    // Process the submitted order data here
    let cartData = JSON.parse(req.body.cart); 
    if (Array.isArray(cartData)) {
        // Clear previous data in itemNames and totalPrice variables when reloaded 
        itemNames = [];
        totalPrice = 0;

        // Loop through the cart items to extract item names and prices
        cartData.forEach(item => {
            const itemName = item.itemName;
            const itemPrice = item.price;
            itemNames.push(itemName);
            totalPrice += itemPrice;
        });

        console.log("Item Names:", itemNames);
        console.log("Total Price:", totalPrice);

        // Encoding the parameters properly
        const encodedItemNames = encodeURIComponent(JSON.stringify(itemNames));
        const encodedTotalPrice = encodeURIComponent(totalPrice.toString());

        // Render the order page with the submitted order details passed
        res.redirect(`/order?itemNames=${encodedItemNames}&totalPrice=${encodedTotalPrice}`);

    } else {
        console.error("Error: Invalid cart data format");
        // Send an error response if the cart data format is invalid
        res.status(400).send("Invalid cart data format");
    }
});

//Route to handle when the order path is redirected after form is submitted 
app.get('/order', (req, res) => {
    // Retrieve itemNames and totalPrice from query parameters
    let itemNames = JSON.parse(decodeURIComponent(req.query.itemNames));
    let totalPrice = parseFloat(req.query.totalPrice); // Parse as float

    //Confirmation page is a html file which shows the order submitted with total calculated
    let confirmationPage = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Confirmation</title>
            <link rel="stylesheet" href="css/styles.css">  <!--Css link-->
            <style>   
             body {
             justify-content: center;
             align-items: center;
             height: 100vh;
             margin: 0;}
            </style>
        </head>
        <body>
            <h1 style="font-size: 40px; margin-bottom: 20px; color: blue;">Order Confirmation</h1>
            <div class= "order-container">
            <h2>Items:</h2>
            <ul>
    `;

        // Add each item to the list using loop
        itemNames.forEach(item => {
        confirmationPage += `<li style="list-style-type:none;font-size: 20px;margin: 5px 0;">${item}</li>`;
        });

        // Add total price to the confirmation page
        confirmationPage += `
            </ul>
            <h2 style="margin-top: 20px;">Total Price:</h2>
            <p style="font-size: 40px;color: blue; ">${totalPrice.toFixed(2)}</p>  
            </div>
            <button id="homepage-btn" onclick="window.location.href='homepage.html'">Back to Homepage</button>
        </body>
        </html>
    `;

    // Send the confirmation page as the response
    res.send(confirmationPage);
});

// Route to handle form submission from contact.html
app.post('/contact', (req, res) => {
    // Extract data from the request body
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    
    // Log the data to the console
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    
    console.log("Form submitted successfully") //Message received at server side.
    res.redirect('/contact');// Redirect to the contact page
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

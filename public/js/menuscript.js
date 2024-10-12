let cart = [];

        //Function add to cart for the add button in the menu items
        function addToCart(itemName, price) {
            cart.push({ itemName, price });  // adds items to the empty cart
            renderCart();
            updateTotal();
        }

        //Function remove to cart for the remove button in the Cart
        function removeFromCart(index) {
            cart.splice(index, 1);  // remove items from the cart
            renderCart();
            updateTotal();
        }

        //Function to render the items added to the cart
        function renderCart() {
            const cartItemsElement = document.getElementById('cart-items'); //choose the cart-items id
            cartItemsElement.innerHTML = '';
            cart.forEach((item, index) => {
                const listItem = document.createElement('li');  //creates the element li
                listItem.textContent = `${item.itemName} - $${item.price}`;
                const removeButton = document.createElement('button');  //creates the button remove in the cart
                removeButton.textContent = 'Remove';  // labels the button remove
                removeButton.classList.add('btn');   // adds the btn class
                removeButton.onclick = function() {
                    removeFromCart(index);           // when button gets clicked, the removefromcart function is called
                };
                listItem.appendChild(removeButton);
                cartItemsElement.appendChild(listItem);  // adds the item to the cart
            });
        }
        // function for the total price in the cart
        function updateTotal() {
            const totalPrice = cart.reduce((total, item) => total + item.price, 0);
            document.getElementById('total').textContent = `Total: $${totalPrice}`;
        }

        // for form submission of the cart items
        document.getElementById('checkout-form').addEventListener('submit', function(event) {
            // Add an input element to the form to hold the cart data
            var cartInput = document.createElement('input');
            cartInput.type = 'hidden';
            cartInput.name = 'cart'; // Name of the input element
            cartInput.value = JSON.stringify(cart);
            this.appendChild(cartInput);
        });
document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const deliveryOptions = document.getElementById('delivery-options');
    const takeawayOptions = document.getElementById('takeaway-options');
    const deliveryAddress = document.getElementById('delivery-address');
    const placeOrderBtn = document.getElementById('place-order');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Price: ₹${item.price.toFixed(2)}</p>
                    <p>Quantity: 
                        <button class="quantity-btn decrease" data-index="${index}">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="quantity-btn increase" data-index="${index}">+</button>
                    </p>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            `;
            cartItems.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `₹${total.toFixed(2)}`;
        console.log('Cart displayed:', cart);
    }

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    cartItems.addEventListener('click', function(e) {
        console.log('Click event triggered on:', e.target);
        
        if (e.target.classList.contains('quantity-btn')) {
            const index = parseInt(e.target.dataset.index);
            console.log('Quantity button clicked for index:', index);
            
            if (e.target.classList.contains('increase')) {
                cart[index].quantity++;
                console.log('Increased quantity for item:', cart[index]);
            } else if (e.target.classList.contains('decrease') && cart[index].quantity > 1) {
                cart[index].quantity--;
                console.log('Decreased quantity for item:', cart[index]);
            }
            updateCart();
        } else if (e.target.classList.contains('remove-btn')) {
            const index = parseInt(e.target.dataset.index);
            console.log('Remove button clicked for index:', index);
            cart.splice(index, 1);
            updateCart();
        }
    });

    deliveryOptions.addEventListener('change', function(e) {
        if (e.target.value === 'takeaway') {
            takeawayOptions.style.display = 'block';
            deliveryAddress.style.display = 'none';
        } else {
            takeawayOptions.style.display = 'none';
            deliveryAddress.style.display = 'block';
        }
    });

    placeOrderBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items before placing an order.');
            return;
        }

        const selectedOption = document.querySelector('input[name="delivery-option"]:checked').value;
        let orderDetails = '';

        if (selectedOption === 'delivery') {
            const address = document.getElementById('address').value.trim();
            if (!address) {
                alert('Please enter a delivery address.');
                return;
            }
            orderDetails = `Delivery to: ${address}`;
        } else {
            const pickupDate = document.getElementById('pickup-date').value;
            const pickupTime = document.getElementById('pickup-time').value;
            if (!pickupDate || !pickupTime) {
                alert('Please select a pickup date and time.');
                return;
            }
            orderDetails = `Takeaway pickup on ${pickupDate} at ${pickupTime}`;
        }

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        alert(`Thank you for your order!\n\nOrder Details:\n${orderDetails}\n\nTotal: ₹${total.toFixed(2)}`);
        
        cart = [];
        updateCart();
    });

    displayCart();
});
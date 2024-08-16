document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const priceElement = card.querySelector('.product-price');
        const quantityElement = card.querySelector('.quantity');
        const decrementBtn = card.querySelector('.decrement');
        const incrementBtn = card.querySelector('.increment');

        let quantity = 1;
        const price = parseFloat(card.dataset.price);

        function updatePrice() {
            const totalPrice = (price * quantity).toFixed(2);
            priceElement.textContent = `$${totalPrice}`;
        }

        decrementBtn.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = quantity;
                updatePrice();
            }
        });

        incrementBtn.addEventListener('click', () => {
            quantity++;
            quantityElement.textContent = quantity;
            updatePrice();
        });

        // Initialize price
        updatePrice();
    });
});
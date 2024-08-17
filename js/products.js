cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', function() {
  const productTemplate = document.getElementById('product-template');
  const productGrid = document.querySelector('.product-grid');
  const categoryButtons = document.querySelectorAll('.category-button');

  async function fetchProducts() {
    try {
      const response = await fetch('data/products.json');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  function createProductCard(product) {
    const productCard = productTemplate.content.cloneNode(true).querySelector('.product-card');
    const image = productCard.querySelector('.product-image');
    const name = productCard.querySelector('.product-name');
    const price = productCard.querySelector('.product-price');
    const quantityElement = productCard.querySelector('.quantity');
    const addToCartBtn = productCard.querySelector('.add-to-cart');
  
    productCard.classList.add(product.type);
    image.src = product.image;
    image.alt = product.name;
    name.textContent = product.name;
    price.textContent = `₹${product.price.toFixed(2)}`;
  
    setupQuantityButtons(productCard, product.price);
  
    addToCartBtn.addEventListener('click', () => {
           addToCart(product, parseInt(quantityElement.textContent));
           console.log(":cloac");
           
            addToCartBtn.classList.add("clicked");
            addToCartBtn.disabled = true;
            addToCartBtn.innerHTML = 'ADDED  &check;';
            setTimeout(function() {
                addToCartBtn.innerHTML = 'ADD TO CART';
                addToCartBtn.disabled = false;
                addToCartBtn.classList.remove("clicked");
            },1000)
    });
  
    return productCard;
  }

  function setupQuantityButtons(productCard, originalPrice) {
    const quantityElement = productCard.querySelector('.quantity');
    const decrementBtn = productCard.querySelector('.decrement');
    const incrementBtn = productCard.querySelector('.increment');
    const priceElement = productCard.querySelector('.product-price');
    

    let quantity = 1;

    function updatePrice() {
      const totalPrice = (originalPrice * quantity).toFixed(2);
      priceElement.textContent = `₹${totalPrice}`;
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
  }

  function addToCart(product, quantity) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
  }
  
  function updateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartIcon.setAttribute('data-count', totalItems);
  }


  async function populateProducts() {
    const products = await fetchProducts();
    productGrid.innerHTML = "";
    products.forEach(product => {
      const productCard = createProductCard(product);
      productGrid.appendChild(productCard);
    });
  }

  function filterProducts(category) {
    const productCards = productGrid.querySelectorAll('.product-card');
    productCards.forEach(card => {
      if (category === 'all' || card.classList.contains(category)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      filterProducts(this.dataset.category);
    });
  });

  populateProducts();
  updateCartIcon();
});
document.addEventListener('DOMContentLoaded', function() {
    const productTemplate = document.getElementById('product-template');
    const productGrids = document.querySelectorAll('.product-grid');
  
    async function fetchProducts(category) {
      try {
        const response = await fetch(`data/${category}.json`);
        return await response.json();
      } catch (error) {
        console.error('Error fetching products:', error);
        return [];
      }
    }
  
    function createProductCard(product) {
      const productCard = productTemplate.content.cloneNode(true);
      const image = productCard.querySelector('.product-image');
      const name = productCard.querySelector('.product-name');
      const price = productCard.querySelector('.product-price');
  
      image.src = product.image;
      image.alt = product.name;
      name.textContent = product.name;
      price.textContent = `$${product.price.toFixed(2)}`;
  
      return productCard;
    }
  
    function setupQuantityButtons(productCard) {
      const quantityElement = productCard.querySelector('.quantity');
      const decrementBtn = productCard.querySelector('.decrement');
      const incrementBtn = productCard.querySelector('.increment');
      const priceElement = productCard.querySelector('.product-price');
      const originalPrice = parseFloat(priceElement.textContent.slice(1));
  
      let quantity = 1;
  
      function updatePrice() {
        const totalPrice = (originalPrice * quantity).toFixed(2);
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
    }
  
    async function populateProducts() {
      for (const grid of productGrids) {
        const category = grid.dataset.category;
        const products = await fetchProducts(category);
        grid.innerHTML = '';
        products.forEach(product => {
          const productCard = createProductCard(product);
          setupQuantityButtons(productCard);
          grid.appendChild(productCard);
        });
      }
    }
  
    populateProducts();
  
    const categoryButtons = document.querySelectorAll('.category-button');
    const productCategories = document.querySelectorAll('.product-category');
  
    categoryButtons.forEach(button => {
      button.addEventListener('click', function() {
        const category = this.dataset.category;
  
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
  
        productCategories.forEach(cat => {
          if (cat.id === category) {
            cat.classList.add('active');
          } else {
            cat.classList.remove('active');
          }
        });
      });
    });
  });
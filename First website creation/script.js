// Sample product data
const products = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 1299,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: "Wireless Bluetooth Earbuds",
    price: 2499,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 4.2,
    reviews: 256
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    price: 1799,
    originalPrice: 2299,
    image: "https://images.unsplash.com/photo-1554342872-034a06541bad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: 89
  },
  {
    id: 4,
    name: "Smart Fitness Band",
    price: 1999,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 4.3,
    reviews: 342
  }
];

// Display products on page load
document.addEventListener('DOMContentLoaded', function() {
  const productsGrid = document.querySelector('.products-grid');
  
  products.forEach(product => {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        <span class="discount-badge">-${discount}%</span>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <div class="price">
          <span class="current-price">₹${product.price.toLocaleString()}</span>
          <span class="original-price">₹${product.originalPrice.toLocaleString()}</span>
        </div>
        <div class="rating">${getStarRating(product.rating)} (${product.reviews})</div>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    
    productsGrid.appendChild(productCard);
  });
  
  // Add event listeners to all "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-id');
      addToCart(productId);
      
      // Animation
      this.textContent = 'Added!';
      setTimeout(() => {
        this.textContent = 'Add to Cart';
      }, 1000);
    });
  });
});

// Helper function to create star rating
function getStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  
  return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
}

// Cart functionality
let cart = [];

function addToCart(productId) {
  const product = products.find(p => p.id == productId);
  if (product) {
    cart.push(product);
    updateCartCount();
  }
}

function updateCartCount() {
  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon) {
    const count = cart.length;
    cartIcon.innerHTML = `<i class="fas fa-shopping-cart"></i>${count > 0 ? `<span class="cart-count">${count}</span>` : ''}`;
  }
}
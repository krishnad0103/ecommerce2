/* --- JAVASCRIPT (LOGIC) --- */

// Data: Array of products
const products = [
    { id: 1, name: "Blue Denim Jacket", category: "clothing", price: 1200, icon: "👕" },
    { id: 2, name: "Wireless Headphones", category: "electronics", price: 2500, icon: "🎧" },
    { id: 3, name: "Cotton T-Shirt", category: "clothing", price: 500, icon: "👕" },
    { id: 4, name: "Smartphone", category: "electronics", price: 15000, icon: "📱" },
    { id: 5, name: "Running Shoes", category: "clothing", price: 1800, icon: "👟" },
    { id: 6, name: "Smart Watch", category: "electronics", price: 3000, icon: "⌚" }
];

let cart = [];

// Function to display products
function renderProducts(filterCategory) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear current list

    products.forEach(product => {
        // If filter is 'all' OR matches category, show it
        if (filterCategory === 'all' || product.category === filterCategory) {
            
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image-placeholder">${product.icon}</div>
                <div class="product-info">
                    <div class="product-title">${product.name}</div>
                    <div class="product-price">
                        ₹${product.price}
                        <button class="add-btn" onclick="addToCart(${product.id})">Add +</button>
                    </div>
                </div>
            `;
            productList.appendChild(card);
        }
    });
}

// Function to filter products
function filterProducts(category, event) {
    // Update buttons styling
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    // Set the clicked button as active
    if (event && event.target) {
        event.target.classList.add('active');
    } else {
        // Fallback for initial load, make 'All Items' active
        document.querySelector('.filter-btn').classList.add('active');
    }
    
    renderProducts(category);
}

// Add to Cart Logic
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartDisplay();
    // Using a simple message box instead of alert()
    showTemporaryMessage(`${product.name} added to cart!`);
}

// Remove from Cart Logic
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item at specific index
    updateCartDisplay();
}

// Update Cart UI
function updateCartDisplay() {
    document.getElementById('cart-count').innerText = cart.length;
    
    const cartItemsDiv = document.getElementById('cart-items');
    let total = 0;
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p style="text-align: center; color: #888;">Your cart is empty.</p>';
    } else {
        cartItemsDiv.innerHTML = ''; // Clear list
        cart.forEach((item, index) => {
            total += item.price;
            // Note: index is used to uniquely identify and remove the item from the cart array
            cartItemsDiv.innerHTML += `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>₹${item.price} <button class="remove-btn" onclick="removeFromCart(${index})">🗑️</button></span>
                </div>
            `;
        });
    }
    
    document.getElementById('cart-total').innerText = total;
}

// Toggle Modal Visibility
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

// Function to show custom message instead of alert()
function showTemporaryMessage(message) {
    let msgEl = document.getElementById('temp-msg');
    if (!msgEl) {
        msgEl = document.createElement('div');
        msgEl.id = 'temp-msg';
        msgEl.style.cssText = 'position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:#4CAF50; color:white; padding:10px 20px; border-radius:5px; z-index:2000; opacity:0; transition:opacity 0.5s;';
        document.body.appendChild(msgEl);
    }
    msgEl.innerText = message;
    msgEl.style.opacity = '1';
    
    setTimeout(() => {
        msgEl.style.opacity = '0';
    }, 3000);
}


// Checkout Logic (using custom message instead of alert)
function checkout() {
    if (cart.length > 0) {
        const total = document.getElementById('cart-total').innerText;
        
        showTemporaryMessage(`Order of ₹${total} Placed Successfully! Thank you!`);
        
        // Clear cart state
        cart = [];
        updateCartDisplay();
        
        // Close cart modal
        toggleCart();
        
    } else {
        showTemporaryMessage("Your cart is empty! Add some items first.");
    }
}

// Initial Load: Render products and set initial filter button
document.addEventListener('DOMContentLoaded', () => {
    // We pass null for the event object since this is not a click event
    filterProducts('all', null); 
});
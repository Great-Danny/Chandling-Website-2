/* ============================================
   CATALOG JAVASCRIPT - Product Management
   ============================================ */

// Sample product data
const products = [
    // Rigging & Ropes
    {
        id: 1,
        name: 'Nylon Marine Rope 12mm',
        category: 'rigging',
        price: 45.99,
        description: 'High-strength nylon rope suitable for rigging and securing loads.',
        stock: 150,
        emoji: '🪢'
    },
    {
        id: 2,
        name: 'Stainless Steel Carabiners',
        category: 'rigging',
        price: 35.50,
        description: 'Professional-grade stainless steel carabiners for marine use.',
        stock: 200,
        emoji: '⛓️'
    },
    {
        id: 3,
        name: 'Polypropylene Rope 10mm',
        category: 'rigging',
        price: 28.99,
        description: 'Lightweight and affordable polypropylene rope for general use.',
        stock: 300,
        emoji: '📦'
    },
    
    // Safety Equipment
    {
        id: 4,
        name: 'Life Vest - Adult',
        category: 'safety',
        price: 89.99,
        description: 'USCG approved life vest with reflective strips.',
        stock: 75,
        emoji: '🦺'
    },
    {
        id: 5,
        name: 'Life Preserver Ring',
        category: 'safety',
        price: 125.00,
        description: 'Coast Guard approved life preserver ring with rope.',
        stock: 50,
        emoji: '⭕'
    },
    {
        id: 6,
        name: 'First Aid Kit - Marine',
        category: 'safety',
        price: 59.99,
        description: 'Comprehensive marine first aid kit with emergency supplies.',
        stock: 120,
        emoji: '🚑'
    },
    {
        id: 7,
        name: 'Safety Harness',
        category: 'safety',
        price: 129.99,
        description: 'Professional safety harness for deck work.',
        stock: 40,
        emoji: '🪂'
    },
    
    // Navigation Tools
    {
        id: 8,
        name: 'Marine Compass',
        category: 'navigation',
        price: 75.50,
        description: 'Precise marine compass with bearing ring.',
        stock: 60,
        emoji: '🧭'
    },
    {
        id: 9,
        name: 'GPS Chart Plotter',
        category: 'navigation',
        price: 349.99,
        description: 'Advanced GPS navigation system with chart plotter.',
        stock: 25,
        emoji: '📡'
    },
    {
        id: 10,
        name: 'Nautical Chart Bundle',
        category: 'navigation',
        price: 145.00,
        description: 'Complete nautical chart set for worldwide navigation.',
        stock: 80,
        emoji: '🗺️'
    },
    
    // Maintenance
    {
        id: 11,
        name: 'Stainless Steel Cleaner',
        category: 'maintenance',
        price: 22.99,
        description: 'Professional marine stainless steel cleaner.',
        stock: 200,
        emoji: '🧴'
    },
    {
        id: 12,
        name: 'Corrosion Prevention Spray',
        category: 'maintenance',
        price: 19.99,
        description: 'Protective spray to prevent rust and corrosion.',
        stock: 250,
        emoji: '💨'
    },
    {
        id: 13,
        name: 'Marine Paint - 1 Gallon',
        category: 'maintenance',
        price: 89.99,
        description: 'High-quality marine paint resistant to saltwater.',
        stock: 110,
        emoji: '🎨'
    },
    {
        id: 14,
        name: 'Hull Cleaning Tool Kit',
        category: 'maintenance',
        price: 159.99,
        description: 'Complete tool kit for hull maintenance and cleaning.',
        stock: 35,
        emoji: '🔧'
    },
    
    // Provisions
    {
        id: 15,
        name: 'Emergency Water Supply (5L)',
        category: 'provisions',
        price: 24.99,
        description: 'Long-shelf-life fresh water for emergency supplies.',
        stock: 300,
        emoji: '💧'
    },
    {
        id: 16,
        name: 'Marine Energy Bars (Box of 12)',
        category: 'provisions',
        price: 34.99,
        description: 'High-calorie energy bars designed for maritime crew.',
        stock: 150,
        emoji: '🍫'
    },
    {
        id: 17,
        name: 'Sea Salt Cases (12 pack)',
        category: 'provisions',
        price: 47.50,
        description: 'Premium sea salt for maritime food preservation.',
        stock: 80,
        emoji: '🧂'
    },
    {
        id: 18,
        name: 'Coffee & Tea Assortment',
        category: 'provisions',
        price: 52.99,
        description: 'Premium coffee and tea selection for crew welfare.',
        stock: 100,
        emoji: '☕'
    }
];

/**
 * Load and display products
 */
function loadProducts() {
    const container = document.getElementById('productsContainer');
    if (!container) return;

    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');

    const selectedCategory = categoryFilter ? categoryFilter.value : '';
    const maxPrice = priceFilter ? parseInt(priceFilter.value) : 5000;

    // Filter products
    const filteredProducts = products.filter(product => {
        const categoryMatch = !selectedCategory || product.category === selectedCategory;
        const priceMatch = product.price <= maxPrice;
        return categoryMatch && priceMatch;
    });

    // Display results
    if (filteredProducts.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No products found matching your criteria.</p>';
        return;
    }

    container.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">${product.emoji}</div>
            <div class="product-body">
                <span class="product-category">${formatCategory(product.category)}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${formatCurrency(product.price)}</div>
                <div class="product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                    ${product.stock > 0 ? `✓ ${product.stock} in stock` : '✗ Out of stock'}
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary" ${product.stock === 0 ? 'disabled' : ''} onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                    <button class="btn btn-secondary" onclick="addToFavorites(${product.id})">
                        ❤️ Save
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Format category name
 */
function formatCategory(category) {
    const categoryMap = {
        'rigging': 'Rigging & Ropes',
        'safety': 'Safety',
        'navigation': 'Navigation',
        'maintenance': 'Maintenance',
        'provisions': 'Provisions'
    };
    return categoryMap[category] || category;
}

/**
 * Add product to cart
 */
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Get existing cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show notification
    showNotification(`✓ ${product.name} added to cart!`, 'success');
}

/**
 * Add product to favorites
 */
function addToFavorites(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Get existing favorites
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if already favorited
    if (favorites.find(f => f.id === productId)) {
        favorites = favorites.filter(f => f.id !== productId);
        showNotification(`✗ Removed from favorites`, 'success');
    } else {
        favorites.push({
            id: productId,
            name: product.name,
            price: product.price
        });
        showNotification(`❤️ Added to favorites!`, 'success');
    }

    // Save to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

/**
 * Filter products based on selection
 */
function filterProducts() {
    loadProducts();
}

/**
 * Get URL parameters
 */
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/**
 * Initialize catalog page
 */
document.addEventListener('DOMContentLoaded', function() {
    // Set category filter from URL if present
    const categoryParam = getUrlParameter('category');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (categoryParam && categoryFilter) {
        categoryFilter.value = categoryParam;
    }

    // Load products on page load
    loadProducts();

    // Add event listeners to filters
    if (categoryFilter) {
        categoryFilter.addEventListener('change', loadProducts);
    }

    const priceFilter = document.getElementById('priceFilter');
    if (priceFilter) {
        priceFilter.addEventListener('input', debounce(loadProducts, 300));
    }
});

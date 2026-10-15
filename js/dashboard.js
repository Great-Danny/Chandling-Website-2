/* ============================================
   DASHBOARD JAVASCRIPT - Dashboard Functionality
   ============================================ */

/**
 * Initialize order form submission
 */
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple validation
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Simulate login
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isLoggedIn', 'true');

    showNotification('Login successful! Redirecting...', 'success');
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

/**
 * Handle account form submission
 */
function handleAccountSubmit(event) {
    if (event) event.preventDefault();

    const form = document.querySelector('.account-form');
    if (!form) return;

    const firstName = form.querySelector('input[type="text"]:first-of-type')?.value;
    const lastName = form.querySelector('input[type="text"]:nth-of-type(2)')?.value;
    const email = form.querySelector('input[type="email"]')?.value;
    const company = form.querySelector('input[type="text"]:nth-of-type(3)')?.value;
    const phone = form.querySelector('input[type="tel"]')?.value;

    // Save to localStorage
    const userData = {
        firstName,
        lastName,
        email,
        company,
        phone
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    showNotification('✓ Account information updated!', 'success');
}

/**
 * Load user data into dashboard
 */
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (!userData) return;

    const inputs = document.querySelectorAll('.account-form input');
    if (inputs.length >= 5) {
        inputs[0].value = userData.firstName || '';
        inputs[1].value = userData.lastName || '';
        inputs[2].value = userData.email || '';
        inputs[3].value = userData.company || '';
        inputs[4].value = userData.phone || '';
    }
}

/**
 * Load favorites into dashboard
 */
function loadFavorites() {
    const favoritesList = document.querySelector('.favorites-list');
    if (!favoritesList) return;

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p>You haven\'t saved any favorites yet.</p>';
        return;
    }

    const html = `
        <table>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${favorites.map(fav => `
                    <tr>
                        <td>${fav.name}</td>
                        <td>${formatCurrency(fav.price)}</td>
                        <td>
                            <button class="btn btn-primary" onclick="addToCart(${fav.id})">
                                Add to Cart
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    favoritesList.innerHTML = html;
}

/**
 * Load order history
 */
function loadOrderHistory() {
    const ordersList = document.querySelector('.orders-list');
    if (!ordersList) return;

    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    if (orders.length === 0) {
        ordersList.innerHTML = '<p>No orders yet. Start shopping!</p>';
        return;
    }

    const html = `
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${orders.map(order => `
                    <tr>
                        <td>#${order.id}</td>
                        <td>${order.date}</td>
                        <td>${formatCurrency(order.amount)}</td>
                        <td>
                            <span class="badge badge-${order.status}">
                                ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    ordersList.innerHTML = html;
}

/**
 * Logout user
 */
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    showNotification('Logged out successfully', 'success');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

/**
 * Initialize dashboard on load
 */
document.addEventListener('DOMContentLoaded', function() {
    // Load user data
    loadUserData();
    loadFavorites();
    loadOrderHistory();

    // Add form submission handler
    const accountForm = document.querySelector('.account-form');
    if (accountForm) {
        accountForm.addEventListener('submit', handleAccountSubmit);
    }

    // Add toggle switches functionality
    const settingToggles = document.querySelectorAll('.toggle input[type="checkbox"]');
    settingToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const label = this.closest('.setting-item').querySelector('h4').textContent;
            const state = this.checked ? 'enabled' : 'disabled';
            showNotification(`✓ ${label} ${state}`, 'success');
        });
    });

    // Update dashboard section navigation
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetId === 'favorites') {
                loadFavorites();
            }
            if (targetId === 'orders') {
                loadOrderHistory();
            }

            if (!targetSection) return;

            // Remove active from all
            document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
            document.querySelectorAll('.dashboard-section').forEach(s => s.classList.remove('active'));

            // Add active to clicked
            this.classList.add('active');
            targetSection.classList.add('active');

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});

/**
 * Simulate cart operations (for demo)
 */
function viewCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }

    alert(`Items in cart: ${cart.length}\n\nTotal: ${formatCurrency(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0))}`);
}

/**
 * Simulate checkout
 */
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }

    // Create order
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const order = {
        id: 'ORD' + Date.now(),
        date: new Date().toLocaleDateString(),
        amount: total,
        status: 'confirmed',
        items: cart
    };

    // Save order
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem('cart');

    showNotification('✓ Order placed successfully! Thank you for your purchase.', 'success');
}

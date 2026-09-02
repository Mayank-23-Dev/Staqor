let cart = [];
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartSubtotal = document.getElementById('cartSubtotal');
const checkoutBtn = document.getElementById('checkoutBtn');

function toggleDrawer(open) {
    cartDrawer.classList.toggle('open', open);
    cartBackdrop.classList.toggle('open', open);
}

openCartBtn.addEventListener('click', () => toggleDrawer(true));
closeCartBtn.addEventListener('click', () => toggleDrawer(false));
cartBackdrop.addEventListener('click', () => toggleDrawer(false));

document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const title = btn.dataset.title;
        const price = parseFloat(btn.dataset.price);

        const existing = cart.find(item => item.id === id);
        if (existing) {
            existing.qty++;
        } else {
            cart.push({ id, title, price, qty: 1 });
        }
        renderCart();
        toggleDrawer(true);
    });
});

function renderCart() {
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    cartCount.textContent = totalQty;
    cartSubtotal.textContent = `$${totalPrice.toFixed(2)}`;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart-msg">Your shopping bag is empty.</p>';
        return;
    }

    cartItems.innerHTML = cart.map((item, idx) => `
        <div class="cart-item-row">
            <div>
                <strong>${item.title}</strong>
                <div style="color: #94a3b8; font-size: 0.85rem;">$${item.price} x ${item.qty}</div>
            </div>
            <button onclick="removeItem(${idx})" style="background: transparent; border: none; color: #ef4444; cursor: pointer;">Remove</button>
        </div>
    `).join('');
}

window.removeItem = function(idx) {
    cart.splice(idx, 1);
    renderCart();
};

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your order! Simulated checkout complete.');
    cart = [];
    renderCart();
    toggleDrawer(false);
});
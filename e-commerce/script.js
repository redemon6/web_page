const basket = {};
let totalItems = 0;

const basketCountEl = document.getElementById('basket-count');
const basketModal = document.getElementById('basket-modal');
const closeModal = document.getElementById('close-modal');
const basketIcon = document.getElementById('basket-icon');
const basketItemsEl = document.getElementById('basket-items');
const totalPriceEl = document.getElementById('total-price');

// Handle Add to Basket
document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.product-card');
        const name = card.getAttribute('data-name');
        const price = parseFloat(card.getAttribute('data-price'));

        if (!basket[name]) {
            basket[name] = { price, quantity: 1 };
        } else {
            basket[name].quantity += 1;
        }

        totalItems++;
        updateBasketUI();
    });
});

function updateBasketUI() {
    basketCountEl.textContent = totalItems;
    basketCountEl.classList.add('animate');
    setTimeout(() => basketCountEl.classList.remove('animate'), 200);

    // Basket items
    basketItemsEl.innerHTML = '';
    let total = 0;
    for (const [name, item] of Object.entries(basket)) {
        const li = document.createElement('li');
        li.textContent = `${name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        basketItemsEl.appendChild(li);
        total += item.price * item.quantity;
    }
    totalPriceEl.textContent = total.toFixed(2);
}

basketIcon.addEventListener('click', () => {
    basketModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    basketModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === basketModal) basketModal.style.display = 'none';
});
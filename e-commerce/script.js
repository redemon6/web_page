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



function updateBasketUI() {
    basketCountEl.textContent = totalItems;
    basketCountEl.classList.add('animate');
    setTimeout(() => basketCountEl.classList.remove('animate'), 200);

    // Clear old basket UI
    basketItemsEl.innerHTML = '';
    let total = 0;

    for (const [name, item] of Object.entries(basket)) {
        const li = document.createElement('li');

        li.innerHTML = `
            ${name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            <button class="remove-btn" data-name="${name}">🗑</button>
        `;

        basketItemsEl.appendChild(li);
        total += item.price * item.quantity;
    }

    totalPriceEl.textContent = total.toFixed(2);

    // Add remove functionality
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.getAttribute('data-name');
            if (basket[name]) {
                basket[name].quantity--;
                totalItems--;

                if (basket[name].quantity <= 0) {
                    delete basket[name];
                }

                updateBasketUI();
            }
        });
    });
}



const searchInput = document.querySelector('.navbar input');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const name = product.getAttribute('data-name').toLowerCase();
        if (name.includes(query)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

let products = [];
let filteredProducts = [];

fetch('products.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    filteredProducts = [...products];
    populateFilters();
    renderProducts(products);
  })
  .catch(error => {
    console.error('Error loading products:', error);
    productsContainer.innerHTML = '<p>Failed to load products.</p>';
  });


// Elements
const productsContainer = document.getElementById('productsContainer');
const categoryFilter = document.getElementById('categoryFilter');
const colorFilter = document.getElementById('colorFilter');
const detailView = document.getElementById('detailView');
const backButton = document.getElementById('backButton');

// Populate filter dropdowns with unique categories/colors
function populateFilters() {
  const categories = [...new Set(products.map(p => p.category))].sort();
  const colors = [...new Set(products.map(p => p.color))].sort();

  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = capitalize(cat);
    categoryFilter.appendChild(opt);
  });

  colors.forEach(col => {
    const opt = document.createElement('option');
    opt.value = col;
    opt.textContent = capitalize(col);
    colorFilter.appendChild(opt);
  });
}

// Capitalize first letter helper
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Render product cards
function renderProducts(list) {
  detailView.style.display = 'none';
  productsContainer.style.display = 'grid';
  backButton.classList.add('hidden');
  productsContainer.innerHTML = '';
  if (list.length === 0) {
    productsContainer.innerHTML = '<p>No products found.</p>';
    return;
  }
  list.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <div class="product-info">
          <h3>${product.name}</h3>
          <p><strong>Brand:</strong> ${product.brand}</p>
          <p><strong>Category:</strong> ${capitalize(product.category)}</p>
          <p><strong>Color:</strong> ${capitalize(product.color)}</p>
          <p class="price">$${product.price.toFixed(2)}</p>
          <button class="delete-btn">Delete</button>
        </div>
      `;

    // Click on card shows detail view (except on delete btn)
    card.addEventListener('click', e => {
      if (e.target.classList.contains('delete-btn')) return;
      showDetail(product.id);
    });

    // Delete button functionality
    card.querySelector('.delete-btn').addEventListener('click', e => {
      e.stopPropagation();
      deleteProduct(product.id);
    });

    productsContainer.appendChild(card);
  });
}

// Show detail of one product
function showDetail(id) {
  const product = filteredProducts.find(p => p.id === id);
  if (!product) return;
  productsContainer.style.display = 'none';
  detailView.style.display = 'block';
  backButton.classList.remove('hidden');

  detailView.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h2>${product.name}</h2>
      <p><strong>Brand:</strong> ${product.brand}</p>
      <p><strong>Category:</strong> ${capitalize(product.category)}</p>
      <p><strong>Color:</strong> ${capitalize(product.color)}</p>
      <p><strong>Material:</strong> ${capitalize(product.material)}</p>
      <p><strong>Size:</strong> ${product.size}</p>
      <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
      <p><strong>Rating:</strong> ${product.rating} ⭐</p>
      <p><strong>Stock:</strong> ${product.stock}</p>
      <p><strong>Description:</strong> ${product.description}</p>
    `;
}

// Delete product by id
function deleteProduct(id) {
  const idxAll = products.findIndex(p => p.id === id);
  if (idxAll > -1) products.splice(idxAll, 1);

  const idxFiltered = filteredProducts.findIndex(p => p.id === id);
  if (idxFiltered > -1) filteredProducts.splice(idxFiltered, 1);

  applyFilters();
}

// Filter products by selected filters
function applyFilters() {
  const catVal = categoryFilter.value;
  const colVal = colorFilter.value;

  filteredProducts = products.filter(p => {
    const catMatch = catVal === '' || p.category === catVal;
    const colMatch = colVal === '' || p.color === colVal;
    return catMatch && colMatch;
  });

  renderProducts(filteredProducts);
}

// Back button click (to go back from detail)
backButton.addEventListener('click', () => {
  detailView.style.display = 'none';
  backButton.classList.add('hidden');
  renderProducts(filteredProducts);
});

// Event listeners for filters
categoryFilter.addEventListener('change', applyFilters);
colorFilter.addEventListener('change', applyFilters);

// Initialize
populateFilters();
renderProducts(products);
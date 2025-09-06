const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});


searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
        // If search is empty, go back to current page
        renderPage(currentPage);
        return;
    }

    // Find the first animal whose name includes the query (case-insensitive)
    const foundAnimal = animals.find(animal =>
        animal.name.toLowerCase().includes(query)
    );

    if (foundAnimal) {
        showAnimalDetail(foundAnimal);
    } else {
        alert('No animal found with that name.');
    }
});

const container = document.getElementById('animalContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

const ITEMS_PER_PAGE = 12;
let currentPage = 1;
let animals = [];

// Create card HTML
function createAnimalCard(animal) {
  const card = document.createElement('div');
  card.className = 'card';

  const isLiked = likedPhotos.includes(animal.name); // assuming name is unique

  card.innerHTML = `
    <div class="card-image">
      <img src="${animal.image_url}" alt="${animal.name}" class="animal-image-click">
      <div class="image-overlay">
        <span class="animal-name">${animal.name}</span>
      </div>
      <div class="card-content" style="display:none;">
        <h3>${animal.name}</h3>
        <p><strong>Description:</strong> ${animal.description}</p>
        <p><strong>Habitat:</strong> ${animal.habitat}</p>
        <p><strong>Weight:</strong> ${animal.weight_kg} kg</p>
        <p><strong>Lifespan:</strong> ${animal.lifespan} years</p>
      </div>
      <div class="card-footer">
        <span class="photo-date">${animal.date_of_photo}</span>
        <span class="view-count">${animal.view_count.toLocaleString()} views</span>
        <button class="like-btn" data-name="${animal.name}">
          ${isLiked ? '❤️ Liked' : '🤍 Like'}
        </button>
      </div>
    </div>
  `;

  card.querySelector('.card-image').addEventListener('click', () => {
    showAnimalDetail(animal);
  });

  // Like button click
  card.querySelector('.like-btn').addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent triggering the card click
    toggleLike(animal.name);
    renderPage(currentPage); // Re-render page to reflect changes
  });

  return card;
}

function showAnimalDetail(animal) {
    // Hide the main heading and pagination
    document.getElementById('mainHeading').style.display = 'none';
    document.getElementById('pagination').style.display = 'none';

    container.innerHTML = ''; // Clear the container

    const detail = document.createElement('div');
    detail.className = 'animal-detail two-column';

    detail.innerHTML = `
        <div class="detail-left">
            <img src="${animal.image_url}" alt="${animal.name}" class="detail-image">
            <h2 class="detail-name">${animal.name}</h2>
        </div>
        <div class="detail-right">
            <p><strong>Description:</strong> ${animal.description}</p>
            <p><strong>Species:</strong> ${animal.species}</p>
            <p><strong>Genus:</strong> ${animal.genus}</p>
            <p><strong>Family:</strong> ${animal.family}</p>
            <p><strong>Class:</strong> ${animal.class}</p>
            <p><strong>Breed:</strong> ${animal.breed}</p>
            <p><strong>Habitat:</strong> ${animal.habitat}</p>
            <p><strong>Category:</strong> ${animal.category}</p>
            <p><strong>Color:</strong> ${animal.color}</p>
            <p><strong>Size:</strong> ${animal.size}</p>
            <p><strong>Weight:</strong> ${animal.weight_kg} kg</p>
            <p><strong>Lifespan:</strong> ${animal.lifespan} years</p>
            <p><strong>Photo Date:</strong> ${animal.date_of_photo}</p>
            <p><strong>Views:</strong> ${animal.view_count.toLocaleString()}</p>
            <button id="backBtn" class="back-btn">← Back to list</button>
        </div>
    `;

    container.appendChild(detail);

    // Add Related Photos heading after detail
    const relatedTitle = document.createElement('h2');
    relatedTitle.textContent = "Related Photos";
    relatedTitle.className = 'related-title';
    container.appendChild(relatedTitle);

    // Related photos container
    const relatedContainer = document.createElement('div');
    relatedContainer.className = 'container';

    // Pick 8 random related animals excluding current
    const relatedAnimals = animals.filter(a => a.name !== animal.name)
        .sort(() => 0.5 - Math.random())
        .slice(0, 8);

    relatedAnimals.forEach(relAnimal => {
        const card = createAnimalCard(relAnimal);
        relatedContainer.appendChild(card);
    });

    container.appendChild(relatedContainer);

    // Back button event
    document.getElementById('backBtn').addEventListener('click', () => {
        // Show heading and pagination back
        document.getElementById('mainHeading').style.display = 'block';
        document.getElementById('pagination').style.display = 'block';
        renderPage(currentPage);
    });
}




// Render current page of animals
function renderPage(page) {
    document.getElementById('mainHeading').style.display = '';
    document.getElementById('pagination').style.display = '';

    container.innerHTML = '';

    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageItems = animals.slice(start, end);

    pageItems.forEach(animal => {
        const card = createAnimalCard(animal);
        container.appendChild(card);
    });

    const totalPages = Math.ceil(animals.length / ITEMS_PER_PAGE);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = page <= 1;
    nextBtn.disabled = page >= totalPages;
}

// Fetch JSON and initialize
fetch('animals.json')
    .then(response => response.json())
    .then(data => {
        animals = data;
        renderPage(currentPage);
    })
    .catch(err => console.error('Error loading animals.json:', err));

// Event listeners for pagination
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
    }
});

nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(animals.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
        currentPage++;
        renderPage(currentPage);
    }
});




let likedPhotos = JSON.parse(localStorage.getItem('likedPhotos')) || [];

function toggleLike(name) {
  const index = likedPhotos.indexOf(name);
  if (index === -1) {
    likedPhotos.push(name);
  } else {
    likedPhotos.splice(index, 1);
  }
  localStorage.setItem('likedPhotos', JSON.stringify(likedPhotos));
}
document.getElementById('showLikedBtn').addEventListener('click', () => {
  const likedAnimals = animals.filter(a => likedPhotos.includes(a.name));
  container.innerHTML = '';

  if (likedAnimals.length === 0) {
    container.innerHTML = '<p style="text-align:center;">You haven\'t liked any photos yet.</p>';
    return;
  }

  likedAnimals.forEach(animal => {
    const card = createAnimalCard(animal);
    container.appendChild(card);
  });

  // Hide heading and pagination
  document.getElementById('mainHeading').style.display = 'none';
  document.getElementById('pagination').style.display = 'none';
});

const API_URL = "https://fakestoreapi.com/products";

const container = document.querySelector(".main-container");
const categorySelect = document.querySelector("#category");
const sortSelect = document.querySelector("#sort");

let allProducts = [];
let currentCategory = "all";
let currentSort = "default";

const formatPrice = (price) => `$${Number(price).toFixed(2)}`;

const createCard = (product) => {
  const card = document.createElement("div");
  card.classList.add("card");

  // Image Container
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;
  img.loading = "lazy";

  imageContainer.appendChild(img);

  // Content Container
  const content = document.createElement("div");
  content.classList.add("content");

  const title = document.createElement("h2");
  title.classList.add("title");
  title.textContent = product.title;
  title.title = product.title;

  const description = document.createElement("p");
  description.classList.add("description");
  description.textContent = product.description;

  content.append(title, description);

  const footer = document.createElement("div");
  footer.classList.add("footer");

  const price = document.createElement("div");
  price.classList.add("price");
  price.textContent = formatPrice(product.price);

  footer.append(price);

  card.append(imageContainer, content, footer);

  return card;
};

const showStatus = (message) => {
  container.innerHTML = "";
  const status = document.createElement("p");
  status.textContent = message;
  status.style.textAlign = "center";
  status.style.width = "100%";
  status.style.fontSize = "1.2rem";
  status.style.color = "#6b7280";

  container.appendChild(status);
};

const loadProducts = async () => {
  if (!container) return;

  showStatus("Loading products...");

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    allProducts = await response.json();

    populateCategories(allProducts);
    renderProducts();
  } catch (error) {
    console.error("Failed to load products", error);
    showStatus(
      "Failed to load products. Please check your internet connection.",
    );
  }
};

const populateCategories = (products) => {
  if (!categorySelect) return;

  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category)),
  ).sort();

  categorySelect.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All";
  categorySelect.appendChild(allOption);

  uniqueCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  categorySelect.value = currentCategory;
};

const getFilteredProducts = () => {
  if (currentCategory === "all") return [...allProducts];
  return allProducts.filter((product) => product.category === currentCategory);
};

const renderProducts = () => {
  container.innerHTML = "";

  const filtered = getFilteredProducts();

  if (filtered.length === 0) {
    showStatus("No products found for this category.");
    return;
  }

  const sorted = [...filtered];

  if (currentSort === "low-to-high") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (currentSort === "high-to-low") {
    sorted.sort((a, b) => b.price - a.price);
  }

  sorted.forEach((product) => {
    container.appendChild(createCard(product));
  });
};

document.addEventListener("DOMContentLoaded", loadProducts);

if (sortSelect) {
  sortSelect.addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderProducts();
  });
}

if (categorySelect) {
  categorySelect.addEventListener("change", (e) => {
    currentCategory = e.target.value;
    renderProducts();
  });
}

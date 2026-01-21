const API_URL = "https://fakestoreapi.com/products";

const container = document.querySelector(".main-container");

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

  const category = document.createElement("span");
  category.classList.add("category");
  category.textContent = product.category;

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

    const products = await response.json();

    container.innerHTML = "";
    products.forEach((product) => {
      container.appendChild(createCard(product));
    });
  } catch (error) {
    console.error("Failed to load products", error);
    showStatus("Failed to load products. Please check your internet connection.");
  }
};

document.addEventListener("DOMContentLoaded", loadProducts);

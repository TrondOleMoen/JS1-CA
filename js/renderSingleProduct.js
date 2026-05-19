import { BASE_URL } from "./api.js";
import { addToCart } from "./cart.js";
import { renderNav } from "./nav.js";

renderNav();

const id = new URLSearchParams(window.location.search).get("id");
const productDetails = document.getElementById("product-details");
const productImage = document.getElementById("product-image");

async function displayProduct() {
  const response = await fetch(`${BASE_URL}gamehub/${id}`);
  const data = await response.json();
  const product = data.data;

  const title = document.createElement("h2");
  const ageRating = document.createElement("p");
  const description = document.createElement("p");
  const price = document.createElement("p");
  const image = document.createElement("img");
  const addToCartBtn = document.createElement("button");
  const released = document.createElement("p");
  const genre = document.createElement("p");

  image.src = product.image.url;
  image.alt = product.title;
  title.textContent = product.title;
  ageRating.textContent = `Age rating: ${product.ageRating}`;
  description.textContent = product.description;
  released.textContent = `Released: ${product.released}`;
  genre.textContent = `Genre: ${product.genre}`;
  price.textContent = product.onSale
    ? `$${product.discountedPrice}`
    : `$${product.price}`;

  addToCartBtn.textContent = "Add to cart";
  addToCartBtn.className = "cta-btn";
  addToCartBtn.addEventListener("click", () => {
    addToCart(product);
    addToCartBtn.textContent = "Added!";
    setTimeout(() => {
      addToCartBtn.textContent = "Add to cart";
    }, 1000);
    window.location.reload();
  });

  productImage.append(image);
  productDetails.append(
    title,
    description,
    released,
    genre,
    ageRating,
    price,
    addToCartBtn,
  );
}

displayProduct();

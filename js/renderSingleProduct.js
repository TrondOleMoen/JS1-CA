import { BASE_URL } from "./api.js";

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
  const detailsBtn = document.createElement("a");
  const released = document.createElement("p");
  const genre = document.createElement("p");

  console.log(product);

  image.src = product.image.url;
  image.alt = product.title;
  title.textContent = product.title;
  ageRating.textContent = product.ageRating;
  description.textContent = product.description;
  released.textContent = product.released;
  genre.textContent = product.genre;

  detailsBtn.textContent = "Add to cart";
  detailsBtn.className = "cta-btn";
  //   detailsBtn.addEventListener = ;
  // add cart logic here

  productImage.append(image);
  productDetails.append(
    title,
    description,
    released,
    genre,
    ageRating,
    detailsBtn,
  );
}

displayProduct();

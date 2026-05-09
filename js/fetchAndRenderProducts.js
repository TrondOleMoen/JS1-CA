import { BASE_URL } from "./api.js";

async function fetchProducts() {
  const productsContainer = document.getElementById("container");

  try {
    const response = await fetch(`${BASE_URL}gamehub`);
    const data = await response.json();
    const products = data.data;

    products.forEach((product) => {
      const card = document.createElement("div");
      const title = document.createElement("h2");
      const ageRating = document.createElement("p");
      const price = document.createElement("p");
      const thumbnail = document.createElement("img");
      const detailsBtn = document.createElement("a");
      console.log(product);

      thumbnail.src = product.image.url;
      thumbnail.alt = product.title;
      title.textContent = product.title;
      ageRating.textContent = product.ageRating;
      detailsBtn.textContent = "Details";
      detailsBtn.href = `/product.html?id=${product.id}`;

      card.className = "card";
      detailsBtn.className = "cta-btn";

      //Price logic
      if (product.onSale === true) {
        price.textContent = `$${product.discountedPrice}`;
      } else if (product.onSale === false) {
        price.textContent = product.price;
      }

      card.append(thumbnail, title, price, ageRating, detailsBtn);
      productsContainer.append(card);
    });
  } catch (error) {
    console.error(error, "something went wrong");
  }
}
fetchProducts();

import { getCart, clearCart } from "./cart.js";
import { renderNav } from "./nav.js";

renderNav();

const cart = getCart();
const container = document.getElementById("checkout-container");

cart.forEach((item) => {
  const unitPrice = item.onSale ? item.discountedPrice : item.price;

  const row = document.createElement("div");
  row.className = "cart-item";

  const img = document.createElement("img");
  img.src = item.image.url;
  img.alt = item.title;

  const info = document.createElement("div");
  info.className = "cart-item-info";

  const title = document.createElement("h3");
  title.textContent = item.title;

  const qty = document.createElement("p");
  qty.textContent = `Quantity: ${item.quantity}`;

  const price = document.createElement("p");
  price.textContent = `$${(unitPrice * item.quantity).toFixed(2)}`;

  info.append(title, qty, price);
  row.append(img, info);
  container.append(row);
});

// Total
const total = cart.reduce((sum, item) => {
  const unitPrice = item.onSale ? item.discountedPrice : item.price;
  return sum + unitPrice * item.quantity;
}, 0);

const totalEl = document.createElement("p");
totalEl.className = "cart-total";
totalEl.textContent = `Total: $${total.toFixed(2)}`;

const form = document.createElement("form");
form.id = "checkout-form";

container.append(totalEl);

// Lag felt: namn, e-post, adresse, kortnummer, utløp, cvc

const nameInput = document.createElement("input");
nameInput.type = "text";
nameInput.placeholder = "full name";
nameInput.required = true;

const emailInput = document.createElement("input");
emailInput.type = "email";
emailInput.placeholder = "email";
emailInput.required = true;

const addressInput = document.createElement("input");
addressInput.type = "text";
addressInput.placeholder = "address";
addressInput.required = true;

const cardInput = document.createElement("input");
cardInput.type = "text";
cardInput.placeholder = "cardnumbers";
cardInput.required = true;

const expireInput = document.createElement("input");
expireInput.type = "text";
expireInput.placeholder = "01/11";
expireInput.required = true;

const cvcInput = document.createElement("input");
cvcInput.type = "text";
cvcInput.placeholder = "123";
cvcInput.required = true;

const submitBtn = document.createElement("button");
submitBtn.type = "submit";
submitBtn.className = "submit-btn";
submitBtn.textContent = "Pay";

form.addEventListener("submit", (e) => {
  e.preventDefault(); // hindra side-relasting

  if (!form.checkValidity()) {
    // viser feilmelding
    return;
  }

  // "betaling" godkjend - tøm cart og redirect
  clearCart();
  window.location.href = "/confirmation.html";
});

form.append(
  nameInput,
  emailInput,
  addressInput,
  cardInput,
  expireInput,
  cvcInput,
  submitBtn,
);

container.append(form);

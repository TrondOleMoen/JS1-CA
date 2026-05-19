import {
  getCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "./cart.js";
import { renderNav } from "./nav.js";

renderNav();

function renderCartPage() {
  const container = document.getElementById("cart-container");
  container.innerHTML = "";

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cart-item";

    const img = document.createElement("img");
    img.src = item.image.url;
    img.alt = item.title;

    const info = document.createElement("div");
    info.className = "cart-item-info";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const unitPrice = item.onSale ? item.discountedPrice : item.price;

    const qty = document.createElement("p");
    qty.textContent = `Quantity: ${item.quantity}`;

    const price = document.createElement("p");
    price.textContent = `$${(unitPrice * item.quantity).toFixed(2)}`;

    const decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "-";
    decreaseBtn.className = "decrease-btn";
    decreaseBtn.addEventListener("click", () => {
      decreaseQuantity(item.id);
      renderCartPage();
      renderNav();
    });

    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";
    increaseBtn.className = "increase-btn";
    increaseBtn.addEventListener("click", () => {
      increaseQuantity(item.id);
      renderCartPage();
      renderNav();
    });

    const quantityDisplay = document.createElement("span");
    quantityDisplay.textContent = item.quantity;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";
    removeBtn.addEventListener("click", () => {
      removeFromCart(item.id);
      renderCartPage();
      renderNav();
    });

    const quantityWrapper = document.createElement("div");
    quantityWrapper.className = "quantity-wrapper";
    quantityWrapper.append(
      decreaseBtn,
      quantityDisplay,
      increaseBtn,
      removeBtn,
    );

    info.append(title, quantityWrapper, price);
    row.append(img, info);
    container.append(row);
  });

  const total = cart.reduce((sum, item) => {
    const unitPrice = item.onSale ? item.discountedPrice : item.price;
    return sum + unitPrice * item.quantity;
  }, 0);

  const totalEl = document.createElement("p");
  totalEl.className = "cart-total";
  totalEl.textContent = `Total: $${total.toFixed(2)}`;

  const checkoutBtn = document.createElement("button");
  checkoutBtn.textContent = "To checkout";
  checkoutBtn.className = "checkout-btn";
  checkoutBtn.addEventListener("click", () => {
    window.location.href = "/checkout.html";
  });

  const clearBtn = document.createElement("button");
  clearBtn.textContent = "Clear cart";
  clearBtn.className = "cta-btn";
  clearBtn.addEventListener("click", () => {
    clearCart();
    renderCartPage();
    renderNav();
  });

  const footer = document.createElement("div");
  footer.className = "cart-footer";
  footer.append(clearBtn, checkoutBtn);

  container.append(totalEl, footer);
}

renderCartPage();

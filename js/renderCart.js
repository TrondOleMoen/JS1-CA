import { getCart, removeFromCart, clearCart } from "./cart.js";
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

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";
    removeBtn.addEventListener("click", () => {
      removeFromCart(item.id);
      renderCartPage();
    });

    info.append(title, qty, price, removeBtn);
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

  const clearBtn = document.createElement("button");
  clearBtn.textContent = "Clear cart";
  clearBtn.className = "cta-btn";
  clearBtn.addEventListener("click", () => {
    clearCart();
    renderCartPage();
  });

  container.append(totalEl, clearBtn);
}

renderCartPage();

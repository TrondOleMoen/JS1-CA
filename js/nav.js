import { getCartCount } from "./cart.js";

export function renderNav() {
  const nav = document.querySelector("nav");
  const count = getCartCount();
  nav.innerHTML = `
    <a href="/index.html">Home</a>
    <a href="/cart.html" class="cart-link">
      Cart <span class="cart-badge">${count}</span>
    </a>
  `;
}

export function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      discountedPrice: product.discountedPrice,
      onSale: product.onSale,
      image: product.image,
      quantity: 1,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(id) {
  const cart = getCart().filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem("cart");
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

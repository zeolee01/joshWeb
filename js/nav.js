document.addEventListener("DOMContentLoaded", () => {
  // Wait until DOM is fully loaded
  const cartButton = document.getElementById("cart-button")
  const cartOverlay = document.getElementById("cart-overlay")
  const closeCart = document.getElementById("close-cart")
  const body = document.body

  // Open Cart Popup
  cartButton.addEventListener("click", () => {
    cartOverlay.style.display = "flex"
    body.style.overflow = "hidden"
  })

  // Close Cart Popup
  closeCart.addEventListener("click", () => {
    cartOverlay.style.display = "none"
    body.style.overflow = "auto"
  })

  // Close Cart by Clicking Outside Content
  cartOverlay.addEventListener("click", (e) => {
    if (e.target === cartOverlay) {
      cartOverlay.style.display = "none"
      body.style.overflow = "auto"
    }
  })
})

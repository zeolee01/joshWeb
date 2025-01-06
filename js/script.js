// Function to load an HTML file into a specific element
function loadHTML(file, elementId) {
  fetch(file)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${file}`)
      }
      return response.text()
    })
    .then((data) => {
      document.getElementById(elementId).innerHTML = data
    })
    .catch((error) => console.error(error))
}

// Load the components
loadHTML("components/navbar.html", "navbar") // Load Navbar
loadHTML("components/searchSection.html", "searchSection")
loadHTML("components/homeKitchen.html", "home-kitchen") // Load Cards
loadHTML("components/popularItems.html", "popular-items")
loadHTML("components/videoSection.html", "video-section")
loadHTML("components/formSection.html", "form-section")
loadHTML("components/footer.html", "footer") // Load Footer

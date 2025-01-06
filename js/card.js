import { foodItems } from "./data.js"

async function fetchCardTemplate() {
  try {
    const response = await fetch("../components/card.html")
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.text()
  } catch (error) {
    console.error("Error fetching template:", error)
    return "" // Return an empty string on error
  }
}

// Function to generate cards with dynamic data
async function generateFoodCards(data) {
  const template = await fetchCardTemplate()
  const container = document.getElementById("foodCardsContainer")
  if (!container) {
    console.error("Container not found!")
    return
  }
  container.innerHTML = ""

  data.forEach((item) => {
    let cardHTML = template
      .replace("{IMAGE}", item.image)
      .replace("{NAME}", item.name)
      .replace("{PRICE}", item.price)
      .replace("{RATING}", item.rating)
      .replace("{DELIVERY_TIME}", item.deliveryTime)

    if (item.offer !== "") {
      cardHTML = cardHTML.replace("{OFFER}", item.offer)
    } else {
      // Use a regex to match the div with the placeholder and replace it
      cardHTML = cardHTML.replace(
        /<div class="offer">.*?<\/div>/s, // `s` flag allows `.` to match newlines as well
        ""
      )
    }
    container.innerHTML += cardHTML
  })
}
generateFoodCards(foodItems)

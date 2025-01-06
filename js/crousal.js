import { foodItems } from "./data.js"
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(async () => {
    const carouselTrack = document.querySelector(".carousel-track")
    const leftBtn = document.querySelector(".left-btn")
    const rightBtn = document.querySelector(".right-btn")

    // Check if elements exist in the DOM
    if (!carouselTrack) {
      console.error("Carousel track not found!")
    }
    if (!leftBtn) {
      console.error("Left button not found!")
    }
    if (!rightBtn) {
      console.error("Right button not found!")
    }

    // Fetch template from file
    async function loadCardTemplate() {
      try {
        const response = await fetch("../components/card.html")
        console.log("../components/crousal.html") // Log the path to verify it
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`)
        return await response.text()
      } catch (error) {
        console.error("Error fetching template:", error)
        return ""
      }
    }

    // Populate carousel
    async function populateCarousel(items) {
      try {
        const template = await loadCardTemplate()
        if (!template) throw new Error("Failed to load template.")

        items.forEach((item) => {
          let cardHTML = template
            .replace("{NAME}", item.name)
            .replace("{PRICE}", item.price)
            .replace("{IMAGE}", item.image)
            .replace("{RATING}", item.rating)
            .replace("{DELIVERY_TIME}", item.deliveryTime)

          // Handle offer conditionally
          if (item.offer !== "") {
            cardHTML = cardHTML.replace("{OFFER}", item.offer)
          } else {
            // Use a regex to match the div with the placeholder and replace it
            cardHTML = cardHTML.replace(
              /<div class="offer">.*?<\/div>/s, // `s` flag allows `.` to match newlines as well
              ""
            )
          }

          // Append the card to the track
          carouselTrack.innerHTML += cardHTML
        })

        // Successfully populated
        console.log("Carousel populated successfully.")
      } catch (error) {
        console.error("Error populating carousel:", error)
      }
    }

    // Call populateCarousel and set up carousel navigation logic
    await populateCarousel(foodItems)

    // Carousel navigation logic
    let currentSlide = 0
    const cardWidth = 330 // Adjust based on your card width + gap
    const totalSlides = foodItems.length - 2

    function updateCarouselPosition() {
      carouselTrack.style.transform = `translateX(-${
        currentSlide * cardWidth
      }px)`
      leftBtn.disabled = currentSlide === 0
      rightBtn.disabled = currentSlide >= totalSlides - 1
    }

    leftBtn.addEventListener("click", () => {
      if (currentSlide > 0) currentSlide--
      updateCarouselPosition()
    })

    rightBtn.addEventListener("click", () => {
      if (currentSlide < totalSlides - 1) currentSlide++
      updateCarouselPosition()
    })

    updateCarouselPosition()

    let isDragging = false
    let startX = 0
    let scrollLeft = 0

    carouselTrack.addEventListener("mousedown", (e) => {
      isDragging = true
      startX = e.pageX - carouselTrack.offsetLeft
      scrollLeft = carouselTrack.scrollLeft
      carouselTrack.style.cursor = "grabbing"
    })

    carouselTrack.addEventListener("mouseleave", () => {
      isDragging = false
      carouselTrack.style.cursor = "default"
    })

    carouselTrack.addEventListener("mouseup", () => {
      isDragging = false
      carouselTrack.style.cursor = "default"
    })

    carouselTrack.addEventListener("mousemove", (e) => {
      if (!isDragging) return
      e.preventDefault()
      const x = e.pageX - carouselTrack.offsetLeft
      const walk = (x - startX) * 2 // Adjust scroll sensitivity
      carouselTrack.scrollLeft = scrollLeft - walk
    })

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        leftBtn.click() // Trigger left button click
      } else if (e.key === "ArrowRight") {
        rightBtn.click() // Trigger right button click
      }
    })
    //

    const requestDishBtn = document.getElementById("request-dish-btn")
    const requestDishOverlay = document.getElementById("request-dish-overlay")
    const closeRequestDishBtn = document.getElementById("close-request-dish")
    const submitDishBtn = document.getElementById("submit-request-dish")
    const body = document.body

    // Show the "Request a Dish" popup and disable scrolling
    requestDishBtn.addEventListener("click", () => {
      requestDishOverlay.style.display = "block"
      body.style.overflow = "hidden" // Disable scrolling
    })

    // Close the "Request a Dish" popup and enable scrolling
    closeRequestDishBtn.addEventListener("click", () => {
      requestDishOverlay.style.display = "none"
      body.style.overflow = "auto" // Enable scrolling
    })

    submitDishBtn.addEventListener("click", () => {
      requestDishOverlay.style.display = "none"
      body.style.overflow = "auto" // Enable scrolling
    })
    // Close the overlay when clicking outside the popup
    requestDishOverlay.addEventListener("click", (e) => {
      if (e.target === requestDishOverlay) {
        requestDishOverlay.style.display = "none"
        body.style.overflow = "auto" // Enable scrolling
      }
    })
  }, 500)
})

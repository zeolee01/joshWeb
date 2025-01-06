document.addEventListener("DOMContentLoaded", () => {
  // Delay execution by 1 second
  setTimeout(() => {
    // Select the video element and play/pause button
    const video = document.getElementById("videoElement")
    const playPauseButton = document.getElementById("playPauseButton")

    if (!video || !playPauseButton) {
      console.error("Video element or play/pause button not found!")
      return
    }

    // Show the button when the video is paused
    video.addEventListener("pause", () => {
      playPauseButton.style.display = "flex"
    })

    // Hide the button when the video is playing
    video.addEventListener("play", () => {
      playPauseButton.style.display = "none"
    })

    // Toggle play/pause functionality when the button is clicked
    playPauseButton.addEventListener("click", () => {
      if (video.paused) {
        video.play() // Play the video
      } else {
        video.pause() // Pause the video
      }
    })

    // Ensure the button is initially hidden if the video starts playing
    if (!video.paused) {
      playPauseButton.style.display = "none" // Hide button
    } else {
      playPauseButton.style.display = "flex" // Show button if video is paused
    }

    // Add functionality to pause video and show the button when clicking anywhere on the video
    video.addEventListener("click", () => {
      if (!video.paused) {
        video.pause()
      } else {
        video.play()
      }
      playPauseButton.style.display = "flex"
    })
  }, 1000)
})

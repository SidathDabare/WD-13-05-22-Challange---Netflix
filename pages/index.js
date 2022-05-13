//show search bar---------------------
let searchBar = document.querySelector("#searchBar")
function showSearch() {
  searchBar.classList.add("input-display")
}
// Change navbar bg---------------------
window.onscroll = function () {
  scrollNavbar()
}
function scrollNavbar() {
  let navbarBg = document.querySelector("#navbarBg")
  let navLinks = document.querySelectorAll(".nav-link")
  //console.log(navLinks);
  if (document.documentElement.scrollTop > 2) {
    navbarBg.classList.add("scroll")
    // Change the color of navLinks on scroll
    for (let i = 0; i < navLinks.length; i++) {
      const element = navLinks[i]
      element.classList.add(".linkColor")
    }
  } else {
    navbarBg.classList.remove("scroll")
    // Change the color of navLinks back to default
    for (let i = 0; i < navLinks.length; i++) {
      const element = navLinks[i]
      element.classList.remove(".linkColor")
    }
  }
}
//------------------------------------------------------------
const slider = document.querySelector(".slider")
const btnLeft = document.getElementById("moveLeft")
const btnRight = document.getElementById("moveRight")
const indicators = document.querySelectorAll(".indicator")

let baseSliderWidth = slider.offsetWidth
let activeIndex = 0 // the current page on the slider

// Fill the slider with all the movies in the "movies" array

// delete the initial movie in the html
// const initialMovie = document.getElementById("movie0");
// initialMovie.remove();

// Update the indicators that show which page we're currently on
function updateIndicators(index) {
  indicators.forEach((indicator) => {
    indicator.classList.remove("current")
  })
  let newActiveIndicator = indicators[index]
  newActiveIndicator.classList.add("current")
}

// Scroll Left button
btnLeft.addEventListener("click", (e) => {
  let movieWidth = document
    .querySelector(".movie")
    .getBoundingClientRect().width
  let scrollDistance = movieWidth * 6 // Scroll the length of 6 movies. TODO: make work for mobile because (4 movies/page instead of 6)

  slider.scrollBy({
    top: 0,
    left: -scrollDistance,
    behavior: "smooth",
  })
  activeIndex = (activeIndex - 1) % 3
  console.log(activeIndex)
  updateIndicators(activeIndex)
})

// Scroll Right button
btnRight.addEventListener("click", (e) => {
  let movieWidth = document
    .querySelector(".movie")
    .getBoundingClientRect().width
  let scrollDistance = movieWidth * 6 // Scroll the length of 6 movies. TODO: make work for mobile because (4 movies/page instead of 6)

  console.log(`movieWidth = ${movieWidth}`)
  console.log(`scrolling right ${scrollDistance}`)

  //   // if we're on the last page
  if (activeIndex == 2) {
    // duplicate all the items in the slider (this is how we make 'looping' slider)
    populateSlider()
    slider.scrollBy({
      top: 0,
      left: +scrollDistance,
      behavior: "smooth",
    })
    activeIndex = 0
    updateIndicators(activeIndex)
  } else {
    slider.scrollBy({
      top: 0,
      left: +scrollDistance,
      behavior: "smooth",
    })
    activeIndex = (activeIndex + 1) % 3
    console.log(activeIndex)
    updateIndicators(activeIndex)
  }
})

slider.addEventListener("scroll", (e) => {
  console.log(slider.scrollLeft)
  console.log(slider.offsetWidth)
})

//play video on hover---------------------
const VideoController = function (isHovering, videoElement) {
  if (isHovering == true) {
    videoElement.play()
  } else if (isHovering == false) {
    videoElement.pause()
  }
}

//------------------------------------------------------------------------------------------------------

const category = "drama".toLowerCase()
console.log(category)
window.onload = () => {
  loadProducts()
}
const endpoint = `https://striveschool-api.herokuapp.com/api/movies/${category}`

const loadProducts = async () => {
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdjZjg3MzZkMDZiOTAwMTUyZWYyOGMiLCJpYXQiOjE2NTIzNTcyMzUsImV4cCI6MTY1MzU2NjgzNX0.uJ9IcyjqqB2WQ842oL3FhYbxUU6dfUJGcMMwlTDZFa4",
      },
    })
    const movies = await response.json()
    console.log(movies)
    populateSlider(movies)
    //renderProducts(products);
  } catch (err) {
    console.log(err)
  }
  console.log("HERE")
}

function populateSlider(movies) {
  movies.forEach((movie) => {
    console.log(movie.name)
    const newMovie = document.getElementById("movie0")
    //let newDiv = document.createElement("div");
    newMovie.innerHTML = `
         <img id="thumnail-video" src=${movie.imageUrl} alt="" srcset="">      
        <div class="description">
          <div class="description__buttons-container">
            <div class="description__button"><i class="fas fa-play"></i></div>
            <div class="description__button"><i class="fas fa-plus"></i></div>
            <div class="description__button"><i class="fas fa-thumbs-up"></i></div>
             <div class="description__button"><i class="fas fa-thumbs-down"></i></div>
            <div class="description__button"><i class="fas fa-chevron-down"></i></div>
          </div>
          <div class="description__text-container">
            <span class="description__match font-weight-bold">97% Match</span>
            <span class="description__rating px-2 py-0">T</span>
            <span class="description__length">2h 11m</span>
          <span class="description__rating px-1 py-n1 font-weight-bold rounded">HD</span>
            <br><br>
            <a class="btn btn-outline-secondary rounded-0 py-0 m-auto"" href="./pages/backoffice.html?movieId=${movie._id}">ACTION</a>
  
          </div>
          
        </div>`
    //newMovie.appendChild(newDiv);
    // Clone the initial movie thats included in the html, then replace the image with a different one
    // const newMovie = document.getElementById("movie0");
    let clone = newMovie.cloneNode(true)
    // let img = clone.querySelector("video");
    // img.src = image.src;
    slider.insertBefore(clone, slider.childNodes[slider.childNodes.length - 1])
  })
  return movies
}

window.onload = () => {
  loadMovies(endpoint)
  createCategories()
  createMovieDiv()
}
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
  } else {
    navbarBg.classList.remove("scroll")
    // Change the color of navLinks back to default
  }
}
// Connect to Api-----------
const endpoint = `https://striveschool-api.herokuapp.com/api/movies/`
// Get API Response-----------
const loadMovies = async (endpoint) => {
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
    //console.log(movies)
    return movies
  } catch (err) {
    console.log(err)
  }
  console.log("HERE")
}

let categoryArr = []
console.log(categoryArr)
//Get each Category Array--------------
const createCategories = async () => {
  try {
    let categories = await loadMovies(endpoint)
    categories.forEach((category, index) => {
      categoryArr.push(endpoint + category)
    })
  } catch (err) {
    console.log(err)
  }
}

const createMovieDiv = async () => {
  try {
    let categoriesRow = document.getElementById("categories")
    let movieArr = await loadMovies(endpoint)
    categoryArr.forEach(async (category, i) => {
      let movies = await loadMovies(category)
      //console.log(category)
      let categoryDiv = document.createElement("div")
      let titleDiv = document.createElement("div")
      categoryDiv.classList.add("categoryDiv")
      categoryDiv.innerHTML = `
              <button type="button" class="btn btn-outline-danger scrollBtn moveLeft" onclick="btnLeftScroll()"><i class="bi bi-caret-left"></i></button>
              <button type="button" class="btn btn-outline-danger scrollBtn moveRight" onclick="btnRightScroll()"><i class="bi bi-caret-right"></i></button>`
      category = categoryDiv
      categoriesRow.appendChild(titleDiv)
      categoriesRow.appendChild(categoryDiv)
      movies.forEach((movie, index) => {
        titleDiv.innerHTML = `                      
                        <h3 class="card-title text-light ml-3">${movies[index].category}</h3>`
        categoryDiv.innerHTML += `
                      <div class="card border-0 bg-transparent">
                        <img src=${movies[index].imageUrl} class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${movies[index].name}</h5>
                          <p class="card-text">${movies[index].description}</p>
                          <a class="btn btn-outline-danger rounded-0 py-1 px-3 m-auto" href="./pages/backoffice.html?movieId=${movies[index]._id}">ACTION</a>
                        </div>
                      </div>`
      })
    })
  } catch (error) {
    console.log(error)
  }
}

//------------------------------------------------------------
const slider = document.querySelector(".slider")
const btnLeft = document.querySelectorAll(".moveLeft")
const btnRight = document.querySelectorAll(".moveRight")
const indicators = document.querySelectorAll(".indicator")

let baseSliderWidth = slider.offsetWidth
let activeIndex = 0 // the current page on the slider
function updateIndicators(index) {
  indicators.forEach((indicator) => {
    //indicator.classList.remove("current")
  })
  let newActiveIndicator = indicators[index]
  //newActiveIndicator.classList.add("current")
}

const getWidth = () => {
  let categoryDiv = document.querySelectorAll(".card")
  categoryDiv.forEach((element) => {
    let movieWidth = element.getBoundingClientRect().width
    console.log(movieWidth)
    let scrollDistance = movieWidth * 6 // Scroll the length of 6 movies. TODO: make work for mobile because (4 movies/page instead of 6)
    element.scrollBy({
      top: 0,
      left: -scrollDistance,
      behavior: "smooth",
    })
    activeIndex = (activeIndex - 1) % 3
    console.log(activeIndex)
    updateIndicators(activeIndex)
  })
}

// Scroll Left button
const btnLeftScroll = () => {
  getWidth()
  console.log("left")
  // let scrollDistance = movieWidth * 6 // Scroll the length of 6 movies. TODO: make work for mobile because (4 movies/page instead of 6)
  // slider.scrollBy({
  //   top: 0,
  //   left: -scrollDistance,
  //   behavior: "smooth",
  // })
  // activeIndex = (activeIndex - 1) % 3
  // console.log(activeIndex)
  // updateIndicators(activeIndex)
}

// Scroll Right button
const btnRightScroll = () => {
  console.log("first")
  btnRight.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // let movieWidth = document
      //   .querySelector(".movie")
      //   .getBoundingClientRect().width
      // let scrollDistance = movieWidth * 6 // Scroll the length of 6 movies. TODO: make work for mobile because (4 movies/page instead of 6)
      // console.log(`movieWidth = ${movieWidth}`)
      // console.log(`scrolling right ${scrollDistance}`)
      // //   // if we're on the last page
      // if (activeIndex == 2) {
      //   // duplicate all the items in the slider (this is how we make 'looping' slider)
      //   populateSlider()
      //   slider.scrollBy({
      //     top: 0,
      //     left: +scrollDistance,
      //     behavior: "smooth",
      //   })
      //   activeIndex = 0
      //   updateIndicators(activeIndex)
      // } else {
      //   slider.scrollBy({
      //     top: 0,
      //     left: +scrollDistance,
      //     behavior: "smooth",
      //   })
      //   activeIndex = (activeIndex + 1) % 3
      //   console.log(activeIndex)
      //   updateIndicators(activeIndex)
      //}
    })
  })
}

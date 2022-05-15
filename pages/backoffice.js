const endpoint = "https://striveschool-api.herokuapp.com/api/movies/"
const movie_id = new URLSearchParams(window.location.search).get("movieId")
// const options = {
//   headers: {
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdjZjg3MzZkMDZiOTAwMTUyZWYyOGMiLCJpYXQiOjE2NTIzNTcyMzUsImV4cCI6MTY1MzU2NjgzNX0.uJ9IcyjqqB2WQ842oL3FhYbxUU6dfUJGcMMwlTDZFa4",
//     "Content-Type": "application/json",
//   },
// };
// window.onload = async () => {
//   //const submitBtn = document.querySelector("button[type='submit']");
//   //if (product_id) {
//   //document.querySelector(".title").innerText = "EDIT PRODUCT";
//   const response = await fetch(endpoint, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdjZjg3MzZkMDZiOTAwMTUyZWYyOGMiLCJpYXQiOjE2NTIzNTcyMzUsImV4cCI6MTY1MzU2NjgzNX0.uJ9IcyjqqB2WQ842oL3FhYbxUU6dfUJGcMMwlTDZFa4",
//     },
//   });
//   //   const { description, imageUrl, name, category } = await response.json();
//   //   document.getElementById("movieTitle").value = name;
//   //   document.getElementById("description").value = description;
//   //   document.getElementById("category").value = category;
//   //   document.getElementById("image").value = imageUrl;

//   // submitBtn.innerText = "UPDATE PRODUCT";
//   // submitBtn.classList.remove("btn-primary");
//   // submitBtn.classList.add("btn-info");

//   // const deleteBtn = document.querySelector(".deleteBtn");
//   // deleteBtn.classList.remove("d-none");
// };

const postPrducts = async (event) => {
  event.preventDefault()
  const submitObj = {
    name: document.getElementById("movieTitle").value.toLowerCase(),
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
    imageUrl: document.getElementById("image").value,
  }
  console.log(submitObj)
  //   const response = await fetch(endpoint, {
  await fetch(endpoint, {
    method: "POST",
    //method,
    body: JSON.stringify(submitObj),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdjZjg3MzZkMDZiOTAwMTUyZWYyOGMiLCJpYXQiOjE2NTIzNTcyMzUsImV4cCI6MTY1MzU2NjgzNX0.uJ9IcyjqqB2WQ842oL3FhYbxUU6dfUJGcMMwlTDZFa4",
    },
  })

  //   const getId = await response.json();
  //   // console.log("id of" + getId._id);
  //   if (product_id) {
  //     alert("Product with the id of" + getId._id + " got edited");
  //   } else {
  //     alert("Product created successfully with the id of" + getId._id);
  //   }
  //   document.getElementById("movieTitle").value = "";
  //   document.getElementById("description").value = "";
  //   document.getElementById("category").value = "";
  //   document.getElementById("image").value = "";
}
window.onload = async () => {
  console.log(movie_id)

  if (movie_id) {
    const response = await fetch(endpoint + movie_id, {
      method: "PUT",
      //method,
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdjZjg3MzZkMDZiOTAwMTUyZWYyOGMiLCJpYXQiOjE2NTIzNTcyMzUsImV4cCI6MTY1MzU2NjgzNX0.uJ9IcyjqqB2WQ842oL3FhYbxUU6dfUJGcMMwlTDZFa4",
      },
    })
    const { description, imageUrl, name, category } = await response.json()
    document.getElementById("movieTitle").value = name
    document.getElementById("description").value = description
    document.getElementById("category").value = category
    document.getElementById("image").value = imageUrl
  }
}
const updateMovie = async (event) => {
  const submitObj = {
    name: document.getElementById("movieTitle").value,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
    imageUrl: document.getElementById("image").value,
  }
  console.log(submitObj)
  await fetch(endpoint + movie_id, {
    method: "PUT",
    //method,
    body: JSON.stringify(submitObj),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdjZjg3MzZkMDZiOTAwMTUyZWYyOGMiLCJpYXQiOjE2NTIzNTcyMzUsImV4cCI6MTY1MzU2NjgzNX0.uJ9IcyjqqB2WQ842oL3FhYbxUU6dfUJGcMMwlTDZFa4",
    },
  })
  document.getElementById("movieTitle").value = ""
  document.getElementById("description").value = ""
  document.getElementById("category").value = ""
  document.getElementById("image").value = ""
  //event.preventDefault();
}
const deleteProduct = async () => {
  await fetch(endpoint + movie_id, {
    method: "DELETE",
    //method,

    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdjZjg3MzZkMDZiOTAwMTUyZWYyOGMiLCJpYXQiOjE2NTIzNTcyMzUsImV4cCI6MTY1MzU2NjgzNX0.uJ9IcyjqqB2WQ842oL3FhYbxUU6dfUJGcMMwlTDZFa4",
    },
  })
  alert("Movie successfully deleted")
}

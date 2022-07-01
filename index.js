
addYarn();
addComments();

function addYarn(){
 fetch("http://localhost:3000/yarns")
 .then(response => response.json())
 .then(data => {

  data.map(value => createYarnCard(value))
  
  createBrandDropdown();

  })
}

function addComments() {
  fetch('http://localhost:3000/comments')
  .then(response => response.json())
  .then(data => {
  data.map(value => createComment(value))
  })
}

// functionality for creating a list of brand names to use with sorting 

let brandNames = [];

function createBrandDropdown() {
  brandNames.forEach(value => {
    const option = document.createElement('option')

    option.value = `${value}`
    option.textContent = `${value}`
  
    document.getElementById('yarn-brands').appendChild(option)
    })  
  }

function createYarnCard (yarnObj) {
  const section = document.getElementById("yarn-collection")
  const div = document.createElement('div')
  div.className = "card"
  div.innerHTML =`
  <h1>${yarnObj.brand}</h1>
  <h3>Colorway: ${yarnObj.colorway}</h3>
  <h4>Weight: ${yarnObj.weight}</h4>
  <img src ="${yarnObj.image}" alt = "beautiful hand dyed yarn" class="yarn-img"/>
  <div id="like-btn">
    <h5>Number of Likes:<h5>
    <p>${yarnObj.likes}</p>
    <button class="thumb-up-btn" >Like <i class="fa-solid fa-thumbs-up"></i> </button>
  </div>
  <div id="yarn-comments">
    <ul id = "${yarnObj.id}">
  </div>
  <form id="submit-comment">
    <input type="text" placeholder="Leave a comment here" name="review" value=""/>
    <input type="submit" value="Submit comment"/>
  </form>
  `
  // using some logic to sort through brand names and only push single non-recuring values

  if(!brandNames.includes(yarnObj.brand)){
    brandNames.push(yarnObj.brand)
  } 

  // append each yarn object to the DOM

  section.appendChild(div)

  // event listener updates for thumb up and thumb down events 

  div.querySelector(".thumb-up-btn").addEventListener("click", () => {
    const p = div.querySelector("#like-btn p")
    yarnObj.likes += 1
    p.textContent = yarnObj.likes
    updateLikes(yarnObj)
  })

  // event listener to post a review to a yarn card

  div.querySelector('#submit-comment').addEventListener("submit", function (event) {
    event.preventDefault()
    const reviewObj = {
      yarn_id: yarnObj.id,
      comment: event.target.review.value
    }

    fetch('http://localhost:3000/comments', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify(reviewObj)
    })
    .then(response => response.json())
    .then(data => createComment(data))

    div.querySelector('#submit-comment').reset()
  })
}

function createComment(object){
  const commentUl = document.getElementById(`${object.yarn_id}`)
  const li = document.createElement('li')
  li.textContent = object.comment
  commentUl.appendChild(li)
}

// updating likes to the JSON file 

function updateLikes(yarnObj) {
  fetch(`http://localhost:3000/yarns/${yarnObj.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type':'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(yarnObj)
  })
  .then(response =>  response.json())
  .then(data => console.log(data))
}

// functionality to sort yarns by weight 

document.getElementById('yarn-weights').addEventListener('change', sortYarnByWeight)

function sortYarnByWeight(event){
  fetch("http://localhost:3000/yarns")
  .then(response => response.json())
  .then(data => {
    document.getElementById('yarn-collection').innerHTML = ''
    const filteredArray = data.filter(value => value.weight === event.target.value)
    filteredArray.map(value => createYarnCard(value))
  })
}

  // functionality to sort yarns by brand name 

  document.getElementById('yarn-brands').addEventListener('change',sortYarnByBrand)

  function sortYarnByBrand(event){
    fetch("http://localhost:3000/yarns")
    .then(response => response.json())
    .then(data => {
      document.getElementById('yarn-collection').innerHTML = ''
      const filteredArray = data.filter(value => value.brand === event.target.value)
      filteredArray.map(value => createYarnCard(value))
    })
  }

  // functionality to use a reset button to set page to show all entries 

  document.getElementById('reset-btn').addEventListener("click", () =>{
    document.getElementById('yarn-collection').innerHTML = ''
    document.getElementById('yarn-brands').innerHTML =''
    addYarn()
  })

// functionality to take in a new yarn and add it to the JSON file

document.getElementById('create-new-yarn').addEventListener('submit', createNewYarnEntry)


function createNewYarnEntry(event) {
  event.preventDefault()
  const weightSelect = document.getElementById('select-weights')
  const newYarnObj ={
    brand: event.target.brand.value,
    weight: weightSelect.value,
    colorway: event.target.colorway.value,
    image: event.target.image.value,
    likes: 0,
  }
  updateDatabase(newYarnObj)
  document.getElementById('create-new-yarn').reset()
}

function updateDatabase(newYarnObj) {
  fetch("http://localhost:3000/yarns",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newYarnObj)
  })
  .then(response => response.json())
  .then(data => {
    createYarnCard(data)
    document.getElementById('yarn-brands').innerHTML =''
    createBrandDropdown();  
  })
}

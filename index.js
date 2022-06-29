
addYarn();

function addYarn(){
 fetch("http://localhost:3000/yarns")
 .then(response => response.json())
 .then(data => {

  // function to create each yarn item and append it to the DOM 

  data.map(value => createYarnCard(value))
  
  createBrandDropdown();

  })
}

// accesing the brandNames array and creating option elements for each brand name to be
// used in a sorting functionality later 

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
  <div id="likes-container">
    <div id ="btn-container">
      <button class="thumb-up-btn" id="${yarnObj.id}"> <i class="fa-solid fa-thumbs-up"></i> </button>
      <button class="thumb-down-btn" id="${yarnObj.id}"> <i class="fa-solid fa-thumbs-down"></i></i> </button>
    </div>
    <p>${yarnObj.likes}</p>
  </div>
  <form>
    <textarea class="yarn-review" name"yarn-review" rows="3" cols="50"> leave a review here
    </textarea>
    <br>
    <input type="submit" value="submit">
  </form>
  `
  // using some logic to sort through brand names and only push values that have not yet been added

  if(brandNames.includes(yarnObj.brand)){

  } else {
    brandNames.push(yarnObj.brand)
  }

  // append each yarn object to the DOM

  section.appendChild(div)

  // event listener updates for thumb up and thumb down events 

  div.querySelector(".thumb-up-btn").addEventListener("click", () => {
    const p = div.querySelector("#likes-container p")
    yarnObj.likes += 1
    p.textContent = yarnObj.likes
    updateLikes(yarnObj)
  })

  div.querySelector(".thumb-down-btn").addEventListener("click", () => {
    const p = div.querySelector("#likes-container p")
    if(yarnObj.likes > 0){
      yarnObj.likes -= 1
    } else {
      yarnObj.likes = 0
    }
    p.textContent = yarnObj.likes
    updateLikes(yarnObj)
  })
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
    reviews: []
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
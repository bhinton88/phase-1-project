
addYarn()

function addYarn(){
 fetch("http://localhost:3000/yarns")
 .then(response => response.json())
 .then(data => data.map(value => createYarnCard(value)))
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

  section.appendChild(div)

  // event listener updates for thumb up and thumb down events 

  div.querySelector(".thumb-up-btn").addEventListener("click", () => {
    const p = div.querySelector("#likes-container p")
    console.log(p)
    yarnObj.likes += 1
    p.textContent = yarnObj.likes
    updateLikes(yarnObj)
  })

  div.querySelector(".thumb-down-btn").addEventListener("click", () => {
    const p = div.querySelector("#likes-container p")
    console.log(p)
    yarnObj.likes -= 1
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

const select = document.querySelector('#yarn-brands')

select.addEventListener('change', sortYarnByWeight)

function sortYarnByWeight(event){
  fetch("http://localhost:3000/yarns")
  .then(response => response.json())
  .then(data => {
    document.getElementById('yarn-collection').innerHTML = ''
    const filteredArray = data.filter(value => value.weight === event.target.value)
    filteredArray.map(value => createYarnCard(value))
  })
}
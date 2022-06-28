addYarn()

function addYarn(){
 
 fetch("http://localhost:3000/yarns")
 .then(response => response.json())
 .then(data => data.map(value => createYarnCard(value)))

}

function createYarnCard (object) {
  const section = document.getElementById("yarn-collection")
  const div = document.createElement('div')
  div.className = "card"
  div.innerHTML =`
  <h1>${object.brand}</h1>
  <h3>Colorway: ${object.colorway}</h3>
  <h4>Weight: ${object.weight}</h4>
  <img src ="${object.image}" alt = "beautiful hand dyed yarn" class="yarn-img"/>
  <div id="like-btn">
    <button class="like-btn" id="${object.id}"> Like ❤️</button>
    <p>${object.likes}</p>
  </div>
  <form>
    <textarea class="yarn-review" name"yarn-review" rows="3" cols="50"> leave a review here
    </textarea>
    <br>
    <input type="submit" value="submit">
  `
  section.appendChild(div)
}
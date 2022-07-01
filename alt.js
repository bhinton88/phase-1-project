  // div.querySelector('#submit-review').addEventListener("click", function(e) {
  //   const reviewText = div.querySelector('textarea').value
  //   const reviewObj = {
  //     yarn_id: yarnObj.id,
  //     review: reviewText
  //   }

  //   fetch('http://localhost:3000/reviews', {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept' : 'application/json'
  //     },
  //     body: JSON.stringify(reviewObj)
  //   })
  //   .then(response => response.json())
  //   .then(data => function() {
  //     // UL was set to have an ID of the yarn ID in creation of the card 
  //     // so to find the correct UL to append to, pulled out the foreign yarn_id key in our
  //     // returned response from the post request 
  //     const reviewUl = div.querySelector(`#${data.yarn_id}`)
  //     const li = document.createElement('li')
  //     data.review = li.textContent
  //     reviewUl.appendChild(li)
  //   })
  // })
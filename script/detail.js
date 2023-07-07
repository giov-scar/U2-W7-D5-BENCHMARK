const URL = 'https://striveschool-api.herokuapp.com/api/product/'

const addressBarContent = new URLSearchParams(location.search)

const itemId = addressBarContent.get('id')
console.log('ITEMID', itemId)
console.log(URL + itemId)

fetch(URL + itemId, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YmQyYTEyYjUwYzAwMTQ5ZTRlZjMiLCJpYXQiOjE2ODg3MTQ1MzgsImV4cCI6MTY4OTkyNDEzOH0.iRnleq7pmHbhZlWoEd5_nyM-BYeDOMXmzF7NuQ1IfJI",
            'Content-Type': 'application/json',
        }
})
  .then((res) => {
    if (res.ok) {
      return res.json() 
    } else {
      throw new Error("Errore nel recupero dei dettagli dell'Opera")
    }
  })
  .then((detail) => {
    console.log('DETAIL', detail)
    // manipolo il DOM
    // nascondo lo spinner
    const spinnerContainer = document.getElementById('spinner-container')
    spinnerContainer.classList.add('d-none')

    let newCol = document.createElement('div')
    newCol.classList.add('col', 'col-12', 'col-sm-6', 'text-center')
    newCol.innerHTML = `
    <div class="card">
    <img
      src="${detail.imageUrl}"
      class="card-img-top"
      alt="concert placeholder image"
    />
    <div class="card-body">
      <h5 class="card-title">${detail.name}</h5>
      <p class="card-text">
        ${detail.description}
      </p>
      <p class="card-text text-end fst-italic">
        ${detail.brand}
      </p>
      <p class="card-text fw-bold text-end">
      &#36;${detail.price}
      </p>
      <a href="./backoffice.html?id=${detail._id}" class="btn btn-primary">Modifica Opera</a>
      <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Elimina Opera</button>

    </div>
  </div>`
  
    const itemsRow = document.getElementById('items-row')
    itemsRow.appendChild(newCol)

    // assegno al pulsante elimina il suo comportamento
    let deleteButton = document.querySelector('.btn-danger')
    deleteButton.addEventListener('click', function () {
      // "DELETE"
  
      fetch(URL + itemId, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YmQyYTEyYjUwYzAwMTQ5ZTRlZjMiLCJpYXQiOjE2ODg3MTQ1MzgsImV4cCI6MTY4OTkyNDEzOH0.iRnleq7pmHbhZlWoEd5_nyM-BYeDOMXmzF7NuQ1IfJI",
            'Content-Type': 'application/json',
        }
      })
        .then((res) => {
          if (res.ok) {
            
            alert('Opera ELIMINATA!')
            location.assign('index.html')
          } else {
        
            throw new Error("Problema nell'eliminazione dell'Opera")
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })
  })
  .catch((err) => {
    console.log(err)
  })

  



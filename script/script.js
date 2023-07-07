const getItemData = function () {
    const URL = 'https://striveschool-api.herokuapp.com/api/product/'

    fetch( URL, {
headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YmQyYTEyYjUwYzAwMTQ5ZTRlZjMiLCJpYXQiOjE2ODg3MTQ1MzgsImV4cCI6MTY4OTkyNDEzOH0.iRnleq7pmHbhZlWoEd5_nyM-BYeDOMXmzF7NuQ1IfJI"
}
}
).then((res) => {
    console.log('Response della GET', res)
    if (res.ok) {
      return res.json()
    } else {
      throw new Error('Errore nella chiamata API')
    }
  })

  .then((items) => {
    console.log('ITEMS', items)
    // nascondo lo spinner
    const spinnerContainer = document.getElementById('spinner-container')
    spinnerContainer.classList.add('d-none')
    
    items.forEach((item) => {
      let newCol = document.createElement('div')
      newCol.classList.add('col', 'col-12', 'col-sm-6', 'col-md-3')
      newCol.innerHTML = `
      <div class="card h-100">
      <img src="${item.imageUrl}" class="card-img-top" alt="concert placeholder image" style="object-fit: cover; height: 200px;">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text">${item.description}</p>
        <div class="mt-auto d-flex justify-content-between align-items-end">
          <p class="card-text fst-italic">${item.brand}</p>
          <p class="card-text fw-bold">&#36;${item.price}</p>
        </div>
        <a href="./detail.html?id=${item._id}" class="btn btn-primary mt-2">Scopri di più</a>
      </div>
    </div>
    
      `
      const itemsRow = document.getElementById('items-row')
      itemsRow.appendChild(newCol)
    })
  })

  .catch((err) => {
    console.log(err)
  })
}

getItemData()
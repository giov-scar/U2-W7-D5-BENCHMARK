const URL = 'https://striveschool-api.herokuapp.com/api/product/'

const addressBarContent = new URLSearchParams(location.search)

const itemId = addressBarContent.get('id')
console.log('ITEMID', itemId)
if (itemId) {
    document.querySelector('.btn-primary').innerText = 'Modifica Opera'
    document.querySelector('h1').innerText = 'ArtShop - Modifica Opera'

    fetch(URL + itemId, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YmQyYTEyYjUwYzAwMTQ5ZTRlZjMiLCJpYXQiOjE2ODg3MTQ1MzgsImV4cCI6MTY4OTkyNDEzOH0.iRnleq7pmHbhZlWoEd5_nyM-BYeDOMXmzF7NuQ1IfJI",
            'Content-Type': 'application/json',
        }
    }
        )

    .then((res)=> {
        if (res.ok) {
            return res.json()
        } else {
            throw new Error ("Errore nel recupero delle informazioni dell'Opera")
        }
    })

    .then((detail)=> {
        console.log('DETAIL', detail);
        const itemName = document.getElementById('item-name')
        const itemDescription = document.getElementById('item-description')
        const brand = document.getElementById('artist')
        const imageUrl = document.getElementById('item-image')
        const itemPrice = document.getElementById('item-price')

        itemName.value = detail.name
        itemDescription.value = detail.description
        brand.value = detail.brand
        imageUrl.value = detail.imageUrl
        itemPrice.value = detail.price
    })
    .catch((err)=>console.log(err))

}


const itemForm = document.getElementById('item-form')
itemForm.addEventListener('submit', function (e) {
    e.preventDefault()
    console.log('raccolgo i dati dal form')

    // Riferimenti agli input field
    const itemName = document.getElementById('item-name')
    const itemDescription = document.getElementById('item-description')
    const brand = document.getElementById('artist')
    const imageUrl = document.getElementById('item-image')
    const itemPrice = document.getElementById('item-price')

    const newItem = {
        name: itemName.value,
        description: itemDescription.value,
        brand: brand.value,
        imageUrl: imageUrl.value,
        price: itemPrice.value,
    }

    console.log('Value from form', newItem);

    //  REQUEST

    const URL = 'https://striveschool-api.herokuapp.com/api/product'

    let urlToUse
    if (itemId) {
        urlToUse = URL + '/' + itemId
    } else {
        urlToUse = URL
    }

    //  METHOD

    let methodToUse
    if (itemId) {
        methodToUse = 'PUT'
    } else {
        methodToUse = 'POST'
    }

    //  FETCH

    fetch(urlToUse, {
        method: methodToUse,
        body: JSON.stringify(newItem),
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YmQyYTEyYjUwYzAwMTQ5ZTRlZjMiLCJpYXQiOjE2ODg3MTQ1MzgsImV4cCI6MTY4OTkyNDEzOH0.iRnleq7pmHbhZlWoEd5_nyM-BYeDOMXmzF7NuQ1IfJI",
            'Content-Type': 'application/json',
        }
    })
    .then((res)=>{
        if (res.ok) {
            alert('OPERA PUBBLICATA!')

            itemName.value = '',
            itemDescription.value = '',
            brand.value = '',
            imageUrl.value = '',
            itemPrice.value = '',
            location.assign('index.html')
        } else {
            throw new Error ("Errore nel salvataggio dell'Opera")
        }
    })
    .catch((err) => {
        console.log(err)
        
    })
})


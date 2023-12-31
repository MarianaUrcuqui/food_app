import { menuArray } from './menuObj.js'

let orderResume = []
 
document.addEventListener('click', function(e){
  const payModal = document.getElementById("pay-method-modal")

  if(e.target.dataset.add){
    addProduct(e.target.dataset.add)
    renderOrderProducts()
    renderTotal()
  }

  else if(e.target.dataset.remove){
    removeProduct(e.target.dataset.remove)
    renderOrderProducts()
    renderTotal()
  }

  else if(e.target.id === "complete-btn"){
    payModal.style.display = "flex"
  }

  else if(e.target.id ==="x"){
    payModal.style.display = "none"
  }
})

document.getElementById("form").addEventListener("submit", function(e){
  e.preventDefault()
})


function renderOrderProducts(){
  const orderResumeEl = document.getElementById("order-resume")
  const selectedProductsEl = document.getElementById("selected-products")
  const mainEl = document.getElementById("main")

  orderResumeEl.style.display = orderResume.length > 0 ? "flex" : "none"

  // This will let the user see all of the products even if there are products in the order resume
  if(orderResume.length < 1){
    mainEl.style.marginBottom = "0px"
  }else if(orderResume.length > 0 && orderResume.length < 4){
    mainEl.style.marginBottom = "280px"
  }else{
    mainEl.style.marginBottom = "400px"
  }
  
  const productsArray = addToOrderResume()
  selectedProductsEl.innerHTML = productsArray
}

function addToOrderResume(){
  const productsArray = orderResume.map(product => {
    return `
        <div class="selected-product">
          <h3 class="lighter">${product.name}<i class="fa-solid fa-trash-can" data-remove ="${product.id}"></i></h3>
          <h3 class="lighter">$${product.price}</h3>
        </div>
    `

  }).join('')
  return productsArray
}

function addProduct(productId){
  const targetProduct = menuArray.filter(function(product){
    return product.id == productId
  })[0]

  orderResume.push(targetProduct)
}

function renderTotal(){
  const totalEl = document.getElementById("total")
  const total = getTotal()
  totalEl.innerHTML = total

}

function getTotal(){
  const pricesArray = orderResume.map(product =>{
    return product.price
  })
  const total = pricesArray.reduce(function(total, currentPrice){
    return total + currentPrice
  },0)
  return `
    <h3 class="lighter">Total price:</h3>
    <h3 class="lighter">$${total}</h3>
    `
}

function removeProduct(productId){
  const targetProduct = orderResume.filter(function(product){
    return product.id == productId
  })[0]
  const index = orderResume.indexOf(targetProduct)
  orderResume.splice(index, 1)
}


function getProducts(arr){
  const productsArray = arr.map(product => {
    return `
      <section class="container section">
        <ul class="list-products">
          <li>
            <img class="img-product" src="${product.image}">
          </li>
          <li class="text">
            <h3 class="lighter">${product.name}</h3>
            <p class="p-product">${product.ingredients.join(', ')}</p>
            <h3 class="lighter">$${product.price}</h3>
          </li>
          <li class="plus">
            <i class="fa-regular fa-square-plus fa-xl" data-add="${product.id}"></i>
          </li>
        </ul>
      </section>
      `
}).join('')
return productsArray
}

function renderProducts(){
  document.getElementById("main").innerHTML = getProducts(menuArray)
}

renderProducts()
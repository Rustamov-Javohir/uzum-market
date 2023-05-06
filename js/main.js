const USD_TO_UZS = 11420;
const API_PATH = "  https://dummyjson.com/";

fetch(API_PATH + "auth/RESOURCE", {
    method: "POST",
    headers: {
        Authorization: window.localStorage.getItem("loginToken"),
        "Content-Type": "application/json",
    },
})
    .then((res) => res.json())
    .then(console.log)
    .catch((err) => console.log(err));

// get product
const elProductList = document.querySelector(".js-product-list");
const elProductTemp = document.querySelector(".js-product-temp").content;
const newProductFragment = document.createDocumentFragment();

function renderProduct(products) {
    elProductList.innerHTML = null;
    products.forEach(product => {
        const productClone = elProductTemp.cloneNode(true);
        productClone.querySelector(".js-card-img").src = product.thumbnail;
        productClone.querySelector(".js-card-img").alt = product.brand;
        productClone.querySelector(".js-card-title").textContent = product.title;
        productClone.querySelector(".js-card-title").textContent = product.title;
        productClone.querySelector(".js-card-grade").textContent = product.rating;
        productClone.querySelector(".js-card-splice-price").textContent = `${getSplicePrice(product.price)} сум/мес`;
        productClone.querySelector(".js-card-grade").innerHTML = `<span class="card-desc js-card-rating">${product.rating}</span>`;
        productClone.querySelector(".js-card-price").textContent = `${product.price * USD_TO_UZS} сум`;
        newProductFragment.appendChild(productClone);
    });
    
    elProductList.appendChild(newProductFragment);
}


function getSplicePrice(price) {
    return Math.round((USD_TO_UZS * price / 12));
}

fetch(API_PATH + "products")
    .then(res => res.json())
    .then((data) => renderProduct(data.products))
    .catch((err) => {
        console.log(err.message);
    })


// search product

const elSearchForm = document.querySelector(".js-search-form");
const elSearchInput = document.querySelector(".js-search-input");

async function searchProduct(searchValue) {
    try {
        const response = await fetch(API_PATH + `products/search?q=${searchValue}`);
        const data = await response.json();
        renderProduct(data.products);
    } catch (error) {
        console.log(error);
    }
}

elSearchForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const inputValue = elSearchInput.value;
    console.log(inputValue);
    searchProduct(inputValue);
})
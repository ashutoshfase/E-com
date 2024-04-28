document.addEventListener("DOMContentLoaded", () => {
    const productContainer = 
    document.getElementById("product-container");
    const sortSelect = 
    document.getElementById("sort-select");
    const categorySelect =
    document.getElementById("category-select");

    fetchProducts();

    function fetchProducts(){
        const sortBy = sortSelect.Value;
        const category = categorySelect.Value;

    fetch(`https://cors-anywhere.herokuapp.com/https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?sort=${sortBy}&category=${category}`)
    .then(Response => {
        if (!Response.ok){
            throw new Error('Network respose was not ok');
        }
        return Response.json();

    })
    .then(product => {displayProducts(products);
    })
//     .catch(error => {
//         console.error('Error Fetching products:', error);
// });
    }

    function displayProducts(products) {
        productContainer.innerHTML = "";
        products.forEach(product => {
            const card = document.createElement("div");
            card.innerHTML = `<img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Brand: ${product.brand}</p>
            <p>Category: ${product.category}</p>
            <p>Price: ${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to cart</button>            
            `;
            productContainer.appendChild(card);
        });
    }

    sortSelect.addEventListener("change",fetchProducts);
    categorySelect.addEventListener("change",fetchProducts);
    productContainer.addEventListener("click", e => {
        if (e.target.classList.contains("add-to-cart")){
            const productId = e.target.dataset.id;
        addToCart(productId);
        }
    });
    function addToCart(productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(productId);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

});
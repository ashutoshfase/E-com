document.addEventListener("DOMContentLoaded", () => {
    const cartItems = 
    document.getElementById("cart-items");
    const total = document.getElementById("total");

    displayCart();

    function displayCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItems.innerHTML = "";
        if (cart.length === 0) {
            cartItems.innerHTML = "<p>Your cart is empty</p>";
            total.textContent = "Total: $0.00";
            return;
        }
        let totalPrice = 0;
        cart.forEach(productId => {
            const product = {
                id: productId,
                title: "Sample Product",
                price: 20.00
            };
            const item = document.createElement("div");
            item.classList.add("cart-item");
            item.innerHTML = `
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <button class="reomve-from-cart" data-id="${product.id}">Remove</button>
            `;
            cartItems.appendChild(item);
            totalPrice += product.price;
        });

        total.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }

    cartItems.addEventListener("click", e => {
        if (e.target.classList.contains("remove-from-cart")) {
            const productId = e.target.dataset.id;
            removeFromCart(productId);
        }
    });
    function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.indexOf(productId);
    if (index !== -1){
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }
    }
    
})
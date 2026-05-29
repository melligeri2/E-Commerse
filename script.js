let carticon = document.querySelector('#cart-icon');
let closecart = document.querySelector('.close-cart');
let cartitems = document.querySelector('.cart-items');
let cartcontent = document.querySelector('.cart-content');
let cartCount = document.querySelector(".cart-item-count");

// Open cart
carticon.addEventListener('click', () => {
    cartitems.classList.add('active');
});

// Close cart
closecart.addEventListener('click', () => {
    cartitems.classList.remove('active');
});

// Add to cart buttons
let addcartbtn = document.querySelectorAll(".ri-shopping-cart-2-line");

addcartbtn.forEach((button) => {
    button.addEventListener("click", (event) => {
        let productBox = event.target.closest(".product-box");
        addToCart(productBox);
    });
});

// Add to cart function
let addToCart = (productBox) => {

    let Productimgsrc = productBox.querySelector("img").src;
    let producttitle = productBox.querySelector(".product-title").textContent;
    let price = productBox.querySelector(".price").textContent;

    // Prevent duplicate
    let cartTitles = cartcontent.querySelectorAll(".cart-product-title");
    for (let item of cartTitles) {
        if (item.textContent === producttitle) {
            alert("Product already added to cart");
            return;
        }
    }

    let cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");

    cartBox.innerHTML = `
        <img src="${Productimgsrc}" alt="">
        <div class="cart-details">
            <h2 class="cart-product-title">${producttitle}</h2>
            <span class="cart-price">${price}</span>
            <div class="cart-quantity">
                <button class="decrement">-</button>
                <span class="number">1</span>
                <button class="increment">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>
    `;

    cartcontent.append(cartBox);

    // Remove item
    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();
        updateTotalPrice();
        updateCartCount();
    });

    // Increment / Decrement
    cartBox.querySelector(".cart-quantity").addEventListener("click", (event) => {
        let numberElement = cartBox.querySelector(".number");
        let quantity = parseInt(numberElement.textContent);

        if (event.target.classList.contains("decrement") && quantity > 1) {
            quantity--;
        } 
        else if (event.target.classList.contains("increment")) {
            quantity++;
        }

        numberElement.textContent = quantity;

        updateTotalPrice();
        updateCartCount();
    });

    // Update after adding
    updateTotalPrice();
    updateCartCount();
};

// Total price function
let updateTotalPrice = () => {
    let cartBoxes = cartcontent.querySelectorAll(".cart-box");
    let total = 0;

    cartBoxes.forEach((cartBox) => {
        let priceElement = cartBox.querySelector(".cart-price");
        let quantityElement = cartBox.querySelector(".number");

        let price = parseFloat(priceElement.textContent.replace("$", ""));
        let quantity = parseInt(quantityElement.textContent);

        total += price * quantity;
    });

    document.querySelector(".total-price").textContent = "$" + total;
};

// Cart count function (based on quantity)
let updateCartCount = () => {
    let cartBoxes = cartcontent.querySelectorAll(".cart-box");
    let count = 0;

    cartBoxes.forEach((box) => {
        let quantity = parseInt(box.querySelector(".number").textContent);
        count += quantity;
    });

    cartCount.textContent = count;
};
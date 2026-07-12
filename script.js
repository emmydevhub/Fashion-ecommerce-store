const cartIcon = document.querySelector(".cart-icon");
const cartSidebar = document.querySelector("#cart-sidebar");
const closeCart = document.querySelector("#close-cart");

cartIcon.addEventListener("click", () => {
    cartSidebar.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
});


// =====================
// =====================
// CART DATA
// =====================

let cart =
JSON.parse(localStorage.getItem("goldenGlamCart")) || [];

let total = 0;

const cartCount =
document.getElementById("cart-count");

const cartItems =
document.getElementById("cart-items");

const cartTotal =
document.getElementById("cart-total");

const buttons =
document.querySelectorAll(".cart-btn");


// =====================
// ADD TO CART
// =====================

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".card");

        const productName =
        card.querySelector("h3").innerText;

        const priceText =
        card.querySelector(".price").innerText;

        const price =
        parseInt(priceText.replace(/[₦,]/g, ""));

        const existingProduct =
        cart.find(item =>
            item.name === productName
        );

        if(existingProduct){

            existingProduct.quantity++;

        }else{

            cart.push({
                name: productName,
                price: price,
                quantity: 1
            });

        }

        updateCart();

    });

});


// =====================
// UPDATE CART
// =====================

function updateCart(){

    cartItems.innerHTML = "";

    total = 0;

    // EMPTY CART

    if(cart.length === 0){

        cartItems.innerHTML =
        "<p>Your cart is empty.</p>";

        cartTotal.innerText = "0";

        cartCount.innerText = "0";

        localStorage.setItem(
            "goldenGlamCart",
            JSON.stringify(cart)
        );

        return;
    }

    // DISPLAY CART ITEMS

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <div class="cart-item-info">

                <p>${item.name}</p>

                <p>
                    ₦${(item.price * item.quantity).toLocaleString()}
                </p>

                <div class="quantity-controls">

                    <button
                        class="minus-btn"
                        data-index="${index}">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        class="plus-btn"
                        data-index="${index}">
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-btn"
                data-index="${index}">
                ✖
            </button>

        </div>

        `;

    });

    // UPDATE TOTAL

    cartTotal.innerText =
    total.toLocaleString();

    // UPDATE CART COUNT

    cartCount.innerText =
    cart.reduce(
        (sum, item) =>
        sum + item.quantity,
        0
    );

    // SAVE CART

    localStorage.setItem(
        "goldenGlamCart",
        JSON.stringify(cart)
    );

    // REMOVE BUTTON

    document.querySelectorAll(".remove-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            const index =
            button.dataset.index;

            cart.splice(index, 1);

            updateCart();

        });

    });

    // PLUS BUTTON

    document.querySelectorAll(".plus-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            const index =
            button.dataset.index;

            cart[index].quantity++;

            updateCart();

        });

    });

    // MINUS BUTTON

    document.querySelectorAll(".minus-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            const index =
            button.dataset.index;

            if(cart[index].quantity > 1){

                cart[index].quantity--;

            }else{

                cart.splice(index, 1);

            }

            updateCart();

        });

    });

}


// =====================
// WHATSAPP CHECKOUT
// =====================

const checkoutBtn =
document.getElementById("checkout-btn");

checkoutBtn.addEventListener("click", () => {

    if(cart.length === 0){

        alert("Your cart is empty.");

        return;

    }

    let message =
`Hello Golden Glam,

I would like to order:

`;

    cart.forEach(item => {

        message +=
`• ${item.name} x ${item.quantity}
`;

    });

    message +=

`
Total: ₦${total.toLocaleString()}
`;

    const whatsappURL =
`https://wa.me/2347060754698?text=${encodeURIComponent(message)}`;

    window.open(
        whatsappURL,
        "_blank"
    );

});


// =====================
// LOAD SAVED CART
// =====================

updateCart();

// =====================
// PRODUCT SEARCH
// =====================

const searchInput =
document.getElementById("search-input");

if(searchInput){

    searchInput.addEventListener("input", () => {

        const searchValue =
        searchInput.value.toLowerCase();

        const products =
        document.querySelectorAll(".card");

        products.forEach(product => {

            const productName =
            product.querySelector("h3")
            .innerText
            .toLowerCase();

            if(productName.includes(searchValue)){

                product.style.display = "block";

            }else{

                product.style.display = "none";

            }

        });

    });

}

// =====================
// CATEGORY FILTER
// =====================

const filterButtons =
document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        document
        .querySelector(".filter-btn.active")
        ?.classList.remove("active");

        button.classList.add("active");

        const filter =
        button.dataset.filter;

        const products =
        document.querySelectorAll(".card");

        products.forEach(product => {

            const category =
            product.dataset.category;

            if(
                filter === "all" ||
                category === filter
            ){

                product.style.display = "block";

            }else{

                product.style.display = "none";

            }

        });

    });

});

// NEWSLETTER

const newsletterForm =
document.querySelector(".newsletter-form");

if(newsletterForm){

    newsletterForm.addEventListener("submit", (e) => {

        e.preventDefault();

        alert(
            "Thank you for subscribing to Golden Glam!"
        );

        newsletterForm.reset();

    });

}


// MOBILE MENU

const menuToggle =
document.querySelector(".menu-toggle");

const navLinks =
document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});

// CONTACT FORM TO WHATSAPP

const contactForm =
document.getElementById("contact-form");

if(contactForm){

    contactForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const name =
        document.getElementById("name").value;

        const email =
        document.getElementById("email").value;

        const subject =
        document.getElementById("subject").value;

        const message =
        document.getElementById("message").value;

        if(
            name === "" ||
            email === "" ||
            subject === "" ||
            message === ""
        ){

            alert("Please fill all fields.");

            return;

        }

        const whatsappMessage =
`Hello Golden Glam,

Name: ${name}

Email: ${email}

Subject: ${subject}

Message:
${message}`;

        const whatsappURL =
`https://wa.me/2347060754698?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(
            whatsappURL,
            "_blank"
        );

        contactForm.reset();

    });

}

// PRELOADER

window.addEventListener("load", () => {

    const preloader =
    document.getElementById("preloader");

    preloader.style.display = "none";

});
// BACK TO TOP BUTTON

const backToTop =
document.getElementById("back-to-top");

if(backToTop){

    window.addEventListener("scroll", () => {

        if(window.scrollY > 300){

            backToTop.style.display = "block";

        }else{

            backToTop.style.display = "none";

        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}
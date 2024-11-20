document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const incrementarBtns = document.querySelectorAll('.incrementar-catalogo');
    const decrementarBtns = document.querySelectorAll('.decrementar-catalogo');
    const inputs = document.querySelectorAll('.cantidad input');
    const agregarBtns = document.querySelectorAll('.agregar');
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    incrementarBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            let value = parseInt(inputs[index].value);
            inputs[index].value = value + 1;
        });
    });

    decrementarBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            let value = parseInt(inputs[index].value);
            if (value > 0) {
                inputs[index].value = value - 1;
            }
        });
    });

    agregarBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const productName = btn.parentElement.querySelector('h3').textContent;
            const productPrice = parseFloat(btn.parentElement.querySelector('p').textContent.replace('Bs. ', '').replace(',', '.'));
            const productImage = btn.parentElement.querySelector('img').src;
            const quantity = parseInt(inputs[index].value);

            if (quantity > 0) {
                addToCart(productName, productPrice, productImage, quantity);
                inputs[index].value = 1; // Resetear la cantidad a 1
            }
        });
    });

    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
        displayCartItems();
    });

    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target == cartModal) {
            cartModal.style.display = 'none';
        }
    };

    function addToCart(name, price, image, quantity) {
        const existingProduct = cart.find(item => item.name === name);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({ name, price, image, quantity });
        }
        saveCart(); 
        updateCartCount();
        updateTotalPrice();
    }

    function displayCartItems() {
        cartItemsContainer.innerHTML = ''; 
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" />
                <h3>${item.name}</h3>
                <p class="unit-price">Precio por unidad: Bs. ${item.price.toFixed(2)}</p>
                <div class="cantidad">
                    <button class="decrementar-carrito" data-index="${index}">-</button>
                    <input type="text" class="cantidad-input-carrito" value="${item.quantity}" readonly />
                    <button class="incrementar-carrito" data-index="${index}">+</button>
                </div>
                <p>Precio: Bs. ${(item.price * item.quantity).toLocaleString('es-BO', { minimumFractionDigits: 2 })}</p>
                <button class="remove-item" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                cart.splice(index, 1);
                saveCart(); 
                displayCartItems();
                updateCartCount();
                updateTotalPrice();
            });
        });

        document.querySelectorAll('.incrementar-carrito').forEach((button) => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                cart[index].quantity += 1;
                saveCart(); 
                displayCartItems();
                updateCartCount();
                updateTotalPrice();
            });
        });

        document.querySelectorAll('.decrementar-carrito').forEach((button) => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                    saveCart(); 
                    displayCartItems();
                    updateCartCount();
                    updateTotalPrice();
                }
            });
        });
    }

    function updateCartCount() {
        document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    function updateTotalPrice() {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalPriceEl.textContent = total.toLocaleString('es-BO', { minimumFractionDigits: 2 });
    }

    finalizarCompraBtn.addEventListener('click', () => {
        cart = []; 
        saveCart(); 
        displayCartItems(); 
        updateCartCount();
        updateTotalPrice();
        alert('¡Gracias por tu compra! El carrito ha sido vaciado.');
    });

    displayCartItems();
    updateCartCount();
    updateTotalPrice();
});

const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

btnSignIn.addEventListener("click", ()=>{
    container.classList.remove("toggle");
})

btnSignUp.addEventListener("click", ()=>{
    container.classList.add("toggle");
})

document.getElementById('sign-in-button').onclick = function() {
    event.preventDefault();
    document.getElementById('sign-in-email').value = '';
    document.getElementById('sign-in-password').value = '';
};

document.getElementById('sign-up-button').onclick = function() {
    event.preventDefault();
    document.getElementById('sign-up-name').value = '';
    document.getElementById('sign-up-email').value = '';
    document.getElementById('sign-up-password').value = '';
};
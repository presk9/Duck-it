let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();
displayCartItems();

function onAddToCartClick(productName, price, sizeId) {
    const size = document.getElementById(sizeId).value;
    const existingItemIndex = cart.findIndex(item => item.name === productName && item.size === size);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ name: productName, price: price, size: size, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
    alert(`${productName} (${size}) ha sido añadido al carrito.`);
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.toggle('active');
    displayCartItems();
}

function displayCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    let totalCost = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ${item.size} - ${item.price}€ x ${item.quantity} 
        <button class="remove-item" onclick="removeItem(${index})">Eliminar</button>`;
        cartItems.appendChild(li);
        totalCost += parseFloat(item.price) * item.quantity;
    });

    const totalElement = document.querySelector('.cart-footer p');
    if (totalElement) {
        totalElement.textContent = `Total: ${totalCost.toFixed(2)}€`;
    } else {
        console.error('Elemento .cart-footer p no encontrado.');
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}

function sendCartByWhatsApp() {
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let message = "Estoy interesado en los siguientes productos:%0A";
    cart.forEach(item => {
        message += `- ${item.name} (${item.size}) - ${item.price}€ x ${item.quantity}%0A`;
    });

    localStorage.removeItem('cart');
    cart = [];
    updateCartCount();
    toggleCart();
    window.location.href = `https://wa.me/34672825712?text=${message}`;
}

// Alternar el menú en pantallas móviles
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
    // Alternar el menú móvil
    document.getElementById('mobile-menu-icon').addEventListener('click', toggleMobileMenu);
    
    // Abrir y cerrar el carrito
    document.querySelector('.cart-icon').addEventListener('click', toggleCart);

    // Alternar imágenes solo cuando se hace clic en ellas
    document.querySelectorAll('.collection-item img').forEach(image => {
        image.addEventListener('click', function() {
            const backImage = this.parentElement.querySelector('.back');
            const frontImage = this.parentElement.querySelector('.front');
            
            if (backImage.style.display === 'none') {
                backImage.style.display = 'block';
                frontImage.style.display = 'none';
            } else {
                backImage.style.display = 'none';
                frontImage.style.display = 'block';
            }
        });

        image.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.click();
        });
    });
});
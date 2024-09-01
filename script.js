let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();
displayCartItems();

function onAddToCartClick(productName, price, sizeId) {
    const size = document.getElementById(sizeId).value;
    const existingItemIndex = cart.findIndex(item => item.name === productName && item.size === size);

    if (existingItemIndex !== -1) {
        // Si el artículo ya está en el carrito, aumenta la cantidad
        cart[existingItemIndex].quantity += 1;
    } else {
        // Si no, añádelo como un nuevo artículo
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
    cartItems.innerHTML = ''; // Limpia el contenido anterior

    let totalCost = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ${item.size} - ${item.price}€ x ${item.quantity} 
        <button class="remove-item" onclick="removeItem(${index})">Eliminar</button>`;
        cartItems.appendChild(li);
        totalCost += parseFloat(item.price) * item.quantity;
    });

    const totalElement = document.querySelector('.cart-footer p');
    if (totalElement) {  // Asegúrate de que el elemento existe antes de intentar modificarlo
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
    toggleCart(); // Cerrar el modal
    window.location.href = `https://wa.me/34672825712?text=${message}`;
}

// Función para alternar el menú en pantallas móviles
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
    // Código para el menú móvil y el carrito que ya tienes
    document.getElementById('mobile-menu-icon').addEventListener('click', toggleMobileMenu);
    document.querySelector('.cart-icon').addEventListener('click', toggleCart);

    // Nuevo código para cambiar las imágenes al hacer clic o tocar
    const collectionItems = document.querySelectorAll('.collection-item');

    collectionItems.forEach(item => {
        let isFrontVisible = true; // Variable para rastrear el estado de la imagen visible

        item.addEventListener('click', function() {
            toggleImage(item, isFrontVisible);
            isFrontVisible = !isFrontVisible; // Cambiar el estado después de cada clic
        });

        // Para asegurarte de que también funcione en dispositivos móviles
        item.addEventListener('touchstart', function() {
            toggleImage(item, isFrontVisible);
            isFrontVisible = !isFrontVisible; // Cambiar el estado después de cada toque
        });
    });

    function toggleImage(item, showFront) {
        const frontImage = item.querySelector('.front');
        const backImage = item.querySelector('.back');

        if (showFront) {
            frontImage.style.display = 'none';
            backImage.style.display = 'block';
        } else {
            frontImage.style.display = 'block';
            backImage.style.display = 'none';
        }
    }
});
document.getElementById('mobile-menu').addEventListener('click', function() {
    document.getElementById('nav-menu').classList.toggle('active');
});
document.querySelectorAll('.collection-item').forEach(item => {
    const backImage = item.querySelector('.back');
    const frontImage = item.querySelector('.front');

    item.addEventListener('click', () => {
        if (backImage.style.display === 'none') {
            // Mostrar la imagen trasera y ocultar la delantera
            backImage.style.display = 'block';
            frontImage.style.display = 'none';
        } else {
            // Mostrar la imagen delantera y ocultar la trasera
            backImage.style.display = 'none';
            frontImage.style.display = 'block';
        }
    });
});
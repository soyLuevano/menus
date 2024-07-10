document.addEventListener("DOMContentLoaded", function() {
    const footer = document.getElementById("footer");

    function checkScroll() {
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            footer.style.display = "block";
        } else {
            footer.style.display = "none";
        }
    }

    window.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    checkScroll();  // Inicializa el estado del footer al cargar la página

    // Lluvia de comida
    const foodRainContainer = document.getElementById("food-rain");
    const foodImages = Array.from(document.querySelectorAll("#food-images img")).map(img => img.src);

    function createFood() {
        const food = document.createElement("img");
        food.src = foodImages[Math.floor(Math.random() * foodImages.length)];
        food.className = "food";
        food.style.left = Math.random() * 100 + "vw";
        food.style.animationDuration = Math.random() * 3 + 2 + "s"; // Duración aleatoria entre 2s y 5s
        foodRainContainer.appendChild(food);

        // Eliminar el elemento después de que termine la animación
        food.addEventListener("animationend", function() {
            food.remove();
        });
    }

    // Crear comida cada 900ms
    setInterval(createFood, 3000);

    // Mostrar una hamburguesa al hacer clic en la pantalla o mover el mouse
    document.addEventListener('click', function(event) {
        createFoodImage(event.clientX, event.clientY);
    });

    document.addEventListener('mousemove', function(event) {
        createFoodImage(event.clientX, event.clientY);
    });

    function createFoodImage(x, y) {
        const hamburguesaImage = document.createElement('img');
        hamburguesaImage.src = 'https://images.vexels.com/content/149877/preview/hotdog-character-cartoon-897c9e.png';
        hamburguesaImage.alt = 'Hamburguesa';
        hamburguesaImage.style.position = 'absolute';
        hamburguesaImage.style.left = `${x}px`;
        hamburguesaImage.style.top = `${y}px`;
        hamburguesaImage.style.width = '50px';  // Ajusta el ancho de la imagen
        hamburguesaImage.style.height = 'auto'; // Mantén la proporción automáticamente
        document.body.appendChild(hamburguesaImage);
    
        // Eliminar la hamburguesa después de un tiempo
        setTimeout(() => {
            hamburguesaImage.remove();
        }, 2000); // Eliminar después de 2 segundos
    }    

});

function showComments() {
    alert("Aquí puedes dejar tus comentarios y sugerencias.");
}

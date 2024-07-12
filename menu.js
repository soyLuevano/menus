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

    // Crear comida cada 3000ms
    setInterval(createFood, 3000);

    // Mostrar una hamburguesa al hacer clic en la pantalla o mover el mouse
    document.addEventListener('click', function(event) {
        createFoodImage(event.pageX, event.pageY);
    });

    document.addEventListener('mousemove', function(event) {
        createFoodImage(event.pageX, event.pageY);
    });

    function createFoodImage(x, y) {
        const hamburguesaImage = document.createElement('img');
        hamburguesaImage.src = 'https://png.pngtree.com/png-clipart/20221115/ourmid/pngtree-cartoon-donuts-png-image_6455090.png';
        hamburguesaImage.alt = 'Hamburguesa';
        hamburguesaImage.style.position = 'absolute';
        hamburguesaImage.style.left = `${x}px`;
        hamburguesaImage.style.top = `${y}px`;
        hamburguesaImage.style.width = '50px';  // Ajusta el ancho de la imagen
        hamburguesaImage.style.height = 'auto'; // Mantén la proporción automáticamente
        hamburguesaImage.style.pointerEvents = 'none'; // Permitir clics a través de la hamburguesa
        document.body.appendChild(hamburguesaImage);
    
        // Eliminar la hamburguesa después de un tiempo
        setTimeout(() => {
            hamburguesaImage.remove();
        }, 2000); // Eliminar después de 2 segundos
    }    

});

// Función para iniciar el juego cuando se presiona el botón
function showComments() {
    const modalContainer = document.createElement('div');
    modalContainer.style.position = "fixed";
    modalContainer.style.top = "50%";
    modalContainer.style.left = "50%";
    modalContainer.style.transform = "translate(-50%, -50%)";
    modalContainer.style.width = "400px";
    modalContainer.style.height = "400px";
    modalContainer.style.backgroundColor = "#f7f7f7";
    modalContainer.style.border = "2px solid #ccc";
    modalContainer.style.zIndex = "9999";
    modalContainer.style.overflow = "hidden";
    document.body.appendChild(modalContainer);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Cerrar';
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";
    closeButton.style.padding = "8px 12px";
    closeButton.style.backgroundColor = "#ccc";
    closeButton.style.border = "none";
    closeButton.style.cursor = "pointer";
    closeButton.addEventListener('click', () => {
        modalContainer.remove();
    });
    modalContainer.appendChild(closeButton);

    const gameContainer = document.createElement('div');
    gameContainer.style.position = "absolute";
    gameContainer.style.top = "150px";
    gameContainer.style.left = "50%";
    gameContainer.style.transform = "translateX(-50%)";
    gameContainer.style.width = "50px";
    gameContainer.style.height = "50px";
    gameContainer.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/4312/4312298.png')";
    gameContainer.style.backgroundSize = "cover";
    modalContainer.appendChild(gameContainer);

    let burgerPosition = 150;
let gravity = 1;
let jumpPower = 12;
let isJumping = false;
let isGameOver = false;
let score = 0;
let obstacleSpeed = 2; // Velocidad inicial
let speedIncreaseAmount = 2; // Incremento de velocidad

const ingredients = [
    'https://png.pngtree.com/png-clipart/20211009/original/pngtree-lettuce-vector-png-image_6849304.png',
    'https://wikiwandv2-19431.kxcdn.com/_next/image?url=https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Original_PacMan.svg/640px-Original_PacMan.svg.png&w=640&q=50',
    'https://png.pngtree.com/png-clipart/20220117/original/pngtree-hand-drawn-cartoon-cheese-elements-png-image_7146274.png',
    'https://static.vecteezy.com/system/resources/previews/018/931/023/original/cartoon-tomato-icon-png.png'
];

function jump() {
    if (isGameOver) return;
    if (!isJumping) {
        isJumping = true;
        let jumpCount = 0;
        function jumpAnimation() {
            if (jumpCount < 15 && burgerPosition > 0) {
                burgerPosition -= jumpPower - (jumpCount * 0.8);
                jumpCount++;
                setTimeout(jumpAnimation, 30);
            } else {
                isJumping = false;
            }
        }
        
        jumpAnimation();
    }
}

modalContainer.addEventListener('click', jump);

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.position = "absolute";
    obstacle.style.bottom = "0";
    obstacle.style.left = "100%";
    obstacle.style.width = "40px"; 

    const randomIngredient = ingredients[Math.floor(Math.random() * ingredients.length)];
    const img = document.createElement('img');
    img.src = randomIngredient;
    img.style.width = "100%"; 
    img.style.height = "auto";

    obstacle.appendChild(img);
    modalContainer.appendChild(obstacle);

    let obstacleHeight = Math.floor(Math.random() * 100) + 50;
    obstacle.style.bottom = Math.floor(Math.random() * (modalContainer.offsetHeight - obstacleHeight)) + "px";

    obstacle.passed = false;
    moveObstacle(obstacle);
}

function moveObstacle(obstacle) {
    let obstaclePosition = modalContainer.offsetWidth;
    const obstacleInterval = setInterval(() => {
        if (isGameOver) {
            clearInterval(obstacleInterval);
            obstacle.remove();
            return;
        }

        obstaclePosition -= obstacleSpeed; 
        obstacle.style.left = obstaclePosition + "px";

        const burgerRect = gameContainer.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
            burgerRect.left < obstacleRect.right &&
            burgerRect.right > obstacleRect.left &&
            burgerRect.top < obstacleRect.bottom &&
            burgerRect.bottom > obstacleRect.top
        ) {
            clearInterval(obstacleInterval);
            gameOver();
        }

        if (!obstacle.passed && obstacleRect.right < burgerRect.left) {
            score++;
            obstacle.passed = true;
        }

        if (obstaclePosition <= -40) {
            clearInterval(obstacleInterval);
            obstacle.remove();
        }
    }, 20);
}

const scoreDisplay = document.createElement('div');
scoreDisplay.textContent = "Puntos: 0";
scoreDisplay.style.position = "absolute";
scoreDisplay.style.top = "10px";
scoreDisplay.style.left = "10px";
modalContainer.appendChild(scoreDisplay);

function gameLoop() {
    if (isGameOver) return;

    burgerPosition += gravity;
    gameContainer.style.top = burgerPosition + "px";

    if (burgerPosition >= modalContainer.offsetHeight - gameContainer.offsetHeight) {
        gameOver();
    }

    scoreDisplay.textContent = "Puntos: " + score;

    requestAnimationFrame(gameLoop);
}

function gameOver() {
    isGameOver = true;
    gameContainer.textContent = "Game Over";
    gameContainer.style.fontSize = "24px";
    gameContainer.style.backgroundColor = "red";
    gameContainer.style.color = "white";
    gameContainer.style.textAlign = "center";
    gameContainer.style.padding = "20px";
    gameContainer.style.borderRadius = "5px";

    modalContainer.removeEventListener('click', jump);
}

// Función para aumentar la velocidad de los obstáculos cada 10 segundos
function increaseObstacleSpeed() {
    obstacleSpeed += speedIncreaseAmount;
}

// Crear un nuevo obstáculo cada cierto tiempo (ajusta el intervalo si es necesario)
setInterval(createObstacle, 2000); // Por ejemplo, cada 2 segundos

// Llamar a la función para aumentar la velocidad de los obstáculos cada 10 segundos
setInterval(increaseObstacleSpeed, 10000); // Cada 10 segundos

gameLoop();
}

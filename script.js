const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const box = 20;
let snake;
let direction;
let food;
let score;
let gameOver = false;
let isGameRunning = false; // Status apakah permainan sedang berjalan

// Fungsi untuk memulai atau mengulang permainan
function initializeGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    direction = 'RIGHT';
    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
    score = 0;
    gameOver = false;
    isGameRunning = false; // Ular diam dulu saat game dimuat
    draw();
}

function draw() {
    if (gameOver) {
        showGameOver();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    for (let i = 0; i < snake.light; i++) {
        ctx.fillStyle = i === 0 ? 'red' : 'lightred';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw food
    ctx.fillStyle = 'green';
    ctx.fillRect(food.x, food.y, box, box);

    // Hanya bergerak jika permainan sudah dimulai
    if (isGameRunning) {
        // Move snake
        let head = { ...snake[0] };

        if (direction === 'LEFT') head.x -= box;
        if (direction === 'UP') head.y -= box;
        if (direction === 'RIGHT') head.x += box;
        if (direction === 'DOWN') head.y += box;

        // Check collision with wall or itself
        if (
            head.x < 0 ||
            head.y < 0 ||
            head.x >= canvas.width ||
            head.y >= canvas.height ||
            snake.some(segment => segment.x === head.x && segment.y === head.y)
        ) {
            gameOver = true;
        }

        snake.unshift(head);

        // Check if snake eats food
        if (head.x === food.x && head.y === food.y) {
            score++;
            food = {
                x: Math.floor(Math.random() * 20) * box,
                y: Math.floor(Math.random() * 20) * box
            };
        } else {
            snake.pop();
        }
    } else {
        showStartButton(); // Tampilkan tombol "Mulai Permainan" saat game belum berjalan
    }

    setTimeout(() => requestAnimationFrame(draw), 100);
}

// Fungsi untuk menampilkan tombol "Mulai Permainan"
function showStartButton() {
    ctx.fillStyle = "orange";
    ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 20, 100, 40);
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Mulai Permainan", canvas.width / 2, canvas.height / 2 + 5);
}

// Menampilkan pesan "Game Over" dan tombol "Mulai Ulang" di kanvas
function showGameOver() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 20);
    ctx.font = "20px Arial";
    ctx.fillText("Skor Anda: " + score, canvas.width / 2, canvas.height / 2 + 20);
    
    // Gambar tombol "Mulai Ulang"
    ctx.fillStyle = "orange";
    ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 + 50, 100, 30);
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Mulai Ulang", canvas.width / 2, canvas.height / 2 + 70);
}

// Event untuk mendeteksi klik pada tombol "Mulai Permainan" atau "Mulai Ulang"
canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Periksa apakah klik berada di dalam area tombol "Mulai Permainan"
    if (!isGameRunning &&
        x >= canvas.width / 2 - 50 && x <= canvas.width / 2 + 50 &&
        y >= canvas.height / 2 - 20 && y <= canvas.height / 2 + 20) {
        isGameRunning = true; // Mulai permainan
    }

    // Periksa apakah klik berada di dalam area tombol "Mulai Ulang"
    if (gameOver &&
        x >= canvas.width / 2 - 50 && x <= canvas.width / 2 + 50 &&
        y >= canvas.height / 2 + 50 && y <= canvas.height / 2 + 80) {
        initializeGame(); // Mulai ulang permainan
    }
});

// Control snake
document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

// Add touch controls
document.getElementById('up').addEventListener('click', () => direction = 'UP');
document.getElementById('left').addEventListener('click', () => direction = 'LEFT');
document.getElementById('down').addEventListener('click', () => direction = 'DOWN');
document.getElementById('right').addEventListener('click', () => direction = 'RIGHT');

// Inisialisasi permainan
initializeGame();
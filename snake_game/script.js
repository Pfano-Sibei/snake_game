const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 1;
let dy = 0;
let score = 0;

function gameLoop() {
  // Move snake
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Game over if snake hits wall or itself
  let gameOverFlag = false;  // declare this outside, near your variables

if (
  head.x < 0 || head.x >= tileCount ||
  head.y < 0 || head.y >= tileCount ||
  snake.some(segment => segment.x === head.x && segment.y === head.y)
) {
  if (!gameOverFlag) {   // run only once per game over
    gameOverFlag = true;

    document.getElementById("gameOverSound").play();
    alert("Game Over! Score: " + score);

    // Reset game state
    snake = [{ x: 10, y: 10 }];
    dx = 1;
    dy = 0;
    score = 0;
    foodEaten = 0;
    speed = 200;

    document.getElementById("scoreBoard").textContent = "Score: 0";
    document.getElementById("highScore").textContent = "High Score: " + highScore;
    food = { x: 15, y: 15 };

    // Allow game to start again
    gameOverFlag = false;
  }
  // Do NOT return here, so the game continues
}


  snake.unshift(head);

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("scoreBoard").textContent = "Score: " + score;
document.getElementById("eatSound").play();

food = {
  x: Math.floor(Math.random() * tileCount),
  y: Math.floor(Math.random() * tileCount)
};
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  } else {
    snake.pop();
  }

  // Draw everything
  ctx.fillStyle = "#ffc0cb";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0f0";
  snake.forEach((segment, index) => {
  // Head
  if (index === 0) {
    ctx.fillStyle = "#000000"; 
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);

    // Add simple eyes on head
    ctx.fillStyle = "#ccc";
    const eyeSize = 4;
    const offset = 4;
    ctx.beginPath();
    ctx.arc(segment.x * gridSize + offset, segment.y * gridSize + offset, eyeSize / 2, 0, Math.PI * 2);
    ctx.arc(segment.x * gridSize + gridSize - offset, segment.y * gridSize + offset, eyeSize / 2, 0, Math.PI * 2);
    ctx.fill();

  // Tail
  } else if (index === snake.length - 1) {
    ctx.fillStyle = "#333333"; 
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);

  // Body
  } else {
    ctx.fillStyle = "#555555"; 
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
  }
});


  ctx.fillStyle = "#f00";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function changeDirection(e) {
  switch (e.key) {
    case "ArrowUp":
      if (dy === 0) { dx = 0; dy = -1; }
      break;
    case "ArrowDown":
      if (dy === 0) { dx = 0; dy = 1; }
      break;
    case "ArrowLeft":
      if (dx === 0) { dx = -1; dy = 0; }
      break;
    case "ArrowRight":
      if (dx === 0) { dx = 1; dy = 0; }
      break;
  }
}

document.addEventListener("keydown", changeDirection);
const pauseBtn = document.getElementById("pauseBtn");

pauseBtn.addEventListener("click", () => {
  gamePaused = !gamePaused;

  if (gamePaused) {
    pauseBtn.textContent = "Resume";
  } else {
    pauseBtn.textContent = "Pause";
  }
});

let speed = 200; // Start slow
let foodEaten = 0;

let gamePaused = false;
let gameLoopTimeout;

function gameLoopWrapper() {
  if (!gamePaused) {
    gameLoop();
  }
  gameLoopTimeout = setTimeout(gameLoopWrapper, speed);
}

gameLoopWrapper();


function setDirection(dir) {
  switch (dir) {
    case "up":
      if (dy === 0) { dx = 0; dy = -1; }
      break;
    case "down":
      if (dy === 0) { dx = 0; dy = 1; }
      break;
    case "left":
      if (dx === 0) { dx = -1; dy = 0; }
      break;
    case "right":
      if (dx === 0) { dx = 1; dy = 0; }
      break;
  }
}

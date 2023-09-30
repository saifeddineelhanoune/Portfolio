function runDinosaurGame() {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext('2d');

  const dino = {
    x: 50,
    y: canvas.height - 50,
    velocityY: 0,
    jumping: false,
  };

  const obstacles = [];

  function drawDino() {
    ctx.fillStyle = '#666666';
    ctx.fillRect(dino.x, dino.y - 20, 20, 20);
    ctx.fillRect(dino.x + 5, dino.y - 35, 10, 15);
  }

  function drawObstacles() {
    ctx.fillStyle = '#999999';
    for (const obstacle of obstacles) {
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
  }

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.02) {
      const obstacle = {
        x: canvas.width,
        y: canvas.height - 30,
        width: 20 + Math.random() * 30,
        height: 30 + Math.random() * 50,
      };
      obstacles.push(obstacle);
    }

    for (const obstacle of obstacles) {
      obstacle.x -= 5;
    }

    obstacles.forEach((obstacle, index) => {
      if (obstacle.x + obstacle.width < 0) {
        obstacles.splice(index, 1);
      }
    });

    drawDino();
    drawObstacles();

    requestAnimationFrame(gameLoop);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === ' ' && !dino.jumping) {
      dino.velocityY = -10;
      dino.jumping = true;
    }
  });

  function gravity() {
    dino.y += dino.velocityY;
    dino.velocityY += 0.5;

    if (dino.y > canvas.height - 50) {
      dino.y = canvas.height - 50;
      dino.jumping = false;
    }
  }

  gameLoop();
  setInterval(gravity, 1000 / 60);
}

runDinosaurGame();


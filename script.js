/* ------ JavaScript - Sprite Animated Movement 2/4 ------ */

/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 25;
const enemiesArray = [];

// const enemyImage = new Image();
// enemyImage.src = "img/enemy1.png";
let gameFrame = 0;

// Controls width and height of many enemy characters in a constructor class.
class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "img/enemy2.png";
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = Math.random() * 2;
    this.angleSpeed = Math.random() * 0.2;
    this.curve = Math.random() * 7;
  }
  update() {
    this.x -= this.speed; // Adjust the amount of static Jiggle here.
    this.y += this.curve * Math.sin(this.angle); // The multiplied number alters the size of the wave.
    this.angle += this.angleSpeed; // Controls the sine wave movement.
    if (this.x + this.width < 0) this.x = canvas.width; // Brings sprites back from the right side.
    /* Animate Sprites.  */
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new Enemy());
}
console.log(enemiesArray);

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();

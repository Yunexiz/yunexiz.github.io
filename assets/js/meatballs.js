const canvas = document.getElementById("projects-canvas");
canvas.style.filter = "blur(25px)";
const ctx = canvas.getContext("2d");
const meatballNumber = 100;

class Meatball {
  constructor(x, y, r, vx, vy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
    this.color = `rgb(${Math.random() * 55}, ${Math.random() * 55}, ${
      Math.random() * 255
    })`;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x + this.r > canvas.width || this.x - this.r < 0) {
      this.vx *= -1;
    }
    if (this.y + this.r > canvas.height || this.y - this.r < 0) {
      this.vy *= -1;
    }
    this.x += this.vx;
    this.y += this.vy;
  }
}

const meatballs = Array.from({ length: meatballNumber }, () => {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const r = Math.random() * 10 + 10;
  const vx = Math.random() * 0.6 - 0.3; // -0.3 to 0.3
  const vy = Math.random() * 0.6 - 0.3;
  return new Meatball(x, y, r, vx, vy);
});

export function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  meatballs.forEach((meatball) => {
    meatball.draw();
    meatball.update();
  });
  requestAnimationFrame(animate);
}

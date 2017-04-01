
const SPEED = 1;

export default class Player {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.mousePos = null;
    this.xCoor = 75;
    this.yCoor = 75;
    this.animate = this.animate.bind(this);
  }

  start() {
    this.drawPlayer();
    this.canvas.addEventListener('mousemove', this.getMousePos.bind(this, this.canvas))
    requestAnimationFrame(this.animate);
  }

  drawPlayer() {
    this.ctx.beginPath();
    this.ctx.arc(this.xCoor, this.yCoor, 10, 0, 2*Math.PI);
    this.ctx.fillStyle = 'blue';
    this.ctx.fill();
    this.ctx.stroke();
  }

  animate() {
    if (this.mousePos) {
      if (this.mousePos.x > this.xCoor) {
        this.xCoor += SPEED;
      } else if (this.mousePos.x < this.xCoor) {
        this.xCoor -= SPEED;
      }

      if (this.mousePos.y > this.yCoor) {
        this.yCoor += SPEED;
      } else if (this.mousePos.y < this.yCoor) {
        this.yCoor -= SPEED;
      }
      this.drawPlayer();
    }
    const requestID = requestAnimationFrame(this.animate);
  }

  getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    this.mousePos = {
      x: (event.clientX-rect.left)/(rect.right-rect.left)*canvas.width,
      y: (event.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height,
    };
  }
}

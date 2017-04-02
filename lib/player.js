
const SPEED = 1;

export default class Player {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.mousePos = null;
    this.xCoor = 75;
    this.yCoor = 75;
    this.prevPos = [];
    this.numFrames = 0;
    this.animate = this.animate.bind(this);
  }

  start() {
    this.canvas.addEventListener('mousemove', this.getMousePos.bind(this, this.canvas))
    requestAnimationFrame(this.animate);
  }

  drawPlayer(drawX, drawY) {
    this.ctx.fillStyle = 'blue';
    this.drawCircle(drawX, drawY);
  }

  erasePlayer(eraseX, eraseY) {
    this.ctx.fillStyle = 'black';
    this.drawCircle(eraseX, eraseY);
  }

  drawCircle(xCoord, yCoord) {
    this.ctx.beginPath();
    this.ctx.arc(xCoord, yCoord, 10, 0, 2*Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
  }

  eraseTail() {
    if (this.numFrames > 20) {
      const eraseCoordX = this.prevPos.shift();
      const eraseCoordY = this.prevPos.shift();
      this.erasePlayer(eraseCoordX, eraseCoordY);
    }
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
      this.prevPos.push(this.xCoor, this.yCoor);
      this.eraseTail();
      this.drawPlayer(this.xCoor, this.yCoor);
      this.numFrames++;
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

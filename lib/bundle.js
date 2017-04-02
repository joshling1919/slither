/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(1);


document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const player = new __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */](canvas, ctx);
  player.start();
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const SPEED = 1;

class Player {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
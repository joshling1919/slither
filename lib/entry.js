import Player from './player';

document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const player = new Player(canvas, ctx);
  player.start();
});

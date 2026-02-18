const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

canvas.style.width = "960px";
canvas.style.height = "600px";

const map = [
  [1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,1],
  [1,0,1,0,1,0,0,1],
  [1,0,0,0,0,0,0,1],
  [1,1,1,0,0,1,1,1], 
  [1,0,0,0,0,0,0,1],
  [1,0,1,0,1,0,0,1],
  [1,0,0,0,0,0,0,1],
  [1,1,1,0,0,1,1,1],
  [1,1,1,1,1,1,1,1]




];

const player = { x: 100, y: 100, a: 0, hp: 100 };
const keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);
canvas.onclick = () => canvas.requestPointerLock();

document.addEventListener("mousemove", e => {
  if (document.pointerLockElement === canvas)
    player.a += e.movementX * 0.002;
});

const wallTex = new Image();
wallTex.src = "assets/wall.png";
const floorTex = new Image();
floorTex.src = "assets/floor.png";

const engine = new Raycaster(ctx, map, 64);

function update() {
  let sp = 2;
  let dx = Math.cos(player.a) * sp;
  let dy = Math.sin(player.a) * sp;

  if (keys.w) { player.x += dx; player.y += dy; }
  if (keys.s) { player.x -= dx; player.y -= dy; }
}

function loop() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0,0,320,100);
  ctx.fillStyle = "#300";
  ctx.fillRect(0,100,320,100);

  update();
  engine.render(player, wallTex, floorTex);

  requestAnimationFrame(loop);
}

loop();

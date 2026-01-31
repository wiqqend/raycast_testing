class Raycaster {
  constructor(ctx, map, tileSize) {
    this.ctx = ctx;
    this.map = map;
    this.tile = tileSize;
    this.fov = Math.PI / 3;
    this.depth = 800;
  }

  isWall(x, y) {
    let mx = Math.floor(x / this.tile);
    let my = Math.floor(y / this.tile);
    return this.map[my]?.[mx] === 1;
  }

  render(player, texture) {
    const w = this.ctx.canvas.width;
    const h = this.ctx.canvas.height;

    for (let i = 0; i < w; i++) {
      let angle = player.a - this.fov / 2 + (i / w) * this.fov;
      let sin = Math.sin(angle);
      let cos = Math.cos(angle);

      for (let d = 1; d < this.depth; d++) {
        let x = player.x + cos * d;
        let y = player.y + sin * d;

        if (this.isWall(x, y)) {
          let cd = d * Math.cos(angle - player.a);
          let wallH = (this.tile * 200) / cd;
          this.ctx.drawImage(
            texture,
            0, 0, texture.width, texture.height,
            i, h / 2 - wallH / 2,
            1, wallH
          );
          break;
        }
      }
    }
  }
}

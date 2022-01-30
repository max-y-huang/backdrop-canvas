import { saveConfigJSON } from "./fetch";

class MapData {
  constructor(p5, data) {
    this.tileImages = [];
    this.map = {};
    this.p5 = p5;
    let { width, height, tiles } = data;
    this.width = width;
    this.height = height;
    this.image = p5.createGraphics(width * 48, height * 48);
    this.createPlaceholderImage();
    this.loadTiles(tiles);
  }

  loadTiles(tiles) {
    tiles.forEach((tile) => {
      this.addTile(tile, true);
    });
  }

  updateTileImages(imageSrcs) {
    const update = (i, callback) => {
      if (i === imageSrcs.length) {
        callback();
        return;
      }
      this.p5.loadImage(imageSrcs[i], (image) => {
        this.tileImages[i] = image;
        update(i + 1, callback);
      });
    };
    update(0, () => {
      this.updateImage();
    });
  }

  createPlaceholderImage() {
    this.placeholderTileImage = this.p5.createGraphics(48, 48);
    this.placeholderTileImage.background("#020d19");
    this.placeholderTileImage.noStroke();
    this.placeholderTileImage.fill("#041c35");
    this.placeholderTileImage.rect(0, 0, 24, 24);
    this.placeholderTileImage.rect(24, 24, 24, 24);
  }

  updateImage() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.updateImageAtPosition(x, y);
      }
    }
  }

  updateImageAtPosition(x, y) {
    // Draw background.
    this.image.image(this.placeholderTileImage, x * 48, y * 48, 48, 48);
    // Draw tiles.
    for (let layer = 0; layer < 3; layer++) {
      if (
        this.map[y] &&
        this.map[y][x] &&
        this.map[y][x][layer] &&
        this.tileImages[this.map[y][x][layer].index]
      ) {
        this.image.image(
          this.tileImages[this.map[y][x][layer].index].get(0, 0, 48, 48),
          x * 48,
          y * 48
        );
      }
    }
    this.p5.redraw();
  }

  addTile(tile, fromLoad = false) {
    let { x, y, layer } = tile;
    if (!this.map[y]) {
      this.map[y] = {};
    }
    if (!this.map[y][x]) {
      this.map[y][x] = {};
    }
    if (fromLoad) {
      this.map[y][x][layer] = tile;
    } else {
      this.eraseAtPosition(x, y, layer);
      this.map[y][x][layer] = tile;
      this.updateImageAtPosition(x, y);
    }
  }

  eraseAtPosition(x, y, minLayer) {
    for (let layer = minLayer; layer < 3; layer++) {
      if (this.map[y] && this.map[y][x] && this.map[y][x][layer]) {
        delete this.map[y][x][layer];
      }
    }
    this.updateImageAtPosition(x, y);
  }

  save() {
    let tiles = [];
    Object.entries(this.map).forEach(([y, row]) => {
      Object.entries(row).forEach(([x, col]) => {
        Object.entries(col).forEach(([layer, tile]) => {
          tiles.push({
            x: tile.x,
            y: tile.y,
            index: tile.index,
            layer: tile.layer,
          });
        });
      });
    });
    let data = {
      width: this.width,
      height: this.height,
      tiles: tiles,
    };
    return new Promise(async (resolve, reject) => {
      await saveConfigJSON("maps", data);
      resolve();
    });
  }
}

export default MapData;

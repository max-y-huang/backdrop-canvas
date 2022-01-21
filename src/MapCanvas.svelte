<script>
  const fs = require("fs");
  const path = require("path");
  const tilesetData = require("../config/tilesets.json");

  import P5 from "p5-svelte";
  import { selectedTileIndex } from "./stores.js";

  class MapData {
    constructor(p5, width, height) {
      this.map = {};
      this.p5 = p5;
      this.width = width;
      this.height = height;
      this.image = p5.createGraphics(width * 48, height * 48);
    }

    updateImage(x, y) {
      // Draw background.
      this.image.fill(48, 96, 208);
      this.image.noStroke();
      this.image.rect(x * 48, y * 48, 48, 48);
      // Draw tiles.
      for (let layer = 0; layer < 3; layer++) {
        if (this.map[y] && this.map[y][x] && this.map[y][x][layer]) {
          this.image.image(
            this.map[y][x][layer].image.get(0, 0, 48, 48),
            x * 48,
            y * 48
          );
        }
      }
    }

    addTile(tile) {
      let { x, y, layer } = tile;
      if (!this.map[y]) {
        this.map[y] = {};
      }
      if (!this.map[y][x]) {
        this.map[y][x] = {};
      }
      if (!this.map[y][x][layer]) {
        this.map[y][x][layer] = tile;
        this.updateImage(x, y);
      }
    }

    eraseAt(x, y) {
      for (let layer = 0; layer < 3; layer++) {
        if (this.map[y] && this.map[y][x] && this.map[y][x][layer]) {
          delete this.map[y][x][layer];
        }
      }
      this.updateImage(x, y);
    }

    export() {
      let list = [];
      Object.entries(this.map).forEach(([y, row]) => {
        Object.entries(row).forEach(([x, col]) => {
          Object.entries(col).forEach(([layer, tile]) => {
            list.push({
              x: tile.x,
              y: tile.y,
              index: tile.index,
            });
          });
        });
      });

      let data = {
        width: this.width,
        height: this.height,
        tiles: list,
      };

      fs.writeFileSync(
        path.join(__dirname, process.env.GAME_DIR, "config/maps.json"),
        JSON.stringify(data)
      );
    }
  }

  let selectedIndex;
  let wrapperWidth;
  let wrapperHeight;

  let mapWidth = 20;
  let mapHeight = 15;

  const sketch = (p5) => {
    let mapData = new MapData(p5, mapWidth, mapHeight);

    p5.setup = () => {
      p5.createCanvas(wrapperWidth, wrapperHeight);
      p5.select("#save-button").mousePressed(() => {
        mapData.export();
      });
    };

    p5.draw = () => {
      resizeCanvas();
      drawBackground();
      drawTiles();
      drawGrid();
      drawCursor();
      p5.noStroke();
      p5.fill(255, 0, 0);
      p5.text(Math.round(p5.frameRate()), 0, 20);
    };

    const resizeCanvas = () => {
      if (wrapperWidth !== p5.width || wrapperHeight !== p5.height) {
        p5.resizeCanvas(wrapperWidth, wrapperHeight);
      }
    };

    const cursorX = () => {
      let val = Math.floor(p5.mouseX / 48);
      return Math.min(Math.max(val, 0), mapWidth - 1);
    };
    const cursorY = () => {
      let val = Math.floor(p5.mouseY / 48);
      return Math.min(Math.max(val, 0), mapHeight - 1);
    };

    const mouseOver = () => {
      return (
        cursorX() == Math.floor(p5.mouseX / 48) &&
        cursorY() == Math.floor(p5.mouseY / 48)
      );
    };

    const drawBackground = () => {
      p5.clear();
      p5.fill(48, 96, 208);
      p5.noStroke();
      p5.rect(0, 0, mapWidth * 48, mapHeight * 48);
    };

    const drawTiles = () => {
      p5.image(mapData.image, 0, 0);
    };

    const drawGrid = () => {
      p5.stroke(255, 255, 255, 48);
      p5.strokeWeight(1);
      for (let y = 1; y < mapHeight; y++) {
        p5.line(0, y * 48, mapWidth * 48, y * 48);
      }
      for (let x = 1; x < mapWidth; x++) {
        p5.line(x * 48, 0, x * 48, mapHeight * 48);
      }
    };

    const drawCursor = () => {
      if (mouseOver()) {
        p5.noFill();
        p5.stroke(255, 0, 0);
        p5.strokeWeight(4);
        p5.rect(cursorX() * 48 + 2, cursorY() * 48 + 2, 48 - 4, 48 - 4);
      }
    };

    const addTileByMouse = () => {
      let tileData = tilesetData["dungeon"][selectedIndex];
      if (mouseOver()) {
        p5.loadImage(
          path.join(
            __dirname,
            process.env.GAME_DIR,
            tileData["spritesheetSrc"]
          ),
          (image) => {
            mapData.addTile({
              x: cursorX(),
              y: cursorY(),
              layer: tileData["layer"],
              index: selectedIndex,
              image: image,
            });
          }
        );
      }
    };

    const eraseTileByMouse = () => {
      if (mouseOver()) {
        mapData.eraseAt(cursorX(), cursorY());
      }
    };

    p5.mousePressed = () => {
      if (p5.mouseButton === p5.LEFT) {
        addTileByMouse();
      } else if (p5.mouseButton === p5.RIGHT) {
        eraseTileByMouse();
      }
    };
    p5.mouseDragged = () => {
      if (p5.mouseButton === p5.LEFT) {
        addTileByMouse();
      } else if (p5.mouseButton === p5.RIGHT) {
        eraseTileByMouse();
      }
    };
  };

  selectedTileIndex.subscribe((value) => {
    selectedIndex = value;
  });
</script>

<div
  class="wrapper"
  bind:clientWidth={wrapperWidth}
  bind:clientHeight={wrapperHeight}
>
  <P5 {sketch} />
</div>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
  }
</style>

<script>
  import P5 from "p5-svelte";
  import {
    _selectedTileIndex,
    _tileImageSrcs,
    _tilesetData,
    _mapData,
  } from "./stores";
  import MapData from "./MapData";

  let tilesetData;
  let selectedTileIndex;

  let mouseOver = false;

  let mapData;
  let tileImageSrcs;

  const sketch = (p5) => {
    p5.setup = () => {
      p5.createCanvas(mapData.width * 48, mapData.height * 48);
      p5.noLoop();
      p5.select("#save-button").mousePressed(async () => {
        await mapData.saveTiles();
        console.log("saved!");
      });
      p5.select("#update-map-properties-button").mousePressed(() => {
        let width = parseInt(
          document.querySelector("#map-properties--width").value
        );
        let height = parseInt(
          document.querySelector("#map-properties--height").value
        );
        mapData.resize(width, height);
        mapData.updateImage();
        p5.redraw();
      });
    };

    p5.draw = () => {
      drawMap();
      drawGrid();
      drawCursor();
    };

    const cursorX = () => {
      let val = Math.floor(p5.mouseX / 48);
      return Math.min(Math.max(val, 0), mapData.width - 1);
    };
    const cursorY = () => {
      let val = Math.floor(p5.mouseY / 48);
      return Math.min(Math.max(val, 0), mapData.height - 1);
    };

    const drawMap = () => {
      p5.image(mapData.image, 0, 0);
    };

    const drawGrid = () => {
      p5.strokeWeight(2);
      p5.stroke("#00000080");
      for (let x = 0; x <= mapData.width; x++) {
        p5.line(48 * x, 0, 48 * x, 48 * mapData.height);
      }
      for (let y = 0; y <= mapData.height; y++) {
        p5.line(0, 48 * y, 48 * mapData.width, 48 * y);
      }
    };

    const drawCursor = () => {
      if (mouseOver) {
        p5.noFill();
        p5.stroke("#ff0000");
        p5.strokeWeight(4);
        p5.rect(cursorX() * 48 + 2, cursorY() * 48 + 2, 48 - 4, 48 - 4);
      }
    };

    const addTileByMouse = () => {
      let tileData = tilesetData[selectedTileIndex];
      if (mouseOver) {
        mapData.addTile({
          x: cursorX(),
          y: cursorY(),
          layer: tileData["layer"],
          index: selectedTileIndex,
        });
      }
    };

    const eraseTileByMouse = () => {
      if (mouseOver) {
        mapData.eraseAtPosition(cursorX(), cursorY(), 0);
      }
    };

    p5.mouseMoved = () => {
      p5.redraw();
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
      p5.redraw();
    };

    _tileImageSrcs.subscribe((value) => {
      tileImageSrcs = value;
      if (mapData) {
        mapData.updateTileImages(tileImageSrcs);
      }
    });
    _mapData.subscribe((value) => {
      if (value) {
        document.querySelector("#map-properties--width").value = value.width;
        document.querySelector("#map-properties--height").value = value.height;
        mapData = new MapData(p5, value);
        mapData.updateTileImages(tileImageSrcs);
      }
    });
  };

  const handleMouseenter = () => {
    mouseOver = true;
  };
  const handleMouseleave = () => {
    mouseOver = false;
  };

  _selectedTileIndex.subscribe((value) => {
    selectedTileIndex = value;
  });
  _tilesetData.subscribe((value) => {
    tilesetData = value;
  });
</script>

<div class="wrapper">
  <div on:mouseenter={handleMouseenter} on:mouseleave={handleMouseleave}>
    <P5 {sketch} />
  </div>
</div>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .wrapper > div {
    width: fit-content;
  }
</style>

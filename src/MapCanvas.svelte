<script>
  import P5 from "p5-svelte";
  import { selectedTileIndex, _tileImageSrcs, _tilesetData } from "./stores.js";
  import { run } from "./fetch";
  import MapData from "./MapData";

  let tilesetData;
  let selectedIndex;

  let mapWidth = 20;
  let mapHeight = 15;

  const sketch = (p5) => {
    let mapData = new MapData(p5, mapWidth, mapHeight);

    p5.setup = () => {
      p5.createCanvas(mapWidth * 48, mapHeight * 48);
      p5.noLoop();
      p5.select("#save-button").mousePressed(async () => {
        await mapData.save();
        console.log("saved!");
      });
    };

    p5.draw = () => {
      drawMap();
      drawCursor();
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

    const drawMap = () => {
      p5.image(mapData.image, 0, 0);
    };

    const drawCursor = () => {
      if (mouseOver()) {
        p5.noFill();
        p5.stroke("#ff0000");
        p5.strokeWeight(4);
        p5.rect(cursorX() * 48 + 2, cursorY() * 48 + 2, 48 - 4, 48 - 4);
      }
    };

    const addTileByMouse = () => {
      let tileData = tilesetData[selectedIndex];
      if (mouseOver()) {
        mapData.addTile({
          x: cursorX(),
          y: cursorY(),
          layer: tileData["layer"],
          index: selectedIndex,
        });
      }
    };

    p5.mouseMoved = () => {
      p5.redraw();
    };
    p5.mousePressed = () => {
      if (p5.mouseButton === p5.LEFT) {
        addTileByMouse();
      }
    };
    p5.mouseDragged = () => {
      if (p5.mouseButton === p5.LEFT) {
        addTileByMouse();
      }
      p5.redraw();
    };

    _tileImageSrcs.subscribe((value) => {
      mapData.updateTileImages(value);
    });
  };

  selectedTileIndex.subscribe((value) => {
    selectedIndex = value;
  });
  _tilesetData.subscribe((value) => {
    tilesetData = value;
  });
</script>

<div class="wrapper">
  <P5 {sketch} />
</div>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
</style>

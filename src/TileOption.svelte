<script>
  const path = require("path");

  import P5 from "p5-svelte";
  import { selectedTileIndex } from "./stores.js";

  export let index;
  export let data;
  let selected;

  const sketch = (p5) => {
    let image;

    p5.setup = () => {
      p5.createCanvas(48, 48);
      image = p5.loadImage(
        path.join(__dirname, process.env.GAME_DIR, data["spritesheetSrc"])
      );
    };

    p5.draw = () => {
      p5.image(image.get(0, 0, 48, 48), 0, 0);
    };
  };

  selectedTileIndex.subscribe((value) => {
    selected = value == index;
  });
</script>

<div class="wrapper">
  <P5 {sketch} />
  <button on:click={() => selectedTileIndex.set(index)} class:selected />
</div>

<style>
  .wrapper {
    width: 48px;
    height: 48px;
    position: relative;
  }
  button {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: none;
    outline: none;
    border: none;
  }
  button:hover {
    border: 4px solid #ff0000;
  }
  button.selected {
    border: 4px solid #00ffff;
  }
</style>

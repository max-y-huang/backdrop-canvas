<script>
  import { _tileImageSrcs } from "./stores";
  import P5 from "p5-svelte";
  import { _selectedTileIndex } from "./stores";

  export let index;
  let selected;
  let prevImageSrc, imageSrc;

  const sketch = (p5) => {
    let image;

    p5.setup = () => {
      p5.createCanvas(48, 48);
    };

    p5.draw = () => {
      refreshImage();
      p5.image(image.get(0, 0, 48, 48), 0, 0);
    };

    const refreshImage = () => {
      if (imageSrc !== prevImageSrc) {
        image = p5.loadImage(imageSrc);
        prevImageSrc = imageSrc;
      }
    };
  };

  _selectedTileIndex.subscribe((value) => {
    selected = value == index;
  });
  _tileImageSrcs.subscribe((value) => {
    imageSrc = value[index];
  });
</script>

<div class="wrapper">
  <P5 {sketch} />
  <button on:click={() => _selectedTileIndex.set(index)} class:selected />
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

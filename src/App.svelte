<script>
  import Toolbar from "./Toolbar.svelte";
  import TileSelect from "./TileSelect.svelte";
  import MapCanvas from "./MapCanvas.svelte";
</script>

<div class="wrapper">
  <div class="toolbar-container">
    <Toolbar />
  </div>
  <div class="tile-select-container">
    <TileSelect tileset="dungeon" />
  </div>
  <div class="map-canvas-container">
    <MapCanvas />
  </div>
</div>

<style>
  .wrapper {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: auto 1fr;
  }
  .toolbar-container {
    position: relative;
    border-bottom: 2px solid #202020;
    /* box-shadow: 0 4px 6px #00000015; */
    grid-row: 1;
    grid-column: 1 / 3;
  }
  .tile-select-container {
    position: relative;
    border-right: 2px solid #202020;
    /* box-shadow: 4px 0 6px #00000015; */
    grid-row: 2;
    grid-column: 1;
  }
  .map-canvas-container {
    position: relative;
    grid-row: 2;
    grid-column: 2;
    overflow: hidden;
  }
</style>

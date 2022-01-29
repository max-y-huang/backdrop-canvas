<script>
  import Toolbar from "./Toolbar.svelte";
  import TileSelect from "./TileSelect.svelte";
  import MapCanvas from "./MapCanvas.svelte";
  import { setWorkingPath, getConfigJSON } from "./fetch.js";
  import { _workingPath, _tilesetData, _tileImageSrcs } from "./stores";

  let projectLoaded = false;

  const handleLoadButton = async (path) => {
    try {
      // User select folder path.
      let { path } = await ipc_namespace.selectFolderPath();
      await setWorkingPath(path);
      _workingPath.set(path);
      // Load tileset data, tile images.
      let tilesetData = await getConfigJSON("tilesets");
      _tilesetData.set(tilesetData);
      _tileImageSrcs.set(
        tilesetData.map((data) => path + "/" + data["spritesheetSrc"])
      );
      // Finish loading project.
      projectLoaded = true;
    } catch (error) {
      console.error(error);
    }
  };
</script>

{#if !projectLoaded}
  <div class="load-wrapper">
    <button on:click={handleLoadButton}>
      <span class="material-icons">folder</span>
      Load project
    </button>
  </div>
{:else}
  <div class="wrapper">
    <div class="toolbar-container">
      <Toolbar />
    </div>
    <div class="tile-select-container">
      <TileSelect />
    </div>
    <div class="map-canvas-container">
      <MapCanvas />
    </div>
  </div>
{/if}

<style>
  .load-wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .load-wrapper > button {
    display: flex;
    align-items: center;
    gap: 0.5em;
    font-size: 1.5em;
    padding: 0.2em 0.6em;
  }
  .load-wrapper > button > .material-icons {
    font-size: 1.5em;
  }
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

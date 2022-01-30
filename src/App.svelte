<script>
  import Toolbar from "./Toolbar.svelte";
  import TileSelect from "./TileSelect.svelte";
  import MapCanvas from "./MapCanvas.svelte";
  import { setWorkingPath, getConfigJSON } from "./fetch";
  import { _workingPath, _tilesetData, _tileImageSrcs } from "./stores";
  import { FolderOpen16 } from "carbon-icons-svelte";
  import { Button } from "carbon-components-svelte";

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
    <Button on:click={handleLoadButton} icon={FolderOpen16}>
      <!-- <Folder24 /> -->
      Load project
    </Button>
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
  .wrapper {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: auto 1fr;
  }
  .toolbar-container {
    position: relative;
    grid-row: 1;
    grid-column: 1 / 3;
  }
  .tile-select-container {
    position: relative;
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

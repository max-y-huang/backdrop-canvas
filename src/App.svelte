<script>
  import "carbon-components-svelte/css/g90.css";
  import WelcomeScreen from "./WelcomeScreen.svelte";
  import Toolbar from "./Toolbar.svelte";
  import LeftPanel from "./LeftPanel.svelte";
  import MapCanvas from "./MapCanvas.svelte";
  import { setWorkingPath, getConfigJSON } from "./fetch";
  import {
    _workingPath,
    _tilesetData,
    _mapData,
    _tileImageSrcs,
  } from "./stores";

  let projectLoaded = false;

  const loadProject = async () => {
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
      // Load map data.
      let mapData = await getConfigJSON("maps");
      _mapData.set(mapData);
      // Finish loading project.
      projectLoaded = true;
    } catch (error) {
      console.error(error);
    }
  };
</script>

{#if !projectLoaded}
  <WelcomeScreen {loadProject} />
{:else}
  <div class="wrapper">
    <div class="toolbar-container">
      <Toolbar {loadProject} />
    </div>
    <div class="left-panel-container">
      <LeftPanel />
    </div>
    <div class="map-canvas-container">
      <MapCanvas />
    </div>
  </div>
{/if}

<style>
  .wrapper {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: auto 1fr;
  }
  .toolbar-container {
    grid-row: 1;
    grid-column: 1 / 3;
  }
  .left-panel-container {
    grid-row: 2;
    grid-column: 1;
  }
  .map-canvas-container {
    grid-row: 2;
    grid-column: 2;
    overflow: hidden;
  }
</style>

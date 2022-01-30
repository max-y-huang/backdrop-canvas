import { writable } from "svelte/store";

const _workingPath = writable(undefined);
const _tilesetData = writable([]);
const _tileImageSrcs = writable([]);
const _mapData = writable(undefined);

const _selectedTileIndex = writable(0);
const _selectedMapCanvasMode = writable("map");

export {
  _workingPath,
  _tilesetData,
  _tileImageSrcs,
  _mapData,
  _selectedTileIndex,
  _selectedMapCanvasMode,
};

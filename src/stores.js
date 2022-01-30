import { writable } from "svelte/store";

const _workingPath = writable(undefined);
const _tilesetData = writable([]);
const _tileImageSrcs = writable([]);
const _mapData = writable(undefined);

const selectedTileIndex = writable(0);

export {
  _workingPath,
  _tilesetData,
  _tileImageSrcs,
  _mapData,
  selectedTileIndex,
};

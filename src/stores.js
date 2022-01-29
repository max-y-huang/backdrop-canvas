import { writable } from "svelte/store";

const _workingPath = writable(undefined);
const _tilesetData = writable([]);
const _tileImageSrcs = writable([]);

const selectedTileIndex = writable(0);

export { _workingPath, _tilesetData, _tileImageSrcs, selectedTileIndex };

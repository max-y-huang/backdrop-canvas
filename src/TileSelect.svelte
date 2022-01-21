<script>
  const tilesetData = require("../config/tilesets.json");

  import TileOption from "./TileOption.svelte";

  export let tileset;

  let tileOptions = tilesetData[tileset].map((option, i) => ({
    index: i,
    data: option,
  }));
</script>

<div class="wrapper">
  <div>
    <div>
      {#each tileOptions as option}
        <TileOption {...option} />
      {/each}
    </div>
  </div>
</div>

<style>
  .wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .wrapper > div {
    height: 0;
    flex-grow: 1;
    overflow: auto;
  }
  .wrapper > div > div {
    display: grid;
    grid-template-columns: repeat(4, auto);
    /* row-gap: 2px;
    column-gap: 2px; */
    padding: 6px;
  }
</style>

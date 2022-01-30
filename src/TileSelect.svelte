<script>
  import TileOption from "./TileOption.svelte";
  import { _tilesetData } from "./stores";

  let tileOptions = [];

  _tilesetData.subscribe((value) => {
    tileOptions = value.map((option, i) => ({
      index: i,
    }));
  });
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
    border-right: 2px solid #181818;
  }
  .wrapper > div {
    height: 0;
    flex-grow: 1;
    overflow: auto;
  }
  .wrapper > div > div {
    display: grid;
    grid-template-columns: repeat(4, auto);
    padding: 6px;
  }
</style>

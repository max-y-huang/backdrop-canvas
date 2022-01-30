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
  {#each tileOptions as option}
    <TileOption {...option} />
  {/each}
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(4, 48px);
  }
</style>

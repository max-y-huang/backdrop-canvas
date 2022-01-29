<script>
  import { run } from "./fetch";
</script>

<div class="wrapper">
  <div>
    <button id="save-button">
      <span class="material-icons">save</span>
    </button>
    <button id="run-button" on:click={run}>
      <span class="material-icons">play_arrow</span>
    </button>
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    align-content: flex-start;
  }
</style>

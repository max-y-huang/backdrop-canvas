<script>
  import { run } from "./fetch";
  import { Save16, Run16 } from "carbon-icons-svelte";
  import { Button } from "carbon-components-svelte";
</script>

<div class="wrapper">
  <div>
    <Button
      id="save-button"
      iconDescription="Save"
      icon={Save16}
      kind="ghost"
    />
    <Button
      id="run-button"
      iconDescription="Run"
      icon={Run16}
      kind="ghost"
      on:click={run}
    />
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    align-content: flex-start;
  }
</style>

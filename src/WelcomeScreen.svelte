<script>
  import { FolderAdd16, FolderOpen16 } from "carbon-icons-svelte";
  import { Button, ButtonSet } from "carbon-components-svelte";

  export let loadProject;

  const handleLoadButton = () => {
    loadProject();
  };
</script>

<div class="wrapper">
  <div>
    <h1>Welcome to Backdrop!</h1>
    <p>Start creating with one of the options below.</p>
    <ButtonSet>
      <Button disabled icon={FolderAdd16}>Create project</Button>
      <Button on:click={handleLoadButton} icon={FolderOpen16}>
        Open project
      </Button>
    </ButtonSet>
  </div>
</div>

<style>
  .wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .wrapper > div {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }
</style>

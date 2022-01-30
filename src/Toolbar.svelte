<script>
  import { _workingPath } from "./stores";
  import {
    Folder16,
    FolderAdd16,
    FolderOpen16,
    Save16,
    Run16,
    Package16,
    Information16,
  } from "carbon-icons-svelte";
  import { Button } from "carbon-components-svelte";

  export let loadProject;

  let workingPath;
  let projectName;

  const handleLoadButton = () => {
    loadProject();
  };

  const handleRunButton = () => {
    ipc_namespace.runGame(workingPath);
  };

  const handleInfoButton = () => {
    ipc_namespace.openURL("https://maxhuang.dev");
  };

  _workingPath.subscribe((value) => {
    workingPath = value;
    projectName = value.split("\\").at(-1);
  });
</script>

<div class="wrapper">
  <div>
    <Folder16 style="margin-right: 1em;" />{projectName}
  </div>
  <div>
    <Button
      iconDescription="Create project"
      icon={FolderAdd16}
      kind="ghost"
      disabled
    />
    <Button
      iconDescription="Open project"
      icon={FolderOpen16}
      kind="ghost"
      on:click={handleLoadButton}
    />
    <!-- Action handled by MapCanvas. -->
    <Button
      id="save-button"
      iconDescription="Save project"
      icon={Save16}
      kind="ghost"
    />
  </div>
  <div>
    <Button
      iconDescription="Export game"
      icon={Package16}
      kind="ghost"
      disabled
    />
    <Button
      iconDescription="Run game"
      icon={Run16}
      kind="ghost"
      on:click={handleRunButton}
    />
  </div>
  <div>
    <Button
      iconDescription="About"
      icon={Information16}
      kind="ghost"
      on:click={handleInfoButton}
    />
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    padding-left: 1em;
    padding-right: 1em;
    gap: 1em;
    user-select: none;
    border-bottom: 2px solid #333333;
  }
  .wrapper > div {
    display: flex;
    align-items: center;
  }
  .wrapper > div:not(:last-child)::after {
    display: block;
    content: "";
    height: 50%;
    padding-left: 1em;
    border-right: 2px solid #424242;
  }
</style>

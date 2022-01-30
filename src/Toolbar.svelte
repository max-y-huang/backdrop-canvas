<script>
  import { run } from "./fetch";
  import { _workingPath } from "./stores";
  import { Folder16, Save16, Run16, Information16 } from "carbon-icons-svelte";
  import { Button } from "carbon-components-svelte";

  let projectName = "";

  const handleInfoButton = () => {
    ipc_namespace.openURL("https://maxhuang.dev");
  };

  _workingPath.subscribe((value) => {
    projectName = value.split("\\").at(-1);
  });
</script>

<div class="wrapper">
  <div>
    <Folder16 style="margin-right: 1em;" />{projectName}
  </div>
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

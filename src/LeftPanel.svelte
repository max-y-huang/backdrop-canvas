<script>
  import MapProperties from "./MapProperties.svelte";
  import TileSelect from "./TileSelect.svelte";
  import { Accordion, AccordionItem, Button } from "carbon-components-svelte";
  import { Add16 } from "carbon-icons-svelte";
</script>

<div class="wrapper">
  <div>
    <Accordion>
      <AccordionItem title="Map Properties">
        <MapProperties />
      </AccordionItem>
      <AccordionItem title="Map Tiles" open>
        <TileSelect />
      </AccordionItem>
      <AccordionItem title="Event Presets">
        <p style="color: #909090;">Nothing here, sadly</p>
      </AccordionItem>
    </Accordion>
    <div class="footer">
      <Button icon={Add16} style="width: 100%">New map</Button>
    </div>
  </div>
</div>

<style>
  .wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #181818;
    overflow-y: scroll;
  }
  .wrapper > div {
    height: 0;
    width: calc(196px + 2rem);
    flex-grow: 1;
  }
  .footer {
    position: sticky;
    bottom: 0;
    background-color: #262626;
    padding: 1rem;
    z-index: 1000;
  }
</style>

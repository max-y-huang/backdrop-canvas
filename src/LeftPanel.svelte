<script>
  import MapProperties from "./MapProperties.svelte";
  import TileSelect from "./TileSelect.svelte";
  import {
    Accordion,
    AccordionItem,
    Button,
    ButtonSet,
    Modal,
    Tile,
    TextInput,
    FluidForm,
  } from "carbon-components-svelte";
  import { Add16, TrashCan16, Copy16, Erase16 } from "carbon-icons-svelte";

  let openDeleteModal = false;

  const handleDeleteButton = () => {
    openDeleteModal = false;
  };
</script>

<div class="wrapper">
  <div>
    <Accordion>
      <AccordionItem title="Map Properties">
        <MapProperties />
      </AccordionItem>
      <AccordionItem title="Tiles" open>
        <TileSelect />
      </AccordionItem>
      <AccordionItem title="Events">
        <p style="color: #909090;">Nothing here, sadly</p>
      </AccordionItem>
    </Accordion>
    <div class="footer">
      <ButtonSet stacked>
        <Button icon={Add16}>New map</Button>
        <Button icon={Erase16} kind="secondary">Clear map</Button>
        <Button icon={Copy16} kind="secondary">Duplicate map</Button>
        <Button
          icon={TrashCan16}
          kind="danger"
          on:click={() => (openDeleteModal = true)}
        >
          Delete map
        </Button>
      </ButtonSet>
    </div>
  </div>
</div>

<Modal
  danger
  bind:open={openDeleteModal}
  modalHeading="Delete map?"
  primaryButtonText="Delete"
  secondaryButtonText="Cancel"
  on:click:button--secondary={() => (openDeleteModal = false)}
  on:submit={handleDeleteButton}
>
  <p style="margin-bottom: 1rem;">Are you sure you want to delete this map?</p>
  <Tile light>
    <FluidForm>
      <TextInput readonly labelText="ID" value="123test" />
      <TextInput readonly labelText="Name" value="123test" />
    </FluidForm>
  </Tile>
</Modal>

<style>
  .wrapper {
    padding-left: 6px;
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

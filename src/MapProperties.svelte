<script>
  import {
    Form,
    FluidForm,
    FormGroup,
    TextInput,
    NumberInput,
    Button,
    ButtonSet,
  } from "carbon-components-svelte";
  import { Checkmark16 } from "carbon-icons-svelte";

  let minWidth = 20,
    maxWidth = 100;
  let minHeight = 15,
    maxHeight = 100;

  let width = 20,
    height = 15;
  let invalidWidth, invalidHeight;

  $: invalidWidth = width < minWidth || width > maxWidth;
  $: invalidHeight = height < minHeight || height > maxHeight;
</script>

<div class="wrapper">
  <Form>
    <!-- <FormGroup legendText="ID">
      <TextInput readonly placeholder="MAP ID" />
    </FormGroup>
    <FormGroup legendText="Name">
      <TextInput placeholder="E.g. Port Town 1" />
    </FormGroup> -->
    <FormGroup legendText="Dimensions (w x h)">
      <FluidForm>
        <NumberInput
          id="map-properties--width"
          invalidText="Width must be between 20 and 100."
          min={minWidth}
          max={maxWidth}
          bind:value={width}
        />
        <NumberInput
          id="map-properties--height"
          invalidText="Height must be between 15 and 100."
          min={minHeight}
          max={maxHeight}
          bind:value={height}
        />
      </FluidForm>
    </FormGroup>
    <ButtonSet stacked>
      <Button
        id="update-map-properties-button"
        icon={Checkmark16}
        disabled={invalidWidth || invalidHeight}
      >
        Update properties
      </Button>
    </ButtonSet>
  </Form>
</div>

<style>
</style>

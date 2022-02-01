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
</script>

<div class="wrapper">
  <Form>
    <FormGroup legendText="ID">
      <TextInput readonly placeholder="MAP ID" />
    </FormGroup>
    <FormGroup legendText="Name">
      <TextInput placeholder="E.g. Port Town 1" />
    </FormGroup>
    <FormGroup legendText="Dimensions (w x h)">
      <FluidForm>
        <NumberInput
          invalidText="Width must be between 20 and 100."
          min={20}
          max={100}
          value={20}
        />
        <NumberInput
          invalidText="Height must be between 15 and 100."
          min={15}
          max={100}
          value={15}
        />
      </FluidForm>
    </FormGroup>
    <ButtonSet stacked>
      <Button icon={Checkmark16}>Update properties</Button>
    </ButtonSet>
  </Form>
</div>

<style>
</style>

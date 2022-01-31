<script>
  import {
    Form,
    FluidForm,
    FormGroup,
    TextInput,
    NumberInput,
    Button,
  } from "carbon-components-svelte";
  import { Checkmark16 } from "carbon-icons-svelte";
</script>

<div class="wrapper">
  <Form>
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
    <FormGroup>
      <Button icon={Checkmark16} style="width: 100%" disabled>
        Update properties
      </Button>
    </FormGroup>
  </Form>
</div>

<style>
</style>

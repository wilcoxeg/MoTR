<docs>
```vue
<Experiment>
    <Screen>

      <Slide>
        <p>Fries or soup?</p>
        <DropdownInput
            :options="['fries', 'soup']"
            :response.sync= "$magpie.measurements.lunch"
          />
        <p v-if= "$magpie.measurements.lunch === 'soup'">I disagree!</p>
        <button @click="$magpie.saveAndNextScreen">Submit</button>
      </Slide>

    </Screen>

    <DebugResultsScreen />

</Experiment>
```
</docs>

<template>
  <div class="dropdown-input">
    <select ref="input" @change="$emit('update:response', $refs.input.value)">
      <option
        v-for="option of options"
        :key="option"
        :value="option"
        v-text="option"
      ></option>
    </select>
  </div>
</template>

<script>
/**
 * Have your participants provide a text answer
 */
export default {
  name: 'DropdownInput',
  props: {
    options: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped></style>

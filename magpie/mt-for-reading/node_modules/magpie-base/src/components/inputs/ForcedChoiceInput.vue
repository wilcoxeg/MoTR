<docs>

```vue
<Experiment>
    <Screen>

      <Slide>
        <p>What's on the bread?</p>
        <ForcedChoiceInput
            :response.sync= "$magpie.measurements.bread"
            :options="['Ham', 'Jam']" />
          <p v-if= "$magpie.measurements.bread === 'Jam'">A sweet tooth, eh!?</p>
        <button @click="$magpie.saveAndNextScreen();">Submit</button>
      </Slide>

    </Screen>

</Experiment>
```

The following example will submit the response directly on clicking it.

```vue
<Experiment>
    <Screen>

      <Slide>
        <p>What's on the bread?</p>
        <ForcedChoiceInput
            :response.sync= "$magpie.measurements.bread"
            :options="['Ham', 'Jam']"
            @update:response="$magpie.saveAndNextScreen();"/>
      </Slide>

    </Screen>
</Experiment>
```

</docs>

<template>
  <div class="forced_choice">
    <div class="options">
      <div
        v-for="option in options"
        :key="option"
        class="option"
        @click="onOptionClick(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Have the participant choose between multiple options.
 */
export default {
  name: 'ForcedChoiceInput',
  props: {
    /**
     * The possible options to choose from
     */
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    onOptionClick(option) {
      /**
       * Change event with the chosen option. Useful in combination with `response.sync`
       */
      this.$emit('update:response', option);
    }
  }
};
</script>

<style scoped>
.option {
  background-color: #5187ba;
  border: none;
  border-radius: 2px;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-family: 'Lato', 'Noto Sans', sans-serif;
  font-size: 12px;
  line-height: 20px;
  font-weight: 700;
  letter-spacing: 0.9px;
  margin: 0 5px 20px 5px;
  outline: none;
  padding: 5px 10px;
  text-transform: uppercase;
}

.option:hover {
  background-color: #324d93;
}
</style>

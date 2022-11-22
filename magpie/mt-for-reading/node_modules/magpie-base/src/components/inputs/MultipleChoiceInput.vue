<docs>

```vue
<Experiment>
    <Screen>

      <Slide>
        <p>How was your breakfast?</p>
        <MultipleChoiceInput
            :response.sync= "$magpie.measurements.breakfast"
            :options="['Not enjoyable', 'Rather not enjoyable', 'OK', 'Rather enjoyable', 'Really enjoyable']" />
        <button @click="$magpie.saveAndNextScreen();">Submit</button>
      </Slide>

    </Screen>
</Experiment>
```


```vue
<Experiment>
    <Screen>

      <Slide>
        <p>How was your breakfast?</p>
        <MultipleChoiceInput
            :response.sync= "$magpie.measurements.breakfast"
            orientation="horizontal"
            :options="['Not enjoyable', 'Rather not enjoyable', 'OK', 'Rather enjoyable', 'Really enjoyable']" />
        <button @click="$magpie.saveAndNextScreen();">Submit</button>
      </Slide>

    </Screen>
</Experiment>
```

```vue
<Experiment>
  <Screen>
      <p>Which sentence is ungrammatical?</p>
      <MultipleChoiceInput
          :response.sync= "$magpie.measurements.grammatical"
          :randomize="true"
          :options="['banana', 'bear', 'horse', 'bread']"
          :options-html="[
              'The <strong>banana</strong> went out to buy some groceries.',
              'The <strong>bear</strong> raced past the barn froze.',
              'The <strong>horse</strong> could not have been eaten why it was racing.',
              'The <strong>bread</strong> was sour before it was made.'
              ]">
      </MultipleChoiceInput>
      <button @click="$magpie.saveAndNextScreen();">Submit</button>
  </Screen>
  <DebugResultsScreen />
</Experiment>
```

</docs>

<template>
  <div :class="['multiple-choice', orientation]">
    <form>
      <div class="options">
        <label v-for="i in order" :key="i"
          ><input
            :value="options[i]"
            type="radio"
            name="options"
            @input="$emit('update:response', options[i])" />
          <template v-if="labels"
            ><span v-if="!optionsHtml.length">{{ options[i] }}</span
            ><span v-else v-html="optionsHtml[i]" /></template
        ></label>
      </div>
    </form>
  </div>
</template>

<script>
/**
 * Have the participant choose between multiple options.
 */
import shuffle from 'lodash/shuffle';

export default {
  name: 'MultipleChoiceInput',
  props: {
    /**
     * The possible options to choose from
     */
    options: {
      type: Array,
      required: true
    },
    /**
     * The possible options to choose from as HTML strings
     */
    optionsHtml: {
      type: Array,
      default: () => []
    },
    /**
     * Whether to display 'vertical' or 'horizontal'
     */
    orientation: {
      type: String,
      default: 'vertical'
    },
    /**
     * Whether to display labels
     */
    labels: {
      type: Boolean,
      default: true
    },
    /**
     * Whether to randomize the option order
     */
    randomize: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let order = Object.keys(this.options);
    if (this.randomize) {
      order = shuffle(order);
    }
    return {
      order
    };
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
.options label,
.options label * {
  cursor: pointer;
}

.multiple-choice.vertical {
  text-align: left;
  width: 500px;
  margin: 0 auto;
}

.multiple-choice.vertical label {
  display: block;
}

.multiple-choice.horizontal label {
  display: inline-block;
  margin: 0 10px;
}

.option:hover {
  background-color: #324d93;
}
</style>

<docs>

```vue
<Experiment>
    <Screen>

      <Slide>
        <CompletionInput
          text="One %s fell over three %s."
          :responses.sync= "$magpie.measurements.words"
          :options="[
              ['horse', 'penguin', 'bird'],
              ['icicles', 'trees', 'bushes']
              ]"
          />
        <p v-if= "$magpie.measurements.words">A {{$magpie.measurements.words[0]}} would never fall over {{$magpie.measurements.words[1]}}</p>
        <button @click="$magpie.saveAndNextScreen();">Done</button>
      </Slide>

    </Screen>

</Experiment>
```
</docs>
<template>
  <div class="completion">
    <div class="question">
      <span v-for="(slice, i) in slices" :key="i"
        >{{ slice }}
        <select
          v-if="i !== slices.length - 1"
          v-model="answers[i]"
          @change="
            /**
             * Change event with the fully completed text. Useful for response.sync
             */
            $emit('update:response', fullAnswer);
            /**
             * Change event as an array of completions. Useful for responses.sync
             */
            $emit('update:responses', answers);
          "
        >
          <option
            v-for="option in options[i]"
            :key="option"
            v-text="option"
          ></option></select
      ></span>
    </div>
  </div>
</template>

<script>
/**
 * Have the participant complete a text with various gaps.
 */
export default {
  name: 'CompletionInput',
  props: {
    /**
     * The text that is supposed to be completed. `%s` marks completions
     */
    text: {
      type: String,
      required: true
    },
    /**
     * An array of arrays with possible completions per `%s`
     */
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      answers: []
    };
  },
  computed: {
    slices() {
      return this.text.split('%s');
    },
    fullAnswer() {
      const answers = this.answers.slice();
      return this.text
        .split('%s')
        .map((s) => s + (answers.shift() || ''))
        .join('');
    }
  }
};
</script>

<style scoped>
textarea {
  border: 2px solid #5187ba;
  border-radius: 10px;
  display: block;
  font-size: 16px;
  margin: 0 auto;
  outline: none;
  padding: 10px 20px;
}
</style>

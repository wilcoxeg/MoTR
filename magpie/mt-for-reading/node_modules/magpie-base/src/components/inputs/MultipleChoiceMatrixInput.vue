<docs>

```vue
<Experiment>
    <Screen>

      <Slide>
        <MultipleChoiceMatrixInput
            :options="['Not enjoyable', 'Rather not enjoyable', 'OK', 'Rather enjoyable', 'Really enjoyable']"
            :questions="[
              'How is the weather today?',
              'How was your breakfast today?',
              'How do you like your job?',
              'What is your opinion of television?',
              'What is your opinion of folk music?'
            ]"
            :responses.sync= "$magpie.measurements.responses"
        />
        <button @click="$magpie.saveAndNextScreen();">Submit</button>
      </Slide>

    </Screen>

    <DebugResultsScreen />

</Experiment>
```

You can also randomize the question order. The response data will still be in the order you supplied the questions in.

```vue
<Experiment>
    <Screen>

      <Slide>
        <MultipleChoiceMatrixInput
            :options="['Not enjoyable', 'Rather not enjoyable', 'OK', 'Rather enjoyable', 'Really enjoyable']"
            :questions="[
              'How is the weather today?',
              'How was your breakfast today?',
              'How do you like your job?',
              'What is your opinion of television?',
              'What is your opinion of folk music?'
            ]"
            :randomize="true"
            :responses.sync= "$magpie.measurements.responses"
        />
        <button @click="$magpie.saveAndNextScreen();">Submit</button>
      </Slide>

    </Screen>

    <DebugResultsScreen />
</Experiment>
```


</docs>

<template>
  <div class="matrix-choice">
    <div class="row header">
      <p></p>
      <div>
        <label v-for="option in options" :key="option" v-text="option" />
      </div>
    </div>
    <template v-if="randomize">
      <template v-for="[question, i] in randomizedQuestions">
        <div :key="i" class="row">
          <p>{{ question }}</p>
          <MultipleChoiceInput
            :labels="false"
            :options="options"
            orientation="horizontal"
            @update:response="onOptionClick(i, $event)"
          />
        </div>
      </template>
    </template>
    <template v-else>
      <template v-for="(question, i) in questions">
        <div :key="i" class="row">
          <p>{{ question }}</p>
          <MultipleChoiceInput
            :labels="false"
            :options="options"
            orientation="horizontal"
            @update:response="onOptionClick(i, $event)"
          />
        </div>
      </template>
    </template>
    <div class="row header">
      <p></p>
      <div>
        <label v-for="option in options" :key="option" v-text="option" />
      </div>
    </div>
  </div>
</template>

<script>
import shuffle from 'lodash/shuffle';
import MultipleChoiceInput from './MultipleChoiceInput';
import Vue from 'vue';
/**
 * Have the participant choose between multiple options for multiple questions (arranged in a matrix).
 */
export default {
  name: 'MultipleChoiceMatrixInput',
  components: { MultipleChoiceInput },
  props: {
    /**
     * The questions to ask
     */
    questions: {
      type: Array,
      required: true
    },
    /**
     * The possible answers to choose from
     */
    options: {
      type: Array,
      required: true
    },
    /**
     * Whether to shuffle questions
     */
    randomize: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      responses: [],
      randomizedQuestions: shuffle(
        this.questions.map((question, i) => [question, i])
      )
    };
  },
  methods: {
    onOptionClick(i, response) {
      Vue.set(this.responses, i, response);
      /**
       * Change event with the chosen options.
       */
      this.$emit('update:responses', this.responses);
    }
  }
};
</script>

<style>
.matrix-choice {
  text-align: left;
  width: 100%;
}

.matrix-choice .row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.matrix-choice .row > :first-child {
  width: 50%;
  text-align: right;
}

.matrix-choice .row label {
  width: 50px;
  display: inline-block;
  font-size: 13px;
  margin: 0 10px;
  text-align: center;
}
</style>

<docs>
This is a pre-built self-paced reading task screen.

```vue
<Experiment>
  <SelfPacedReadingScreen
      question="Are fries healthy?"
      :chunks="['Fries', 'are', 'very', 'healthy', 'indeed.']">
    <template #stimulus>
      <img src="img/fries.jpg" />
    </template>
  </SelfPacedReadingScreen>

  <DebugResultsScreen />

</Experiment>
```
</docs>

<template>
  <!-- pass down props -->
  <LifecycleScreen v-bind="{ ...$attrs, ...$props }">
    <!-- pass down slots -->
    <template #fixation>
      <slot name="fixation"><FixationCross /></slot>
    </template>
    <template #stimulus>
      <slot name="stimulus"></slot>
    </template>

    <!-- SPR task -->
    <template #task>
      <Record
        :data="{
          chunks,
          trigger,
          underline,
          wordPos,
          question
        }"
      />
      <p v-if="question" v-text="question"></p>
      <p v-if="instructions" v-text="instructions"></p>
      <SelfPacedReadingInput
        :chunks="chunks"
        :word-pos="wordPos"
        :underline="underline"
        :trigger="trigger"
        :response-times.sync="$magpie.measurements.response_times"
        :timeout.sync="$magpie.measurements.spr_timeout"
        :show-keypress-options="false"
        @end="nextAfterResponse"
      />
    </template>

    <template #feedback>
      <slot name="feedback" />
    </template>
  </LifecycleScreen>
</template>

<script>
import LifecycleScreen from '../screens/LifecycleScreen';
import SelfPacedReadingInput from '../inputs/SelfPacedReadingInput';

/**
 * Inherits from LifecycleScreen
 *
 * **Screen Measurements**
 *
 * |Measurement|Type|Description|
 * |--|---|---|
 * |responseTime|int|Time between display of this screen until the screen is left|
 * |responseTimeout|boolean|Whether the response time limit was reached|
 * |qud *(optional)*|string||
 * |pauseTime *(optional)*|int||
 * |fixationTime *(optional)*|int||
 * |stimulusTime *(optional)*|int||
 * |responseTimeLimit *(optional)*|int|The response time limit|
 * |feedbackTime *(optional)*|int||
 * |question|string||
 * |responses|string|The selected responses|
 * |response_times|string|The response times per selectable option|
 * |spr_timeout|boolean|Whether the participant took longer than the set time limit per chunk|
 * |sprTimeLimit|int|Time limit per chunk|
 *
 */
export default {
  name: 'SelfPacedReadingScreen',
  components: { LifecycleScreen, SelfPacedReadingInput },
  extends: LifecycleScreen,
  props: {
    /**
     * A question
     */
    question: {
      type: String,
      default: undefined
    },
    /**
     * Self-paced reading text chunks
     */
    chunks: {
      type: Array,
      required: true
    },
    /**
     * Give instructions on what the participant is supposed to do
     */
    instructions: {
      type: String,
      default: 'Press SPACE to reveal the words.'
    },
    /**
     * The key to press to reveal the next word
     */
    trigger: {
      type: String,
      default: ' '
    },
    /**
     * Underline type
     *
     * @values words, sentence or none
     */
    underline: {
      type: String,
      default: 'none'
    },
    /**
     * Whether to show the next word at the same position or at the next
     *
     * @values same or next
     */
    wordPos: {
      type: String,
      default: 'same'
    },
    /**
     * Time limit per chunk
     */
    sprTimeLimit: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      responseTimes: [],
      responseTimeout: false
    };
  }
};
</script>

<style scoped>
.text {
  margin: 30px auto;
}

.text * {
  margin-right: 5px;
}

.text.underline-sentence * {
  margin-right: 0;
  padding-right: 5px;
  border-bottom: 1px solid black;
}

.text.underline-words * {
  border-bottom: 1px solid black;
}

.text :not(.current) {
  display: none;
}

.text.show-all :not(.current) {
  color: transparent;
  display: inline;
}

.text .current {
  color: black;
  display: inline;
}
</style>

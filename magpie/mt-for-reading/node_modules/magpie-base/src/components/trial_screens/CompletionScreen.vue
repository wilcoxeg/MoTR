<docs>
This is a pre-built completion screen, with limited functionality, but simpler to use.

```vue
<Experiment>
    <CompletionScreen
        question="What happened in antartica?"
        text="One %s fell over three %s."
        :options="[
              ['horse', 'penguin', 'bird'],
              ['icicles', 'trees', 'bushes']
              ]"
    />

    <DebugResultsScreen />
</Experiment>
```
</docs>

<template>
  <!-- pass down props -->
  <LifecycleScreen v-bind="{ ...$attrs, ...$props }">
    <!-- pass down slots -->
    <template slot="fixation">
      <slot name="fixation"></slot>
    </template>
    <template slot="stimulus">
      <slot name="stimulus"></slot>
    </template>

    <template #task>
      <Record
        :data="{
          question,
          options,
          text
        }"
      />
      <p v-if="question" v-text="question"></p>
      <CompletionInput
        :text="text"
        :options="options"
        :response.sync="$magpie.measurements.response"
        :responses.sync="$magpie.measurements.responses"
      />
      <button
        v-if="
          $magpie.measurements.responses &&
          $magpie.measurements.responses.filter(Boolean).length ===
            options.length
        "
        @click="nextAfterResponse"
      >
        {{ $t('general.nextButton') }}
      </button>
    </template>

    <template #feedback><slot name="feedback"></slot></template>
  </LifecycleScreen>
</template>

<script>
import Record from '../helpers/Record';
import CompletionInput from '../inputs/CompletionInput';
import LifecycleScreen from '../screens/LifecycleScreen';

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
 * |options|array||
 * |text|string||
 * |response|string|The completed text|
 * |responses|array|The individual completions|
 *
 */
export default {
  name: 'CompletionScreen',
  components: {
    LifecycleScreen,
    CompletionInput,
    Record
  },
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
  }
};
</script>
<style scoped></style>

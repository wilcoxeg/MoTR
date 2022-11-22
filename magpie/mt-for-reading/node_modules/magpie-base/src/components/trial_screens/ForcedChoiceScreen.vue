<docs>
This is a pre-built forced choice screen, with limited functionality, but simpler to use.

```vue
<Experiment>

    <ForcedChoiceScreen
        :options="['Yes', 'No']"
        question="Do you understand this question?"
        qud="Always do the opposite of what you are asked." />

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
          options
        }"
      />
      <p v-if="question" v-text="question"></p>
      <ForcedChoiceInput
        :options="options"
        :response.sync="$magpie.measurements.response"
        @update:response="nextAfterResponse"
      />
    </template>

    <template #feedback><slot name="feedback"></slot></template>
  </LifecycleScreen>
</template>

<script>
import ForcedChoiceInput from '../inputs/ForcedChoiceInput';
import Record from '../helpers/Record';
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
 * |response|string|The chosen option|
 *
 */
export default {
  name: 'ForcedChoiceScreen',
  components: {
    LifecycleScreen,
    Record,
    ForcedChoiceInput
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
     * Forced choice options
     */
    options: {
      type: Array,
      required: true
    }
  }
};
</script>
<style scoped></style>

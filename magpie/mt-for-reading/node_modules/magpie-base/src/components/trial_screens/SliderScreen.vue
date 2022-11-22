<docs>
This is a pre-built slider rating screen, with limited functionality, but simpler to use.

```vue
<Experiment>
    <SliderScreen
        question="How healthy do you usually eat?"
        qud="Eating healthy is good for you."
        option-left="Very healthy"
        option-right="Very unhealthy"
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
          ...(optionLeft && { optionLeft }),
          ...(optionRight && { optionRight }),
          interval,
          max,
          min,
          initial
        }"
      />
      <p v-if="question" v-text="question"></p>
      <SliderInput
        :left="optionLeft"
        :right="optionRight"
        :min="min"
        :max="max"
        :interval="interval"
        :initial="initial"
        :disabled="disabled"
        :response.sync="$magpie.measurements.response"
      />
      <button
        v-if="
          $magpie.measurements.response &&
          !$magpie.validateMeasurements.$invalid
        "
        @click="nextAfterResponse"
      >
        {{ $t('general.nextButton') }}
      </button>
    </template>
    <template #feedback>
      <slot name="feedback"></slot>
    </template>
  </LifecycleScreen>
</template>

<script>
import Record from '../helpers/Record';
import SliderInput from '../inputs/SliderInput';
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
 * |optionLeft?|string||
 * |optionRight?|string||
 * |interval|int||
 * |ranges|array||
 * |min|int||
 * |max|int||
 * |initial|int||
 * |response|int|The value of the slider|
 *
 */
export default {
  name: 'SliderScreen',
  components: {
    LifecycleScreen,
    SliderInput,
    Record
  },
  extends: LifecycleScreen,
  props: {
    /**
     * A question
     */
    question: {
      type: String,
      required: true
    },
    /**
     * Left label for rating
     */
    optionLeft: {
      type: String,
      default: ''
    },
    /**
     * Right label for rating
     */
    optionRight: {
      type: String,
      default: ''
    },
    /**
     * Initial slider position
     */
    initial: {
      type: Number,
      optional: true,
      default: 0
    },
    /**
     * Minimal slider value
     */
    min: {
      type: Number,
      optional: true,
      default: 0
    },
    /**
     * Maximum slider value
     */
    max: {
      type: Number,
      optional: true,
      default: 100
    },
    /**
     * Interval between slider values
     */
    interval: {
      type: Number,
      optional: true,
      default: 1
    },
    disabled: {
      type: Boolean,
      optional: true,
      default: false
    }
  }
};
</script>
<style scoped></style>

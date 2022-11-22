<docs>
This is a pre-built rating screen, with limited functionality, but simpler to use.

```vue
<Experiment>
    <RatingScreen
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
          count
        }"
      />
      <p v-if="question" v-text="question"></p>
      <RatingInput
        :left="optionLeft"
        :right="optionRight"
        :count="count"
        :response.sync="$magpie.measurements.response"
      />
      <button
        v-if="
          $magpie.measurements.response &&
          (!$magpie.validateMeasurements.response ||
            !$magpie.validateMeasurements.response.$invalid)
        "
        @click="$magpie.saveAndNextScreen()"
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
import RatingInput from '../inputs/RatingInput';
import LifecycleScreen from '../screens/LifecycleScreen';

/**
 * Have participants choose answer from multiple options
 *
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
 * |count|int||
 * |response|int|The chosen option|
 *
 */
export default {
  name: 'RatingScreen',
  components: {
    LifecycleScreen,
    RatingInput,
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
     * The length of the rating scale
     */
    count: {
      type: Number,
      default: 7
    }
  }
};
</script>
<style scoped></style>

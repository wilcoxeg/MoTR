<docs>
This is a pre-built image selection screen, with limited functionality, but simpler to use.

```vue
<Experiment>

    <TextareaScreen
        question="What do you usually eat?"
        qud="Eating healthy is good for you."
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
          question
        }"
      />
      <p v-if="question" v-text="question"></p>
      <TextareaInput :response.sync="$magpie.measurements.response" />
      <button
        v-if="
          $magpie.measurements.response &&
          (!$magpie.validateMeasurements.response ||
            !$magpie.validateMeasurements.response.$invalid)
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
import TextareaInput from '../inputs/TextareaInput';
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
 * |response|string|The entered response text|
 *
 */
export default {
  name: 'TextareaScreen',
  components: {
    LifecycleScreen,
    TextareaInput,
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
    }
  }
};
</script>
<style scoped></style>

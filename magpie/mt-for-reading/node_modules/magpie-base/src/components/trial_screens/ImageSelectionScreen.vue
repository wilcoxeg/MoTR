<docs>
This is a pre-built image selection screen, with limited functionality, but simpler to use.

```vue
<Experiment>
    <ImageSelectionScreen
        :options="[
                {src: 'img/fries.jpg', label: 'fries'},
                {src: 'img/soup.jpg', label: 'soup' }
                ]"
        question="What do you eat?"
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
          question,
          options: options.map((o) => o.label)
        }"
      />
      <p v-if="question" v-text="question"></p>
      <ImageSelectionInput
        :options="options"
        :response.sync="$magpie.measurements.response"
        @update:response="nextAfterResponse"
      />
    </template>
    <template #feedback>
      <slot name="feedback"></slot>
    </template>
  </LifecycleScreen>
</template>

<script>
import Record from '../helpers/Record';
import ImageSelectionInput from '../inputs/ImageSelectionInput';
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
 * |options|array|The labels of the available options|
 * |response|string|The label of the chosen option|
 *
 */
export default {
  name: 'ImageSelectionScreen',
  components: {
    LifecycleScreen,
    ImageSelectionInput,
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
     * Forced choice options. Each option must be an object looking as follows `{src: 'image path', label: 'my label'}`
     */
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    next() {
      if (this.$attrs.feedbackTime) {
        this.$magpie.save();
        this.$magpie.nextSlide();
      } else {
        this.$magpie.saveAndNextScreen();
      }
    }
  }
};
</script>
<style scoped></style>

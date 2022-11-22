<docs>
This is a built-in screen with 4 life cycle phases:

 * Pause
 * Fixation
 * Stimulus presentation
 * Response
 * Feedback

The last four phases can be completely customized using the corresponding slots, as you can see below.

```vue
<Experiment>

  <InstructionScreen>
    Press the button to try this.
  </InstructionScreen>

  <LifecycleScreen :pauseTime="1000" :fixationTime="1000" :stimulusTime="100">

    <template #stimulus>
      <img src="img/fries.jpg" />
    </template>

    <template #task>
      How often is it still healthy to eat fast food?
      <SliderInput left="Once a year" right="Once a day" :response.sync="$magpie.measurements.slider_rating" />
      <button v-if="typeof $magpie.measurements.slider_rating !== undefined" @click="$magpie.saveAndNextScreen()">Next</button>
    </template>

  </LifecycleScreen>

  <DebugResultsScreen />
</Experiment>
```
</docs>

<template>
  <Screen v-bind="{ ...$attrs, ...$props }">
    <Slide v-if="pauseTime">
      <!-- Pause -->
      <p v-if="qud" v-text="qud"></p>
      <Wait key="pause-timer" :time="pauseTime" @done="$magpie.nextSlide()" />
    </Slide>
    <Slide v-if="fixationTime">
      <!-- Fixation point -->
      <p v-if="qud" v-text="qud"></p>
      <slot name="fixation">
        <FixationCross />
      </slot>
      <Wait
        v-if="fixationTime !== -1"
        key="fixation-timer"
        :time="fixationTime"
        @done="$magpie.nextSlide()"
      />
    </Slide>
    <Slide v-if="stimulusTime">
      <!-- Stimulus phase -->
      <p v-if="qud" v-text="qud"></p>
      <slot name="stimulus"></slot>
      <Wait
        v-if="stimulusTime !== -1"
        key="stimulus-timer"
        :time="stimulusTime"
        @done="$magpie.nextSlide()"
      />
    </Slide>
    <Slide>
      <!-- Response phase -->
      <p v-if="qud" v-text="qud"></p>
      <slot v-if="!stimulusTime" name="stimulus"></slot>
      <slot name="task"></slot>
      <Wait
        v-if="responseTimeLimit"
        :time="responseTimeLimit"
        @done="nextAfterTimeout"
      />
      <Record
        :data="{
          ...(qud && { qud }),
          ...(responseTimeLimit && { responseTimeout: false }),
          ...(pauseTime && { pauseTime }),
          ...(fixationTime && { fixationTime }),
          ...(stimulusTime && { stimulusTime }),
          ...(responseTimeLimit && { responseTimeLimit }),
          ...(feedbackTime && { feedbackTime })
        }"
      />
      <ResponseTimeStart />
    </Slide>
    <Slide v-if="feedbackTime">
      <!-- Feedback phase -->
      <p v-if="qud" v-text="qud"></p>
      <slot name="feedback"></slot>
      <Wait
        v-if="feedbackTime > 0"
        :time="feedbackTime"
        @done="$magpie.nextScreen()"
      />
    </Slide>
  </Screen>
</template>

<script>
import Screen from '../Screen';
import Slide from '../Slide';
import FixationCross from '../stimuli/FixationCross';
import Wait from '../helpers/Wait';
import ResponseTimeStart from '../helpers/ResponseTimeStart';
import Record from '../helpers/Record';

/**
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
 *
 */
export default {
  name: 'LifecycleScreen',
  components: {
    Record,
    ResponseTimeStart,
    Wait,
    FixationCross,
    Slide,
    Screen
  },
  props: {
    /**
     * Question under discussion. Always visible on the screen
     */
    qud: {
      type: String,
      default: ''
    },
    /**
     * Duration of the pause phase. Don't set this, to avoid the pause altogether.
     */
    pauseTime: {
      type: Number,
      default: 0
    },
    /**
     * Duration of the fixation point phase. Don't set this to avoid showing the fixation point altogether. Set to -1 to call nextSlide manually
     */
    fixationTime: {
      type: Number,
      default: 0
    },
    /**
     * Duration of the stimulus phase. Don't set this to avoid hiding the stimulus altogether. Set to -1 to call nextSlide manually
     */
    stimulusTime: {
      type: Number,
      default: 0
    },
    /**
     * How long the response should be enabled, don't set this, to avoid the timeout altogether.
     * When this is set, a `responseTimeout` boolean property will be added to the result, indicating whether timeout occurred
     */
    responseTimeLimit: {
      type: Number,
      default: 0
    },
    /**
     * How long feedback should be displayed. Don't set this, to avoid displaying feedback altogether; set to -1 if you want to call nextScreen manually
     */
    feedbackTime: {
      type: Number,
      default: 0
    }
  },
  methods: {
    nextAfterResponse() {
      if (this.$props.feedbackTime) {
        this.$magpie.saveMeasurements();
        this.$magpie.nextSlide();
      } else {
        this.$magpie.saveAndNextScreen();
      }
    },
    nextAfterTimeout() {
      if (this.$props.responseTimeLimit) {
        this.$magpie.measurements.responseTimeout = true;
      }
      this.nextAfterResponse();
    }
  }
};
</script>
<style scoped></style>

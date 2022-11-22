<docs>
This is a pre-built maze task screen.

```vue
<Experiment>
  <MazeScreen
      question="Are fries healthy?"
      :targets="['Fries', 'are', 'very', 'healthy', 'indeed.']"
      :competitors="['xxx-xxx', 'can', 'usually', 'quite', 'yummy']">
    <template #stimulus>
      <img src="img/fries.jpg" />
    </template>
  </MazeScreen>

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

    <!-- Maze task -->
    <template #task>
      <Record
        :data="{
          question,
          targets,
          competitors,
          leftKey,
          rightKey,
          mazeTimeLimit
        }"
      />
      <p v-if="question" v-text="question"></p>
      <MazeInput
        :targets="targets"
        :competitors="competitors"
        :response-time-limit="mazeTimeLimit"
        :response-times.sync="$magpie.measurements.times"
        :target-positions.sync="$magpie.measurements.target_positions"
        :responses.sync="$magpie.measurements.responses"
        :timeout.sync="$magpie.measurements.maze_timeout"
        :correct.sync="$magpie.measurements.correct"
        @end="nextAfterResponse"
      />
    </template>

    <template #feedback>
      <slot name="feedback"></slot>
    </template>
  </LifecycleScreen>
</template>

<script>
import Record from '../helpers/Record';
import LifecycleScreen from '../screens/LifecycleScreen';
import MazeInput from '../inputs/MazeInput';

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
 * |responses|array|The selected responses|
 * |target_positions|array|The list of positions of the target words for each choice. Either ('left' or 'right')|
 * |response_times|array|The response times per selectable option|
 * |mazeTimeLimit|int|The maze time limit|
 * |maze_timeout|boolean|Whether the maze time limit was reached|
 * |correct|boolean|Whether all responses were correct|
 *
 */
export default {
  name: 'MazeScreen',
  components: {
    LifecycleScreen,
    MazeInput,
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
     * Target chunks
     */
    targets: {
      type: Array,
      required: true
    },
    /**
     * Competitor chunks
     */
    competitors: {
      type: Array,
      required: true
    },
    /**
     * Time in miliseconds the participant has to select the individual words; `-1` for no time limit
     */
    mazeTimeLimit: {
      type: Number,
      default: -1
    },
    /**
     * The keyboard key to press for the left continuation
     */
    leftKey: {
      type: String,
      default: 'f'
    },
    /**
     * The keyboard key to press for the right continuation
     */
    rightKey: {
      type: String,
      default: 'j'
    },
    progress: {
      type: Number,
      default: undefined
    }
  }
};
</script>

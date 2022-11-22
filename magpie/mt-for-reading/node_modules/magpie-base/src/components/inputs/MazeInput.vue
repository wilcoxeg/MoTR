<docs>

```vue
<Experiment>
    <Screen>
        <MazeInput
            :targets="['This', 'is', 'a', 'nice', 'text']"
            :competitors="['xxx-xxx', 'can', 'usually', 'quite', 'yummy']"
            :response-times.sync="$magpie.measurements.times"
            :responses.sync="$magpie.measurements.responses"
            :timeout.sync="$magpie.measurements.timeout"
            :correct.sync="$magpie.measurements.correct"
            :target-positions.sync="$magpie.measurements.target_positions"
            @end="$magpie.saveAndNextScreen()" />
    </Screen>

    <DebugResultsScreen />
</Experiment>
```

</docs>

<template>
  <div>
    <SerialInput :iterations="targets.length + 1" @end="end">
      <template #default="{ i, next }">
        <template v-if="timeout">
          <TimerStop
            id="responseTime"
            @update:time="responseTimes.push($event)"
          />
          <Wait :time="0" @done="end" />
        </template>
        <template v-else-if="correct">
          <TimerStop
            v-if="i > 0"
            id="responseTime"
            @update:time="
              responseTimes.push($event);
              i === targets.length ? next() : null;
            "
          />
          <TimerStart id="responseTime" />
          <Wait
            v-if="responseTimeLimit !== -1"
            :time="responseTimeLimit"
            @done="timeout = true"
          />

          <KeypressInput
            :keys="{ [leftKey]: 'left', [rightKey]: 'right' }"
            :show-options="showKeypressOptions"
            @update:response="
              correct = targets[i] === getOption($event, i);
              responses.push(getOption($event, i));
              next();
            "
          />

          <div class="options">
            <div class="option">
              {{ getLeftOption(i) }}
            </div>
            <div class="option">
              {{ getRightOption(i) }}
            </div>
          </div>
        </template>
        <template v-else>
          <TimerStop
            id="responseTime"
            @update:time="responseTimes.push($event)"
          />
          <Wait :time="0" @done="end" />
        </template>
      </template>
    </SerialInput>
  </div>
</template>

<script>
import KeypressInput from '../inputs/KeypressInput';
import SerialInput from '../inputs/SerialInput';
import TimerStop from '../helpers/TimerStop';
import TimerStart from '../helpers/TimerStart';
import _ from 'lodash';
import Wait from '../helpers/Wait';

export default {
  name: 'MazeInput',
  components: { Wait, TimerStart, TimerStop, SerialInput, KeypressInput },
  props: {
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
    /**
     * Whether to show the options for the KeypressInput
     */
    showKeypressOptions: {
      type: Boolean,
      default: true
    },
    /**
     * Maximum time alotted for a single response
     */
    responseTimeLimit: {
      type: Number,
      default: -1
    }
  },
  data() {
    const length = this.targets.length;
    const targetOnLeft = _.map(_.range(length), () => _.random());
    return {
      responseTimes: [],
      responses: [],
      targetOnLeft,
      targetPositions: targetOnLeft.map((left) => (left ? 'left' : 'right')),
      timeout: false,
      correct: true
    };
  },
  methods: {
    getLeftOption(i) {
      return this.targetOnLeft[i] === 1 ? this.targets[i] : this.competitors[i];
    },
    getRightOption(i) {
      return this.targetOnLeft[i] === 0 ? this.targets[i] : this.competitors[i];
    },
    getOption(side, i) {
      return side === 'left' ? this.getLeftOption(i) : this.getRightOption(i);
    },
    end() {
      /**
       * The list of response times per item
       * @property {array}
       */
      this.$emit('update:response-times', this.responseTimes);

      /**
       * The list of selected options
       * @property {array}
       */
      this.$emit('update:responses', this.responses);
      /**
       * The list of target positions (either 'left' or 'right')
       * @property {array}
       */
      this.$emit('update:target-positions', this.targetPositions);
      /**
       * Whether all responses selected the target word
       * @property {boolean}
       */
      this.$emit('update:correct', this.correct);
      /**
       * Whether the participant took longer than the timeout for one item and the task was aborted
       * @property {boolean}
       */
      this.$emit('update:timeout', this.timeout);
      /**
       * Emitted when the task was aborted due to timeout or incorrect response, or after selecting the last correct option
       */
      this.$emit('end');
    }
  }
};
</script>

<style scoped>
.option {
  background-color: #5187ba;
  border: none;
  border-radius: 2px;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-family: 'Lato', 'Noto Sans', sans-serif;
  font-size: 30px;
  line-height: 40px;
  font-weight: 700;
  letter-spacing: 0.9px;
  margin: 0 70px 70px 70px;
  outline: none;
  padding: 5px 10px;
  text-transform: uppercase;
}

.option:hover {
  background-color: #324d93;
}
</style>

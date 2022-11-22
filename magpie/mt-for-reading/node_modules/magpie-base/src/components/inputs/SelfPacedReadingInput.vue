<docs>

```vue
<Experiment>
    <Screen>
        <SelfPacedReadingInput
            :chunks="['This', 'is', 'a', 'nice', 'and', 'very', 'long', 'text']"
            word-pos="next"
            underline="sentence"
            trigger="$"
            instructions="Press $ to reveal the next word."
            :response-times.sync="$magpie.measurements.times"
            @end="$magpie.saveAndNextScreen()" />
    </Screen>

    <DebugResultsScreen />
</Experiment>
```

</docs>

<template>
  <div>
    <!-- length + 2, because we have an initial empty slice and a last empty slice to record the rt -->
    <SerialInput :iterations="chunks.length + 2" @end="end">
      <template #default="{ i, next }">
        <template v-if="timeout">
          <TimerStop
            id="responseTime"
            @update:time="responseTimes.push($event)"
          />
          <Wait :time="0" @done="end" />
        </template>
        <template v-else>
          <TimerStop
            v-if="i > 1"
            id="responseTime"
            @update:time="
              responseTimes.push($event);
              i > chunks.length ? next() : null;
            "
          />
          <TimerStart v-if="i > 0" id="responseTime" />
          <KeypressInput
            :keys="{ [trigger]: instructions }"
            :show-options="showKeypressOptions"
            @update:response="next"
          />
          <Wait
            v-if="responseTimeLimit !== -1 && i > 1"
            :time="responseTimeLimit"
            @done="timeout = true"
          />
          <div
            :class="{
              text: true,
              'underline-words': underline === 'words',
              'underline-sentence': underline === 'sentence',
              'show-all': wordPos === 'next'
            }"
          >
            <span
              v-for="(chunk, j) in chunks"
              :key="j"
              :class="{ current: i - 1 === j }"
              v-text="chunk"
            ></span>
          </div>
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
import Wait from '../helpers/Wait';

export default {
  name: 'SelfPacedReadingInput',
  components: { Wait, TimerStart, TimerStop, SerialInput, KeypressInput },
  props: {
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
    return {
      responseTimes: [],
      timeout: false
    };
  },
  methods: {
    end() {
      /**
       * List of response times
       * @property {array}
       */
      this.$emit('update:response-times', this.responseTimes);

      /**
       * Whether the user took more time on one item than the set response time
       * @property {array}
       */
      this.$emit('update:timeout', this.timeout);

      /**
       * Emitted either when the user takes longer than the set response time, or they finish until the end of chunks.
       */
      this.$emit('end');
    }
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

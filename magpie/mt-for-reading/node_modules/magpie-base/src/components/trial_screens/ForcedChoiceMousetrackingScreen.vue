<docs>

```vue
<Experiment>
    <template v-for="(task, i) in [
      {o1: 'Mammal', o2: 'Bird', s: 'Bat'},
      {o1: 'Bird', o2: 'Insect', s: 'Kolibri'},
      {o1: 'Fish', o2: 'Mammal', s: 'Whale'},
      {o1: 'Fish', o2: 'Bird', s: 'Penguin'}
      ]">
      <ForcedChoiceMousetrackingScreen :key="i" :option1="task.o1" :option2="task.o2">
            <template #option1>
              <div :style="{backgroundColor: 'lightyellow', width: '100px', padding: '70px'}">
                {{ task.o1 }}
              </div>
            </template>
            <template #option2>
              <div :style="{backgroundColor: 'lightyellow', width: '100px', padding: '70px'}">
                {{ task.o2 }}
              </div>
            </template>
            <template #stimulus>
              <span>{{ task.s }}</span>
            </template>
            <template #feedback>
              <!-- add values in `task` to measurements -->
              <Record :data="{...task}" />
              <Wait :time="100" @done="$magpie.saveAndNextScreen()" />
            </template>
      </ForcedChoiceMousetrackingScreen>
    </template>

    <DebugResultsScreen />

</Experiment>
```

</docs>

<template>
  <Screen v-bind="{ ...$attrs, ...$props }">
    <Slide>
      <p v-if="qud" class="qud" v-text="qud" />
      <!-- @slot provide a preparation stimulus, i.e. a text or an audio explanation-->
      <slot name="preparation">
        <Wait :time="1" @done="$magpie.nextSlide()" />
      </slot>
    </Slide>

    <Slide>
      <p v-if="qud" class="qud" v-text="qud" />
      <Wait key="pause" :time="pauseTime" @done="$magpie.nextSlide()" />
    </Slide>

    <Slide>
      <p v-if="qud" class="qud" v-text="qud" />
      <Wait key="wait a bit" :time="500" @done="$magpie.nextSlide()" />
      <div class="options">
        <!-- @slot provide content for choice one -->
        <div class="option1"><slot name="option1" /></div>
        <div class="space"></div>
        <!-- @slot provide content for choice two -->
        <div class="option2"><slot name="option2" /></div>
      </div>
    </Slide>

    <Slide>
      <div class="options">
        <div
          v-if="!$magpie.measurements.response"
          class="option1"
          @[selectEvent]="submit('option1')"
        >
          <slot name="option1" />
        </div>
        <div class="space"></div>
        <div
          v-if="!$magpie.measurements.response"
          class="option2"
          @[selectEvent]="submit('option2')"
        >
          <slot name="option2" />
        </div>
      </div>
      <p v-if="qud" class="qud" v-text="qud" />
      <div class="stimulus">
        <!-- @slot provide content for the main stimulus
         @binding {object} coordinates The coordinates of the Start button on the page (`{x: number, y: number})
         -->
        <slot v-if="playing" name="stimulus" :coordinates="buttonCoordinates" />
        <slot v-if="$magpie.measurements.response" name="feedback" />
      </div>
      <button v-if="!playing" ref="button" @click="onPressPlay">
        {{ $t('general.go') }}
      </button>
      <Wait
        v-if="playing && responseTimeLimit"
        :time="responseTimeLimit"
        @done="$magpie.nextSlide()"
      />
      <TimerStart v-if="playing" id="fcmt-response-time" />
      <TimerStop
        v-if="$magpie.measurements.response"
        id="fcmt-response-time"
        :time.sync="$magpie.measurements.responseTime"
      />
    </Slide>
  </Screen>
</template>

<script>
import Vue from 'vue';
import Wait from '../helpers/Wait';
import Screen from '../Screen';
import Slide from '../Slide';
import TimerStop from '../helpers/TimerStop';
import TimerStart from '../helpers/TimerStart';

/**
 * **Screen Measurements**
 *
 * |Measurement|Type|Description|
 * |--|---|---|
 * |responseTime|int|Time between click on 'Go' and response|
 * |responseTimeout|boolean|Whether the response time limit was reached|
 * |mt_time|array|Mouse tracking time coordinates|
 * |mt_x|array|Mouse tracking x coordinates (origin is at the 'Go' button, positive goes right)|
 * |mt_y|array|Mouse tracking y coordinates (origin is at the 'Go' button, positive goes down)|
 * |mt_start_time|int|Time stamp of when mouse tracking started|
 *
 */
export default {
  name: 'ForcedChoiceMousetrackingScreen',
  components: { TimerStart, TimerStop, Slide, Screen, Wait },
  props: {
    /**
     * string representation of option 1
     */
    option1: {
      type: String,
      default: 'option1'
    },
    /**
     * string representation of option 2
     */
    option2: {
      type: String,
      default: 'option2'
    },
    /**
     * The event that causes the response to be selected, e.g. `click`, `mouseover`, etc.
     */
    selectEvent: {
      type: String,
      default: 'mouseover'
    },
    /**
     * Question under discussion. Always visible on the screen
     */
    qud: {
      type: String,
      default: undefined
    },
    /**
     * Duration of the pause phase, don't set this, to avoid the pause altogether
     */
    pauseTime: {
      type: Number,
      default: 0
    },
    /**
     * How long the response should be enabled, don't set this, to avoid the timeout altogether
     */
    responseTimeLimit: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      playing: false
    };
  },
  computed: {
    buttonCoordinates() {
      return {
        x: this.$refs.button.getBoundingClientRect().x,
        y: this.$refs.button.getBoundingClientRect().y
      };
    }
  },
  methods: {
    onPressPlay() {
      this.playing = true;
      this.$magpie.mousetracking.start(
        this.buttonCoordinates.x,
        this.buttonCoordinates.y
      );
    },
    submit(label) {
      if (!this.playing) return;
      this.$magpie.measurements.response = this[label];
      const mouseTrack = this.$magpie.mousetracking.getMouseTrack();
      for (const prop in mouseTrack) {
        Vue.set(
          this.$magpie.measurements,
          prop,
          JSON.parse(JSON.stringify(mouseTrack[prop]))
        );
      }
    }
  }
};
</script>

<style scoped>
.options {
  display: flex;
  flex-direction: row;
}

.options .space {
  flex: 1;
}

.options .option1,
.options .option2 {
  flex: 0;
}

.stimulus {
  bottom: 200px;
  position: absolute;
  width: 100%;
}

button {
  bottom: 20px;
  left: 50%;
  position: absolute;
}

.qud {
  position: relative;
  top: 150px;
}
</style>

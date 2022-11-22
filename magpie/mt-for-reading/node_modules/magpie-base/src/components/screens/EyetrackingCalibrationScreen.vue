<docs>
This screen is used to initialize and calibrate eye tracking.
Eyetracking requires that you install `webgazer`.

```vue
<Experiment wide>
  <InstructionScreen>
    Click the button to start full screen.
  </InstructionScreen>

  <InstructionScreen>
    <FullScreenStart />
    Click the button to start calibration.
  </InstructionScreen>

  <!-- We'll set debugging to true so you can see something -->
  <EyetrackingCalibrationScreen debug />

  <InstructionScreen>
    Successfully calibrated!
  </InstructionScreen>

</Experiment>
```
</docs>

<template>
  <Screen v-bind="{ ...$attrs, ...$props }">
    <Slide>
      <Wait key="start" :time="0" @done="onStart" />
      <p>{{ $t('screens.EyetrackingCalibrationScreen.start') }}</p>
    </Slide>
    <Slide>
      <Wait key="calibration" :time="0" @done="runCalibration" />
      <p>{{ $t('screens.EyetrackingCalibrationScreen.instruction') }}</p>
      <CanvasStage
        :config="{ width: 26, height: 26 }"
        :style="{ left: x + 'px', top: y + 'px' }"
        class="point"
        @click="nextPoint"
      >
        <CanvasLayer>
          <CanvasCircle
            :config="{
              x: 13,
              y: 13,
              fill: 'red',
              radius: 12,
              stroke: 'black',
              strokeWidth: 1
            }"
          ></CanvasCircle>
        </CanvasLayer>
      </CanvasStage>
    </Slide>
    <Slide>
      <p>{{ $t('screens.EyetrackingCalibrationScreen.error') }}</p>
    </Slide>
  </Screen>
</template>

<script>
import flatten from 'lodash/flatten';
import times from 'lodash/times';
import shuffle from 'lodash/shuffle';
import Screen from '../Screen';
import Slide from '../Slide';
export default {
  name: 'EyetrackingCalibrationScreen',
  components: { Slide, Screen },
  props: {
    debug: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      x: 0,
      y: 0,
      calibrationSequence: []
    };
  },
  methods: {
    nextPoint() {
      const next = this.calibrationSequence.pop();
      if (next) {
        Object.assign(this, next);
      } else {
        this.$magpie.eyetracking.setDeaf(false);
        this.$magpie.nextScreen();
      }
    },
    async onStart() {
      this.$magpie.eyetracking.setDeaf(true);
      try {
        // initialize eyetracking
        await this.$magpie.eyetracking.initialize();
        this.$magpie.eyetracking.setDebug(this.debug);
        this.$magpie.nextSlide();
      } catch (e) {
        console.error(e);
        this.$magpie.nextSlide(2);
      }
    },
    runCalibration() {
      // create
      const exp = this.$magpie.experiment.$el.getBoundingClientRect();
      [0, exp.height * 0.25, exp.height / 2, exp.height * 0.75].forEach((y) => {
        [
          0,
          exp.width * 0.25,
          exp.width / 2,
          exp.width * 0.75,
          exp.width
        ].forEach((x) => {
          this.calibrationSequence.push({ x, y });
        });
      });
      this.calibrationSequence = flatten(
        times(2, () => shuffle(this.calibrationSequence))
      );
      this.nextPoint();
    }
  }
};
</script>

<style scoped>
.point {
  position: absolute;
}

.point.check {
  position: fixed;
  left: 50vw;
  top: 40vh;
}
</style>

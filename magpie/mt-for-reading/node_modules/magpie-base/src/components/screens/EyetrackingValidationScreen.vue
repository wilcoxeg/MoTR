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

  <EyetrackingValidationScreen />

  <InstructionScreen>
    Successfully calibrated!
  </InstructionScreen>

</Experiment>
```
</docs>

<template>
  <Screen v-bind="{ ...$attrs, ...$props }">
    <!-- Check accuracy -->
    <Slide>
      <p>{{ $t('screens.EyetrackingValidationScreen.instruction') }}</p>
      <Wait :time="5000" @done="measureAccuracy" />
      <EyetrackingStart />
      <CanvasStage
        ref="checkpoint"
        :config="{ width: 26, height: 26 }"
        :style="{ top: windowHeight / 2 + 'px', left: windowWidth / 2 + 'px' }"
        class="point check"
      >
        <CanvasLayer>
          <CanvasCircle
            :config="{
              x: 13,
              y: 13,
              fill: 'lightblue',
              radius: 12,
              stroke: 'black',
              strokeWidth: 1
            }"
          ></CanvasCircle>
        </CanvasLayer>
      </CanvasStage>
    </Slide>
    <Slide>
      <p>{{ $t('screens.EyetrackingValidationScreen.error') }}</p>
    </Slide>
  </Screen>
</template>

<script>
import Screen from '../Screen';
import Slide from '../Slide';
import EyetrackingStart from '../helpers/EyetrackingStart';
import Wait from '../helpers/Wait';

/**
 * Inherits from LifecycleScreen
 *
 * **Global Measurements**
 *
 * |Measurement|Type|Description|
 * |--|---|---|
 * |et_accuracy|float|The measured accuracy|
 *
 */
export default {
  name: 'EyetrackingValidationScreen',
  components: { Wait, EyetrackingStart, Slide, Screen },
  props: {
    precision: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      x: 0,
      y: 0,
      calibrationSequence: []
    };
  },
  computed: {
    windowHeight() {
      return window.innerHeight;
    },
    windowWidth() {
      return window.innerWidth;
    }
  },
  methods: {
    measureAccuracy() {
      const track = this.$magpie.eyetracking.getEyeTrack();
      const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      let accurateCount = 0,
        dX,
        dY,
        distance;
      for (let i = 0; i < track.et_x.length; i++) {
        dX = target.x - track.et_x[i];
        dY = target.y - track.et_y[i];
        distance = Math.sqrt(dX ** 2 + dY ** 2);
        if (distance < this.precision) {
          accurateCount++;
        }
      }
      const accuracy = accurateCount / track.et_x.length;

      console.log('Eyetracking accuracy after calibration:', accuracy);

      this.$magpie.addExpData({ et_accuracy: accuracy });
      this.$magpie.nextScreen();
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
}
</style>

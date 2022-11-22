<docs>
```vue
<Experiment>
    <Screen>

      <Slide>
        <p>Fries or soup?</p>
        <SliderInput
            left="Fries"
            right="Soup"
            :response.sync= "$magpie.measurements.lunch" />
        Lunch: {{$magpie.measurements.lunch}}% Soup
        <button @click="$magpie.saveAndNextScreen();">Submit</button>
      </Slide>

    </Screen>

</Experiment>
```
</docs>

<template>
  <div class="slider">
    <div class="slider-element">
      <div class="left">{{ left }}</div>
      <Slider
        v-model="value"
        class="slider"
        :tooltip="tooltip ? 'always' : 'none'"
        :min="min"
        :max="max"
        :interval="interval"
        :disabled="disabled"
      />
      <div class="right">{{ right }}</div>
    </div>
  </div>
</template>

<script>
import Slider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

export default {
  /**
   * Have your participants answer on a continuous slider scale
   */
  name: 'SliderInput',
  components: { Slider },
  props: {
    /**
     * Text left of the slider
     */
    left: {
      type: String,
      optional: true,
      default: ''
    },
    /**
     * Text right of the slider
     */
    right: {
      type: String,
      optional: true,
      default: ''
    },
    /**
     * Initial slider position
     */
    initial: {
      type: Number,
      optional: true,
      default: 0
    },
    /**
     * Minimal slider value
     */
    min: {
      type: Number,
      optional: true,
      default: 0
    },
    /**
     * Maximum slider value
     */
    max: {
      type: Number,
      optional: true,
      default: 100
    },
    /**
     * Interval between slider values
     */
    interval: {
      type: Number,
      optional: true,
      default: 1
    },
    /**
     * Whether to show the tooltip
     */
    tooltip: {
      type: Boolean,
      optional: true,
      default: false
    },
    /**
     * Whether to show the tooltip
     */
    disabled: {
      type: Boolean,
      optional: true,
      default: false
    }
  },
  data() {
    return {
      value: this.initial
    };
  },
  watch: {
    value() {
      if (!this.disabled) {
        this.$emit('update:response', this.value);
      }
    }
  }
};
</script>

<style scoped>
.slider-element {
  display: flex;
  margin: 20px 0;
}

.slider-element .left,
.slider-element .right {
  flex-grow: 0;
  padding: 0 20px;
}

.slider {
  flex-grow: 1;
}
</style>

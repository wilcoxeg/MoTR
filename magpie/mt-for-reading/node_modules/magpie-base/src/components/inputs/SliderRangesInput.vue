<docs>
```vue
<Experiment>

    <Screen>

      <Slide>
        <p>How often do you eat meat, vegetarian or vegan?</p>
        <SliderRangesInput
            :ranges="['meat', 'vegetarian', 'vegan']"
            :range-values.sync= "$magpie.measurements.food_types" />
        <p v-if= "$magpie.measurements.food_types">
          {{$magpie.measurements.food_types[0]}}% Meat,
          {{$magpie.measurements.food_types[1]}}% Vegetarian,
          {{$magpie.measurements.food_types[2]}}% Vegan</p>
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
        :enable-cross="false"
        :process="process"
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
  name: 'SliderRangesInput',
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
     * The labels for the ranges
     */
    ranges: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      value: this.ranges
        .slice(1)
        .map((rangeLabel, i) =>
          Math.round((i + 1) * (this.max / this.ranges.length))
        ),
      process: (dots) =>
        [[this.min, dots[0], this.ranges[0]]]
          .concat(
            dots.map((dot, i) => [
              dot,
              dots[i + 1] || this.max,
              this.ranges[i + 1]
            ])
          )
          .map(([x1, x2, label]) => [
            x1,
            x2,
            { background: hashIdToArray(label, COLORS) }
          ])
    };
  },
  computed: {
    rangeValues() {
      return this.value
        .map((value, i) => value - (this.value[i - 1] || this.min))
        .concat([this.max - this.value[this.value.length - 1]]);
    },
    responses() {
      return [this.min].concat(this.value).concat[this.max];
    }
  },
  watch: {
    value() {
      this.$emit('update:responses', this.responses);
      this.$emit('update:rangeValues', this.rangeValues);
    }
  },
  mounted() {
    this.$emit('update:responses', this.responses);
    this.$emit('update:rangeValues', this.rangeValues);
  }
};

function hash(str) {
  var hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function hashIdToArray(id, array) {
  var h = hash(id);
  let animal = array[Math.abs(h % array.length)];
  return animal;
}

const COLORS = [
  '#f94144',
  '#f3722c',
  '#f8961e',
  '#f9c74f',
  '#90be6d',
  '#43aa8b',
  '#577590'
];
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

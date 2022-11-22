<docs>
This is a simple implementation of a Self-paced reading task.

```vue
<Experiment>
    <Screen>

      <Slide>
        <img src="img/fries.jpg" />
        <SerialInput
            :iterations="'Hello world, how are you?'.split(' ').length"
            @end="$magpie.saveAndNextScreen()">
          <template #default="{i, record, next}">
            <TimerStop
                v-if="i > 0"
                id="responseTime"
                @update:time="record('responseTimes', $event)"
            />
            <TimerStart id="responseTime" />
            Does the sentence it the picture?
            <KeypressInput :keys="{'f': 'yes', 'j': 'no', 'b' : 'maybe'}" @update:response="record('pressedKey', $event); next()" />
            <p>{{ 'Hello world, how are you?'.split(' ')[i] }}</p>
          </template>
        </SerialInput>
      </Slide>

    </Screen>

  <DebugResultsScreen />
</Experiment>
```

</docs>

<template>
  <div class="serial_input">
    <div :key="i" class="slice">
      <!--
      @slot Your content for each iteration
      @binding i {Number} The number of the current iteration, starting at 0, thus this will always be strictly lower than `iterations`
      @binding iterations {Number} The overall number of iterations
      @binding record {fn(variable:string, value:mixed)} A function to record trial measurements per iteration resulting in an array of values stored at $magpie.measurements.{variable}
      @binding next {fn()} A function to go to the next iteration
      -->
      <slot
        name="default"
        :i="i"
        :iterations="iterations"
        :record="
          (variable, value) =>
            $magpie.measurements[variable] &&
            $magpie.measurements[variable].length
              ? $magpie.measurements[variable].push(value)
              : ($magpie.measurements[variable] = [value])
        "
        :next="() => i++"
      >
        No template defined.
      </slot>
    </div>
  </div>
</template>

<script>
/**
 * SerialInputs allow you to record inputs on a series of items that are interrelated and belong to the same trial
 */
export default {
  name: 'SerialInput',
  props: {
    /**
     * The number of iterations
     */
    iterations: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      i: 0
    };
  },
  watch: {
    i() {
      if (this.i >= this.iterations) {
        /**
         * Emitted when next() has been called on the last iteration
         */
        this.$emit('end');
      }
    }
  }
};
</script>

<docs>
```vue
<Experiment>
    <Screen>

      <Slide>
        Slide 1<br />
        <TimerStart id="myTimer"></TimerStart>
        <button @click="$magpie.nextSlide()">Next slide</button>
      </Slide>

      <Slide>
        <TimerStop id="myTimer" :time.sync="$magpie.measurements.time" />
        Slide 2<br />
        Time until click: {{$magpie.measurements.time/1000}} seconds
      </Slide>

    </Screen>
</Experiment>
```
</docs>
<template><span /></template>
<script>
export default {
  name: 'TimerStop',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.$emit('update:time', Date.now() - this.$magpie.timers[this.id]);
  }
};
</script>

<style scoped></style>

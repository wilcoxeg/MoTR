<docs>
Record allows you to easily add arbitrary data to your measurements:
```vue
<Experiment>

    <template v-for="(task, i) in [{foo: 'bar'}, {foo: 'baz'}]">
      <Screen :key="i">

        <Slide>
          Slide 1<br />
          <Record :data="task" />
          <button @click="$magpie.nextSlide()">Next slide</button>
        </Slide>

        <Slide>
          Slide 2<br />
          <button @click="$magpie.saveAndNextScreen()">next</button>
        </Slide>

      </Screen>
    </template>

    <DebugResultsScreen />
</Experiment>
```
</docs>
<template><span /></template>
<script>
import Vue from 'vue';

export default {
  name: 'Record',
  props: {
    /**
     * The data you want to add
     */
    data: {
      type: Object,
      required: true
    },
    /**
     * If you set the global prop, the data will be added to the global experiment measurements instead of only to the current
     * trial
     */
    global: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.global) {
      this.$magpie.addExpData(this.data);
    } else {
      Object.keys(this.data).forEach((key) => {
        if (typeof this.data[key] !== 'undefined') {
          Vue.set(this.$magpie.measurements, key, this.data[key]);
        }
      });
    }
  }
};
</script>

<style scoped></style>

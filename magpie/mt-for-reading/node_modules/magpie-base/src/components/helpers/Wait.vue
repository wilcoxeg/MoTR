<docs>
```vue
<Experiment>
    <Screen>

      <Slide  >
        Slide 1
        <button @click= "$magpie.nextSlide()">Next slide</button>
      </Slide>

      <Slide  >
        Slide 2
        <Wait key="wait for slide 2" :time="500" @done= "$magpie.nextSlide()" />
      </Slide>

      <Slide  >
        Slide 3
        <Wait key="wait for slide 3" :time="500" @done= "$magpie.nextSlide()" />
      </Slide>

      <Slide  >
        Slide 4
        <Wait key="wait for slide 4" :time="500" @done= "$magpie.nextSlide()" />
      </Slide>

      <Slide  >
        Slide 5
      </Slide>

    </Screen>
</Experiment>
```
</docs>
<template><span /></template>
<script>
export default {
  name: 'Wait',
  props: {
    time: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      timeout: null
    };
  },
  watch: {
    time() {
      if (this.$el) {
        this.set();
      }
    }
  },
  mounted() {
    this.set();
  },
  updated() {
    this.set();
  },
  activated() {
    this.set();
  },
  deactivated() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  },
  beforeDestroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  },
  methods: {
    set() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => this.$emit('done'), this.time);
    }
  }
};
</script>

<style scoped></style>

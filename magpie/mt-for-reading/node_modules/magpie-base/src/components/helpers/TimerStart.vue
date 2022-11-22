<docs>
This component starts a timer. See `TimerStop` for how to use it.
</docs>
<template><span /></template>
<script>
export default {
  name: 'TimerStart',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.$magpie.timers[this.id] = Date.now();
  }
};
</script>

<style scoped></style>

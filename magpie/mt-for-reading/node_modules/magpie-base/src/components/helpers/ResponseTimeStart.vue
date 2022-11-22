<docs>
This component (re)starts the timer for recording the response time.
</docs>
<template><span /></template>
<script>
export default {
  name: 'ResponseTimeStart',
  mounted() {
    this.$magpie.responseTimeStart = Date.now();
  }
};
</script>

<style scoped></style>

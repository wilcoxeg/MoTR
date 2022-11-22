<docs>
This component (re)starts capturing the mouse track.
You can retrieve the current mouse track with `$magpie.mousetracking.getMouseTrack()`.
</docs>
<template><span /></template>
<script>
export default {
  name: 'MousetrackingStart',
  mounted() {
    this.$magpie.mousetracking.start();
  }
};
</script>

<style scoped></style>

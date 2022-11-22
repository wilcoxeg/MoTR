<docs>
```vue
<Experiment>
  <Screen>
    <button @click="$magpie.nextScreen()">Hide cursor</button>
  </Screen>
  <Screen>
    <HideCursor />
    <KeypressInput :keys="{'~': 'show cursor'}" @update:response="$magpie.nextScreen(0)" />
  </Screen>
</Experiment>
```
</docs>
<template><span /></template>
<script>
export default {
  name: 'HideCursor',
  mounted() {
    document.onmousedown = () => false;
    document.onclick = () => false;
    document.body.classList.add('nocursor');
  },
  deactivated() {
    document.onmousedown = null;
    document.onclick = null;
    document.body.classList.remove('nocursor');
  },
  destroyed() {
    document.onmousedown = null;
    document.onclick = null;
    document.body.classList.remove('nocursor');
  }
};
</script>

<style>
.nocursor,
.nocursor * {
  cursor: none !important;
}
</style>

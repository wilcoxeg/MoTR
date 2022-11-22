<docs>
```vue
<Experiment>
  <Screen>
    <button @click="$magpie.nextScreen()">Prevent Copy Paste</button>
  </Screen>
  <Screen>
    <PreventCopyPaste />
    <button @click="$magpie.nextScreen(0)">Allow Copy Paste</button>
  </Screen>
</Experiment>
```
</docs>
<template><span /></template>
<script>
export default {
  name: 'PreventCopyPaste',
  mounted() {
    document.onselectstart = () => false;
    document.oncontextmenu = () => false;
    document.body.classList.add('noselect');
  },
  deactivated() {
    document.onselectstart = null;
    document.oncontextmenu = null;
    document.body.classList.remove('noselect');
  },
  destroyed() {
    document.onselectstart = null;
    document.oncontextmenu = null;
    document.body.classList.remove('noselect');
  }
};
</script>

<style>
.noselect,
.noselect * {
  /*
  Disable selecting text via css
  Supported by the following browsers
  https://caniuse.com/mdn-css_properties_user-select
  */
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
}
</style>

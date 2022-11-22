<docs>
Use this screen to initiate the interactive socket connection. Once the connection is set up and
enough users have joined, this screen will automatically go to the next screen.

You can customize the content of this screen by adding new content inside it.
By default it looks like this:

```vue
<Experiment>

    <Screen>
       <button @click="$magpie.nextScreen()">Connect</button>
    </Screen>

    <ConnectInteractiveScreen :title="'Connecting...'"></ConnectInteractiveScreen>

    <Screen>Connected.</Screen>

</Experiment>
```

</docs>
<template>
  <Screen v-bind="{ ...$attrs, ...$props }">
    <slot>
      {{ $t('screens.ConnectInteractiveScreen.description') }}
    </slot>
  </Screen>
</template>

<script>
import { states } from '../../Socket';
import Screen from '../Screen';
export default {
  name: 'ConnectInteractiveScreen',
  components: { Screen },
  props: {},
  watch: {
    '$magpie.socket.state': function (state) {
      if (state === states.READY) {
        this.$magpie.nextScreen();
      }
    }
  },
  mounted() {
    this.$magpie.socket.initialize();
    if (this.$magpie.socket.state === states.READY) {
      this.$magpie.nextScreen();
    }
  }
};
</script>

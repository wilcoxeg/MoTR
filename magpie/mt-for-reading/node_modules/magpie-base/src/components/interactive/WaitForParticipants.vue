<docs>
This interactive component allow waiting until a specified number of participants are on the current screen.

```vue
<Experiment>
    <Screen>
      <button @click="$magpie.nextScreen()">Start</button>
    </Screen>

    <ConnectInteractiveScreen />

    <Screen>
      <p>You're on screen 1.</p>
      <button @click="$magpie.nextScreen()">Next</button>
    </Screen>

    <Screen>
      <Slide>
        <p>You're on the second screen.</p>
        <WaitForParticipants :number="2" @done="$magpie.nextSlide()" />
      </Slide>

      <Slide>
        <p>Both participants are on the second screen now.</p>
      </Slide>

    </Screen>
</Experiment>
```


</docs>
<template>
  <span></span>
</template>

<script>
export default {
  name: 'WaitForParticipants',
  props: {
    number: {
      type: Number,
      required: true
    }
  },
  watch: {
    ['$magpie.socket.active']() {
      if (this.$magpie.socket.active.length === this.number) {
        this.$emit('done');
      }
    }
  },
  mounted() {
    if (this.$magpie.socket.active.length === this.number) {
      this.$emit('done');
    }
  }
};
</script>

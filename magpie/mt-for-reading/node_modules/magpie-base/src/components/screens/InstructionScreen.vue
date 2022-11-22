<docs>
This is a pre-built instruction screen, with limited functionality, but simpler to use.

```vue
<Experiment>
    <InstructionScreen>
      These are instructions for the participant.<br />
      Below the instructions is a button to continue.
    </InstructionScreen>

    <InstructionScreen>
      This is another instruction screen.<br />
      Below the instructions is a button to continue.
    </InstructionScreen>

</Experiment>
```
</docs>

<template>
  <Screen v-bind="{ ...$attrs, ...$props }">
    <Slide>
      <div class="instructions">
        <slot name="default" />
      </div>
      <button @click="$magpie.nextScreen()">
        {{ $t('general.nextButton') }}
      </button>
    </Slide>
  </Screen>
</template>

<script>
import Screen from '../Screen';
import Slide from '../Slide';

export default {
  name: 'InstructionScreen',
  components: {
    Slide,
    Screen
  },
  props: {}
};
</script>
<style scoped>
.instructions {
  width: 600px;
  margin: 0 auto;
  text-align: justify;
}
</style>

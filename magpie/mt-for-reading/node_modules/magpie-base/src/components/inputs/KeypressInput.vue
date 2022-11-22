<docs>
```vue
<Experiment>
    <Screen>

      <Slide>
        <p>Fries or soup?</p>
        <KeypressInput
            :response.sync= "$magpie.measurements.lunch"
            :keys="{
              '~': 'fries',
              '^': 'soup'
            }"
            @update:response="$magpie.saveAndNextScreen();" />
      </Slide>

    </Screen>
</Experiment>
```
</docs>

<template>
  <div class="keypress">
    <div v-if="showOptions" class="options">
      <span v-for="(option, key) in keys" :key="key"
        ><strong v-text="key"></strong> = {{ option }}
      </span>
    </div>
  </div>
</template>

<script>
/**
 * Have your participants react
 */
export default {
  name: 'KeypressInput',
  props: {
    /**
     * An object with keys mapped to option labels
     */
    keys: {
      type: Object,
      required: true
    },
    /**
     * Determines whether information about possible keypresses and their meaning is shown
     */
    showOptions: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    window.document.addEventListener('keydown', this.onKeyDown);
  },
  destroyed() {
    window.document.removeEventListener('keydown', this.onKeyDown);
  },
  methods: {
    onKeyDown(e) {
      if ('undefined' !== typeof this.keys[e.key]) {
        e.preventDefault();
        this.$emit('update:response', this.keys[e.key]);
      }
    }
  }
};
</script>

<style scoped></style>

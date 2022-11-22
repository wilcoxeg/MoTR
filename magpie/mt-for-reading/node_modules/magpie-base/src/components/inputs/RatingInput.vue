<docs>
```vue
<Experiment>
    <Screen>

      <Slide>
        <p>Fries or soup?</p>
        <RatingInput
          left="Fries"
          :response.sync= "$magpie.measurements.lunch"
          right="Soup" />
        <p v-if= "$magpie.measurements.lunch > 4">I concur!</p>
        <button @click="$magpie.saveAndNextScreen();">Submit</button>
      </Slide>

    </Screen>

</Experiment>
```

```vue
<Experiment>
    <Screen>
      <p>Fries or soup?</p>
      <RatingInput
          left="Fries"
          right="Soup"
          :count="11"/>
    </Screen>

</Experiment>
```
</docs>

<template>
  <div class="rating">
    <form>
      <div class="options">
        <div class="left">{{ left }}</div>
        <label v-for="i in count" :key="i"
          ><input
            v-model="answers[i]"
            type="radio"
            name="rating"
            @input="$emit('update:response', i)"
          />
          {{ i }}</label
        >
        <div class="right">{{ right }}</div>
      </div>
    </form>
  </div>
</template>

<script>
/**
 * Have your participants rate their answer on a rating scale
 */
export default {
  name: 'RatingInput',
  props: {
    /**
     * The length of the rating scale
     */
    count: {
      type: Number,
      default: 7
    },
    /**
     * Text left of the rating scale
     */
    left: {
      type: String,
      optional: true,
      default: ''
    },
    /**
     * Text right of the rating scale
     */
    right: {
      type: String,
      optional: true,
      default: ''
    }
  },
  data() {
    const answers = {};
    for (let i = 1; i < this.count; i++) {
      answers[i] = false;
    }

    return {
      answers
    };
  }
};
</script>

<style scoped>
.options {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
}

.options .left,
.options .right {
  flex-grow: 0;
  padding: 0 15px;
}

.options label {
  flex-grow: 0;
}
</style>

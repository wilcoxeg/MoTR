<docs>
```vue
<Experiment>
    <Screen>

      <Slide>
        <p>Fries or soup? Discuss.</p>
        <TextareaInput
            :response.sync= "$magpie.measurements.lunch"
          />
        <p v-if= "$magpie.measurements.lunch && $magpie.measurements.lunch.length > 32">I disagree!</p>
        <button @click="$magpie.saveAndNextScreen();">Submit</button>
      </Slide>

    </Screen>
</Experiment>
```
</docs>

<template>
  <div class="textarea">
    <textarea
      ref="text"
      @input="$emit('update:response', $refs.text.value)"
    ></textarea>
  </div>
</template>

<script>
/**
 * Have your participants provide a text answer
 */
export default {
  name: 'TextareaInput'
};
</script>

<style scoped>
.textarea {
  position: relative;
  max-width: 95%;
}

textarea {
  border: 2px solid #5187ba;
  border-radius: 10px;
  display: block;
  font-size: 16px;
  margin: 0 auto;
  outline: none;
  padding: 10px 20px;
  height: 100%;
  width: 100%;
}
</style>

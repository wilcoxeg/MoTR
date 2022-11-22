<docs>
You can use HTML's `<img>` tag to display images.

For more details see [HTML img Element docs on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img).
```vue
<Experiment>
    <Screen>

      <Slide>
        This is a sealion.<br/>
        <img src="img/sea_lion.jpg" />
      </Slide>

    </Screen>

</Experiment>
```
</docs>

<template><div /></template>

<script>
// This is a dummy component to generate nice documentation for HTML's img element
export default {
  name: 'Img',

  props: {
    /**
     * The URL of the image to embed.
     */
    src: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped></style>

<docs>
This component allows you to display textual or other content in a rapid serial manner, commonly known as Rapid Serial Visual Presentation (RSVP).

### Text
```vue
<Experiment>
    <Screen>

      <Slide>
        <button @click= "$magpie.nextSlide()">Start</button>
      </Slide>

      <Slide>
        <Rsvp :chunks="'I wonder if you can read this, as it is a rapid serial visual presentation of a long text.'.split(' ')"
              @end= "$magpie.nextSlide()" />
      </Slide>

      <Slide>
        That's what I thought.
      </Slide>

    </Screen>

</Experiment>
```

### Images
The Rsvp component allows you to define the presentation of the chunks you provide. E.g. we could also use this component to display images.
```vue
<Experiment>
    <Screen>
      <Slide>
        <button @click= "$magpie.nextSlide()">Start</button>
      </Slide>
      <Slide>
        <Rsvp :chunks="[
            'public/images/rsvp1.jpg',
            'public/images/rsvp2.jpg',
            'public/images/rsvp3.jpg',
            'public/images/rsvp4.jpg',
            ]" @end= "$magpie.nextSlide()">
          <template #presentation="{chunk}">
            <img :src="chunk" />
          </template>
        </Rsvp>
      </Slide>
      <Slide>
        Done.
      </Slide>
    </Screen>
</Experiment>
```


</docs>

<template>
  <div>
    <slot name="presentation" :chunk="chunks[position]">
      <p>{{ chunks[position] }}</p>
    </slot>
    <Wait
      v-if="position < chunks.length"
      :key="position"
      :time="interval"
      @done="nextChunk"
    />
  </div>
</template>

<script>
import Wait from '../helpers/Wait';

export default {
  name: 'Rsvp',
  components: { Wait },
  props: {
    /**
     * The chunks
     */
    chunks: {
      type: Array,
      required: true
    },
    /**
     * Interval between chunks in miliseconds
     */
    interval: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      position: 0
    };
  },
  methods: {
    nextChunk() {
      this.position++;
      if (this.position >= this.chunks.length) {
        this.$emit('end');
      }
    }
  }
};
</script>

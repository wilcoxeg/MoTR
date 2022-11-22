<docs>
You can use HTML's audio tag to play audio.

For more details see [HTML Audio Element docs on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio).
```vue
<Experiment>
    <Screen>

      <Slide>
        This is a dog.<br/>
        <button @click="$refs.audio.play()">Start</button>
        <button @click="$refs.audio.pause()">Stop</button>
        <audio ref="audio" src="audio/dog_bark.ogg" loop />
      </Slide>

    </Screen>

</Experiment>
```
</docs>

<template><div /></template>

<script>
// This is a dummy component to generate nice documentation for HTML's audio element
export default {
  name: 'Audio',
  props: {
    /**
     * if specified, the audio will automatically begin playback as soon as it can do so, without waiting for the entire audio file to finish downloading.
     */
    autoplay: {
      type: Boolean,
      default: false
    },
    /**
     * If this attribute is set, the browser will offer controls to allow the user to control audio playback, including volume, seeking, and pause/resume playback.
     */
    controls: {
      type: Boolean,
      default: false
    },
    /**
     * if true, the audio player will automatically seek back to the start upon reaching the end of the audio.
     */
    loop: {
      type: Boolean,
      default: false
    },
    /**
     * indicates whether the audio will be initially silenced
     */
    muted: {
      type: Boolean,
      default: false
    },
    /**
     * The URL of the audio to embed.
     */
    src: {
      type: String,
      required: true
    }
  },
  methods: {
    /**
     * Pauses the media playback.
     */
    pause() {},
    /**
     * Begins playback of the media.
     */
    play() {}
  }
};
</script>

<style scoped></style>

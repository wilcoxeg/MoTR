<docs>
You can use HTML's video tag to play video footage.

For more details see [HTML Video Element docs on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video).
```vue
<Experiment>

    <Screen>

      <Slide>
        This is a sealion.<br/>
        <button @click="$refs.video.play()">Start</button>
        <button @click="$refs.video.pause()">Stop</button>
        <video ref="video" src="video/sea_lions.webm" loop />
      </Slide>

    </Screen>

</Experiment>
```
</docs>

<template><div /></template>

<script>
// This is a dummy component to generate nice documentation for HTML's video element
export default {
  name: 'Video',

  props: {
    /**
     * if specified, the audio will automatically begin playback as soon as it can do so, without waiting for the entire video file to finish downloading.
     */
    autoplay: {
      type: Boolean,
      default: false
    },
    /**
     * If this attribute is set, the browser will offer controls to allow the user to control playback, including volume, seeking, and pause/resume playback.
     */
    controls: {
      type: Boolean,
      default: false
    },
    /**
     * if true, the video player will automatically seek back to the start upon reaching the end of the video.
     */
    loop: {
      type: Boolean,
      default: false
    },
    /**
     * indicates whether the video will be initially silenced
     */
    muted: {
      type: Boolean,
      default: false
    },
    /**
     * The URL of the video to embed.
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

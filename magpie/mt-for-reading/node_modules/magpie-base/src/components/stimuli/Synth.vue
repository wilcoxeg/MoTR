<docs>
The Synth component is a basic sound Synthesizer based on [Tone.js](https://tonejs.github.io/).

```vue
<Experiment>
    <Screen title="Click to beep.">

      <Slide>
        <button @click= "$magpie.nextSlide()">Start</button>
      </Slide>

      <Slide>
        <Synth oscillator="fmsine" frequency="C4"/>
        <Synth oscillator="fmsine" frequency="E4"/>
        <Synth oscillator="fmsine" frequency="G4"/>
        <button @click="$magpie.nextSlide(0)">Stop</button>
      </Slide>

    </Screen>
</Experiment>
```

</docs>

<template><div /></template>

<script>
import * as Tone from 'tone';

export default {
  name: 'Synth',

  props: {
    /**
     * "fatsine"	| "fatsquare"	| "fatsawtooth"	| "fattriangle"	| "fatcustom"	| "fmsine"	| "fmsquare"	| "fmsawtooth"	| "fmtriangle"	| "fmcustom"	| "amsine"	| "amsquare"	| "amsawtooth"	| "amtriangle"	| "amcustom"	| "pulse"	| "pwm"
     */
    oscillator: {
      type: String,
      default: 'fmsine'
    },
    /**
     * The volume of the output in decibels.
     */
    volume: {
      type: Number,
      default: -6
    },
    /**
     * The attack of the output envelope in seconds. The attack time is the amount of time it takes for the envelope to reach it's maximum value.
     */
    attack: {
      type: Number,
      default: 0.05
    },
    /**
     * the decay of the output envelope in seconds. After the attack portion of the envelope, the value will fall over the duration of the decay time to it's sustain value.
     */
    decay: {
      type: Number,
      default: 0.1
    },
    /**
     * The sustain value is the value which the envelope rests at after triggerAttack is called, but before triggerRelease is invoked. Must be between 0 and 1.
     */
    sustain: {
      type: Number,
      default: 0.5
    },
    /**
     * Release time of the output envelope in seconds. After the duration of the synth tone, the envelope's value will fall to it's minimum value over the duration of the release time.
     */
    release: {
      type: Number,
      default: 0.1
    },
    /**
     * The note frequency in hertz (like 440) or as "pitch-octave" notation (like "D#2")
     */
    frequency: {
      type: [Number, String],
      required: true
    },

    /**
     * Duration in seconds. By default the tone will only stop when the component is unmounted.
     */
    duration: {
      type: Number,
      default: Infinity
    }
  },

  data() {
    return {
      synth: new Tone.Synth({
        oscillator: {
          type: this.oscillator,
          volume: this.volume
        },
        envelope: {
          attack: this.attack,
          decay: this.decay,
          sustain: this.sustain,
          release: this.release
        }
      }).toDestination()
    };
  },

  async mounted() {
    const synth = await this.synth;
    if (this.duration !== Infinity) {
      synth.triggerAttackRelease(this.frequency, this.duration);
    } else {
      synth.triggerAttack(this.frequency, synth.now());
    }
  },

  async destroyed() {
    const synth = await this.synth;
    synth.triggerRelease(synth.now());
  }
};
</script>

<style scoped></style>

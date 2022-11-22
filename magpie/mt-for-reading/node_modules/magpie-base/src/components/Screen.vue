<docs>
### Simple screen

```vue
<Experiment>
    <Screen>
      Hello World.
    </Screen>
</Experiment>
```

### Show progress

```vue
<Experiment>
    <Screen v-for="i in 10" :key="i" :progress="i/10">
      Hello World.
      <button @click="$magpie.nextScreen()">Next</button>
    </Screen>
</Experiment>
```

### Multiple slides
One screen may consist of multiple slides that are numbered incrementally and displayed one after another.
You can go to the next slide with the `nextSlide` function that is exposed by the Screen component.

```vue
<Experiment>
    <Screen title="Wow.">

      <Slide>
        Hello <button @click="$magpie.nextSlide()">World</button>.
      </Slide>

      <Slide>
        Hello you.
      </Slide>

    </Screen>
</Experiment>
```

### Store measurements
The screen component also conveniently exposes an object for you to store in the measurements of the current screen, so you can later save them.

```vue
<Experiment>
    <Screen title="Wow.">
      <Slide>
        Hello
        <TextareaInput :response.sync="$magpie.measurements.text" />
        {{ $magpie.measurements.text }}?
        <button v-if="$magpie.measurements.text" @click="$magpie.saveAndNextScreen()">Done</button>
      </Slide>
    </Screen>

    <DebugResultsScreen />

</Experiment>
```

### Validate measurements
The screen can also be used to validate observations.

```vue
<Experiment>
    <Screen :validations="{
      text: {
        minLength: $magpie.v.minLength(4),
        alpha: $magpie.v.alpha
      }
    }">

      <Slide>
        Hello
        <TextareaInput :response.sync="$magpie.measurements.text" />

        {{ $magpie.measurements.text }}?

        <button v-if="!$magpie.validateMeasurements.$invalid" @click="$magpie.saveAndNextScreen()">Done</button>

        <p v-else>At least 4 characters required and only alphabetic characters, please.</p>

      </Slide>

    </Screen>

    <DebugResults />
</Experiment>
```

### Jump using labels

```vue
<Experiment>
  <Screen v-for="i in 10" :key="i" :progress="i/10" :label="'screen-'+i">
    Hello {{i}}th World.
    <button @click="$magpie.nextScreen()">Next</button>
    <button @click="$magpie.nextScreen('end')">Abort</button>
  </Screen>
  <Screen label="end">
    World's End.
    <button @click="$magpie.nextScreen('screen-1')">Restart</button>
  </Screen>
</Experiment>
```

</docs>

<script>
import { validationMixin } from 'vuelidate';
import DebugStatement from './DebugStatement';

/**
 * This component lets you create experiment sections that appear one after the other like a slideshow.
 * Trial data
 */
export default {
  name: 'Screen',
  mixins: [validationMixin],
  props: {
    /**
     * The title of this screen
     */
    title: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * If you want to show a progress bar, set this to a value between 0 and 1
     */
    progress: {
      type: Number,
      default: -1
    },
    /**
     * A label that can be used to jump to this screen
     */
    label: {
      type: String,
      default: ''
    },
    /**
     * Define validators for measurements
     */
    validations: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      measurements: {}
    };
  },
  watch: {
    '$magpie.measurements': {
      handler() {
        this.measurements = this.$magpie.measurements;
        this.$v.measurements.$touch();
      },
      deep: true
    }
  },
  beforeMount() {
    this.$magpie.setProgress(this.progress);
  },
  mounted() {
    this.$magpie.validateMeasurements = this.$v.measurements;
    this.$magpie.mousetracking.start();
  },
  validations() {
    return {
      measurements: this.validations
    };
  },
  /**
   * Place your slides inside this slot. They will be visible one after the other, like a slide show.
   * @slot default
   */
  render(h) {
    const children = this.$slots.default;
    if (!children) {
      return h('div', { class: 'screen' }, [
        this.title ? h('h2', this.title) : null
      ]);
    }
    let slide;
    const slides = children.filter((c) => !!c.componentOptions);
    if (
      slides.length &&
      slides.every((c) => c.componentOptions.tag === 'Slide')
    ) {
      slide = slides[this.$magpie.currentSlideIndex];
    } else {
      slide = this.$slots.default;
      if (slides.some((c) => c.componentOptions.tag === 'Slide')) {
        this.$magpie.warning =
          'This screen received mixed contents. Either provide only <Slide> elements inside your <Screen> or provide the contents of the first and only slide directly.';
      }
    }
    // Avoid reusing children
    slide.key = this.$magpie.currentSlideIndex;
    return h('div', { class: 'screen' }, [
      this.title ? h('h2', this.title) : null,
      slide,
      this.$magpie.warning
        ? h(DebugStatement, {
            props: {
              text: this.$magpie.warning,
              type: 'warning'
            }
          })
        : null
    ]);
  }
};
</script>

<style scoped>
.screen {
  flex-grow: 1;
  position: relative;
}
</style>

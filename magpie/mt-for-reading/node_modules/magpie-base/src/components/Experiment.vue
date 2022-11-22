<docs>
### A simple experiment with 3 screens

```vue
<Experiment>

    <Screen>
      blue
      <button @click="$magpie.nextScreen()">next</button>
    </Screen>

    <Screen>
      green
      <button @click="$magpie.nextScreen()">next</button>
    </Screen>

    <Screen>
      yellow
    </Screen>

</Experiment>
```

### Using a loop to create screens

```vue
<Experiment>

    <Screen v-for="(color, i) in ['blue', 'green', 'yellow']" :key="i">
      <Slide>
        Screen {{i}}: {{ color }}
        <button @click="$magpie.nextScreen()">next</button>
      </Slide>
    </Screen>

</Experiment>
```


### Providing a title
Besides the `screens` slot, the Experiment component also provides an optional `title` slot that allows you to display header information on all screens of your experiment.

```vue
<Experiment>
  <template #title>
    My experiment
  </template>
  <template #default>
    <Screen>
      blue
      <button @click="$magpie.nextScreen()">next</button>
    </Screen>
    <Screen>
      green
      <button @click="$magpie.nextScreen()">next</button>
    </Screen>
    <Screen>
      yellow
    </Screen>
  </template>
</Experiment>
```

### Validate entered data
The Experiment component also allows specifying a function that will be used to validate the to-be-submitted data before sending it to the server.

```vue
<Experiment :validate-submission="data => data.length === 3">
  <Screen>
    blue
    <button @click="$magpie.nextScreen()">next</button>
  </Screen>
  <Screen>
    green
    <button @click="$magpie.nextScreen()">next</button>
  </Screen>
  <Screen>
    yellow
  </Screen>
</Experiment>
```
</docs>

<script>
import Magpie from '../Magpie';
import kProgress from 'k-progress';

/**
 * This is the main component for your online experiment. Put it at the root of your application.
 * The experiment is available in all subcomponents and in the parent as `$magpie`
 */
export default {
  name: 'Experiment',
  props: {
    /**
     * Whether to display the experiment in wide format-filling mode
     */
    wide: {
      type: Boolean,
      default: false
    },
    /**
     * Optionally specify a title for your experiment which will be displayed in the browser title bar (or in the browser tab)
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * Optionally specify variables that should be recorded for the whole experiment
     */
    recordData: {
      type: Object,
      default: () => ({})
    },

    /**
     * Pass an array of paths to images that will be needed in this experiment to enable preloading
     */
    imageAssets: {
      type: Array,
      default() {
        return [];
      }
    },

    /**
     * Pass an array of paths to audio files that will be needed in this experiment to enable preloading
     */
    audioAssets: {
      type: Array,
      default() {
        return [];
      }
    },

    /**
     * Pass an array of paths to video files that will be needed in this experiment to enable preloading
     */
    videoAssets: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * This function is called before data is submitted to the server. It will receive the submitted csv data as an array of objects
     * as its only argument.
     */
    validateSubmission: {
      type: Function,
      default() {
        return () => true;
      }
    }
  },
  data() {
    return {
      currentScreenComponent: {}
    };
  },
  created() {
    this.$parent.magpie = new Magpie(this.$options.magpie);
    this.$magpie.experiment = this;
    window.$magpie = this.$magpie;

    if (this.$magpie.socketUrl) {
      let previousParticipantCount = 0;
      this.$watch('$magpie.socket.participants', (val) => {
        const screens = this.$slots.default.filter((c) => !!c.componentOptions);
        if (
          val.length - previousParticipantCount < 0 &&
          screens.length - 1 !== this.$magpie.currentScreenIndex
        ) {
          window.alert(this.$t('interactive.general.aborted'));
          this.$magpie.nextScreen(screens.length - 1);
        }
        previousParticipantCount = val.length;
      });
    }

    if (this.title) {
      document.title = this.title;
    }

    // preload images
    this.imageAssets.forEach((path) => {
      const preloadLink = document.createElement('link');
      preloadLink.href = path;
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      document.head.appendChild(preloadLink);
    });

    // preload audio
    this.audioAssets.forEach((path) => {
      const preloadLink = document.createElement('link');
      preloadLink.href = path;
      preloadLink.rel = 'preload';
      preloadLink.as = 'audio';
      document.head.appendChild(preloadLink);
    });

    // preload video
    this.videoAssets.forEach((path) => {
      const preloadLink = document.createElement('link');
      preloadLink.href = path;
      preloadLink.rel = 'preload';
      preloadLink.as = 'video';
      document.head.appendChild(preloadLink);
    });

    this.$magpie.validateSubmission = this.validateSubmission;

    this.$magpie.addExpData(this.recordData);

    // Ask the user before closing the page
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
    });
  },
  mounted() {
    this.$el.addEventListener('mousemove', (e) =>
      this.$magpie.mousetracking.onMouseMove(e)
    );
  },
  methods: {
    scrollToTop() {
      // Scroll to top of experiment element
      const expPos = this.$el.getBoundingClientRect();
      window.scrollTo(0, window.scrollY + expPos.top);
    }
  },

  /**
   * The contents of this slot will be visible during the entire experiment
   * @slot title
   */
  /**
   * Place your screens inside this slot. They will be visible one after the other, like a slide show.
   * @slot default
   */
  render(h) {
    const children = this.$slots.default;
    const screen = children
      ? children.filter((c) => !!c.componentOptions)[
          this.$magpie.currentScreenIndex
        ]
      : null;
    // Avoid reusing children
    screen.key = this.$magpie.currentScreenIndex;
    return h('div', { class: 'experiment' + (this.wide ? ' wide' : '') }, [
      h('div', { class: 'header' }, [
        h('div', { class: 'col title' }, this.$slots.title),
        h('div', { class: 'col status' }, [
          this.$magpie.progress !== -1
            ? h(kProgress, {
                props: {
                  percent: this.$magpie.progress * 100,
                  showText: false,
                  lineHeight: 10
                },
                style: { width: '150px' }
              })
            : null
        ])
      ]),
      screen
    ]);
  }
};
</script>

<style>
.experiment {
  box-sizing: border-box;
  margin: 3% auto;
  width: 900px;
  min-height: 600px;
  border-radius: 10px;
  border: 1px solid #ababab;
  padding: 20px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.87);
  font-size: 17px;
  line-height: 27px;
  font-family: 'Lato', 'Noto Sans', sans-serif;
}

.experiment.wide {
  width: 100%;
  margin: 0;
  min-height: 98vh; /* 98% of viewport height */
  border: none;
}

.header {
  text-align: left;
  display: flex;
  flex-direction: row;
  flex-grow: 0;
}

.header .col {
  flex-shrink: 0;
  flex-grow: 1;
}

.header .col:last-child {
  display: flex;
  flex-direction: row-reverse;
}

.experiment.wide .header .col:last-child {
  flex-direction: row;
}

.header .k-progress-outer {
  padding-right: 0; /* hacky stylefix for progress bar */
}

/**
 Default styles
 */

h1,
h2,
h3,
h4 {
  color: rgba(0, 0, 0, 0.87);
  font-family: 'Playfair Display', 'Noto Serif', serif;
  text-align: center;
}

h1 {
  font-size: 34px;
}

button {
  background-color: #5187ba;
  border: none;
  border-radius: 2px;
  color: white;
  display: block;
  font-family: 'Lato', 'Noto Sans', sans-serif;
  font-size: 12px;
  line-height: 20px;
  font-weight: 700;
  letter-spacing: 0.9px;
  margin: 40px auto 20px auto;
  outline: none;
  padding: 5px 10px;
  text-transform: uppercase;
}

button:hover,
button:focus {
  background-color: #324d93;
}

img,
video {
  max-width: 100%;
  height: auto;
  max-height: 400px;
  width: auto;
}
</style>

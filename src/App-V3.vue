<!-- This version split the texts into words, put into a <span> tag at the first place.-->
<!-- This version has no window, but when mouse hover over a word, the word will become unblurred and data be recorded -->

<template>
  <Experiment title="Test blur text with mouse tracking ">
    <InstructionScreen :title="'Welcome'">
      <p>This is a split word test. When the mouse hover over a word, the word should be unblurred and the rest blurred. The movement of the mouse and the word been hovered should be recorded</p>
      <p>Please use the "Fullscreen Mode" for the duration of the experiment:
        <a href="javascript:void(0)" @click="turnOnFullScreen">Fullscreen Mode</a>
      </p>
      <!-- v-blur="isBlurred" -->
      <p >This experiment can sometimes be difficult. Please be patient</p>
    </InstructionScreen>

    Make two test screens to see how to blur text, tracking mouse, unblur text and recode data.
    <template v-for="(trial, k) of localCoherences">
      <Screen :key="k">
        <Slide>


          <div class="readingText">
            <span v-for = "(w, i) in trial.item_content.split(' ')" :key="i" ref="wordSpan" :class="{ blur: wordIndex !== i }"  @mouseover="changeCursor(i)" @mouseleave="changeBack(i)">
              {{w + ' '}}
            </span>

          </div>

          <button class="next" @click="$magpie.saveAndNextScreen()">
            Next
          </button>

          <!-- <Record
            :data="{
            itemId: trial.item_id,
            tem: trial.item_content,
            }"
          /> -->

        </Slide>
      </Screen>
    </template>

    <SubmitResultsScreen />
  </Experiment>
</template>

<script>
// Load data from csv files as javascript arrays with objects
import Magpie from 'magpie-base';
import localCoherences from '../trials/localCoherences.csv';
import _ from 'lodash';
import Vue from 'vue';
import vBlur from 'v-blur';

Vue.use(vBlur)

export default {
  name: 'App',
  data() {
  return {
    localCoherences,
    isBlurred: true,
    wordIndex: null,
    startTime: null,
  }
},

  computed: {

  },

  methods: {
    changeCursor(i) {
      this.wordIndex = i;
      this.startTime = Date.now();
    },


    changeBack(i) {
      this.wordIndex = null; 
      this.saveData(i);
      this.startTime = null;
    },

    saveData(i) {
      const wordSpans = this.$refs.wordSpan;
      const wordSpan = wordSpans[i];
   
      const x1 = wordSpan.offsetLeft;
      const y1 = wordSpan.offsetTop;
      const x2 = wordSpan.offsetWidth + x1;
      const y2 = wordSpan.offsetHeight + y1;

      // console.log('x1: ', x1)
      // console.log('y1: ', y1)
      // console.log('x2: ', x2)
      // console.log('y2: ', y2)

      const word = wordSpan.innerText;
      const duration = Date.now() - this.startTime;
      // console.log('lala: ', word)
      $magpie.addTrialData({
        time: this.startTime,
        // there is a whitespace following each word.
        word: word,                 
        index: i,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        duration: duration
      });
    },

    async turnOnFullScreen() {
      if (!document.fullscreenElement) {
        try {
          await document.documentElement.requestFullscreen();
          return true;
        } catch (e) {
          return false;
        }
      }
      return true;
    },
    turnOffFullScreen() {
      document.exitFullscreen();
    },
    getScreenDimensions() {
      return {
        window_inner_width: window.innerWidth,
        window_inner_height: window.innerHeight
      };
    }
  }, 

};

</script>


<style>
  .experiment {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .screen {
    position: relative;
    width: 80%;
    height: auto;
  }

  .readingText {
    /* z-index: 1; */
    position: absolute;
    text-align: left;
    /* cursor: none; */
    color: black;
  }

  .blur {
    opacity: 0.3; 
    filter: blur(2px); 
    transition: all 0.3s linear 0s;
  }

  button {
    position: absolute;
    bottom: 0;
    left: 50%;
  }

  .oval-cursor {
    position: fixed;
    /* left: 10px; */
    z-index: 2;
    width: 10px;
    height: 10px;
    transform: translate(-50%, -50%);
    background-color: transparent;
    border: 1px solid black;
    mix-blend-mode: difference;
    border-radius: 50%;
    pointer-events: none;
    transition: width 0.5s, height 0.5s;
     
  } 

  .oval-cursor.grow {
    width: 120px;
    height: 30px;
    transition: width 0.5s, height 0.5s;
  }

</style>

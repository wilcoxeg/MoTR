<!-- This version records the data whenever the cursor moves with a flexible time interval. -->
<!-- So it records data when mouse moves -->
<!-- No split of text beforehand -->

<template>
  <Experiment title="Test blur text with mouse tracking ">
    <InstructionScreen :title="'Welcome'">
      <p>This is a sample introduction screen.</p>
      <p>Please use the "Fullscreen Mode" for the duration of the experiment:
        <a href="javascript:void(0)" @click="turnOnFullScreen">Fullscreen Mode</a>
      </p>
      <!-- v-blur="isBlurred" -->
      <p >This experiment can sometimes be difficult. Please be patient</p>
      <p style = "color: green">This version records the data whenever the cursor moves with a flexible time interval.</p>
    </InstructionScreen>

    <template v-for="(trial, i) of testTrials">
      <Screen :key="i">
        <Slide>
          <div class="oval-cursor"></div>
          <p class="readingText" @mouseover="changeCursor" @mouseleave="changeBack" @mousemove="moveCursor">
            {{trial.item_content}}
          </p>
          <div class="clear-layer" style="opacity: 0.3; filter: blur(3px); transition: all 0.3s linear 0s;"> 
            {{trial.item_content}}
          </div>
          <!-- <button class="next" @click=" saveMouseMoveData(); $magpie.nextScreen()"> -->
            <button class="next" @click="$magpie.nextScreen()">
              Next
          </button>
        </Slide>
      </Screen>
    </template>

    <!-- <SubmitResultsScreen /> -->
    <DebugResultsScreen />
  </Experiment>
</template>

<script>
import testTrials from '../trials/testTrials.csv';
import _ from 'lodash';
import Vue from 'vue';
import vBlur from 'v-blur';
import { copyFileSync } from 'fs';
Vue.use(vBlur)

export default {
  name: 'App',
  data() {
    return {
      testTrials,
      isBlurred: true,
      startTime: 0,
  }},
  mounted() {
    this.startTime = Date.now()
  },
  methods: {
    changeCursor() {
      // console.log('good');
      this.$el.querySelector(".oval-cursor").classList.add('grow')
      
    },
    changeBack() {
      // console.log('back');
      this.$el.querySelector(".oval-cursor").classList.remove('grow');
    },
    moveCursor(e) {
      let x = e.clientX;
      let y = e.clientY;
      let elapsedTime = Date.now() - this.startTime;
      this.$el.querySelector(".oval-cursor").style.left = `${x+20}px`;
      this.$el.querySelector(".oval-cursor").style.top = `${y}px`;
      let wordUnderCursor = this.getWordAtPosition(x,y);
      console.log(wordUnderCursor);
      $magpie.addTrialData({
        time: elapsedTime,
        cursorX: x,
        cursorY: y,
        word: wordUnderCursor,
      })
    },
    getWordAtPosition(x, y) {
      let element = document.elementFromPoint(x, y);
      if (!element || element.tagName !== 'P') {
        return ''; // return empty string if element is not found
      }
      let elemText = element.innerText;
      let words = elemText.split(' ');
      for (let i = 0; i < words.length; i++) {
        let word = words[i];
        let wordIndices = this.getIndicesOf(word, elemText);
        for (let j = 0; j < wordIndices.length; j++) {
          let range = document.createRange();
          range.selectNodeContents(element);
          range.setStart(element.firstChild, wordIndices[j]);
          range.setEnd(element.firstChild, wordIndices[j] + word.length);
          let rect = range.getBoundingClientRect();
          if (rect.left <= x && rect.right >= x && rect.top <= y && rect.bottom >= y) {
            return word;
          }
        }
      }
      return ''; // return empty string if no word is found
    },
    // Helper function to find the start and end indices of a regular expression match in a string
    getIndicesOf(word, text){
      let indices = []
      let str = ' ' + text + ' ';
      let searchString = ' ' + word + ' ';
      let searchIndex = str.indexOf(searchString); 
      while (searchIndex !== -1) {
        indices.push(searchIndex+1);
        searchIndex = str.indexOf(searchString, searchIndex + 1);
      }
      return indices;
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
    color: white;
    text-align: left;
    cursor: pointer;
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
    width: 2px;
    height: 2px;
    transform: translate(-50%, -50%);
    background-color: white;
    mix-blend-mode: difference;
    border-radius: 50%;
    pointer-events: none;
    transition: width 0.5s, height 0.5s;
  } 
  .oval-cursor.grow {
    width: 130px;
    height: 35px;
    box-shadow: 0 0 5px #ccc;
    transition: width 0.5s, height 0.5s;
  }
  .clear-layer {
    margin: 17px 0;
    position: absolute;
    pointer-events: none;
    color: black;
    text-align: left;
  }
</style>

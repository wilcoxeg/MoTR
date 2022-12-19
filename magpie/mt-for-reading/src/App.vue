<!-- This version record the data with a fixed time interval. here 100ms. You can change 100 to other numbers in setInterval()-->
<!-- This version split the texts into words, put into a <span> tag at the first place.-->

<template>
  <Experiment title="Test blur text with mouse tracking ">
    <InstructionScreen :title="'Welcome'">
      <p>This is a sample introduction screen. </p>
      <p>Please use the "Fullscreen Mode" for the duration of the experiment:
        <a href="javascript:void(0)" @click="turnOnFullScreen">Fullscreen Mode</a>
      </p>
      <p>This experiment can sometimes be difficult. Please be patient</p>
    </InstructionScreen>

    Make two test screens to see how to blur text, tracking mouse, unblur text and recode data.
    <template v-for="(trial, i) of testTrials">
      <Screen :key="i" >
        <Slide>

          <div class="rect-cursor"></div>
            <!-- @mousemove="moveCursor" -->


          <p class="readingText" @mousemove="moveCursor">
          <template v-for="(word, index) of trial.item_content.split(' ')">
            <span class="word" :key="index" @mouseover="changeFont(index)" @mouseleave="changeBack" :data-index="index">
              {{ word }}
            </span>
          </template>
        </p>

          <div class="out-cursor" style="opacity: 0.3; filter: blur(3.5px); transition: all 0.3s linear 0s;"> 
            {{trial.item_content}}
          </div>

          <button class="next" @click=" $magpie.saveAndNextScreen()">
            Next
          </button>

        </Slide>
      </Screen>
    </template>

    <SubmitResultsScreen />
  </Experiment>
</template>

<script>
// Load data from csv files as javascript arrays with objects
import testTrials from '../trials/testTrials.csv';
import _ from 'lodash';
import Vue from 'vue';
import vBlur from 'v-blur';

Vue.use(vBlur)

export default {
  name: 'App',
  data() {
    return {
      testTrials,
      currentIndex: null,
      mousePosition: {
          x: 0,
          y: 0,
        },
  }},

  computed: {

  },

  mounted() {
      setInterval(this.saveData, 100);
    },

  methods: {
    changeFont(index) {
      console.log('good');
      this.currentIndex= index;
      this.$el.querySelector(".rect-cursor").classList.add('grow')
    },

    changeBack() {
      console.log('back');
      this.$el.querySelector(".rect-cursor").classList.remove('grow');
    },

    saveData() {
        if (this.currentIndex !== null) {
          const currentElement = this.$el.querySelector(`.word[data-index="${this.currentIndex}"]`);
          if (currentElement) {
            $magpie.addTrialData({
              Index: this.currentIndex,
              Word: currentElement.innerHTML,
              mousePositionX: this.mousePosition.x,
              mousePositionY: this.mousePosition.y,
              wordPositionTop: currentElement.offsetTop,
              wordPositionLeft: currentElement.offsetLeft,
              wordPositionBottom: currentElement.offsetHeight + currentElement.offsetTop,
              wordPositionRight: currentElement.offsetWidth + currentElement.offsetLeft
          });
        }
      }},

    moveCursor(e) {
      // console.log('great');
      let x = e.clientX;
      let y = e.clientY;
      
      this.$el.querySelector(".rect-cursor").style.left = `${x+20}px`;
      this.$el.querySelector(".rect-cursor").style.top = `${y}px`;

      this.mousePosition.x = x;
      this.mousePosition.y = y;
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

  .rect-cursor {
    position: fixed;
    /* left: 10px; */
    z-index: 2;
    width: 1px;
    height: 1px;
    transform: translate(-50%, -50%);
    background-color: white;
    mix-blend-mode: difference;
    border-radius: 50%;
    pointer-events: none;
    transition: width 0.5s, height 0.5s;
     
  } 

  .rect-cursor.grow {
    width: 130px;
    height: 35px;
    box-shadow: 0 0 6px 3px rgb(223, 223, 223);
    transition: width 0.5s, height 0.5s;
  }

  .out-cursor {
    margin: 17px 0;
    position: absolute;
    pointer-events: none;
    color: black;
    text-align: left;
  }

</style>

<template>
  <Experiment title="Test blur text with mouse tracking ">
    <InstructionScreen :title="'Welcome'">
      <p>This is a sample introduction screen.</p>
      <p>Please use the "Fullscreen Mode" for the duration of the experiment:
        <a href="javascript:void(0)" @click="turnOnFullScreen">Fullscreen Mode</a>
      </p>
      <!-- v-blur="isBlurred" -->
      <p >This experiment can sometimes be difficult. Please be patient</p>
    </InstructionScreen>

    Make two test screens to see how to blur text, tracking mouse, unblur text and recode data.
    <template v-for="(trial, i) of testTrials">
      <Screen :key="i" MousetrackingStart>
        <Slide>

          <div class="rect-cursor"></div>
            <!-- @mousemove="moveCursor" -->

          <p class="readingText" @mouseover="changeFont" @mouseleave="changeBack" @mousemove="moveCursor">
          <!-- <p class="readingText" v-blur="blurConfig" >       -->
            {{trial.item_content}}
          </p>

          <div class="out-cursor" style="opacity: 0.3; filter: blur(3.5px); transition: all 0.3s linear 0s;"> 
            {{trial.item_content}}
          </div>

          <!-- <button class="next" @click=" saveMouseMoveData(); $magpie.saveAndNextScreen()"> -->
          <button class="next" @click=" saveMouseMoveData(); $magpie.nextScreen()">
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
      isBlurred: true,
  }},

  computed: {

  },

  methods: {
    changeFont() {
      console.log('good');
      // $magpie.mousetracking.start();
      this.$el.querySelector(".rect-cursor").classList.add('grow')
      
    },

    changeBack() {
      console.log('back');
      this.$el.querySelector(".rect-cursor").classList.remove('grow');
    },

    moveCursor(e) {
      // console.log('great');
      let x = e.clientX;
      let y = e.clientY;
      // console.log(x);
      // console.log(y);
      
      this.$el.querySelector(".rect-cursor").style.left = `${x}px`;
      this.$el.querySelector(".rect-cursor").style.top = `${y}px`;
      // this.$el.querySelector(".out-cursor").style.left = `${x}px`;
      // this.$el.querySelector(".out-cursor").style.top = `${y}px`;
    },

    saveMouseMoveData() {
      $magpie.addTrialData(
        {
        time: $magpie.mousetracking.getMouseTrack()['mt_time'], 
        x: $magpie.mousetracking.getMouseTrack()['mt_x'], 
        y: $magpie.mousetracking.getMouseTrack()['mt_y'],
        startTime: $magpie.mousetracking.getMouseTrack()['mt_start_time']}
        );
      console.log('added!')
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

  // mounted() {
  //   this.$el.addEventListener('mousemove', this.moveCursor); 
  // },
  // destroyed() {
  //   this.$el.removeEventListener('mousemove', this.moveCursor);},
  

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
    cursor: none;
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
    width: 2px;
    height: 2px;
    transform: translate(-50%, -50%);
    background-color: white;
    mix-blend-mode: difference;
    /* border-radius: 50%; */
    pointer-events: none;
    transition: width 0.5s, height 0.5s;
     
  } 

  .rect-cursor.grow {
    width: 120px;
    height: 30px;
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

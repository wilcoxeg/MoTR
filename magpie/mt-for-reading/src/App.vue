<!-- This version record the data with a fixed time interval. here 100ms. You can change 100 to other numbers in setInterval()-->
<!-- This version split the texts into words, put into a <span> tag at the first place.-->

<template>
  <Experiment title="Test blur text with mouse tracking ">

    <Screen :title="'Welcome'" class="instructions" :validations="{
        SubjectID: {
          minLength: $magpie.v.minLength(2)
        }
      }">
        <!-- <WelcomeScreen /> -->
        <div style="width: 40em;" >
          <p style="text-align: justify">
              You are being asked to take part in a research study being done by Ethan Wilcox, a researcher at the Swiss Federal Institute of Technology. It is your choice whether or not to participate in this research. If you choose to participate, you may change your mind and leave the study at any time by closing the webpage.
            <br><br>
              If you choose to be in the study, you will use the computer mouse to read sentences in English. This study will help us learn about how people read. It will take you around 20 minutes to complete. Please note that you can participate only if you are an adult native English speaker.
            <br><br>
            If you participate in this study, you will have the opportunity to read some texts and think about your own language.
            There are no foreseeable risks from participating in this study.
            <br><br>
              The data we collect from this survey is confidential. Aggregate, de-identified data may be made
              available to researchers outside of the research team associated with this project.
            <br><br>
              Questions? Please contact: <br>
              Ethan Gotlieb Wilcox <br>
              Department of Computer Science <br>
              ETH Zurich <br>
              OAS K.20 <br>
              Binzmühlestrasse 13
              8050 Zürich, Switzerland <br>
              e-mail: ethan.wilcox@inf.ethz.ch <br>
              <br>
              Please save or print a copy of this page for your records
          </p>
          <tr>
          <td>Please enter your Worker ID to continue:&nbsp</td><td><input name="TurkID" type="text" class="obligatory" v-model="$magpie.measurements.SubjectID"/></td>
          </tr>
          <!-- <tr>
            <td colspan="2"><label class="error" for="TurkID"></label></td>
          </tr> -->
        </div>
        <div v-if="
            $magpie.measurements.SubjectID&&
            !$magpie.validateMeasurements.SubjectID.$invalid
            ">
          <br> By clicking on the button below you consent to participating in this study: <br><br>
          <br />
          <button 
            @click="$magpie.addExpData({ SubjectId: $magpie.measurements.SubjectID}); $magpie.nextScreen()">
            Proceed
          </button>
        </div>
      </Screen>

    <InstructionScreen :title="'Instruction'">
      <p>Please use the "Fullscreen Mode" for the duration of the experiment:
        <a href="javascript:void(0)" @click="turnOnFullScreen">Fullscreen Mode</a>
      </p>
      <p>In this study, you will read short texts and answer questions about them. However, unlike in normal reading, the texts will be blurred. In order to bring the text into focus move your mouse over it. Take as much time to read the text as you need in order to understand it. When you are done reading, answer the question at the bottom and click “next” to move on.</p>
    </InstructionScreen>

    <template v-for="(trial, i) of testTrials">
      <Screen :key="i" class="main_screen">
        <Slide>
          <form><input type="hidden" class="hidden" :value="trial.item_id"></form>
          <div class="oval-cursor"></div>
          <p class="readingText" @mousemove="moveCursor">
            <template v-for="(word, index) of trial.item_content.split(' ')">
              <span :class="{ bold: currentIndex === index }" :key="index" @mouseover="changeCursor(index)" @mouseleave="changeBack" :data-index="index">
                {{ word }}
              </span>
            </template>
          </p>
          <div class="clear-layer" style="opacity: 0.3; filter: blur(3.5px); transition: all 0.3s linear 0s;"> 
            {{trial.item_content}}
          </div>

          <div style = "position:absolute; bottom:15%; text-align: center; min-width: -webkit-fill-available;">
            <template>
              <form>
                <!-- comprehension questions and the response options -->
                <p>{{ trial.question.replace(/ ?["]+/g, '') }}</p>
                <template v-for='(word, index) of trial.response_options'>
                  &nbsp<input :id="'opt_'+index" type="radio" :value="word" name="opt" v-model="$magpie.measurements.response"/>{{ word }}&nbsp
                    <!-- <label :for="'opt_'+index"> {{ word }}&nbsp</label> -->
                </template>
              </form>
            </template>
          </div>
          
          <button v-if="$magpie.measurements.response" @click="$magpie.saveAndNextScreen()">
            Next
          </button>
        </Slide>
      </Screen>
    </template>
    <SubmitResultsScreen />
    <Screen :title="'Thanks'"> The study is now complete. Thank you for participating!</Screen>
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
    const shuffledTestTrials = _.shuffle(testTrials);
    // Create a new column in testTrials called 'response_options'
    // that concatenates the word in response_true with the two words in response_distractors
    const updatedTestTrials = shuffledTestTrials.map(trial => {
      // console.log("nice: ", trial);
      return {
        ...trial,
        response_options: _.shuffle(`${trial.response_true}|${trial.response_distractors}`.replace(/ ?["]+/g, "").split("|")),
      }
    });
    // console.log("nice2: ", updatedTestTrials);

    return {
      testTrials: updatedTestTrials,
      currentIndex: null,
      // currentItem: null,
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

    changeCursor(index) {
      this.currentIndex= index;
      this.$el.querySelector(".oval-cursor").classList.add('grow')
    },

    changeBack() {
      this.$el.querySelector(".oval-cursor").classList.remove('grow');
    },

    saveData() {
        if (this.currentIndex !== null) {
          const currentItem = this.$el.querySelector(".hidden");
          const currentElement = this.$el.querySelector(`.bold[data-index="${this.currentIndex}"]`);
          if (currentElement) {
            $magpie.addTrialData({
              ItemId: currentItem.value,
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
      
      this.$el.querySelector(".oval-cursor").style.left = `${x+15}px`;
      this.$el.querySelector(".oval-cursor").style.top = `${y}px`;

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

  .main_screen {
    position: relative;
    width: 60%;
    height: auto;
  }

  .debugResults{
    width: 100%;
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
    left: 47%;
  }

  .oval-cursor {
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

  .oval-cursor.grow {
    width: 180px;
    height: 35px;
    border-radius: 50%;
    box-shadow: 45px 0 8px -4px rgba(255, 255, 255, 0.1), -45px 0 8px -4px rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.3);
    background-blend-mode: screen;
    pointer-events: none;
    transition: width 0.5s, height 0.5s;
    filter:blur(3px);
  }

  .oval-cursor.grow::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 70%;
    background-color: white;
    mix-blend-mode: normal;
    border-radius: 50%;
}

  .clear-layer {
    margin: 17px 0;
    position: absolute;
    pointer-events: none;
    color: black;
    text-align: left;
  }

  .bold {
    font-weight: 450;
  }

</style>

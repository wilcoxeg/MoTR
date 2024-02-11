<!-- Window is fixed, 102px, pointer cursor, gradual blurry effect on surrounding words. -->
<!--  Comprehension questions appear afterwards in the same slide -->

<template>
  <Experiment title="Mouse tracking for Reading" translate="no">

    <Screen :title="'Welcome'" class="instructions" :validations="{
        SubjectID: {
          minLength: $magpie.v.minLength(2)
        }
      }">
        <!-- <WelcomeScreen /> -->
        <div style="width: 40em; margin: auto;">

        <div style="background-color: lightgrey; padding: 10px;">
            <b> Information About this Study </b>
        </div>
        <p>
          We would like to ask you if you are willing to participate in our research project. Your participation is voluntary. Please read the text below carefully and ask the conducting person about anything you do not understand or would like to know.
        <br><br>
          <b>What is investigated and how?</b> You are being asked to take part in a research study being done by Ethan Wilcox, a researcher at the Swiss Federal Institute of Technology. This study will help us learn about how people read. It will take you around 20 minutes to complete.
        <br><br>
          <b>Who can participate?</b> You can participate only if you are an adult native speaker of English.
        <br><br>
         <b>What am I supposed to do as a participant?</b> If you choose to be in the study, you will use the computer mouse to read sentences in English and answer questions about them.
        <br><br>
          <b>What are my rights during participation?</b> Your participation in this study is voluntary. If you choose to participate, you may change your mind and leave the study at any time by closing the web page without specifying reasons and without any disadvantages.
        <br><br>
          <b>What risks and benefits can I expect?</b> There are no foreseeable risks for participating in this study.
        <br><br>
          <b>Will I be compensated for participating?</b> If you participate you will be compensated for your time following the amount specified on prolific.co.
        <br><br>
          <b>What data is collected from me and how is it used?</b> During this study, we will track the position of your mouse on screen. The data from this study may be presented at scientific conferences and published in scientific journals, as well as in online repositories. All data will remain anonymous. Members of the ETH Zurich Ethics Commission may access the original data for examination purposes. Strict confidentiality will be observed at any time.
        <br><br>
          <b> What are my rights to my personal data? </b> You can request information about the personal data collected from you at any time and without giving reasons. You can also request that it be rectified, handed over to you, barred for processing or erased. To do so, please contact the person indicated below.
        <br><br>
          <b>Who funds this study?</b> This study is funded by an ETH Postdoctoral Fellowship grant, awarded to Ethan Wilcox.
        <br><br>
          <b> How am I insured? </b> Although there are no foreseeable risks for participation, any adverse health effects that are directly caused by a study and can be demonstrated to be attributable to fault on the part of the project team or ETH Zurich are covered by ETH's liability insurance.
        <br><br>
          <b> Who reviewed this study?  </b> This study was examined by the ETH Zurich Ethics Commission as proposal EK 2023-N-03

        <br><br>
          <b> Complaints Office:</b> The secretariat of the ETH Zurich Ethics Committee is available to help you with complaints in connection with your participation. Contact: ethics@sl.ethz.ch or 0041 44 632 85 72.
        <br><br>
          <b> General Contact: </b> Ethan Gotlieb Wilcox, Department of Computer Science, ETH Zurich, OAS K.20, Binzmühlestrasse 13, 8050 Zürich, Switzerland, ethan.wilcox@inf.ethz.ch <br>
        </p>

        <br>
        <div style="background-color: lightgrey; padding: 10px;">
            <b> Consent Form </b>
        </div>
        <br>
        I, the participant, confirm by clicking the button below: <br>
        <div style="padding-left: 30px"> • I have read and understood the study information. My questions have been answered completely and to my satisfaction. </div>
        <div style="padding-left: 30px">• I comply with the inclusion and exclusion criteria for participation described above. I am aware of the requirements and restrictions to be observed during the study. </div>
        <div style="padding-left: 30px">• I have had enough time to decide about my participation. </div>
        <div style="padding-left: 30px">• I participate in this study voluntarily and consent that my personal data be used as described above.</div>
        <div style="padding-left: 30px">• I understand that I can stop participating at any moment.</div>
        <br>

          <tr>
          <td>Please enter your Prolific ID to continue:&nbsp</td><td><input name="TurkID" type="text" class="obligatory" v-model="$magpie.measurements.SubjectID"/></td>
          </tr>
          <tr>

          </tr>
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
<!-- 
      <p>Please use the "Fullscreen Mode" for the duration of the experiment:
        <a href="javascript:void(0)" @click="turnOnFullScreen">Fullscreen Mode</a>
      </p>
 -->
      <p>In this study, you will read short texts and answer questions about them. However, unlike in normal reading, the texts will be blurred. In order to bring the text into focus move your mouse over it. Take as much time to read the text as you need in order to understand it. When you are done reading, answer the question at the bottom and click “next” to move on.</p>
    </InstructionScreen>

    <template v-for="(trial, i) of trials">
      <Screen :key="i" class="main_screen" :progress="i / trials.length">
        <Slide>
          <form>
            <input type="hidden" class="item_id" :value="trial.item_id">
            <input type="hidden" class="experiment_id" :value="trial.experiment_id">
            <input type="hidden" class="condition_id" :value="trial.condition_id">
          </form>
          <div class="oval-cursor"></div>
          <template>
            <div v-if="showFirstDiv" class="readingText" @mousemove="moveCursor" @mouseleave="changeBack">
              <template v-for="(word, index) of trial.text.split(' ')">
                <span :key="index" :data-index="index" >
                  {{ word }}
                </span>
              </template>
            </div>
            <div class="blurry-layer" style="opacity: 0.3; filter: blur(3.5px); transition: all 0.3s linear 0s;"> 
              {{trial.text}}
            </div>
          </template>
          <button v-if="showFirstDiv" style= "bottom:40%; transform: translate(-50%, -50%)" @click="toggleDivs" :disabled="!isCursorMoving">
          Done
          </button>

          <div v-else style = "position:absolute; bottom:15%; text-align: center; width: 100%; min-width: -webkit-fill-available;" >
            <template>
              <form>
                <!-- comprehension questions and the response options -->
                <div>{{ trial.question.replace(/ ?["]+/g, '') }}</div>
                <template v-for='(word, index) of trial.response_options'>
                  <input :id="'opt_'+index" type="radio" :value="word" name="opt" v-model="$magpie.measurements.response"/>{{ word }}<br/>
                    <!-- <label :for="'opt_'+index"> {{ word }}&nbsp</label> -->
                </template>
              </form>
            </template>
          </div>
          
          <button v-if="$magpie.measurements.response" style="transform: translate(-50%, -50%)" @click="toggleDivs(); $magpie.saveAndNextScreen()">
            Next
          </button>
        </Slide>
      </Screen>
    </template>
<Screen>
  <p>1. Which input device are you using for this experiment?</p>
    <MultipleChoiceInput
        :response.sync= "$magpie.measurements.device"
        orientation="horizontal"
        :options="['Computer Mouse', 'Computer Trackpad', 'Other']" />
  <br>
  <br>
  <p>2. Which hand are you using during this experiment?</p>
    <MultipleChoiceInput
        :response.sync= "$magpie.measurements.hand"
        orientation="horizontal"
        :options="['Left', 'Right', 'Both']" />
  <button style= "bottom:30%; transform: translate(-50%, -50%)" @click="$magpie.saveAndNextScreen();">Submit</button>
</Screen>

    <SubmitResultsScreen />
  </Experiment>
</template>

<script>
// Load data from csv files as javascript arrays with objects
import provo_list1 from '../trials/provo_items_list1.tsv';
import provo_list2 from '../trials/provo_items_list2.tsv';
import provo_list3 from '../trials/provo_items_list3.tsv';
import provo_practice from '../trials/provo_items_practice.tsv';
import _ from 'lodash';

export default {
  name: 'App',
  data() {
    const lists = [provo_list1, provo_list2, provo_list3];
    const chosenItems = lists[Math.floor(Math.random() * lists.length)]; // randomly choose one of the lists
    const shuffledItems = _.shuffle(chosenItems); 
    const trials = _.concat(provo_practice, shuffledItems);
    // Create a new column in localCoherences called 'response_options'
    // that concatenates the word in response_true with the two words in response_distractors
    const updatedTrials = trials.map(trial => {
      return {
        ...trial,
        response_options: _.shuffle(`${trial.response_true}|${trial.response_distractors}`.replace(/ ?["]+/g, "").split("|")),
      }
    });
    return {
      isCursorMoving: false,
      trials: updatedTrials,
      currentIndex: null,
      showFirstDiv: true,
      // currentItem: null,
      mousePosition: {
          x: 0,
          y: 0,
        },
  }},
  computed: {
  },
  mounted() { 
    setInterval(this.saveData, 50);
    },
  methods: {
    changeBack() {
      this.$el.querySelector(".oval-cursor").classList.remove('grow');
      this.$el.querySelector(".oval-cursor").classList.remove('blank');
      this.currentIndex = null;
    },
    saveData() {
        if (this.currentIndex !== null) {
          const currentElement = this.$el.querySelector(`span[data-index="${this.currentIndex}"]`);
          if (currentElement) {
            const currentElementRect = currentElement.getBoundingClientRect();
            $magpie.addTrialData({
              Experiment: this.$el.querySelector(".experiment_id").value,
              Condition: this.$el.querySelector(".condition_id").value,
              ItemId: this.$el.querySelector(".item_id").value,
              Index: this.currentIndex,
              Word: currentElement.innerHTML,
              mousePositionX: this.mousePosition.x,
              mousePositionY: this.mousePosition.y,
              wordPositionTop: currentElementRect.top,
              wordPositionLeft: currentElementRect.left,
              wordPositionBottom: currentElementRect.bottom,
              wordPositionRight: currentElementRect.right
              // wordPositionTop: currentElement.offsetTop,
              // wordPositionLeft: currentElement.offsetLeft,
              // wordPositionBottom: currentElement.offsetHeight + currentElement.offsetTop,
              // wordPositionRight: currentElement.offsetWidth + currentElement.offsetLeft
          });
        } else {
          $magpie.addTrialData({
              Experiment: this.$el.querySelector(".experiment_id").value,
              Condition: this.$el.querySelector(".condition_id").value,
              ItemId: this.$el.querySelector(".item_id").value,
              Index: this.currentIndex,
              mousePositionX: this.mousePosition.x,
              mousePositionY: this.mousePosition.y,
          });
          
        }
      }},
    moveCursor(e) {
      this.isCursorMoving = true;
      this.$el.querySelector(".oval-cursor").classList.add('grow');
      let x = e.clientX;
      let y = e.clientY;
      const elementAtCursor= document.elementFromPoint(x, y).closest('span');
      if (elementAtCursor){
        this.$el.querySelector(".oval-cursor").classList.remove('blank');
        this.currentIndex = elementAtCursor.getAttribute('data-index');
      } else {
        this.$el.querySelector(".oval-cursor").classList.add('blank');
        const elementAboveCursor = document.elementFromPoint(x, y-3).closest('span');
        if (elementAboveCursor){
          this.currentIndex = elementAboveCursor.getAttribute('data-index');
        } else {
          this.currentIndex = -1;
        }
      }
      
      this.$el.querySelector(".oval-cursor").style.left = `${x+12}px`;
      this.$el.querySelector(".oval-cursor").style.top = `${y-6}px`;
      this.mousePosition.x = e.clientX;
      this.mousePosition.y = e.clientY;
      // this.mousePosition.x = e.offsetX;
      // this.mousePosition.y = e.offsetY;
    },
    toggleDivs() {
    this.showFirstDiv = !this.showFirstDiv;
    this.isCursorMoving = false;
    },
   //  async turnOnFullScreen() {
//       if (!document.fullscreenElement) {
//         try {
//           await document.documentElement.requestFullscreen();
//           return true;
//         } catch (e) {
//           return false;
//         }
//       }
//       return true;
//     },
//     turnOffFullScreen() {
//       document.exitFullscreen();
//     },
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
    isolation: isolate;
    position: relative;
    width: 100%;
    height: auto;
    font-size: 18px;
    line-height: 40px;
  }
  .debugResults{
    width: 100%;
  }
  .readingText {
    /* z-index: 1; */
    position: absolute;
    color: white;
    text-align: left;
    font-weight: 450;
    cursor: pointer;
    padding-top: 2%;
    padding-bottom: 2%;
    padding-left: 11%;
    padding-right: 11%;
  }
  button {
    position: absolute;
    bottom: 0;
    left: 50%;
  }
  .oval-cursor {
    position: fixed;
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
  .oval-cursor.grow.blank {
    width: 80px;
    height: 13px;
  }
  .oval-cursor.grow {
    width: 102px;
    height: 38px;
    border-radius: 50%;
    box-shadow: 30px 0 8px -4px rgba(255, 255, 255, 0.1), -30px 0 8px -4px rgba(255, 255, 255, 0.1);
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
  .blurry-layer {
    position: absolute;
    pointer-events: none;
    color: black;
    text-align: left;
    font-weight: 450;
    padding-top: 2%;
    padding-bottom: 2%;
    padding-left: 11%;
    padding-right: 11%;
  }

  * {
    user-select: none; /* Standard syntax */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    }
</style>
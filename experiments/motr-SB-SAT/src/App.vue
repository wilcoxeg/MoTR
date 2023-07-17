<!-- MoTR for SB-SAT-->
<!-- 4 passages each followed by 5 Comprehension questions, each question has 4 options, one is correct; 1 extra self-difficulty report -->

  <template>
    <Experiment title="MoTR for SB-SAT courpus ">
  
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
           <b>What am I supposed to do as a participant?</b> If you choose to be in the study, you will use the computer mouse to read sentences in English and answer questions about them.
          <br><br>
            <b>What are my rights during participation?</b> Your participation in this study is voluntary. If you choose to participate, you may change your mind and leave the study at any time by closing the web page without specifying reasons and without any disadvantages.
          <br><br>
            <b>What risks and benefits can I expect?</b> There are no foreseeable risks for participating in this study.
          <br><br>
            <b>Will I be compensated for participating?</b> If you participate you will be compensated for your time following the amount specified on prolific.co.
          <br><br>
            <b>What data is collected from me and how is it used?</b> During this study, we will track the position of your mouse on screen. The data from this study may be presented at scientific conferences and published in scientific journals, as well as in online repositories. All data will remain anonymous.
          <br><br>
            <b> What are my rights to my personal data? </b> You can request information about the personal data collected from you at any time and without giving reasons. You can also request that it be rectified, handed over to you, barred for processing or erased. To do so, please contact the person indicated below.
          <br><br>
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
            <!-- <tr>
  
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
        <p>In this study, you will read 4 passages and answer questions about them. Each passage consists of 5 or 6 short texts.  However, unlike in normal reading, the texts will be blurred. In order to bring the text into focus move your mouse over it. Take as much time to read the text as you need in order to understand it. When you are done reading, please click button at the bottom to move on. Without reading the texts, the button is disabled.</p>
      </InstructionScreen>

      <template v-for="(trial, i) of trials">
        <Screen :key="i" class="main_screen">
          <template v-for="(item, j) of trial">
            <template v-if="item.text">
              <Slide :key="j" class="text_slide">
                <form>
                  <input type="hidden" class="page_id" :value="item.page_id">
                  <input type="hidden" class="book_id" :value="item.book_id">
                </form>
                <div class="oval-cursor"></div>
                <template>
                  <div class="readingText" @mousemove="moveCursor" @mouseleave="changeBack">
                      <div v-for="(para, paraIndex) of item.text.split('@#@')">
                        <template v-for="(word, indx) of para.split(' ')">
                          <span :key="indx" :data-index="`${paraIndex}-${indx}`" >
                          {{ word }}
                          </span>
                        </template>
                      </div>
                  </div>

                  <div class="blurry-layer" style="opacity: 0.45; filter: blur(3px); transition: all 0.3s linear 0s;"> 
                    <!-- {{item.text}} -->
                    <div v-for="(para, index) of item.text.split('@#@')">
                        {{ para }}
                    </div>
                  </div>
                </template>
                <button style= "transform: translate(-50%, -50%)" @click="handleButtonClick" :disabled="!isCursorMoving">
                  {{ item.text.includes('[END]') ? 'Go to Questions' : 'Next Page' }}
                </button>
              </Slide>
            </template>
          </template>

          <template v-for="(item, j) of trial">
            <Slide :key="j" class="question_slide">
                <div class="radio-options">
                <form>
                  <input type="hidden" class="question_id" :value="item.question_id">
                  <!-- comprehension questions and the response options -->
                  <p>{{ item.question.replace(/ ?["]+/g, '') }}</p>
                    <template v-for='(option, index) of [item.answer_1, item.answer_2, item.answer_3, item.answer_4]'>
                      <input :id="'opt_'+index" type="radio" :value="option" name="opt"  v-model="$magpie.measurements.response" />&nbsp&nbsp{{option}}<br/>
                        <!-- <label :for="'opt_'+index"> {{option}}&nbsp</label> -->
                    </template>
                </form>
              </div>
              <button v-if="$magpie.measurements.response"  style="transform: translate(-50%, -50%)" @click="$magpie.saveMeasurements(); $magpie.measurements.response=''; j !== trial.length - 1 ? $magpie.nextSlide() : $magpie.nextScreen()">
                {{ j !== trial.length - 1 ? 'Next Question' : 'Next Passage' }}
              </button>
            </Slide>
          </template>
        </Screen>
      </template>
      <SubmitResultsScreen />
      <Screen :title="'Thanks'"> The study is now complete. Thank you for participating!</Screen>
    </Experiment>
  </template>

<script>
// Load data from csv files as javascript arrays with objects
import dickens from '../trials/dickens.csv';
import flytrap from '../trials/flytrap.csv';
import genome from '../trials/genome.csv';
import northpole from '../trials/northpole.csv';
import _ from 'lodash';

export default {
  name: 'App',
  data() {
    const combined_trials = [dickens, flytrap, genome, northpole];
    const shuffled_trials = _.shuffle(combined_trials); 

    return {
      isCursorMoving: false,
      trials: shuffled_trials,
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
    changeBack() {
      this.$el.querySelector(".oval-cursor").classList.remove('grow');
      this.$el.querySelector(".oval-cursor").classList.remove('blank');
      this.currentIndex = null;
    },
    saveData() {
        if (this.currentIndex !== null) {
          // console.log('saving!')
          const currentElement = this.$el.querySelector(`span[data-index="${this.currentIndex}"]`);
          if (currentElement) {
            // console.log('self', currentElement);
            // console.log('book', this.$el.querySelector(".book_id").value);
            // console.log('page', this.$el.querySelector(".page_id").value);
            // console.log('Index', this.currentIndex);
            // console.log('word', currentElement.innerHTML);

            $magpie.addTrialData({
              Book: this.$el.querySelector(".book_id").value,
              Page: this.$el.querySelector(".page_id").value,
              Index: this.currentIndex,
              Word: currentElement.innerHTML,
              mousePositionX: this.mousePosition.x,
              mousePositionY: this.mousePosition.y,
              wordPositionTop: currentElement.offsetTop,
              wordPositionLeft: currentElement.offsetLeft,
              wordPositionBottom: currentElement.offsetHeight + currentElement.offsetTop,
              wordPositionRight: currentElement.offsetWidth + currentElement.offsetLeft
          });
        } else {
          $magpie.addTrialData({
              Book: this.$el.querySelector(".book_id").value,
              Page: this.$el.querySelector(".page_id").value,
              Index: this.currentIndex,
              mousePositionX: this.mousePosition.x,
              mousePositionY: this.mousePosition.y,
          });
          
        }
      }},
    moveCursor(e) {
      this.isCursorMoving = true;
      this.$el.querySelector(".oval-cursor").classList.add('grow');
      const slideElement = e.currentTarget.closest('.text_slide');
      const slideRect = slideElement.getBoundingClientRect();

      this.mousePosition.x = e.clientX - slideRect.left;
      this.mousePosition.y = e.clientY - slideRect.top;

      let x = e.clientX;
      let y = e.clientY;
      const elementAtCursor= document.elementFromPoint(x, y).closest('span');
      if (elementAtCursor){
        this.$el.querySelector(".oval-cursor").classList.remove('blank');
        this.currentIndex = elementAtCursor.getAttribute('data-index');
      } else {
        this.$el.querySelector(".oval-cursor").classList.add('blank');
        const elementAboveCursor = document.elementFromPoint(x, y-10).closest('span');
        if (elementAboveCursor){
          this.currentIndex = elementAboveCursor.getAttribute('data-index');
        } else {
          this.currentIndex = -1;
        }
      }
      
      this.$el.querySelector(".oval-cursor").style.left = `${x+12}px`;
      this.$el.querySelector(".oval-cursor").style.top = `${y-6}px`;
    },

    handleButtonClick() {
      // Perform actions in the specified order
      $magpie.nextSlide();
      this.isCursorMoving = false;
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
    padding-left: 8%;
    padding-right: 8%;
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
    height: 38px;
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
    padding-left: 8%;
    padding-right: 8%;
  }

  .radio-options {
  text-align: left;
  padding-left: 8%;
  }
</style>
<template>
  <Experiment title="magpie3-iterated-guessing">
    <InstructionScreen :title="'Welcome'">
      In this experiment you will be asked to guess quantities of everyday events or acts.
      This can sometimes be difficult.
      This is why each trial shows the answer of the previous participant in this experiment for the same question.
      You can use this value for orientation, but you should give your own best guess.
    </InstructionScreen>
    
    <!-- <Wait :time="0" @done="prepareData();$magpie.nextScreen()" /> -->

    <template v-for="(trial, i) in testTrials">
      <Screen :key="i" >
      
          <div id="container" @mousemove="revealText">
            <div id="overlay"></div>
            <p style="position:absolute; left:10px; top:10px; text-align:left; color:black"> {{trial.item_content}}</p>
          </div>

          <button style="z-index:2; position:relative;" @click="$magpie.saveAndNextScreen(); startMT=false">
            Next
          </button>

          <Record :data="{
                item_id   : trial.item_id,
              }" />

    </Screen>
    </template>

    <!-- <PostTestScreen /> -->

    <!-- <SubmitResultsScreen /> -->
    <DebugResultsScreen />
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
      leftPosition: 0,
      topPosition: 0,
      overlayHalfWidth: 0,
      isBlurred: true,
      startMT:false,
    };
  },

  mounted: function () {
  window.setInterval(() => {this.getMT()}, 1000) //number of milliseconds
  }, 

  methods: {
    // prepareData: function(){

    //   var variant = this.$magpie.socket.variant
    //   this.guessingTrials = _.shuffle(_.filter(this.guessingTrials, {'variant' : variant}))
    //   $magpie.mousetracking.start()
    // },
    revealText: function(e){
      this.startMT = true;
      const overlay = document.getElementById('overlay');
      const container = document.getElementById('container');
      const experiment = document.getElementsByClassName('experiment')[0]
      const screen = document.getElementsByClassName('screen')[0]
      this.overlayHalfWidth = overlay.clientWidth / 2;
      this.leftPosition = e.pageX - experiment.offsetLeft - screen.offsetLeft - container.offsetLeft;
      this.topPosition = e.pageY - experiment.offsetTop- screen.offsetTop -container.offsetTop;
      // overlay.style.left = this.leftPosition - this.overlayHalfWidth + 'px';
      // overlay.style.top = this.topPosition - this.overlayHalfWidth + 'px';
      overlay.style.left = this.leftPosition - this.overlayHalfWidth + 'px';
      overlay.style.top = this.topPosition - this.overlayHalfWidth/120*50 + 'px';
    },

    getMT(){
      const mt = $magpie.mousetracking.getMouseTrack(1);
      if(this.startMT){
        console.log(mt['mt_x'][mt['mt_x'].length -1]);
        $magpie.addTrialData({mt_x:mt['mt_x'][mt['mt_x'].length -1], mt_y:mt['mt_y'][mt['mt_y'].length -1]});
      }
    },
  }
};
</script>

<style>
  body{
    /* margin: 0; */
    background-color: white;
  }
  #container {
    width: 900px;
    height: 500px;
    background-color: rgba(255,255,255,0.8);
    /* background-image: url('../public/images/1.jpg'); */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  #overlay{
    position: absolute;
    z-index: 1;
    width: 120px;
    height: 40px;
    border-radius: 40%;
    box-shadow: 0 0 0 100vw rgba(255,255,255,0.95);
    background: white;
    transition: background 0.2s;
  }
  #container:hover #overlay{
    background: transparent;
  }
</style>
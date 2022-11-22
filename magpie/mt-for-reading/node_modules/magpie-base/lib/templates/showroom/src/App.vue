<template>
  <Experiment title="magpie demo">
    <InstructionScreen :title="'Welcome'">
      This is a sample introduction screen.
      <br />
      <br />
      This screen welcomes the participant and gives general information about
      the experiment.
      <br />
      <br />
      This mock up experiment is a showcase of the functionality of magpie.
    </InstructionScreen>

    <InstructionScreen :title="'General Instructions'">
      This is a sample instructions view.
      <br />
      <br />
      First you will go through two practice trials. The practice trial view
      uses magpie's forced choice trial input.
    </InstructionScreen>

    <!-- Here we create screens in a loop for every entry in forced_choice -->
    <template v-for="(forced_choice_task, i) of forced_choice">
      <ForcedChoiceScreen
        :key="'forcedchoice-' + i"
        :progress="i / forced_choice.length"
        :question="forced_choice_task.question"
        :options="[forced_choice_task.option1, forced_choice_task.option2]"
      >
        <template #stimulus>
          <img :src="forced_choice_task.picture" />
        </template>
      </ForcedChoiceScreen>
    </template>

    <template v-for="(dropdown_task, i) in multi_dropdown">
      <CompletionScreen
        :key="'multidropdown-' + i"
        :progress="i / multi_dropdown.length"
        :text="
          dropdown_task.sentence_chunk_1 +
          ' %s ' +
          dropdown_task.sentence_chunk_2 +
          ' %s ' +
          dropdown_task.sentence_chunk_3
        "
        :options="[
          dropdown_task.choice_options_1.split('|'),
          dropdown_task.choice_options_2.split('|')
        ]"
      />
    </template>

    <template v-for="i in range(0, sentenceChoice.length, 2)">
      <template v-for="(sentenceChoice_task, j) in sentenceChoice.slice(i, 2)">
        <ForcedChoiceScreen
          :key="'sentenceChoice-' + i + '' + j"
          :question="sentenceChoice_task.question"
          :options="[sentenceChoice_task.option1, sentenceChoice_task.option2]"
        >
          <template #stimulus>
            <img :src="sentenceChoice_task.picture" />
          </template>
        </ForcedChoiceScreen>
      </template>
      <template v-for="(imageSelection_task, j) in imageSelection.slice(i, 2)">
        <ImageSelectionScreen
          :key="'sentenceChoice-' + i + '' + j"
          :question="imageSelection_task.question"
          :options="[
            {
              label: imageSelection_task.option1,
              src: imageSelection_task.picture1
            },
            {
              label: imageSelection_task.option2,
              src: imageSelection_task.picture2
            }
          ]"
        />
      </template>
    </template>

    <template v-for="(rating_task, i) in sliderRating">
      <SliderScreen
        :key="'sliderRating-' + i"
        :pause-time="500"
        :stimulus-time="1500"
        :question="rating_task.question"
        :option-left="rating_task.optionLeft"
        :option-right="rating_task.optionRight"
      >
        <template #stimulus>
          <img :src="rating_task.picture" alt="" />
        </template>
      </SliderScreen>
    </template>

    <!--

      Comment this in, to try out interactive components like the Chat component.

      <ConnectInteractiveScreen />

      <Screen>
          <Chat :messages.sync="$magpie.measurements.messages"></Chat>
          <button @click="$magpie.saveAndNextScreen()">Next</button>
      </Screen>

      -->

    <PostTestScreen />

    <!-- While developing your experiment, when debug mode is enabled in the magpie config, this will display the results directly on screen
       once you set your experiment to a different mode, this screen will send the data to the server you configured. -->
    <SubmitResultsScreen />
  </Experiment>
</template>

<script>
// Load data from csv files as javascript arrays with objects
import forced_choice from '../trials/forced_choice.csv';
import multi_dropdown from '../trials/multi_dropdown.csv';
import sentenceChoice from '../trials/sentence_choice.csv';
import _ from 'lodash';

export default {
  name: 'App',
  data() {
    return {
      forced_choice,
      multi_dropdown,
      sentenceChoice,
      imageSelection: _.shuffle(imageSelection),
      sliderRating,

      // Expose lodash.range to template above
      range: _.range
    };
  }
};

const imageSelection = [
  {
    QUD: 'image selection - loop: 1, trial: 1',
    question: 'How are you today?',
    option1: 'fine',
    picture1: 'images/question_mark_02.png',
    option2: 'great',
    picture2: 'images/question_mark_01.png'
  },
  {
    QUD: 'image selection - loop: 1, trial: 2',
    option1: 'shiny',
    picture1: 'images/question_mark_03.jpg',
    option2: 'rainbow',
    picture2: 'images/question_mark_04.png'
  },
  {
    QUD: 'image selection - loop: 2, trial: 1',
    question: 'How are you today?',
    option1: 'fine',
    picture1: 'images/question_mark_03.jpg',
    option2: 'great',
    picture2: 'images/question_mark_01.png'
  },
  {
    QUD: 'image selection - loop: 2, trial: 2',
    option1: 'shiny',
    picture1: 'images/question_mark_02.png',
    option2: 'rainbow',
    picture2: 'images/question_mark_04.png'
  }
];

const sliderRating = [
  {
    picture: 'images/question_mark_02.png',
    question: 'How are you today?',
    optionLeft: 'fine',
    optionRight: 'great'
  },
  {
    picture: 'images/question_mark_01.png',
    question: "What's the weather like?",
    optionLeft: 'shiny',
    optionRight: 'rainbow'
  },
  {
    QUD: 'Here is a sentence that stays on the screen from the very beginning',
    picture: 'images/question_mark_03.jpg',
    question: "What's on the bread?",
    optionLeft: 'ham',
    optionRight: 'jam'
  }
];
</script>

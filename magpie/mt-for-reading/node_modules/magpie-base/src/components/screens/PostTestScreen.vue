<docs>
```vue
<Experiment>
    <PostTestScreen />

    <DebugResultsScreen />

</Experiment>
```
</docs>

<template>
  <Screen v-bind="{ ...$attrs, ...$props }" title="Additional information">
    <Slide>
      <p>
        {{ $t('screens.PostTestScreen.instruction') }}
      </p>
      <div style="text-align: left; width: 200px; margin: 0 auto">
        <p v-if="age">
          <label
            >{{ $t('screens.PostTestScreen.age') }}
            <input
              v-model="$magpie.measurements.age"
              type="number"
              max="110"
              min="18"
          /></label>
        </p>
        <p v-if="gender">
          <label
            >{{ $t('screens.PostTestScreen.gender') }}
            <DropdownInput
              :options="[
                '',
                $t('screens.PostTestScreen.male'),
                $t('screens.PostTestScreen.female'),
                $t('screens.PostTestScreen.otherGender')
              ]"
              :response.sync="$magpie.measurements.gender"
            />
          </label>
        </p>
        <p v-if="education">
          <label
            >{{ $t('screens.PostTestScreen.education') }}
            <DropdownInput
              :options="[
                '',
                $t('screens.PostTestScreen.educationBelowHighschool'),
                $t('screens.PostTestScreen.educationHighschool'),
                $t('screens.PostTestScreen.educationCollege'),
                $t('screens.PostTestScreen.educationHigher')
              ]"
              :response.sync="$magpie.measurements.education"
            />
          </label>
        </p>
        <p v-if="languages">
          <label
            >{{ $t('screens.PostTestScreen.nativeLanguages') }}
            <input
              v-model="$magpie.measurements.languages"
              type="text"
              :placeholder="
                $t('screens.PostTestScreen.nativeLanguagesExplanation')
              "
              :title="$t('screens.PostTestScreen.nativeLanguagesExplanation')"
          /></label>
        </p>
        <!-- @slot You can add additional questions here, storing data in measurements
           @binding {object} measurements a temporary object to store your responses before adding them to the results
           -->
        <slot :measurements="$magpie.measurements" />
        {{ $t('screens.PostTestScreen.comments') }}
        <TextareaInput
          :response.sync="$magpie.measurements.comments"
        ></TextareaInput>
      </div>

      <button
        @click="
          $magpie.addExpData($magpie.measurements);
          $magpie.nextScreen();
        "
      >
        {{ $t('general.nextButton') }}
      </button>
    </Slide>
  </Screen>
</template>

<script>
import Screen from '../Screen';
import TextareaInput from '../inputs/TextareaInput';
import DropdownInput from '../inputs/DropdownInput';
import Slide from '../Slide';

/**
 * **Global Measurements**
 *
 * |Measurement|Type|Description|
 * |--|---|---|
 * |age|int||
 * |gender|'' \| 'male' \| 'female' \| 'other'||
 * |education|'' \| 'below highschool' \| 'highschool' \| 'college' \| 'higher'||
 * |languages|string||
 * |comments|string||
 */
export default {
  name: 'PostTestScreen',
  components: {
    Slide,
    DropdownInput,
    TextareaInput,
    Screen
  },
  props: {
    /**
     * Whether to ask for participant age
     */
    age: {
      type: Boolean,
      default: true
    },
    /**
     * Whether to ask for participant gender
     */
    gender: {
      type: Boolean,
      default: true
    },
    /**
     * Whether to ask for participant education
     */
    education: {
      type: Boolean,
      default: true
    },
    /**
     * Whether to ask for participant mother tongues
     */
    languages: {
      type: Boolean,
      default: true
    },
    /**
     * Whether to ask for comments
     */
    comments: {
      type: Boolean,
      default: true
    }
  }
};
</script>
<style scoped></style>

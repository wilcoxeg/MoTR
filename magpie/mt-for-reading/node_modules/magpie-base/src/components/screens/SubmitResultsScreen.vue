<docs>
Use this screen at the end of your experiment to submit the data to the server.
You can provide the submission URL to the Experiment component.
</docs>

<template>
  <Screen v-if="!$magpie.debug" title="Submitting">
    <Slide>
      <p>{{ $t('screens.SubmitResultsScreen.waiting') }}</p>
      <Wait :time="0" @done="submit(() => $magpie.nextSlide())" />
    </Slide>
    <Slide>
      <p v-if="!error">
        {{ $t('screens.SubmitResultsScreen.done') }}
        <Wait :time="3000" @done="redirectToCompletionUrl" />
      </p>
      <div v-else>
        <p>{{ $t('screens.SubmitResultsScreen.error') }}</p>
        <p>
          {{ $t('screens.SubmitResultsScreen.contact') }}
          <a :href="'mailto:' + $magpie.contactEmail">{{
            $magpie.contactEmail
          }}</a
          >.
        </p>
        <p v-text="error" />
      </div>
    </Slide>
  </Screen>
  <DebugResultsScreen v-else />
</template>

<script>
import Screen from '../Screen';
import Wait from '../helpers/Wait';
import DebugResultsScreen from './DebugResultsScreen';
import Slide from '../Slide';
export default {
  name: 'SubmitResultsScreen',
  components: { Slide, DebugResultsScreen, Wait, Screen },
  props: {},
  data() {
    return {
      error: null
    };
  },
  methods: {
    async submit(cb) {
      try {
        await this.$magpie.submit();
        cb();
      } catch (err) {
        this.error = err.message;
        cb();
      }
    },
    redirectToCompletionUrl() {
      if (this.$magpie.completionUrl && this.$magpie.mode === 'prolific') {
        window.location = this.$magpie.completionUrl;
      }
    }
  }
};
</script>

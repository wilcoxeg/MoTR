<template>
  <Experiment title="magpie demo">
    <InstructionScreen :title="'Welcome'">
      This is a sample introduction screen.
    </InstructionScreen>

    <SubmitResultsScreen />
  </Experiment>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'App',
  data() {
    return {};
  },
  computed: {
    // Expose lodash to template code
    _() {
      return _;
    }
  }
};
</script>

<docs>
```vue
<Experiment>
    <Screen>

      <Slide>
        <p>Please order the following foods with regards to their healthiness.</p>
        <RankOrderInput
            :options="['Fries', 'Vegetable soup', 'Salad', 'Burger', 'Risotto']"
            :response.sync= "$magpie.measurements.order" />
        <button @click="$magpie.saveAndNextScreen()">Submit</button>
      </Slide>

    </Screen>

    <DebugResultsScreen />

</Experiment>
```
</docs>

<template>
  <div class="rankorder-input">
    <draggable v-model="list">
      <div v-for="(option, i) in list" :key="i" class="item">
        <span class="pill">{{ i + 1 }}</span
        >{{ option }}
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

/**
 * Have your participants rank a list of options
 */
export default {
  name: 'RankOrderInput',
  components: { draggable },
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      list: this.options
    };
  },
  watch: {
    list() {
      this.$emit('update:response', this.list);
    }
  }
};
</script>

<style scoped>
.rankorder-input {
  width: 500px;
  text-align: left;
  margin: 0 auto;
}

.rankorder-input .item {
  cursor: move;
  margin-bottom: 10px;
}

.pill {
  background: lightblue;
  border-radius: 10px;
  display: inline-block;
  padding: 0 3px;
  margin-right: 10px;
}
</style>

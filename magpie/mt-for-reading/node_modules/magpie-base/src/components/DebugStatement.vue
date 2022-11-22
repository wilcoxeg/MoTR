<template>
  <div class="debug-statement">
    <h2>magpie {{ type }}</h2>
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'DebugStatement',
  props: {
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info'
    }
  }
};
</script>

<style scoped>
.debug-statement {
  border: #aa2935 2px solid;
  border-radius: 4px;
  color: #aa2935;
  text-align: left;
  padding: 15px;
  position: fixed;
  bottom: 10px;
  width: 830px;
}

.debug-statement,
.debug-statement * {
  color: #aa2935;
}
</style>

<docs>
Magpie has built-in support for creating visual stimuli on the fly via [Konva.js](https://konvajs.org/docs/overview.html).

Konva Components are prefixed with `Canvas`, so `Konva.Circle` becomes `CanvasCircle` in magpie. Learn more about [using Konva.js in Vue](https://konvajs.org/docs/vue/index.html).

### Drawing simple shapes
```vue
<Experiment>
    <Screen title="Some drawing exercises">
      <CanvasStage :config="{width: 700, height: 500}">
        <CanvasLayer>
          <CanvasCircle :config="{
            x: 100,
            y: 100,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 2}"></CanvasCircle>
          <CanvasRect :config="{
            x: 230,
            y: 30,
            width: 140,
            height: 140,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 2
            }"></CanvasRect>
          <CanvasStar :config="{
            x: 500,
            y: 100,
            numPoints: 7,
            outerRadius: 70,
            innerRadius: 40,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 2
            }"></CanvasStar>
        </CanvasLayer>
      </CanvasStage>
    </Screen>

</Experiment>
```

</docs>

<template><div /></template>

<script>
// Dummy component to document vue-konva canvas components
export default {
  name: 'Canvas'
};
</script>

<style scoped></style>

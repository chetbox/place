<template>
  <div id="app">
    <Palette @color="penColor = $event" />
    <Canvas :penColor="penColor" />
    <About />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Palette from './components/Palette.vue';
import Canvas from './components/Canvas.vue';
import About from './components/About.vue';
import { Color } from './model/colors';

@Component({
  components: {
    Palette,
    Canvas,
    About,
  },
})
export default class App extends Vue {
  private penColor: Color = 0;
}
</script>

<style>
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  margin: 0;
}

#app {
  font-family: 'Helvetica', sans-serif;
  font-weight: 100;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 100%;
}

#app > * {
  margin-left: 32px;
  margin-right: 32px;
}

.instruction {
  margin-top: 32px;
}

.color {
  background-color: transparent;
}
.color.color-0 {
  background-color: #FFFFFF;
}
.color.color-1 {
  background-color: #E4E4E4;
}
.color.color-2 {
  background-color: #888888;
}
.color.color-3 {
  background-color: #222222;
}
.color.color-4 {
  background-color: #FFA7D1;
}
.color.color-5 {
  background-color: #E50000;
}
.color.color-6 {
  background-color: #E59500;
}
.color.color-7 {
  background-color: #A06A42;
}
.color.color-8 {
  background-color: #E5D900;
}
.color.color-9 {
  background-color: #94E044;
}
.color.color-A {
  background-color: #02BE01;
}
.color.color-B {
  background-color: #00D3DD;
}
.color.color-C {
  background-color: #0083C7;
}
.color.color-D {
  background-color: #0000EA;
}
.color.color-E {
  background-color: #CF6EE4;
}
.color.color-F {
  background-color: #820080;
}

</style>

<template>
  <div>
    <div id="palette">
      <span
        v-for="color in colors"
        :key="color"
        @click="colorSelected(color)"
        :class="[isSelected(color) && 'selected', 'color', colorClass(color)]"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';
import { Color, colorClass } from '../model/colors';

@Component
export default class Palette extends Vue {

  private colors = [...Array(16).keys()];

  private selected = {
    color: 1,
  };

  private colorClass = colorClass;

  @Emit('color')
  public colorSelected(color: Color): Color {
    this.selected.color = color;
    return color;
  }

  protected mounted() {
    this.colorSelected(this.selected.color);
  }

  private isSelected(color: Color): boolean {
    return color === this.selected.color;
  }

}
</script>

<style scoped>
#palette {
  border: 1px solid #ddd;
  display: table;
  border-collapse: separate;
}
.color {
  display: table-cell;
  width: 7.5vw;
  height: 7.5vw;
  cursor: pointer;
  transition: transform 200ms, box-shadow 200ms;
}
.color.selected {
  box-shadow: 0 0 6px #777;
  transform: scale(1.25);
}
</style>

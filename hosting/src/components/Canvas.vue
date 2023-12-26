<template>
  <div id="canvas">
    <p class="instruction">Click a pixel to change its color</p>
    <table>
      <tbody>
          <tr
            v-for="(row, rowIndex) in data.canvas"
            :key="rowIndex">
            <td
              v-for="(cellColor, columnIndex) in row"
              :key="columnIndex"
              @click="setPixelColor(rowIndex, columnIndex, penColor)"
              :class="['color', colorClass(cellColor)]"></td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Color, colorClass } from '../model/colors';
import { toGrid, emptyGrid } from '../model/canvas';
import database from '../database';

@Component
export default class Canvas extends Vue {

  @Prop()
  public penColor: Color = 0;

  public data = {
    canvasDepth: 1,
    canvas: [] as Array<Array<number|undefined>>,
  };

  public colorClass = colorClass;

  private canvasId = 'the-one-and-only';
  private placeRef = database.ref('canvas').child(this.canvasId);

  protected mounted() {
    this.placeRef.on('value', this.onCanvasUpdated);
  }

  protected destroyed() {
    this.placeRef.off('value', this.onCanvasUpdated);
  }

  private onCanvasUpdated(snapshot: firebase.default.database.DataSnapshot) {
    if (!snapshot.exists()) {
      console.warn('Canvas does not exist', this.canvasId);
      return;
    }

    this.data.canvasDepth = snapshot.val().depth;
    this.data.canvas = toGrid<number>(snapshot.val().canvas, emptyGrid(Math.pow(2, this.data.canvasDepth)));
  }

  public setPixelColor(row: number, column: number, color: Color) {
    const xOffsets = row.toString(2).padStart(this.data.canvasDepth, '0');
    const yOffsets = column.toString(2).padStart(this.data.canvasDepth, '0');
    let pixelRef = this.placeRef.child('canvas');
    for (let i = 0; i < this.data.canvasDepth; i++) {
      pixelRef = pixelRef.child(xOffsets[i] + yOffsets[i]);
    }
    pixelRef.set(color);
  }

}
</script>

<style scoped>
table {
  border: 1px solid #ddd;
  border-collapse: collapse;
  overflow: auto;
  table-layout: fixed;
  width: max-content;
  margin: 0;
}
table td {
  height: 10px;
  width: 10px;
  border-color: transparent;
  cursor: pointer;
  transition: transform 200ms, box-shadow 200ms;
}
table td:hover {
  transform: scale(1.5);
  box-shadow: 0 0 6px #777;
}
</style>

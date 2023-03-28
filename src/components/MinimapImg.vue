<template>
  <canvas
    id="minimap"
    v-bind:width="canvasSquareSideLength.px"
    v-bind:height="canvasSquareSideLength.px"
    v-on:mousedown="setActiveWeapon"
    v-on:mousemove="transform"
    v-on:mouseup="clearActiveWeapon"
    v-on:mouseout="clearActiveWeapon"
  ></canvas>
</template>

<script setup lang="ts">
import { computed, watch, ref, inject, type InjectionKey, provide } from "vue";
import type { Ref } from "vue";
import { Length, Coordinates } from "@/units";
import { selectedMapKey } from "./SelectMap.vue";
import type { Weapon } from "@/weapons/weapon";

// サイズ決め定数
const originalXStart = 562; // sx             (元画像の切り抜き始点X)
const originalYStart = 78; // sy             (元画像の切り抜き始点Y)
const originalSquareSideLength = 925; // sWidth,sHeight (元画像の切り抜きサイズ：横幅、高さ)
const canvasXStart = 0; // dx          (Canvasの描画開始位置X)
const canvasYStart = 0; // dy          (Canvasの描画開始位置Y)
/** Canvasの描画サイズdWidth,dHeight
 * 画面の幅と高さの小さい方
 */
const canvasSquareSideLength = computed((): Length => {
  return Length.byPixel(
    Math.min(window.innerWidth * 0.9, window.innerHeight * 0.7)
  );
});
const canvas = computed((): HTMLCanvasElement | null => {
  const canvas = document.getElementById("minimap");
  if (!(canvas instanceof HTMLCanvasElement)) return null;
  return canvas;
});
const context = computed((): CanvasRenderingContext2D | null => {
  if (canvas.value === null) return null;
  return canvas.value.getContext("2d");
});
const weapons: Weapon[] = [];
const activeWeapon: Ref<Weapon | null> = ref(null);

const setActiveWeapon = (event: MouseEvent): void => {
  if (canvas.value === null) return;
  if (context.value === null) return;
  const rect = canvas.value.getBoundingClientRect();
  const point = new Coordinates(
    Length.byPixel(event.clientX - rect.left),
    Length.byPixel(event.clientY - rect.top)
  );
  for (const weapon of [...weapons].reverse()) {
    if (weapon.isClicked(context.value, point)) {
      activeWeapon.value = weapon;
      break;
    }
  }
};
const transform = (event: MouseEvent): void => {
  if (activeWeapon.value === null) return;
  if (canvas.value === null) return;
  if (context.value === null) return;
  const rect = canvas.value.getBoundingClientRect();
  const point = new Coordinates(
    Length.byPixel(event.clientX - rect.left),
    Length.byPixel(event.clientY - rect.top)
  );
  activeWeapon.value.transform(context.value, point);
  draw();
};

const clearActiveWeapon = (): void => {
  activeWeapon.value = null;
};

const selectedMap = inject(selectedMapKey);

const draw = (): void => {
  if (context.value === null) return;
  context.value.clearRect(
    0,
    0,
    canvasSquareSideLength.value.px,
    canvasSquareSideLength.value.px
  );
  if (selectedMap !== undefined) {
    selectedMap.draw(context.value, canvasSquareSideLength.value);
  }
  for (const weapon of weapons) {
    weapon.draw(context.value);
  }
};
provide(drawKey, draw);
setTimeout(draw, 1000);
// selectedMap.onload = draw;
// watch(selectedMap, draw);
</script>
<script lang="ts">
export const drawKey: InjectionKey<() => void> = Symbol();
</script>

<template>
  <canvas
    id="minimap"
    v-bind:width="canvasSquareSideLength.pixel"
    v-bind:height="canvasSquareSideLength.pixel"
    v-on:mousedown="setActiveWeapon"
    v-on:mousemove="transform"
    v-on:mouseup="clearActiveWeapon"
    v-on:mouseout="clearActiveWeapon"
  ></canvas>
</template>

<script setup lang="ts">
import { WeaponOnMinimap, Coordinates } from "@/weapons/weapon-on-minimap";
import { computed, watch, ref, inject, type InjectionKey, provide } from "vue";
import type { Ref } from "vue";
import { Length } from "@/units";
import { selectedMapKey } from "./SelectMap.vue";

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
const weapons: WeaponOnMinimap[] = [];
const activeWeapon: Ref<WeaponOnMinimap | null> = ref(null);

// TODO: setActiveWeaponとtransformのガード節消したい
// nullじゃなくて例外にするのどうか調べてみる
const setActiveWeapon = (event: MouseEvent): void => {
  const canvas = document.getElementById("minimap");
  if (!(canvas instanceof HTMLCanvasElement)) {
    return;
  }
  const ctx = getMapCanvasContext();
  if (ctx === null) {
    return;
  }
  const rect = canvas.getBoundingClientRect();
  const point = new Coordinates(
    Length.byPixel(event.clientX - rect.left),
    Length.byPixel(event.clientY - rect.top)
  );
  for (const weapon of [...weapons].reverse()) {
    if (weapon.isClicked(ctx, point)) {
      activeWeapon.value = weapon;
      break;
    }
  }
};
const transform = (event: MouseEvent): void => {
  if (activeWeapon.value == null) return;
  const canvas = document.getElementById("minimap");
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const ctx = getMapCanvasContext();
  if (ctx === null) return;
  const rect = canvas.getBoundingClientRect();
  const point = new Coordinates(
    Length.byPixel(event.clientX - rect.left),
    Length.byPixel(event.clientY - rect.top)
  );
  activeWeapon.value.transform(ctx, point);
  draw();
};

const clearActiveWeapon = (): void => {
  activeWeapon.value = null;
};

const getMapCanvasContext = (): CanvasRenderingContext2D | null => {
  const canvas = document.getElementById("minimap");
  if (!(canvas instanceof HTMLCanvasElement)) {
    return null;
  }
  return canvas.getContext("2d");
};

const selectedMap = inject(selectedMapKey);

const draw = (): void => {
  const ctx = getMapCanvasContext();
  if (ctx === null) return;
  ctx.clearRect(
    0,
    0,
    canvasSquareSideLength.value.pixel,
    canvasSquareSideLength.value.pixel
  );
  if (selectedMap !== undefined) {
    selectedMap.draw(ctx, canvasSquareSideLength.value);
  }
  for (const weapon of weapons) {
    weapon.draw(ctx);
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

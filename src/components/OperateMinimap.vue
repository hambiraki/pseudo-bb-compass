<template>
  <canvas
    id="minimap"
    v-bind:width="canvasSide.px"
    v-bind:height="canvasSide.px"
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
import type { Weapon } from "@/weapons/weapon";

/**
 * Canvasの描画サイズdWidth,dHeight
 * 画面の幅と高さの小さい方
 */
const canvasSide = computed((): Length => {
  const pxSide = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.7);
  return Length.byPixel(pxSide);
});
const getContext = (): CanvasRenderingContext2D | null => {
  const canvas = document.getElementById("minimap");
  if (!(canvas instanceof HTMLCanvasElement)) return null;
  return canvas.getContext("2d"); // getContext("webgl")だとこれもnull
};
const getCanvasRect = () => {
  const canvas = document.getElementById("minimap");
  if (!(canvas instanceof HTMLCanvasElement)) return null;
  return canvas.getBoundingClientRect();
};

const weapons: Weapon[] = [];
const activeWeapon: Ref<Weapon | null> = ref(null);

const setActiveWeapon = (event: MouseEvent): void => {
  const context = getContext();
  const rect = getCanvasRect();
  if (context === null) return;
  if (rect === null) return;
  const point = new Coordinates(
    Length.byPixel(event.clientX - rect.left),
    Length.byPixel(event.clientY - rect.top)
  );
  for (const weapon of [...weapons].reverse()) {
    if (!weapon.isClicked(context, point)) continue;
    activeWeapon.value = weapon;
    break;
  }
};

const transform = (event: MouseEvent): void => {
  if (activeWeapon.value === null) return;
  const context = getContext();
  const rect = getCanvasRect();
  if (context === null) return;
  if (rect === null) return;
  const point = new Coordinates(
    Length.byPixel(event.clientX - rect.left),
    Length.byPixel(event.clientY - rect.top)
  );
  activeWeapon.value.transform(context, point);
};

const clearActiveWeapon = (): void => {
  activeWeapon.value = null;
};

const draw = (): void => {
  const context = getContext();
  if (context === null) return;
  context.clearRect(0, 0, canvasSide.value.px, canvasSide.value.px);
  if (selectedMap !== null && selectedMap !== undefined) {
    console.log("selectedMap is defined.");
    selectedMap.draw(context.value, canvasSquareSideLength.value);
  }
  console.log("good afternoon");
  for (const weapon of weapons) {
    weapon.draw(context.value);
  }
};

watch(activeWeapon, draw);
</script>

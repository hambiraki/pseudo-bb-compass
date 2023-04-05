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
import { computed, watch, ref, onMounted, shallowRef } from "vue";
import type { Ref } from "vue";
import { Length } from "@/units";
import type { Weapon } from "@/weapons/weapon";
import { WeaponOnMinimap } from "@/active-weapon";
import type { Minimap } from "@/minimaps";

/**
 * Canvasの描画サイズdWidth,dHeight
 * 画面の幅と高さの小さい方
 */
const canvasSide = computed((): Length => {
  const pxSide = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.7);
  return Length.byPixel(pxSide);
});

interface Props {
  minimap: Minimap;
  weapons: Weapon[];
}

const props = defineProps<Props>();

const weapons = ref(props.weapons);

const draw = (): void => {
  console.log("Hello!!!! DRAW!!!!");
  const canvas = document.getElementById("minimap");
  if (!(canvas instanceof HTMLCanvasElement)) return;
  console.log("canvas instanceof HTMLCanvasElement");
  const context = canvas.getContext("2d");
  if (context === null) return;
  console.log("I have the context.");
  context.clearRect(0, 0, canvasSide.value.px, canvasSide.value.px);
  props.minimap.draw(context, canvasSide.value);
  for (const weapon of weapons.value) {
    weapon.draw(context);
  }
};
onMounted(draw);
watch(props, draw);

// ドラッグ処理
const activeWeapon: Ref<WeaponOnMinimap | null> = shallowRef(null);
const setActiveWeapon = (event: MouseEvent): void => {
  const canvas = document.getElementById("minimap");
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const context = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  if (context === null) return; // 先にgetContext("webgl")とかで発生
  if (rect === null) return;
  activeWeapon.value = WeaponOnMinimap.detectClickedWeapon(
    weapons.value,
    event,
    context,
    rect
  );
};
const transform = (event: MouseEvent): void => {
  if (activeWeapon.value === null) return;
  activeWeapon.value.transform(event);
};
const clearActiveWeapon = (): void => {
  activeWeapon.value = null;
};
</script>

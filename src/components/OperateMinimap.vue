<template>
  <canvas
    ref="minimapCanvas"
    v-bind:width="pxCanvasSide"
    v-bind:height="pxCanvasSide"
    v-on:mousedown="setActiveWeapon"
    v-on:mousemove="transform"
    v-on:mouseup="clearActiveWeapon"
    v-on:mouseout="clearActiveWeapon"
  ></canvas>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, shallowReactive, watch } from "vue";
import type { Weapon } from "@/weapon/weapon";
import { Length } from "@/units";
import type { Minimap } from "@/minimaps";
import { UpdatingWeapons } from "@/weapon/active-weapon";

const minimapCanvas = ref<HTMLCanvasElement>();
// ウィンドウ幅変更時に変動(それ以外は定数)
const pxCanvasSide = computed((): number => {
  return Math.min(window.innerWidth * 0.9, window.innerHeight * 0.7);
});

interface Props {
  minimap: Minimap;
  weapons: Weapon[];
}
const props = defineProps<Props>();
const weapons = shallowReactive(props.weapons);

const draw = (): void => {
  if (minimapCanvas.value === undefined) return;
  const context = minimapCanvas.value.getContext("2d");
  if (context === null) return;
  const pxSide = Math.max(
    minimapCanvas.value.width,
    minimapCanvas.value.height
  );
  context.clearRect(0, 0, pxSide, pxSide);
  props.minimap.draw(context, Length.byPixel(pxSide));
  for (const weapon of weapons) weapon.draw(context);
};
onMounted(draw);
watch(props, draw);

// ドラッグ処理
const updatingWeapons = ref<UpdatingWeapons | null>(null);
const setActiveWeapon = (event: MouseEvent): void => {
  if (minimapCanvas.value === undefined) return;
  const rect = minimapCanvas.value.getBoundingClientRect();
  const context = minimapCanvas.value.getContext("2d");
  if (context === null) return; // 先にgetContext("webgl")とかで発生
  updatingWeapons.value = UpdatingWeapons.detectClickedWeapon(
    weapons,
    event,
    context,
    rect
  );
};
const transform = (event: MouseEvent): void => {
  if (updatingWeapons.value === null) return;
  updatingWeapons.value = updatingWeapons.value.update(event);
  weapons = updatingWeapons.value.weapons;
};
const clearActiveWeapon = (): void => {
  updatingWeapons.value = null;
};
</script>

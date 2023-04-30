<template>
  <canvas
    ref="minimapCanvas"
    v-bind:width="pxCanvasSide"
    v-bind:height="pxCanvasSide"
    style="touch-action: pinch-zoom"
    v-on:pointerdown="setActiveWeapon"
    v-on:pointermove="transform"
    v-on:pointerup="clearActiveWeapon"
  ></canvas>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { detectClickedWeapon, type ActiveWeapon } from "@/weapon/active-weapon";
import type { Weapon } from "@/weapon/weapon";
import { Length } from "@/units";
import type { Minimap } from "@/minimaps";

const minimapCanvas = ref<HTMLCanvasElement>();
// ウィンドウ幅変更時に変動(それ以外は定数)
const pxCanvasSide = computed((): number => {
  return Math.min(window.innerWidth, window.innerHeight);
});

interface Props {
  minimap: Minimap;
  weapons: Weapon[];
}
const props = defineProps<Props>();
const weapons = reactive(props.weapons);

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
const activeWeapon = ref<ActiveWeapon | null>(null);
const setActiveWeapon = (event: PointerEvent): void => {
  if (minimapCanvas.value === undefined) return;
  const rect = minimapCanvas.value.getBoundingClientRect();
  const context = minimapCanvas.value.getContext("2d");
  if (context === null) return; // 先にgetContext("webgl")とかで発生
  activeWeapon.value = detectClickedWeapon(weapons, event, context, rect);
};
const transform = (event: PointerEvent): void => {
  if (activeWeapon.value === null) return;
  const activeIndex = activeWeapon.value.index;
  activeWeapon.value = activeWeapon.value.transform(event);
  weapons[activeIndex] = activeWeapon.value.weapon;
};
const clearActiveWeapon = (): void => {
  console.log("aaa");

  activeWeapon.value = null;
};
</script>

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
import {
  computed,
  watch,
  ref,
  onMounted,
  shallowRef,
  toRef,
  toRefs,
} from "vue";
import type { Ref } from "vue";
import { Length } from "@/units";
import type { Minimap } from "@/minimaps";
import { WeaponOnMinimap } from "@/weapon/active-weapon";
import type { Weapon } from "@/weapon/weapon";

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
const propsRef = toRefs(props);
const weapons = toRefs(props.weapons);

const draw = (): void => {
  console.log("draw");

  const canvas = document.getElementById("minimap");
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const context = canvas.getContext("2d");
  if (context === null) return;
  context.clearRect(0, 0, canvasSide.value.px, canvasSide.value.px);
  props.minimap.draw(context, canvasSide.value);
  for (const weapon of weapons) {
    console.log(weapon.value);
    weapon.value.draw(context);
  }
};
onMounted(draw);
watch(props, draw);
watch(weapons, draw);

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
  activeWeapon.value = activeWeapon.value.transform(event);
};
const clearActiveWeapon = (): void => {
  activeWeapon.value = null;
};
</script>

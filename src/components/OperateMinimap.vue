<template>
  <canvas
    ref="minimap"
    v-bind:width="canvasSide.px"
    v-bind:height="canvasSide.px"
    v-on:mousedown="setActiveWeapon"
    v-on:mousemove="transform"
    v-on:mouseup="clearActiveWeapon"
    v-on:mouseout="clearActiveWeapon"
  ></canvas>
</template>

<script setup lang="ts">
import { shallowRef } from "vue";
import type { Ref } from "vue";
import { WeaponOnMinimap } from "@/weapon/active-weapon";
import type { Weapon } from "@/weapon/weapon";
import type { Length } from "@/units";

interface Props {
  canvasSide: Length;
  weapons: Weapon[];
}

const props = defineProps<Props>();
const weapons = shallowRef(props.weapons);

// ドラッグ処理
const activeWeapon: Ref<WeaponOnMinimap | null> = shallowRef(null);
const setActiveWeapon = (event: MouseEvent): void => {
  const canvas = document.getElementById("minimap");
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const context = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  if (context === null) return; // 先にgetContext("webgl")とかで発生
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

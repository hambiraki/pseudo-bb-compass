<template>
  <canvas
    id="minimap"
    v-bind:width="canvasSquareSideLength"
    v-bind:height="canvasSquareSideLength"
    v-on:mousedown="setActiveWeapon"
    v-on:mousemove="transform"
    v-on:mouseup="clearActiveWeapon"
    v-on:mouseout="clearActiveWeapon"
  ></canvas>
</template>

<script setup lang="ts">
import { WeaponOnMinimap, Location } from "@/weapons/weapon-on-minimap";
import { computed, watch, ref } from "vue";
import type { Ref } from "vue";
import { Length } from "@/units";

interface Props {
  mapLocate: string;
  mapType: string;
}
const props = defineProps<Props>();

// サイズ決め定数
const originalXStart = 562; // sx             (元画像の切り抜き始点X)
const originalYStart = 78; // sy             (元画像の切り抜き始点Y)
const originalSquareSideLength = 925; // sWidth,sHeight (元画像の切り抜きサイズ：横幅、高さ)
const canvasXStart = 0; // dx          (Canvasの描画開始位置X)
const canvasYStart = 0; // dy          (Canvasの描画開始位置Y)
/** Canvasの描画サイズdWidth,dHeight
 * 画面の幅と高さの小さい方
 */
const canvasSquareSideLength = computed((): number => {
  return Math.min(window.innerWidth * 0.9, window.innerHeight * 0.7);
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
  const point = new Location(
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
  if (activeWeapon.value == null) {
    return;
  }
  const canvas = document.getElementById("minimap");
  if (!(canvas instanceof HTMLCanvasElement)) {
    return;
  }
  const ctx = getMapCanvasContext();
  if (ctx === null) {
    return;
  }
  const rect = canvas.getBoundingClientRect();
  const point = new Location(
    Length.byPixel(event.clientX - rect.left),
    Length.byPixel(event.clientY - rect.top)
  );
  activeWeapon.value.transform(ctx, point);
  draw();
};

const clearActiveWeapon = (): void => {
  activeWeapon.value = null;
};

// url用定数
const locationBaseUrl = "https://ps4.borderbreak.com/data/location";
const minimapIndex = "sub_6.jpg";

const minimapImage = computed((): HTMLImageElement => {
  const image = new Image();
  image.alt = `${props.mapLocate}～${props.mapType}～`;
  const rawUrl = `${locationBaseUrl}/${props.mapLocate}/${props.mapType}/${minimapIndex}`;
  image.src = encodeURI(rawUrl);
  return image;
});

const getMapCanvasContext = (): CanvasRenderingContext2D | null => {
  const canvas = document.getElementById("minimap");
  if (!(canvas instanceof HTMLCanvasElement)) {
    return null;
  }
  return canvas.getContext("2d");
};

const draw = (): void => {
  const ctx = getMapCanvasContext();
  if (ctx === null) {
    return;
  }
  ctx.clearRect(
    0,
    0,
    canvasSquareSideLength.value,
    canvasSquareSideLength.value
  );
  ctx.drawImage(
    minimapImage.value,
    originalXStart,
    originalYStart,
    originalSquareSideLength,
    originalSquareSideLength,
    canvasXStart,
    canvasYStart,
    canvasSquareSideLength.value,
    canvasSquareSideLength.value
  );
  for (const weapon of weapons) {
    weapon.draw(ctx);
  }
};
minimapImage.value.onload = draw;
watch(minimapImage, draw);
</script>

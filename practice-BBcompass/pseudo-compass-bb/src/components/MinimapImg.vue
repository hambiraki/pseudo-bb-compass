<template>
  <canvas
    id="map-canvas" v-bind:width="xySizeCanvas" v-bind:height="xySizeCanvas"
  ></canvas>
  <p>
    <button v-on:click="drawSector">四角形</button>
  </p>
  <div draggable="true" class="moving-box"
    v-on:dragstartz="move" v-on:dragend.prevent="move"
    v-bind:style="boxStyle"></div>
</template>

<style>
.moving-box {
  transform: rotate(35deg);
  height: 100px;
  width: 100px;
  left: 100px;
  box-sizing: border-box;
  border: 1px solid black;
  background-color: rgba(255, 0, 0, 0.3)
}
</style>

<script setup lang="ts">
import { computed, watch, ref, type StyleValue } from 'vue';

const drawSector = ():void => {
  const ctx = getMapCanvasContext();
  if(ctx === null){ return; }
  ctx.beginPath();
  ctx.moveTo(30,30);
  ctx.arc(30,30, 50, 0, 1);
  ctx.closePath();
  ctx.fillStyle = "rgba(255,0,0,0.3)";
  ctx.fill();
}
const x = ref(0);
const y = ref(0);
const move = (event: MouseEvent) => {
  x.value = event.offsetX;
  y.value = event.offsetY;
}
const boxStyle = computed (
  () : StyleValue => {
    return {
      left: x.value + "px",
      top: y.value + "px"
    }
});

interface Props {
  mapLocate: string;
  mapType: string;
}
const props = defineProps<Props>();

// サイズ決め定数
const xStartPointOriginal = 562;  // sx             (元画像の切り抜き始点X)
const yStartPointOriginal = 78;   // sy             (元画像の切り抜き始点Y)
const xySizeOriginal      = 925;  // sWidth,sHeight (元画像の切り抜きサイズ：横幅、高さ)
const xyStartPointCanvas  = 0;    // dx,dy          (Canvasの描画開始位置X,Y)
const xySizeCanvas = ref(300);    // dWidth,dHeight (Canvasの描画サイズ：横幅、高さ)

// url用定数
const locationBaseUrl = "https://ps4.borderbreak.com/data/location"
const minimapIndex = "sub_6.jpg"

const minimapImg = computed(
  (): HTMLImageElement => {
    const image = new Image();
    image.alt = `${props.mapLocate}～${props.mapType}～`
    const rawUrl = `${locationBaseUrl}/${props.mapLocate}/${props.mapType}/${minimapIndex}`
    image.src = encodeURI(rawUrl);
    return image;
  }
);

const getMapCanvasContext = (): CanvasRenderingContext2D | null =>{
  const canvas = document.getElementById('map-canvas');
  if(!(canvas instanceof HTMLCanvasElement)){ return null; }
  return canvas.getContext('2d');
};

const drawRect = (): void =>{
  const ctx = getMapCanvasContext();
  if(ctx === null){ return; }
  ctx.fillRect(0,0,50,100);
};

const drawMap = (): void => {
  const ctx = getMapCanvasContext();
  if(ctx === null){ return; }
  ctx.clearRect(0,0,xySizeCanvas.value,xySizeCanvas.value);
  ctx.drawImage(
    minimapImg.value,
    xStartPointOriginal, yStartPointOriginal,
    xySizeOriginal, xySizeOriginal,
    xyStartPointCanvas, xyStartPointCanvas,
    xySizeCanvas.value, xySizeCanvas.value
  );
}
minimapImg.value.onload = drawMap;
watch(minimapImg, drawMap);
</script>

<!-- <style>
.map-style {
    background-clip: content-box;
    background-origin: content-box;
    height: 500px;
    width: 500px;
    background-position: right top;
}
</style> -->
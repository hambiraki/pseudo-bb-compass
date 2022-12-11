<template>
    <canvas id="map-canvas" v-bind:width="xySizeCanvas" v-bind:height="xySizeCanvas">
    </canvas>
</template>
<script setup lang="ts">
import { computed, watchEffect, ref } from 'vue';

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
const xySizeCanvas = ref(300);  // dWidth,dHeight (Canvasの描画サイズ：横幅、高さ)

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

const ctx = computed(
  (): CanvasRenderingContext2D | null =>{
    const canvas = document.getElementById('map-canvas');
    if(!(canvas instanceof HTMLCanvasElement)){ return null; }
    const ctx = canvas.getContext('2d');
    return ctx;
  }
);

watchEffect(  
  (): void =>{
    minimapImg.value.onload = ():void => {
      if(ctx.value === null){ return; }
      ctx.value.clearRect(0,0,xySizeCanvas.value,xySizeCanvas.value)
      ctx.value.drawImage(
        minimapImg.value,
        xStartPointOriginal, yStartPointOriginal,
        xySizeOriginal, xySizeOriginal,
        xyStartPointCanvas, xyStartPointCanvas,
        xySizeCanvas.value, xySizeCanvas.value
      );
    }
  }
)
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
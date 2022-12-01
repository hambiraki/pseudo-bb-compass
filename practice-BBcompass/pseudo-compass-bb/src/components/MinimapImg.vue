<template>
    <canvas id="minimap-canvas" width="500px" height="500px"></canvas>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';

    const locationBaseUrl = "https://ps4.borderbreak.com/data/location"
    const mapLocate = ref("第3採掘島")
    const mapType = ref("夕暮れの戦火")
    const minimapIndex = "sub_6.jpg"
    
    const minimapImg = computed(
        (): HTMLImageElement => {
            const image = new Image();
            image.alt = `${mapLocate.value} ${mapType.value}`
            const rawUrl = `${locationBaseUrl}/${mapLocate.value}/${mapType.value}/${minimapIndex}`
            image.src = encodeURI(rawUrl);
            return image;
        }
    );
    onMounted(
        (): void =>{
            const canvas = document.getElementById('minimap-canvas');
            if(!(canvas instanceof HTMLCanvasElement)){ return; }
            const ctx = canvas.getContext('2d');
            if(ctx === null){ return; }
            minimapImg.value.onload = ():void => {
                ctx.drawImage(
                    minimapImg.value, 150, 200, 500, 300, 60, 60, 500, 300);
                console.log("Hello World");
            }
        }    
    );
</script>

<style>
.map-style {
    background-clip: content-box;
    background-origin: content-box;
    height: 500px;
    width: 500px;
    background-position: right top;
}
</style>
<script setup lang="ts">
  import { ref,computed, type StyleValue } from 'vue';
  const x = ref(0);
  const y = ref(0);
  const move = (event: MouseEvent) => {
    x.value += event.offsetX - 50
    y.value += event.offsetY - 50;
  }
  const boxStyle = computed (
    () : StyleValue => {
      return {
        left: x.value + "px",
        top: y.value + "px"
      }
  });
</script>

<template>
  <p>x:{{x}}</p>
  <p>y:{{y}}</p>  
  <p>boxStyle:{{boxStyle}}</p>
  <div
  class="draggable-space"
  v-on:dragover.prevent>
    Drop Zone
    <div src=".\assets\logo.svg" draggable="true"
      v-on:dragstart="move" v-on:dragend.prevent="move"
      class="moving-box" v-bind:style="boxStyle" >
    </div>
  </div>
</template>

<style scoped>
.logo {
  /* display: block;
  margin: 0 auto 2rem; */
  position: absolute;
  left: 50mm
}

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }
}

.moving-box {
  height: 100px;
  width: 100px;
  left: 100px;
  box-sizing: border-box;
  border: 1px solid black;
  background-color: #41B883
}

.draggable-space {
  height: 500px;
  width: 500px;
  left: 100px;
  top: 100px;
  box-sizing: border-box;
  border: 1px solid black;
  background-color: greenyellow
}

</style>

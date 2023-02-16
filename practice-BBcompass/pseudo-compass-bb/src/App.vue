<template>
  <div>
    <div class="wrap">
      <div class="ribbonmenu z-index-ribbonmenu">
        <div class="celltitle" id="head_map">マップ</div>
        <div>
          <p>
            <select v-model="mapLocate">
              <option>第3採掘島</option>
              <option>第3採掘島あ</option>
            </select>
          </p>
          <p>
            <select v-model="mapType" v-on:change="">
              <option>夕暮れの戦火</option>
              <option>臨海決戦</option>
            </select>
          </p>
        </div>
      </div>
      <div class="ribbonmenu z-index-ribbonmenu">
        <div class="celltitle" id="head_weapon">武器</div>
        <p><select v-for="seriesName in seriesNames">
          <option>{{ seriesName }}</option>
        </select></p>
        <p><select>
          <option>索敵センサー</option>
          <option>小型索敵センサー</option>
          <option>広域索敵センサー</option>
          <option>新型索敵センサー</option>
        </select></p>
        <p><button v-on:click="addWeapon">追加</button></p>
      </div>
    </div>
    <MinimapImg v-bind:map-locate="mapLocate" v-bind:map-type="mapType"/>
  </div>
</template>

<script setup lang="ts">
import MinimapImg from '@/components/MinimapImg.vue';
import { ref } from 'vue';
import { SeriesFactory } from './weapon-on-minimap/weapon-factory';
import type { WeaponOnMinimap } from './weapon-on-minimap/weapon-on-minimap';

const mapLocate = ref("第3採掘島");
const mapType = ref("夕暮れの戦火");

const seriesNames = SeriesFactory.seriesNames;
// head_weaponに武器をあれこれする責務がある
const addWeapon = ():void => {
  // 
}
</script>


<style scoped>
</style>

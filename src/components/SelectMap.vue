<template>
  <div class="ribbonmenu z-index-ribbonmenu">
    <div class="celltitle" id="head_map">マップ</div>
    <div>
      <p>
        <select v-model="location">
          <option v-for="optionMapLocation in locations">
            {{ optionMapLocation }}
          </option>
        </select>
      </p>
      <p>
        <select v-model="situation">
          <option v-for="optionMapSituation in situations">
            {{ optionMapSituation }}
          </option>
        </select>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MapField } from "@/maps/map-field";
import {
  location2situation,
  type MapLocation,
  type MapSituation,
} from "@/maps/map-names";
import { assert } from "@vue/compiler-core";
import {
  computed,
  provide,
  ref,
  type InjectionKey,
  type Ref,
  readonly,
  watch,
  inject,
} from "vue";
import { drawKey } from "./MinimapImg.vue";

const locations = computed((): Array<MapLocation> => {
  return Array.from(location2situation.keys());
});
const location: Ref<MapLocation> = ref("スカービ渓谷");
const situations = computed((): ReadonlyArray<MapSituation> => {
  const situations = location2situation.get(location.value);
  assert(situations !== undefined);
  if (situations === undefined) throw Error;
  return situations;
});
const situation: Ref<MapSituation> = ref("戦線突破");
watch(location, (): void => {
  situation.value = situations.value[0];
});

const selectedMapField = computed((): MapField => {
  assert(situations.value === location2situation.get(location.value));
  assert(situations.value.includes(situation.value));
  return new MapField(location.value, situation.value);
});
provide(selectedMapKey, readonly(selectedMapField.value));
const drawAll = inject(drawKey);
watch(situation, (): void => {
  if (drawAll === undefined) return;
  drawAll();
});
</script>

<script lang="ts">
export const selectedMapKey: InjectionKey<MapField> = Symbol();
</script>

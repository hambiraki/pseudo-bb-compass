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
import { computed, ref, type Ref } from "vue";

const location: Ref<MapLocation | undefined> = ref(undefined);
const locations = location2situation.keys();
const situation: Ref<MapSituation | undefined> = ref(undefined);
const situations = computed((): ReadonlyArray<MapSituation> => {
  if (location.value === undefined) return [] as const;
  const situations = location2situation.get(location.value);
  assert(situations !== undefined);
  if (situations === undefined) throw Error;
  return situations;
});

const selectedMapField = computed((): MapField | undefined => {
  if (location.value === undefined) return undefined;
  if (situation.value === undefined) return undefined;
  assert(situations.value === location2situation.get(location.value));
  assert(situations.value.includes(situation.value));
  return new MapField(location.value, situation.value);
});
</script>

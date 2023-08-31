<template>
  <div class="ribbonmenu z-index-ribbonmenu">
    <div class="celltitle" id="head_map">マップ</div>
    <div>
      <p>
        <select v-model="mapLocation">
          <option v-for="mapLocationOption in mapLocations">
            {{ mapLocationOption }}
          </option>
        </select>
      </p>
      <p>
        <select v-model="mapSituation">
          <option v-for="mapSituationOption in mapSituations">
            {{ mapSituationOption }}
          </option>
        </select>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MapSituation } from "@/minimaps/minimap-names";
import { situation2location, type MapLocation } from "@/minimaps/minimap-names";
import { ObjectValues, getKeyByValue } from "@/utils";
import { computed, ref, watch } from "vue";

interface Props {
  mapSituation: MapSituation;
}
const props = defineProps<Props>();

const mapLocations = ObjectValues(situation2location);
const mapSituation = ref<MapSituation>(props.mapSituation);
const mapLocation = ref<MapLocation>(situation2location[mapSituation.value]);
const mapSituations = computed((): MapSituation[] => {
  return getKeyByValue(situation2location, mapLocation.value);
});
watch(mapSituations, (): void => {
  if (mapSituations.value[0] === undefined) return;
  mapSituation.value = mapSituations.value[0];
});
interface Emits {
  (event: "update:situation", newSituation: MapSituation): void;
}
const emit = defineEmits<Emits>();
watch(mapSituation, (): void => {
  emit("update:situation", mapSituation.value);
});
</script>

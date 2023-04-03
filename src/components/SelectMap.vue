<template>
  <div class="ribbonmenu z-index-ribbonmenu">
    <div class="celltitle" id="head_map">マップ</div>
    <div>
      <p>
        <select v-model="selectedLocation">
          <option v-for="locationOption in locations">
            {{ locationOption }}
          </option>
        </select>
      </p>
      <p>
        <select v-model="selectedSituation">
          <option v-for="situationOption in situations">
            {{ situationOption }}
          </option>
        </select>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Minimap } from "@/minimaps";
import type { Situation } from "@/minimaps/minimap-names";
import { situation2location, type Location } from "@/minimaps/minimap-names";
import { ObjectValues, getKeyByValue } from "@/utils";
import { computed, ref, watch, type Ref } from "vue";

const locations = ObjectValues(situation2location);
const selectedLocation: Ref<Location> = ref("スカービ渓谷");
const situations = computed((): Situation[] => {
  return getKeyByValue(situation2location, selectedLocation.value);
});
const selectedSituation: Ref<Situation> = ref("戦線突破");
watch(situations, (): void => {
  selectedSituation.value = situations.value[0];
});

interface Emits {
  (event: "update:modelValue", minimap: Minimap): void;
}
const emit = defineEmits<Emits>();
watch(selectedSituation, (): void => {
  emit("update:modelValue", new Minimap(selectedSituation.value));
});
</script>

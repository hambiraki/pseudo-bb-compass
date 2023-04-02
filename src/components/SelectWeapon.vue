<template>
  <div class="celltitle" id="head_weapon">武器</div>
  <p>
    <select v-model="selectedSeries">
      <option v-for="seriesName in seriesNames">{{ seriesName }}</option>
    </select>
  </p>
  <p>
    <select v-model="selectedModel">
      <option v-for="modelName in modelNames">{{ modelName }}</option>
    </select>
  </p>
  <p><button v-on:click="addWeapon">追加</button></p>
</template>

<script setup lang="ts">
import { ObjectKeys } from "@/utils";
import { model2weapon, series2model } from "@/weapons";
import type { Weapon } from "@/weapons/weapon";
import { computed, ref, watch, type Ref } from "vue";

type SeriesName = keyof typeof series2model;
type ModelName = keyof typeof model2weapon;
const seriesNames = ObjectKeys(series2model);
const selectedSeries: Ref<SeriesName> = ref("索敵センサー");
const modelNames = computed((): ModelName[] => {
  return series2model[selectedSeries.value];
});
const selectedModel: Ref<ModelName> = ref("索敵センサー");
watch(selectedSeries, (): void => {
  console.log("sadf");
  selectedModel.value = modelNames.value[0];
});

interface Emits {
  (event: "addWeapon", weapon: Weapon): void;
}
const emit = defineEmits<Emits>();
const addWeapon = (): void => {
  emit("addWeapon", model2weapon[selectedModel.value]);
};
</script>

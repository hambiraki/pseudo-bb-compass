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
import { series2model, model2weapon } from "@/weapon/figures";
import { Angle, Coordinates, Length } from "@/units";
import { ObjectKeys } from "@/utils";
import { Weapon } from "@/weapon/weapon";
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
  if (modelNames.value[0] === undefined) return;
  selectedModel.value = modelNames.value[0];
});

interface Emits {
  (event: "addWeapon", weapon: Weapon): void;
}
const emit = defineEmits<Emits>();
const addWeapon = (): void => {
  const length0 = Length.byMeter(0);
  const origin = new Coordinates(length0, length0);
  const angle0 = Angle.byRadian(0);
  const selectedWeapon = new Weapon(
    model2weapon[selectedModel.value],
    origin,
    angle0
  );
  emit("addWeapon", selectedWeapon);
};
</script>

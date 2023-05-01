<template>
  <div class="ribbonmenu z-index-ribbonmenu">
    <div class="celltitle" id="head_map">マップ</div>
    <div>
      <p>
        <select v-model="location">
          <option v-for="locationOption in locations">
            {{ locationOption }}
          </option>
        </select>
      </p>
      <p>
        <select v-model="situation">
          <option v-for="situationOption in situations">
            {{ situationOption }}
          </option>
        </select>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Situation } from "@/minimaps/minimap-names";
import { situation2location, type Location } from "@/minimaps/minimap-names";
import { ObjectValues, getKeyByValue } from "@/utils";
import { computed, ref, watch } from "vue";

interface Props {
  situation: Situation;
}
const props = defineProps<Props>();

const locations = ObjectValues(situation2location);
const situation = ref<Situation>(props.situation);
const location = ref<Location>(situation2location[situation.value]);
const situations = computed((): Situation[] => {
  return getKeyByValue(situation2location, location.value);
});
watch(situations, (): void => {
  if (situations.value[0] === undefined) return;
  situation.value = situations.value[0];
});
interface Emits {
  (event: "update:situation", newSituation: Situation): void;
}
const emit = defineEmits<Emits>();
watch(situation, (): void => {
  emit("update:situation", situation.value);
});
</script>

<template>
  <div>
    <div class="wrap">
      <SelectMap />
      <SelectWeapon />
    </div>
    <MinimapImg />
  </div>
</template>

<script setup lang="ts">
import MinimapImg from "@/components/MinimapImg.vue";
import SelectMap from "@/components/SelectMap.vue";
import SelectWeapon from "@/components/SelectWeapon.vue";
</script>

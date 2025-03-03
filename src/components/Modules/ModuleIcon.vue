<template>
  <div
    class="h-16 w-16 border-4 border-solid flex items-center justify-center duration-150 rounded-full"
    :class="{
      'border-slate-300/30 bg-slate-300/5': !ownership,
      'border-module-epic bg-module-epic/15': ownership?.[0][0].includes('Epic'),
      'border-module-mythic bg-module-mythic/15': ownership?.[0][0].includes('Mythic'),
      'border-module-ancestral bg-module-ancestral/15': ownership?.[0][0].includes('Ancestral'),
    }"
  >
    <img
      :src="getIcon()"
      alt="Icon"
      class="h-2/3"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  ownership: Array,
  icon: String,
  group: String,
});

const getIcon = () => new URL(`../../assets/modules/${props.icon}`, import.meta.url).href;
</script>

<template>
  <div class="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <label class="flex flex-col gap-2">
      <span>Gems spent</span>
      <input
        type="number"
        v-model="gems"
      />
    </label>
    <label class="flex flex-col gap-2">
      <span>Common mods</span>
      <input
        type="number"
        v-model="commons"
      />
    </label>
    <label class="flex flex-col gap-2">
      <span>Rare mods</span>
      <input
        type="number"
        v-model="rares"
      />
    </label>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 max-md:gap-6">
    <div
      class="flex flex-col gap-4 mods"
      v-for="(group_mods, group) in mods"
      :key="group"
    >
      <p class="capitalize text-3xl font-semibold">{{ group }}</p>
      <div
        class="grid grid-cols-[auto_3fr_auto] gap-2 items-center"
        v-for="mod in group_mods"
        :key="mod.name"
      >
        <img
          v-lazy="getIcon(mod.icon)"
          :alt="`${mod.name}`"
          class="max-h-44"
        />
        <p>{{ mod.name }}</p>
        <input
          class="w-28"
          type="number"
          v-model="modules[mod.name]"
          @keyup="validate(mod.name)"
          :min="0"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { modules as mods } from "@/data/modules";

const modules = defineModel("modules");
const gems = defineModel("gems");
const commons = defineModel("commons");
const rares = defineModel("rares");

const getIcon = (m) => new URL(`../assets/icons/${m}`, import.meta.url).href;

const validate = (name) => (modules.value[name] = modules.value[name] === "" || modules.value[name] < 0 ? 0 : modules.value[name]);
</script>

<style scoped lang="postcss">
@media (min-width: 768px) {
  .mods:nth-of-type(odd) {
    @apply pr-6 border-r border-solid border-r-container;
  }
  .mods:nth-of-type(even) {
    @apply pl-6 border-l border-solid border-l-container;
  }
  .mods:nth-of-type(1),
  .mods:nth-of-type(2) {
    @apply pb-6 border-b border-solid border-b-container;
  }
  .mods:nth-of-type(3),
  .mods:nth-of-type(4) {
    @apply pt-6 border-t border-solid border-t-container;
  }
}
</style>

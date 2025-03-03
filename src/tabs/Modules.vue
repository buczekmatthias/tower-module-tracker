<template>
  <div class="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
    <Tracker
      :stats="stats"
      @statsUpdate="updateStats"
    />
    <div
      v-for="[group, m] in Object.entries(modules)"
      :key="group"
      class="flex flex-col gap-2"
    >
      <p class="capitalize text-2xl">{{ group }}</p>
      <Module
        v-for="[module, content] in Object.entries(m)"
        :key="module"
        :module="{ name: module, ...content }"
        :group="group"
        v-model="mods[module]"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeMount } from "vue";
import { modules, loadModules, updateStorageContent } from "@/data/modules.js";
import loadStatistics from "@/data/statistics.js";

import Module from "@/components/Modules/Module.vue";
import Tracker from "@/components/Modules/Tracker.vue";

const mods = ref(JSON.parse(localStorage.getItem("modules")));
const stats = ref(JSON.parse(localStorage.getItem("stats")));

onBeforeMount(() => {
  if (!localStorage.getItem("modules")) {
    loadModules();
    mods.value = JSON.parse(localStorage.getItem("modules"));
  } else {
    updateStorageContent();
    mods.value = JSON.parse(localStorage.getItem("modules"));
  }
  if (!localStorage.getItem("stats")) {
    loadStatistics();
    stats.value = JSON.parse(localStorage.getItem("stats"));
  }

  updateStorageContent();
});

watch(
  [mods],
  () => {
    localStorage.setItem("modules", JSON.stringify(mods.value));
    updateStats({ ...stats.value, mods: { ...stats.value.mods, epic: Object.values(mods.value).reduce((a, b) => a + b, 0) } });
  },
  { deep: true }
);

const updateStats = (s) => {
  localStorage.setItem("stats", JSON.stringify(s));
  stats.value = s;
};
</script>

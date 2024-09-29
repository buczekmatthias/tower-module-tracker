<template>
  <Statistics :stats="stats" />
  <Modules
    v-model:modules="modules"
    v-model:gems="gems"
    v-model:commons="commons"
    v-model:rares="rares"
  />
</template>

<script setup>
import Statistics from "./components/Statistics.vue";
import Modules from "./components/Modules.vue";

import { onBeforeMount, ref, watch } from "vue";
import { loadModules } from "./data/modules";
import { loadStatistics } from "./data/statistics";

const modules = ref(JSON.parse(localStorage.getItem("modules")));
const stats = ref(JSON.parse(localStorage.getItem("stats")));

const gems = ref(0);
const commons = ref(0);
const rares = ref(0);

onBeforeMount(() => {
  if (!localStorage.getItem("modules")) {
    loadModules();
    modules.value = JSON.parse(localStorage.getItem("modules"));
  }
  if (!localStorage.getItem("stats")) {
    loadStatistics();
    stats.value = JSON.parse(localStorage.getItem("stats"));
    gems.value = stats.value["gems_spent"];
    commons.value = stats.value["mods"]["common"];
    rares.value = stats.value["mods"]["rare"];
  }
});

const updateStats = () => {
  const s = {
    gems_spent: 0,
    mods: {
      common: 0,
      rare: 0,
      epic: 0,
    },
  };

  s["gems_spent"] = gems.value;
  s["mods"]["common"] = commons.value;
  s["mods"]["rare"] = rares.value;
  s["mods"]["epic"] = Object.values(modules.value).reduce((a, b) => a + b, 0);

  localStorage.setItem("stats", JSON.stringify(s));
  stats.value = s;
};

watch(
  () => modules.value,
  () => {
    localStorage.setItem("modules", JSON.stringify(modules.value));
    updateStats();
  },
  { deep: true }
);

watch([gems, commons, rares], () => {
  updateStats();
});
</script>

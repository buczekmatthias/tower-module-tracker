<template>
  <Statistics :stats="stats" />
  <Modules
    v-model:modules="modules"
    @statsUpdate="updateStats"
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

onBeforeMount(() => {
  if (!localStorage.getItem("modules")) {
    loadModules();
    modules.value = JSON.parse(localStorage.getItem("modules"));
  }
  if (!localStorage.getItem("stats")) {
    loadStatistics();
    stats.value = JSON.parse(localStorage.getItem("stats"));
  }
});

const updateStats = (gems = 0, commons = 0, rares = 0, isAddAction = true) => {
  const s = {
    gems_spent: stats.value.gems_spent,
    mods: {
      common: stats.value.mods.common,
      rare: stats.value.mods.rare,
      epic: 0,
    },
  };

  if (isAddAction) {
    s["gems_spent"] += gems;
    s["mods"]["common"] += commons;
    s["mods"]["rare"] += rares;
  } else {
    s["gems_spent"] = s["gems_spent"] - gems > 0 ? s["gems_spent"] - gems : 0;
    s["mods"]["common"] = s["mods"]["common"] - commons > 0 ? s["mods"]["common"] - commons : 0;
    s["mods"]["rare"] = s["mods"]["rare"] - rares > 0 ? s["mods"]["rare"] - rares : 0;
  }

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
</script>

<template>
  <div class="flex flex-col gap-6 lg:sticky lg:top-4">
    <button
      @click="showImportExport = !showImportExport"
      class="bg-rose-700 p-2 rounded-lg hover:bg-rose-600"
    >
      Toggle import/export
    </button>
    <div
      class="flex flex-col gap-2"
      v-if="showImportExport"
    >
      <Export />
      <Import />
    </div>
    <Simulator
      :stats="stats"
      @statsUpdate="updateStats"
    />
    <Statistics
      :stats="stats"
      @statsUpdate="updateStats"
    />
  </div>
  <Modules v-model:modules="modules" />
</template>

<script setup>
import Simulator from "./components/Simulator.vue";
import Statistics from "./components/Statistics.vue";
import Modules from "./components/Modules.vue";
import Export from "./components/Export.vue";
import Import from "./components/Import.vue";

import { onBeforeMount, ref, watch } from "vue";
import { loadModules } from "./data/modules";
import { loadStatistics } from "./data/statistics";

const modules = ref(JSON.parse(localStorage.getItem("modules")));
const stats = ref(JSON.parse(localStorage.getItem("stats")));

const showImportExport = ref(false);

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

const updateStats = (gems = 0, commons = 0, rares = 0, isAddAction = true, isSimulator = false) => {
  const s = {
    gems_spent: stats.value.gems_spent,
    mods: {
      common: stats.value.mods.common,
      rare: stats.value.mods.rare,
      epic: 0,
    },
  };

  if (isSimulator) {
    s["gems_spent"] = gems;
    s["mods"]["common"] = commons;
    s["mods"]["rare"] = rares;
  } else if (isAddAction) {
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

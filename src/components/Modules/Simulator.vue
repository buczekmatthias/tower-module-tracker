<template>
  <div class="border border-solid border-slate-300/30 rounded-lg p-3 flex flex-col gap-2">
    <p class="font-semibold text-xl">Simulator</p>
    <p class="text-zinc-50/50 text-sm">Simulator bases on gems spent, epics pulled and chances to pull rarity of mod.<br /><span class="font-bold">It's result is pure guess.</span></p>
    <div class="grid grid-cols-2 gap-2 mt-2">
      <Button
        class="border border-solid border-slate-300/30 rounded-md"
        @click="simulate"
      >
        Simulate
      </Button>
      <Button
        class="border border-solid border-slate-300/30 rounded-md"
        @click="useStats"
        :disabled="Object.keys(simulatorResult).length < 1"
      >
        Use stats
      </Button>
    </div>
    <div
      class="flex gap-5"
      v-if="Object.keys(simulatorResult).length > 0"
    >
      <p>Commons: {{ simulatorResult.commons || "NaN" }}</p>
      <p>Rares: {{ simulatorResult.rares || "NaN" }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import Button from "@/components/Button.vue";

const props = defineProps({
  stats: Object,
});

const emit = defineEmits(["statsUpdate"]);

const simulatorResult = ref({});

const simulate = () => {
  const PULL_COST = 20;
  const COMMON_CHANCE = 0.685;

  let commons = 0;
  let rares = 0;

  let pulls = Math.floor((props.stats.gems_spent - props.stats.mods.epic * PULL_COST) / PULL_COST);

  for (let i = 0; i < pulls; i++) {
    let c = Math.random();

    if (c < COMMON_CHANCE) commons++;
    else rares++;
  }

  simulatorResult.value = { commons: commons, rares: rares };
};

const useStats = () => {
  emit("statsUpdate", {
    gems_spent: props.stats.gems_spent,
    mods: {
      common: simulatorResult.value.commons,
      rare: simulatorResult.value.rares,
      epic: props.stats.mods.epic,
    },
  });

  simulatorResult.value = {};
  window.location.reload();
};
</script>

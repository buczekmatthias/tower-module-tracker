<template>
  <div class="mb-6 border border-solid border-container rounded-lg p-3 flex flex-col gap-2">
    <p class="font-semibold text-xl">Simulator</p>
    <p class="text-font/50 text-sm">Simulator bases on gems spent, epics pulled and chances to pull rarity of mod. <span class="font-bold">It's result is pure guess.</span></p>
    <div class="grid grid-cols-2 gap-2 mt-2">
      <button
        class="bg-rose-700 hover:bg-rose-600 rounded-lg p-2"
        @click="simulate"
      >
        Simulate
      </button>
      <button
        class="disabled:cursor-not-allowed bg-emerald-700 hover:enabled:bg-emerald-600 rounded-lg p-2"
        :disabled="Object.keys(simulatorResult).length < 1"
        @click="useStats"
      >
        Use stats
      </button>
    </div>
    <div
      class="flex gap-5"
      v-if="Object.keys(simulatorResult).length > 0"
    >
      <p>Commons: {{ simulatorResult.commons }}</p>
      <p>Rares: {{ simulatorResult.rares }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  stats: Object,
});

const emit = defineEmits(["statsUpdate"]);

const simulatorResult = ref({});

const simulate = () => {
  const pullCost = 20;
  const commonChance = 0.685;

  let commons = 0;
  let rares = 0;

  let pulls = Math.floor((props.stats.gems_spent - props.stats.mods.epic * pullCost) / pullCost);

  for (let i = 0; i < pulls; i++) {
    let c = Math.random();

    if (c < commonChance) commons++;
    else rares++;
  }

  simulatorResult.value = { commons: commons, rares: rares };
};

const useStats = () => {
  emit("statsUpdate", props.stats.gems_spent, simulatorResult.value.commons, simulatorResult.value.rares, false, true);

  simulatorResult.value = {};
};
</script>

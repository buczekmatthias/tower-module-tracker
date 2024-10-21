<template>
  <table class="border-collapse">
    <tbody>
      <tr>
        <td class="first-letter:uppercase stats-table w-2/5 md:w-1/3">gems spent</td>
        <td class="stats-table text-center">{{ stats.gems_spent }}</td>
      </tr>
      <tr>
        <td class="first-letter:uppercase stats-table w-2/5 md:w-1/3">mods pulled</td>
        <td class="stats-table text-center">{{ sum }}</td>
      </tr>
      <tr
        v-for="(amount, mod) in stats.mods"
        :key="mod"
      >
        <td class="first-letter:uppercase stats-table w-2/5 md:w-1/3">{{ mod }} mods</td>
        <td class="stats-table text-center">{{ amount }} ({{ ((amount / sum || 0) * 100).toFixed(2) }}%)</td>
      </tr>
    </tbody>
  </table>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-[1fr_2fr] gap-4">
      <label for="gems_spent">Gems spent</label>
      <div class="grid grid-cols-[auto_1fr_auto]">
        <button
          class="px-4 rounded-l-lg bg-red-600 hover:bg-red-500"
          @click="
            $emit('statsUpdate', gems, 0, 0, false);
            gems = 0;
          "
        >
          -
        </button>
        <input
          class="rounded-none"
          id="gems_spent"
          type="number"
          v-model="gems"
        />
        <button
          class="px-4 rounded-r-lg bg-emerald-600 hover:bg-emerald-500"
          @click="
            $emit('statsUpdate', gems, 0, 0);
            gems = 0;
          "
        >
          +
        </button>
      </div>
    </div>
    <div class="grid grid-cols-[1fr_2fr] gap-4">
      <label for="commons">Common mods</label>
      <div class="grid grid-cols-[auto_1fr_auto]">
        <button
          class="px-4 rounded-l-lg bg-red-600 hover:bg-red-500"
          @click="
            $emit('statsUpdate', 0, commons, 0, false);
            commons = 0;
          "
        >
          -
        </button>
        <input
          class="rounded-none"
          id="commons"
          type="number"
          v-model="commons"
        />
        <button
          class="px-4 rounded-r-lg bg-emerald-600 hover:bg-emerald-500"
          @click="
            $emit('statsUpdate', 0, commons, 0);
            commons = 0;
          "
        >
          +
        </button>
      </div>
    </div>
    <div class="grid grid-cols-[1fr_2fr] gap-4">
      <label for="rares">Rare mods</label>
      <div class="grid grid-cols-[auto_1fr_auto]">
        <button
          class="px-4 rounded-l-lg bg-red-600 hover:bg-red-500"
          @click="
            $emit('statsUpdate', 0, 0, rares, false);
            rares = 0;
          "
        >
          -
        </button>
        <input
          class="rounded-none"
          id="rares"
          type="number"
          v-model="rares"
        />
        <button
          class="px-4 rounded-r-lg bg-emerald-600 hover:bg-emerald-500"
          @click="
            $emit('statsUpdate', 0, 0, rares);
            rares = 0;
          "
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  stats: Object,
});

const gems = ref(0);
const commons = ref(0);
const rares = ref(0);

const sum = computed(() => Object.values(props.stats.mods).reduce((a, b) => a + b, 0));

const emit = defineEmits(["statsUpdate"]);
</script>

<style lang="postcss" scoped>
.stats-table {
  @apply border-2 border-container p-3;
}
</style>

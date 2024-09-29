<template>
  <table class="border-collapse mb-6">
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
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  stats: Object,
});

const sum = computed(() => Object.values(props.stats.mods).reduce((a, b) => a + b, 0));
</script>

<style lang="postcss" scoped>
.stats-table {
  @apply border-2 border-container p-3;
}
</style>

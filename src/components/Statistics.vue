<template>
  <table class="border-collapse col-span-full mb-6">
    <tbody>
      <tr>
        <td class="first-letter:uppercase stats-table w-1/2">gems spent</td>
        <td class="stats-table text-center">{{ stats.gems_spent }}</td>
      </tr>
      <tr>
        <td class="first-letter:uppercase stats-table w-1/2">mods pulled</td>
        <td class="stats-table text-center">{{ Object.values(stats.mods).reduce((a, b) => a + b, 0) }}</td>
      </tr>
      <tr
        v-for="(amount, mod) in stats.mods"
        :key="mod"
      >
        <td class="first-letter:uppercase stats-table w-1/2">{{ mod }} mods</td>
        <td class="stats-table text-center">{{ amount }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  stats: Object,
});
</script>

<style lang="postcss" scoped>
.stats-table {
  @apply border-2 border-container p-3;
}
</style>

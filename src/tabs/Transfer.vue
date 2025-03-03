<template>
  <div class="flex flex-col gap-8 max-w-5xl w-full md:grid md:grid-cols-2">
    <Import />
    <Export />
  </div>
</template>

<script setup>
import Export from "@/components/Transfer/Export.vue";
import Import from "@/components/Transfer/Import.vue";
</script>

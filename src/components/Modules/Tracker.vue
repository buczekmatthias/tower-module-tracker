<template>
  <div class="col-span-full flex flex-col gap-4">
    <Simulator
      :stats="stats"
      @statsUpdate="$emit('statsUpdate', $event)"
    />
    <Stats
      :stats="stats"
      @statsUpdate="$emit('statsUpdate', $event)"
    />
  </div>
</template>

<script setup>
import Stats from "@/components/Modules/Stats.vue";
import Simulator from "@/components/Modules/Simulator.vue";

defineProps({
  stats: Object,
});

defineEmits(["statsUpdate"]);
</script>

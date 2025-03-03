<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <table class="border-collapse">
      <tbody>
        <tr>
          <td class="stats-table w-2/5 md:w-1/3">Gems spent</td>
          <td class="stats-table text-end">{{ stats.gems_spent }}</td>
        </tr>
        <tr>
          <td class="stats-table w-2/5 md:w-1/3">Mods pulled</td>
          <td class="stats-table text-end">{{ sum }}</td>
        </tr>
        <tr
          v-for="(amount, mod) in stats.mods"
          :key="mod"
        >
          <td class="first-letter:uppercase stats-table w-2/5 md:w-1/3">{{ mod }} mods</td>
          <td class="stats-table text-end">{{ amount }}</td>
        </tr>
      </tbody>
    </table>
    <div class="flex flex-col gap-4">
      <NumberInput
        label="Gems spent"
        id="gems_spent"
        v-model="gems_spent"
      />
      <NumberInput
        label="Common mods"
        id="common_mods"
        v-model="common"
      />
      <NumberInput
        label="Rare mods"
        id="rare_mods"
        v-model="rare"
      />
      <Button
        class="border border-solid border-slate-300/30 rounded-md"
        @click="$emit('statsUpdate', { gems_spent: gems_spent, mods: { common: common, rare: rare, epic: stats.mods.epic } })"
      >
        Save
      </Button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

import Button from "@/components/Button.vue";
import NumberInput from "@/components/NumberInput.vue";

const props = defineProps({
  stats: Object,
});

defineEmits(["statsUpdate"]);

const gems_spent = ref(props.stats.gems_spent);
const common = ref(props.stats.mods.common);
const rare = ref(props.stats.mods.rare);

const sum = computed(() => Object.values(props.stats.mods).reduce((a, b) => a + b, 0));
</script>

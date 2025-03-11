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
      <div class="grid grid-cols-2 gap-2">
        <Button
          class="border border-solid border-slate-300/30 rounded-md"
          @click="manageStats"
        >
          Add
        </Button>
        <Button
          class="border border-solid border-slate-300/30 rounded-md"
          @click="manageStats(false)"
        >
          Remove
        </Button>
      </div>
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

const emit = defineEmits(["statsUpdate"]);

const gems_spent = ref(0);
const common = ref(0);
const rare = ref(0);

const sum = computed(() => Object.values(props.stats.mods).reduce((a, b) => a + b, 0));

const manageStats = (isAddingAction = true) => {
  const d = isAddingAction
    ? {
        gems_spent: props.stats.gems_spent + gems_spent.value,
        mods: {
          common: props.stats.mods.common + common.value,
          rare: props.stats.mods.rare + rare.value,
          epic: props.stats.mods.epic,
        },
      }
    : {
        gems_spent: props.stats.gems_spent - gems_spent.value,
        mods: {
          common: props.stats.mods.common - common.value,
          rare: props.stats.mods.rare - rare.value,
          epic: props.stats.mods.epic,
        },
      };

  emit("statsUpdate", d);

  gems_spent.value = 0;
  common.value = 0;
  rare.value = 0;
};
</script>

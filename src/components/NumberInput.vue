<template>
  <div class="flex flex-col gap-2">
    <label :for="id">
      {{ label }}
    </label>
    <div class="grid grid-cols-[75px_1fr_75px] border border-solid border-slate-300 rounded-md overflow-hidden">
      <Button
        @click="
          model < 1 ? 0 : model--;
          $emit('minusPressed');
        "
        class="hover:!bg-red-600/40"
      >
        <Icon icon="octicon:dash-16" />
      </Button>
      <input
        type="number"
        class="border-x border-solid border-x-slate-300 px-4 text-center"
        v-model.number="model"
        :id
        @blur="
          model = model ? model : 0;
          $emit('plusPressed');
        "
        :min="0"
        @keypress="isNumber"
      />
      <Button
        @click="model++"
        class="hover:!bg-emerald-600/40"
      >
        <Icon icon="octicon:plus-16" />
      </Button>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

import Button from "@/components/Button.vue";

defineProps({
  label: String,
  id: String,
});

defineEmits(["minusPressed", "plusPressed"]);

const model = defineModel();

const isNumber = (e) => {
  const allowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  if (!allowed.includes(e.key)) {
    e.preventDefault();
  }
};
</script>

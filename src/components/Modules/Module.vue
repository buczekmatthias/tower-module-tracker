<template>
  <div
    class="border border-solid border-slate-300/20 rounded-md p-2.5 flex items-center gap-4 cursor-pointer hover:border-slate-300/40 duration-150 group"
    @click="showModal = true"
  >
    <ModuleIcon
      :ownership="ownership"
      :icon="module.icon"
      :group="group"
    />
    <p>{{ module.name }}</p>
    <Icon
      icon="octicon:chevron-right-16"
      class="ml-auto group-hover:mr-2 duration-150"
    />
  </div>
  <Modal
    v-if="showModal"
    @closeModal="showModal = false"
  >
    <ModuleIcon
      :ownership="ownership"
      :icon="module.icon"
      :group="group"
      class="h-24 w-24"
    />

    <p class="text-2xl font-semibold">{{ module.name }}</p>
    <p class="text-sm text-center">
      {{ module.description.split(":val")[0] }}
      <template
        v-for="(v, i) in module.values"
        :key="v"
      >
        <span
          class="font-semibold"
          :class="{
            'text-module-epic': i === 0,
            'text-module-legendary': i === 1,
            'text-module-mythic': i === 2,
            'text-module-ancestral': i === 3,
          }"
        >
          {{ v }}
        </span>
        <template v-if="i !== 3">/</template>
      </template>
      {{ module.description.split(":val")[1] }}
    </p>
    <NumberInput v-model="owned" />
    <div class="flex divide-x divide-slate-300/10 justify-center">
      <p
        v-if="ownership"
        v-for="(type, i) in ownership"
        :key="i"
        class="px-3 first:pl-0 last:pr-0 text-sm"
        :class="{
          'text-module-epic': type[0].includes('Epic'),
          'text-module-mythic': type[0].includes('Mythic'),
          'text-module-ancestral': type[0].includes('Ancestral'),
        }"
      >
        {{ type[1] }}x {{ type[0] }}
      </p>
    </div>
  </Modal>
</template>

<script setup>
import { ref, watch } from "vue";
import { getOwnershipInfo } from "@/data/modules";

import { Icon } from "@iconify/vue";
import Modal from "@/components/Modal.vue";
import ModuleIcon from "@/components/Modules/ModuleIcon.vue";
import NumberInput from "@/components/NumberInput.vue";

const props = defineProps({
  module: Object,
  group: String,
});

const showModal = ref(false);

const owned = defineModel();

const ownership = ref(getOwnershipInfo(props.module.name));

watch([owned], () => (ownership.value = getOwnershipInfo(props.module.name)));
</script>

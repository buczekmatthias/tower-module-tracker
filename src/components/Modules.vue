<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mb-6">
    <div class="flex flex-col gap-2">
      <label
        for="gems_spent"
        class="flex flex-col gap-2"
      >
        Gems spent
      </label>
      <div class="grid grid-cols-[auto_1fr_auto]">
        <button
          class="px-4 rounded-l-lg bg-red-600 hover:bg-red-500"
          @click="
            $emit('statsUpdate', gems, 0, 0, false);
            gems = 0;
          "
        >
          Sub
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
          Add
        </button>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <label
        for="commons"
        class="flex flex-col gap-2"
      >
        Common mods
      </label>
      <div class="grid grid-cols-[auto_1fr_auto]">
        <button
          class="px-4 rounded-l-lg bg-red-600 hover:bg-red-500"
          @click="
            $emit('statsUpdate', 0, commons, 0, false);
            commons = 0;
          "
        >
          Sub
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
          Add
        </button>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <label
        for="rares"
        class="flex flex-col gap-2"
      >
        Rare mods
      </label>
      <div class="grid grid-cols-[auto_1fr_auto]">
        <button
          class="px-4 rounded-l-lg bg-red-600 hover:bg-red-500"
          @click="
            $emit('statsUpdate', 0, 0, rares, false);
            rares = 0;
          "
        >
          Sub
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
          Add
        </button>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 max-md:gap-6 col-span-full">
    <div
      class="flex flex-col gap-4 mods"
      v-for="(group_mods, group) in mods"
      :key="group"
    >
      <p class="capitalize text-3xl font-semibold">{{ group }}</p>
      <div
        class="grid grid-cols-[auto_3fr_auto] gap-2 items-center"
        v-for="mod in group_mods"
        :key="mod.name"
      >
        <img
          v-lazy="getIcon(mod.icon)"
          :alt="`${mod.name}`"
          class="max-h-44"
        />
        <p>{{ mod.name }}</p>
        <input
          class="w-28"
          type="number"
          v-model="modules[mod.name]"
          @keyup="validate(mod.name)"
          :min="0"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { modules as mods } from "@/data/modules";
import { ref } from "vue";

const modules = defineModel("modules");
const gems = ref(0);
const commons = ref(0);
const rares = ref(0);

const getIcon = (m) => new URL(`../assets/icons/${m}`, import.meta.url).href;

const validate = (name) => (modules.value[name] = modules.value[name] === "" || modules.value[name] < 0 ? 0 : modules.value[name]);

const emit = defineEmits(["statsUpdate"]);
</script>

<style scoped lang="postcss">
@media (min-width: 768px) {
  .mods:nth-of-type(odd) {
    @apply pr-6 border-r border-solid border-r-container;
  }
  .mods:nth-of-type(even) {
    @apply pl-6 border-l border-solid border-l-container;
  }
  .mods:nth-of-type(1),
  .mods:nth-of-type(2) {
    @apply pb-6 border-b border-solid border-b-container;
  }
  .mods:nth-of-type(3),
  .mods:nth-of-type(4) {
    @apply pt-6 border-t border-solid border-t-container;
  }
}
</style>

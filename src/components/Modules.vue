<template>
  <div class="flex flex-col gap-6 max-sm:px-container">
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
          @input="validate(mod.name)"
          :min="0"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { modules as mods } from "@/data/modules";

const modules = defineModel("modules");

const getIcon = (m) => new URL(`../assets/icons/${m}`, import.meta.url).href;

const validate = (name) => (modules.value[name] = modules.value[name] === "" || modules.value[name] < 0 ? 0 : modules.value[name]);
</script>

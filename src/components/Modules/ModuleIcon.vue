<template>
  <div
    class="h-16 w-16"
    :class="{
      relative: ['generators', 'cores'].includes(group),
      'border-slate-300/30 bg-slate-300/5': !['generators', 'cores'].includes(group) && !ownership,
      'border-module-epic bg-module-epic/15': !['generators', 'cores'].includes(group) && ownership?.[0][0].includes('Epic'),
      'border-module-legendary bg-module-legendary/15': !['generators', 'cores'].includes(group) && ownership?.[0][0].includes('Legendary'),
      'border-module-mythic bg-module-mythic/15': !['generators', 'cores'].includes(group) && ownership?.[0][0].includes('Mythic'),
      'border-module-ancestral bg-module-ancestral/15': !['generators', 'cores'].includes(group) && ownership?.[0][0].includes('Ancestral'),
      'border-4 border-solid rounded-full flex items-center justify-center': group === 'cannons',
      'border-4 border-solid rounded-xl flex items-center justify-center': group === 'armors',
    }"
  >
    <template v-if="['generators', 'cores'].includes(group)">
      <div
        class="[&>*]:duration-150 h-16 w-16 relative"
        :class="{
          'bg-slate-300/30 ': !ownership,
          'bg-module-epic ': ownership?.[0][0].includes('Epic'),
          'bg-module-legendary ': ownership?.[0][0].includes('Legendary'),
          'bg-module-mythic ': ownership?.[0][0].includes('Mythic'),
          'bg-module-ancestral ': ownership?.[0][0].includes('Ancestral'),
          'generator-clip': group === 'generators',
          'core-clip': group === 'cores',
        }"
      >
        <div
          class="h-16 w-16 absolute top-1/2 left-1/2 -translate-1/2 z-20 bg-theme"
          :class="{
            'generator-inner-clip': group === 'generators',
            'core-inner-clip': group === 'cores',
          }"
        ></div>
        <div
          class="h-16 w-16 absolute top-1/2 left-1/2 -translate-1/2 z-30"
          :class="{
            'bg-slate-300/5': !ownership,
            'bg-module-epic/15': ownership?.[0][0].includes('Epic'),
            'bg-module-legendary/15': ownership?.[0][0].includes('Legendary'),
            'bg-module-mythic/15': ownership?.[0][0].includes('Mythic'),
            'bg-module-ancestral/15': ownership?.[0][0].includes('Ancestral'),
            'generator-inner-clip': group === 'generators',
            'core-inner-clip': group === 'cores',
          }"
        ></div>
      </div>
    </template>

    <img
      :src="getIcon()"
      alt="Icon"
      class="h-2/3"
      :class="{
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[37.5%]': group === 'generators',
        'absolute top-1/2 left-1/2 -translate-1/2': group === 'cores',
      }"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  ownership: Array,
  icon: String,
  group: String,
});

const getIcon = () => new URL(`../../assets/modules/${props.icon}`, import.meta.url).href;
</script>

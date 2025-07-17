<template>
  <div
    class="order-last border border-solid border-slate-300/15 sticky bottom-4 z-30 grid grid-cols-4 gap-6 bg-nav rounded-md px-6 mt-auto"
    id="navigation"
  >
    <button
      v-for="tab in ['modules', 'bonuses', 'share', 'transfer']"
      :key="tab"
      class="cursor-pointer py-4 px-2 md:px-4 border-t-2 border-solid duration-150 capitalize text-sm md:text-base"
      :class="activeTab === tab ? 'border-t-emerald-600 text-emerald-600' : 'border-t-transparent text-slate-50/20 hover:text-slate-50/40'"
      @click="activeTab = tab"
    >
      {{ tab }}
    </button>
  </div>
</template>

<script setup>
const activeTab = defineModel();
</script>

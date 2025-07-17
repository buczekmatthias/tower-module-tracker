<template>
  <div
    class="relative"
    ref="select"
  >
    <Button
      type="button"
      class="w-full flex items-center !justify-between bg-transparent text-slate-50 border border-solid border-slate-300 rounded-md"
      @click="showOptions = !showOptions"
    >
      <span
        class="truncate"
        v-html="options[model]"
      ></span>
      <Icon
        icon="fluent:chevron-up-down-16-filled"
        class="mt-0.5"
      />
    </Button>
    <div
      class="absolute duration-150 left-0 w-full flex-col bg-theme border border-solid border-slate-300/30 rounded-md shadow-md max-h-[clamp(100px,40vh,300px)] overflow-auto"
      :class="[showOptions ? 'opacity-100 translate-y-0 z-40' : `opacity-0 ${isInUpperHalf ? '-translate-y-4' : 'translate-y-4'} -z-10`, isInUpperHalf ? 'top-[110%]' : 'bottom-[110%]']"
    >
      <p
        v-for="[key, display] in Object.entries(options)"
        :key="key"
        @click="
          model = key;
          showOptions = false;
        "
        :data-value="key"
        class="p-3 hover:bg-slate-400/5 cursor-pointer flex items-center justify-between text-slate-50"
      >
        <span v-html="display"></span>
        <Icon
          icon="fluent:checkmark-12-filled"
          v-if="key === model"
        />
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, useTemplateRef, computed } from "vue";
import { useWindowSize, useElementBounding, onClickOutside } from "@vueuse/core";

import Button from "@/components/Button.vue";
import { Icon } from "@iconify/vue";

defineProps({
  options: Object,
});

const model = defineModel();

const showOptions = ref(false);

const select = useTemplateRef("select");

const { height } = useWindowSize();
const { top } = useElementBounding(select);

const isInUpperHalf = computed(() => height.value / 2 >= top.value);

onClickOutside(select, (e) => (showOptions.value = false));
</script>

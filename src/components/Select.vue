<template>
  <div
    class="flex flex-col gap-1"
    ref="select"
  >
    <p
      v-if="label"
      class="mb-0.5"
    >
      {{ label }}
    </p>
    <div class="relative">
      <Button
        type="button"
        class="w-full flex items-center !justify-between bg-transparent text-slate-50 border border-solid border-slate-300 rounded-md"
        @click="showOptions = !showOptions"
      >
        <span
          class="truncate"
          v-if="renderOptionAsHtml"
          v-html="options[model]"
        ></span>
        <span
          class="truncate"
          v-else
          >{{ options[model] }}</span
        >
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
          v-for="[k, v] in Object.entries(options)"
          :key="k"
          @click="
            model = k;
            showOptions = false;
          "
          :data-value="k"
          class="p-3 hover:bg-slate-400/5 cursor-pointer flex items-center justify-between text-slate-50"
        >
          <span
            v-if="renderOptionAsHtml"
            v-html="v"
          ></span>
          <span v-else>{{ v }}</span>
          <Icon
            icon="fluent:checkmark-12-filled"
            v-if="k === model"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, useTemplateRef, computed } from "vue";
import { useWindowSize, useElementBounding, onClickOutside } from "@vueuse/core";

import Button from "@/components/Button.vue";
import { Icon } from "@iconify/vue";

defineProps({
  label: String,
  options: Object,
  renderOptionAsHtml: { type: Boolean, default: false },
});

const model = defineModel();

const showOptions = ref(false);

const select = useTemplateRef("select");

const { height } = useWindowSize();
const { top } = useElementBounding(select);

const isInUpperHalf = computed(() => height.value / 2 >= top.value);

onClickOutside(select, (e) => (showOptions.value = false));
</script>

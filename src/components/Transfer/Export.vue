<template>
  <div class="flex flex-col gap-3">
    <p class="text-3xl font-semibold">Export</p>
    <Info message="Modified data may cause app to not work properly.<br/><strong>Do not modify downloaded file</strong>" />
    <a
      href=""
      download="module_tracker_export.json"
      ref="exportDownload"
    >
      <Button class="border border-solid border-slate-300/30 rounded-md">Download data as JSON</Button>
    </a>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import Button from "@/components/Button.vue";
import Info from "@/components/Info.vue";

const exportDownload = ref(null);

const exportData = () => {
  const exportData = {
    modules: JSON.parse(localStorage.getItem("modules")),
    stats: JSON.parse(localStorage.getItem("stats")),
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "text/json" });

  const url = URL.createObjectURL(blob);

  exportDownload.value.href = url;
};

onMounted(() => {
  exportData();
});
</script>

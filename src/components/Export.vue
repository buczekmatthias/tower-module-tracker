<template>
  <div class="border-b border-solid border-b-container pb-4 flex flex-col gap-3">
    <p class="text-2xl font-semibold">Export</p>
    <p me>Modified data may cause app to not work properly. <strong>Do not modify downloaded file</strong></p>
    <a
      href=""
      download="module_tracker_export.json"
      ref="exportDownload"
    >
      <button class="w-full bg-emerald-700 hover:bg-emerald-600 p-3 rounded-lg">Download data as JSON file</button>
    </a>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

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

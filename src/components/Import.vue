<template>
  <div class="flex flex-col gap-3">
    <p class="text-2xl font-semibold">Import</p>
    <p>Provide unmodified exported JSON file. <strong>Modified data might cause tracker to stop working</strong></p>
    <input
      type="file"
      ref="importFile"
      class="cursor-pointer border border-solid border-container px-2 py-4 rounded-lg"
      accept="application/json"
    />
    <button
      @click="handleImport"
      class="bg-emerald-700 hover:bg-emerald-600 p-3 rounded-lg"
    >
      Import data
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const importFile = ref(null);

const handleImport = () => {
  if (importFile.value.files.length > 0) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = JSON.parse(e.target.result);

      if (Object.keys(data).length < 1) {
        return;
      }

      if ("modules" in data) {
        localStorage.setItem("modules", JSON.stringify(data.modules));
      }

      if ("stats" in data) {
        localStorage.setItem("stats", JSON.stringify(data.stats));
      }

      location.reload();
    };

    reader.readAsText(importFile.value.files[0]);
  }
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <template
      v-for="[type, item] in Object.entries(items)"
      :key="type"
    >
      <Button
        class="border rounded-md border-slate-300/15 hover:border-slate-300/50 gap-2"
        v-if="item === null"
        @click="addNewItemToPreview(type)"
      >
        <Icon
          icon="octicon:plus-16"
          class="mt-0.5"
        />
        Add {{ type }} to preview
      </Button>
      <div
        class="border border-slate-300/10 rounded-md p-3 flex flex-col divide-y divide-slate-300/20"
        v-else
      >
        <div class="grid grid-cols-[auto_1fr] items-center gap-2 pb-4">
          <ModuleIcon
            :ownership="item.rank"
            :icon="item.icon"
            :group="`${type}s`"
          />
          <Select
            :options="getOptionsForType(type)"
            v-model="items[type].name"
          />
        </div>
        <div class="flex flex-col gap-2 pt-4">
          <template v-for="slot in SUBSTAT_SLOTS">
            <SubsSelect
              :options="getOptionsForSub(type, slot - 1)"
              v-model="item.subs[slot - 1]"
            />
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import ModuleIcon from "@/components/Modules/ModuleIcon.vue";
import { Icon } from "@iconify/vue";
import Button from "@/components/Button.vue";
import { getFirstEntryForNewPreviewItem, modules, SUBSTAT_SLOTS } from "@/data/modules";
import Select from "@/components/Select.vue";
import SubsSelect from "@/components/SubsSelect.vue";
import { ref, watch } from "vue";
import { bonuses } from "@/data/bonuses";

const items = ref({
  cannon: null,
  armor: null,
  generator: null,
  core: null,
});

const addNewItemToPreview = (type) => (items.value[type] = getFirstEntryForNewPreviewItem(type));

const getOptionsForType = (type) =>
  Object.keys(modules[`${type}s`]).reduce((acc, item) => {
    acc[item] = item;
    return acc;
  }, {});

const getOptionsForSub = (type, slot) => {
  const filteredTypeBonuses = Object.entries(bonuses[type]).filter(([key]) => !items.value[type].usedSubs.includes(key) || items.value[type].subs[slot]?.includes(key));
  const entries = {};

  filteredTypeBonuses.forEach((entry) => {
    entry[1].v.forEach((r, i) => {
      if (r !== null) {
        let colorClass;
        switch (i) {
          case 0:
            colorClass = "text-module-common";
            break;
          case 1:
            colorClass = "text-module-rare";
            break;
          case 2:
            colorClass = "text-module-epic";
            break;
          case 3:
            colorClass = "text-module-legendary";
            break;
          case 4:
            colorClass = "text-module-mythic";
            break;
          case 5:
            colorClass = "text-module-ancestral";
            break;

          default:
            break;
        }

        entries[`${entry[0]}_${i}`] = `<span class="${colorClass}">${entry[1].s.replace(":val", r)} ${entry[0]}</span>`;
      }
    });
  });

  return entries;
};

const isWatcherUpdating = ref(false);

watch(
  () => items.value,
  (newModel) => {
    if (isWatcherUpdating.value) return;

    isWatcherUpdating.value = true;

    let needsUpdate = false;
    const modelCopy = { ...newModel };

    Object.entries(modelCopy).forEach(([type, entry]) => {
      if (entry !== null) {
        let icon = modules[`${type}s`][entry.name].icon;

        if (entry.icon !== icon) {
          modelCopy[type].icon = icon;
          needsUpdate = true;
        }

        const usedSubs = entry.subs.filter((e) => e !== null).map((e) => e.split("_")[0]);
        if (JSON.stringify(modelCopy[type].usedSubs) !== JSON.stringify(usedSubs)) {
          modelCopy[type].usedSubs = usedSubs;
          needsUpdate = true;
        }
      }

      if (needsUpdate) {
        items.value = modelCopy;
      }

      isWatcherUpdating.value = false;
    });
  },
  { deep: true }
);
</script>

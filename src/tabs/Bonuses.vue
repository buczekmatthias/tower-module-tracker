<template>
  <div class="flex flex-col items-center gap-4 md:w-fit">
    <div class="flex flex-col gap-4 xl:self-start border border-solid border-slate-300/30 rounded-md p-3">
      <p class="text-xl">Rarity chance</p>
      <div class="flex flex-wrap divide-x divide-slate-300/10">
        <p
          v-for="(odd, i) in odds"
          :key="i"
          class="px-4 first:pl-0 last:pr-0"
          :class="{
            'text-module-common': i === 'common',
            'text-module-rare': i === 'rare',
            'text-module-epic': i === 'epic',
            'text-module-legendary': i === 'legendary',
            'text-module-mythic': i === 'mythic',
            'text-module-ancestral': i === 'ancestral',
          }"
        >
          {{ odd }}%
        </p>
      </div>
    </div>
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div
        class="flex flex-col gap-2 w-full"
        v-for="[group, vals] in Object.entries(bonuses)"
        :key="group"
      >
        <p class="capitalize text-3xl">{{ group }}</p>
        <div class="overflow-x-auto">
          <table class="border-collapse table-fixed min-w-full">
            <tbody>
              <tr
                v-for="[bonus, content] in Object.entries(vals)"
                :key="bonus"
              >
                <td class="p-3 border border-slate-300/40 whitespace-nowrap">{{ bonus }}</td>
                <td
                  v-for="(val, i) in content.v"
                  :key="i"
                  class="text-center py-3 px-5 border border-slate-300/40"
                  :class="{
                    'bg-module-common/30': i === 0,
                    'bg-module-rare/30': i === 1,
                    'bg-module-epic/30': i === 2,
                    'bg-module-legendary/30': i === 3,
                    'bg-module-mythic/30': i === 4,
                    'bg-module-ancestral/20': i === 5,
                  }"
                >
                  <template v-if="val === null"> --- </template>
                  <template v-else>
                    {{ content.s.replace(":val", val) }}
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { odds, bonuses } from "@/data/bonuses";
</script>

<template>
  <div class="order-last flex flex-col gap-3.5 text-slate-600 text-xs max-w-2xl w-full">
    <p>TheTower &copy; _.hazy</p>
    <div class="flex gap-5 flex-wrap">
      <a
        :href="link.href"
        v-for="link in tools"
        :key="link.name"
        class="hover:underline underline-offset-4"
        target="_blank"
      >
        {{ link.name }}
      </a>
    </div>
  </div>
</template>

<script setup>
const tools = [
  {
    name: "Lab speed-up calculator",
    href: "https://tower-lab-speedup-calc.vercel.app/",
  },
  {
    name: "Card tracker",
    href: "https://tower-card-tracker.vercel.app/",
  },
  {
    name: "thetower.tools",
    href: "https://thetower.tools/",
  },
];
</script>

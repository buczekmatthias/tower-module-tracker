<template>
  <div class="border-t border-solid border-t-container p-container flex flex-col gap-4 mt-auto">
    <p>Made by _.hazy</p>
    <div class="flex flex-col gap-3">
      <p>My other tools</p>
      <div class="flex flex-wrap gap-4">
        <a
          :href="link.href"
          v-for="link in tools"
          :key="link.name"
          class="link"
          target="_blank"
        >
          {{ link.name }}
        </a>
      </div>
    </div>
    <p>
      Check other tools on
      <a
        href="https://thetower.tools/"
        class="link"
        target="_blank"
      >
        thetower.tools
      </a>
    </p>
  </div>
</template>

<script setup>
const tools = [
  {
    name: "Card tracker",
    href: "https://tower-card-tracker.vercel.app/",
  },
  {
    name: "Lab speed-up calculator",
    href: "https://tower-lab-speedup-calc.vercel.app/",
  }
];
</script>

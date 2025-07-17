<template>
  <Modules v-if="tab === 'modules'" />
  <Bonuses v-else-if="tab === 'bonuses'" />
  <Share v-else-if="tab === 'share'" />
  <Transfer v-else />
  <Navigation v-model="tab" />
  <Footer />
</template>

<script setup>
import { ref } from "vue";

import Modules from "@/tabs/Modules.vue";
import Bonuses from "@/tabs/Bonuses.vue";
import Share from "@/tabs/Share.vue";
import Transfer from "@/tabs/Transfer.vue";
import Navigation from "@/tabs/components/Navigation.vue";
import Footer from "@/tabs/components/Footer.vue";

const tab = ref("modules");
</script>

import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import VueLazyLoad from "vue-lazyload";

createApp(App).use(VueLazyLoad).mount("#app");

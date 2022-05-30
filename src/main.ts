import { createApp } from "vue";
import { createPinia } from "pinia";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";

import VueApexCharts from "vue3-apexcharts";
import ApexCharts from "apexcharts";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VCalendar from "v-calendar";
import "v-calendar/dist/style.css";
import axios from "axios";

import App from "./App.vue";
import router from "./router";

library.add(fas, far)

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PerfectScrollbar);
app.use(VueApexCharts);
app.use(VCalendar, {});
app.config.globalProperties.$apexcharts = ApexCharts;
app.config.globalProperties.$axios = axios;

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount("#app");

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $apexcharts: typeof ApexCharts;
    }
};

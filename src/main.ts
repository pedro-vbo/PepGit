import { createApp } from "vue";
import App from "./App.vue";

/*
TIP: To get started with clean router change path to @/router/clean.ts.
 */
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import i18n from "@/core/plugins/i18n";

//imports for app initialization
import MockAdapter from "@/core/mock/MockService.ts";
import ApiService from "@/core/services/ApiService.ts";
import { initApexCharts } from "@/core/plugins/apexcharts";
import { initVueTheMask } from "@/core/plugins/vue-the-mask";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import { initVeeValidate } from "@/core/plugins/vee-validate.ts";
import VueViewer from 'v-viewer'

import "@/core/plugins/keenthemes.ts";
import "@/core/plugins/prismjs.ts";
import "bootstrap";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(VueViewer);


ApiService.init(app);
initVueTheMask(app);
//MockAdapter.init(app);
//initApexCharts(app);
initInlineSvg(app);
initVeeValidate();

app.use(i18n);

app.mount("#app");

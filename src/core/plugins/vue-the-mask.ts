import { App } from "vue";
import VueTheMask from "vue-the-mask";

/**
 * Initialize VueApexChart component
 * @param app vue instance
 */
export function initVueTheMask(app: App<Element>) {
  app.use(VueTheMask);
}

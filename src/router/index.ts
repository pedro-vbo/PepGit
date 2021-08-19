import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { Mutations, Actions } from "@/store/enums/StoreEnums";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layout/Layout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/pages/Dashboard.vue")
      },
      {
        path: "/cadastrar-laudo/:analiseId?",
        name: "Cadastrar-laudo",
        component: () => import("@/views/pages/Laudo.vue")
      },
      {
        path: "/cadastrar-evidencias-laudo/:analiseId",
        name: "Cadastrar-evidencias-laudo",
        component: () => import("@/views/pages/Evidencias.vue")
      }
    ]
  },
  {
    path: "/laudo/:laudoId",
    name: "laudo",
    component: () => import("@/views/Laudo.vue")
  },
  {
    path: "/check-laudo",
    name: "check-laudo",
    component: () => import("@/views/CheckLaudo.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/SignIn.vue")
  },
  {
    path: "/password-reset",
    name: "password-reset",
    component: () => import("@/views/auth/PasswordReset.vue")
  },
  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: () => import("@/views/error/Error404.vue")
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/error/Error500.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404"
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(() => {
  // reset config to initial state
  store.commit(Mutations.RESET_LAYOUT_CONFIG);

  //store.dispatch(Actions.VERIFY_AUTH);

  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

export default router;

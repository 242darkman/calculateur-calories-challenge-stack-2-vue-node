import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

import { route } from "quasar/wrappers";
import routes from "./routes";

function isTokenValid({ accessToken }) {
  try {
    const { exp } = JSON.parse(atob(accessToken.split(".")[1]));

    // Vérifie si le token est expiré
    return Date.now() < exp * 1000;
  } catch {
    return false;
  }
}

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken || !isTokenValid({ accessToken })) {
        localStorage.removeItem("access_token");
        return next({ name: "login" });
      }
    }
    next();
  });

  return Router;
});

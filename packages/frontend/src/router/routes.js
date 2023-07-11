const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("src/pages/home/HomePage.vue"),
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("src/pages/user/UserProfile.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "register",
        name: "register",
        component: () => import("src/pages/auth/Register.vue"),
        beforeEnter: (to, from, next) => {
          if (!localStorage.getItem("access_token")) {
            next();
          } else {
            next({ name: "home" });
          }
        },
      },
      {
        path: "login",
        name: "login",
        component: () => import("src/pages/auth/Login.vue"),
        beforeEnter: (to, from, next) => {
          if (!localStorage.getItem("access_token")) {
            next();
          } else {
            next({ name: "home" });
          }
        },
      },
      {
        path: "add-recipe",
        component: () => import("src/pages/recipes/AddRecipePage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;

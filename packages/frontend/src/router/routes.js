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
      },
      {
        path: "login",
        component: () => import("src/pages/Login.vue"),
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

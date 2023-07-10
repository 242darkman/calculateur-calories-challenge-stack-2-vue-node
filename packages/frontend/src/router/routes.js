const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/HomePage.vue") },
      {
        path: "Register",
        component: () => import("src/pages/Register.vue"),
      },
      {
        path: "login",
        component: () => import("src/pages/Login.vue"),
      },
      {
        path: "add-recipe",
        component: () => import("src/pages/AddRecipePage.vue"),
      },
      {
        path: "add-ingredient",
        component: () => import("src/pages/AddIngredient.vue"),
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

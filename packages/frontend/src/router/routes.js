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
        path: "add-recipe",
        component: () => import("src/pages/AddRecipePage.vue"),
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

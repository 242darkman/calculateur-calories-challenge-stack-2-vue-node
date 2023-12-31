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
        path: "details-recipe/:id",
        name: "details-recipe",
        component: () => import("src/pages/recipes/DetailsRecipePage.vue"),
        meta: { requiresAuth: true },
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
        component: () => import("src/pages/recipes/CreateRecipePage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "ingredient-referentiel",
        name: "ingredientReferentiel",
        component: () =>
          import("src/pages/ingredientReferentiel/ingredientReferentiel.vue"),
      },
      {
        path: "edit-referentiel/:id",
        name: "editReferentiel",
        component: () =>
          import("src/pages/ingredientReferentiel/editReferentiel.vue"),
          meta: { requiresAuth: true },
      },
      {
        path: "create-referentiel",
        name: "createReferentiel",
        component: () =>
          import("src/pages/ingredientReferentiel/createReferentiel.vue"),
          meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;

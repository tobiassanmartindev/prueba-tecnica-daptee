// router/index.ts

import { createRouter, createWebHistory } from "vue-router/auto";
import { routes } from "vue-router/auto-routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      component: () => import("../layouts/LoginLayout.vue"),
    },
    {
      component: () => import("../layouts/MainLayout.vue"),
      children: [
        {
          path: "/usuarios",
          name: "usuarios",
          meta: {
            icon: "mdi-account-multiple",
            title: "Usuarios",
          },
          component: () => import("../pages/usuariosPage.vue"),
        },
        {
          path: "/productos",
          name: "productos",
          meta: {
            icon: "mdi-store",
            title: "Productos",
          },
          component: () => import("../pages/productosPage.vue"),
        },
      ],
    },
  ],
});

// antes de avanzar a la siguiente ruta verifica si esta logeado

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("authToken");
  if (to.path !== "/login" && !token) {
    next("/login");
  } else {
    next();
  }
});

router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;

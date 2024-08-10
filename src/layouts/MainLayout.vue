<template>
  <v-app>
    <v-card>
      <v-layout>
        <v-app-bar color="teal-accent-4" prominent>
          <v-app-bar-nav-icon
            variant="text"
            @click="drawer = !drawer"
            class="d-xl-none d-lg-none"
          ></v-app-bar-nav-icon>
          <div class="w-33 mx-auto" id="filterTable">
            <v-text-field
              :loading="loading"
              append-inner-icon="mdi-magnify"
              density="compact"
              :label="'Filtrar' + ' ' + route.name"
              variant="solo"
              hide-details
              single-line
              v-model="activeSearch"
            ></v-text-field>
          </div>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-avatar
                v-bind="props"
                color="white"
                class="mr-4 cursor-pointer"
              >
                <img
                  src="https://api.dicebear.com/9.x/micah/svg?seed=Cookie"
                  alt="avatar"
                />
              </v-avatar>
            </template>
            <v-list class="mt-4 bg-white">
              <v-list-item class="cursor-pointer">
                <v-icon icon="mdi-account"></v-icon> Mi cuenta
              </v-list-item>
              <v-list-item class="cursor-pointer" @click="initTutorial">
                <v-icon icon="mdi-help-circle-outline"></v-icon> Ayuda
              </v-list-item>
              <v-list-item @click="logout" class="cursor-pointer">
                <v-icon class="text-red" icon="mdi-logout"></v-icon> Cerrar
                sesion
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar>
        <v-navigation-drawer
          id="aside"
          expand-on-hover
          rail
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          v-model="drawer"
        >
          <v-list>
            <v-list-item>
              <v-avatar class="w-75 mx-auto d-flex" rounded tile>
                <v-img :src="avatar" contain></v-img>
              </v-avatar>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list v-for="page in filteredRoutes" density="compact" nav>
            <v-list-item
              :prepend-icon="page.meta.icon"
              :title="page.meta.title"
              :to="page.path"
            ></v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main style="height: 100vh">
          <router-view />
        </v-main>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAppStore } from "@/stores/app";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const avatar = ref("/LogoDapteeCabeza.png");
const drawer = ref(true);

const routes = computed(() => {
  return router.getRoutes();
});

const filteredRoutes = computed(() => {
  return routes.value.filter(
    (route) => route.path && route.path !== "/" && route.path !== "/login"
  );
});

// propiedad computada `activeSearch` gestiona los valores de busqueda segun la ruta actual,
// obteniendo o estableciendo los valores de busqueda en store para las vistas de "productos" o "usuarios".
const activeSearch = computed({
  get() {
    if (route.name === "productos") {
      return appStore.search.products;
    } else if (route.name === "usuarios") {
      return appStore.search.users;
    }
    return "";
  },
  set(value) {
    if (route.name === "productos") {
      appStore.setSearch("products", value);
    } else if (route.name === "usuarios") {
      appStore.setSearch("users", value);
    }
  },
});

const driverObj = driver({
  nextBtnText: "Siguiente",
  prevBtnText: "Anterior",
  doneBtnText: "Cerrar",

  showProgress: true,
  steps: [
    {
      element: "#aside",
      popover: {
        title: "Pantallas",
        description:
          "Aquí puedes ver el menú de navegación donde puedes seleccionar diferentes pantallas o secciones de la aplicación.",
        side: "left",
        align: "start",
      },
    },
    {
      element: "#basicTable",
      popover: {
        title: "Tabla de Registros",
        description:
          "Esta es la tabla principal donde se muestran todos los registros. Puedes visualizar los datos aquí.",
        side: "top",
        align: "center",
      },
    },
    {
      element: "#filterTable",
      popover: {
        title: "Filtro de Registros",
        description:
          "Aquí puedes buscar y filtrar los registros en la tabla para encontrar información específica rápidamente.",
        side: "top",
        align: "center",
      },
    },
    {
      element: "#basicTable tr:nth-child(2)",
      popover: {
        title: "Opciones de Registro",
        description:
          "Cada fila tiene opciones al final, en ella podras ver las opciones para cada registro tales como ver el detalle y eliminar",
        side: "left",
        align: "center",
      },
    },
  ],
});

function handleMouseEnter() {
  avatar.value = "/LogoDaptee.svg";
}

function handleMouseLeave() {
  setTimeout(() => {
    avatar.value = "/LogoDapteeCabeza.png";
  }, 150);
}

function logout() {
  localStorage.removeItem("authToken");
  router.push("/login");
}

function initTutorial() {
  driverObj.drive();
}
</script>

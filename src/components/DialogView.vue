<template>
  <v-dialog width="700">
    <v-card
      max-width="700"
      prepend-icon="mdi-note"
      :title="'Datos del ' + activeItems"
    >
      <v-row>
        <v-col>
          <v-list-item-group v-if="activeItems == 'producto'">
            <v-list-item>
              <span class="font-weight-bold">Nombre</span>:
              {{ appStore.itemSelected.name }}
            </v-list-item>
            <v-list-item>
              <span class="font-weight-bold">Stock</span>:
              {{ appStore.itemSelected.stock }}
            </v-list-item>
            <v-list-item>
              <span class="font-weight-bold">Precio</span>:
              {{ appStore.itemSelected.price }}
            </v-list-item>
            <v-list-item>
              <span class="font-weight-bold">Categoria</span>:
              {{ appStore.itemSelected.category }}
            </v-list-item>
            <v-list-item>
              <span class="font-weight-bold">Id</span>:
              {{ appStore.itemSelected.id }}
            </v-list-item>
          </v-list-item-group>
          <v-list-item-group v-else>
            <v-list-item>
              <span class="font-weight-bold">Nombre</span>:
              {{ appStore.itemSelected.name }}
            </v-list-item>
            <v-list-item>
              <span class="font-weight-bold">Ciudad</span>:
              {{ appStore.itemSelected.city }}
            </v-list-item>
            <v-list-item>
              <span class="font-weight-bold">Usuario</span>:
              {{ appStore.itemSelected.user }}
            </v-list-item>
            <v-list-item>
              <span class="font-weight-bold">Id</span>:
              {{ appStore.itemSelected.id }}
            </v-list-item>
          </v-list-item-group>
        </v-col>
        <v-col>
          <v-img width="250" cover :src="appStore.itemSelected.image"></v-img>
        </v-col>
      </v-row>
      <template v-slot:actions>
        <v-btn
          class="ms-auto"
          text="Cerrar"
          @click="appStore.dialogView = false"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useAppStore } from "@/stores/app";
import { useRoute } from "vue-router";

const route = useRoute();
const appStore = useAppStore();

const activeItems = computed(() => {
  if (route.name === "usuarios") {
    return "usuario";
  } else {
    return "producto";
  }
});
</script>

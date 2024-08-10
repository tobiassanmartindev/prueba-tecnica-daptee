<template>
  <v-dialog v-model="appStore.dialogDelete" width="300">
    <v-card max-width="700" :title="'Eliminar el ' + activeItems">
      <template v-slot:actions>
        <v-btn class="bg-red" text="Eliminar" @click="confirmDelete"></v-btn>
        <v-btn
          class=""
          text="Cerrar"
          @click="appStore.dialogDelete = false"
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

function confirmDelete() {
  const index = appStore.localRecords.findIndex(
    (record) => record.id === appStore.itemSelected.id
  );
  if (index !== -1) {
    appStore.localRecords.splice(index, 1);
  }
  appStore.dialogDelete = false;
  appStore.showAlert = true;

  setTimeout(() => {
    appStore.showAlert = false;
  }, 3000);
}
</script>

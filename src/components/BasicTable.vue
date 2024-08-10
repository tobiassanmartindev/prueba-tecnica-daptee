<template>
  <div class="ml-12 text-h5 mt-6 mb-5">{{ title }}</div>

  <v-data-table
    :headers="headers"
    :items="appStore.localRecords"
    :search="activeSearch"
    item-key="id"
    class="bg-blue-grey-darken-4 table mx-auto"
    fixed-header
    id="basicTable"
    :loading="loading"
  >
    <template v-slot:loading>
      <v-skeleton-loader></v-skeleton-loader>
    </template>
    <template v-slot:item.options="{ item }">
      <v-speed-dial location="left center" transition="scale-transition">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            class="ma-2"
            variant="text"
            icon="mdi-settings-helper pb-4"
          ></v-btn>
        </template>

        <v-btn
          key="1"
          class="bg-teal"
          @click="openDialog(item, 'view')"
          icon="mdi-eye"
        ></v-btn>
        <v-btn
          key="2"
          class="bg-red"
          @click="openDialog(item, 'delete')"
          icon="mdi-delete"
        ></v-btn>
      </v-speed-dial>
    </template>
    <template v-slot:item.price="{ item }">
      {{ formatPrice(item.price) }}
    </template>
  </v-data-table>
  <DialogView v-model="appStore.dialogView" />
  <DialogDelete v-model="appStore.dialogDelete" />
  <v-alert
    v-if="appStore.showAlert"
    title="Se eliminó el ítem"
    class="position-fixed bottom-0 right-0 mb-6 mr-6"
    type="success"
  ></v-alert>
</template>

<script setup>
import { computed, watch } from "vue";
import { useAppStore } from "@/stores/app";
import { useRoute } from "vue-router";
import DialogView from "./DialogView.vue";
import DialogDelete from "./DialogDelete.vue";

const props = defineProps({
  title: String,
  records: Array,
  headers: Array,
  loading: Boolean,
});

const appStore = useAppStore();
const route = useRoute();

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

function openDialog(item, action) {
  appStore.itemSelected = item;
  if (action === "view") {
    appStore.dialogView = true;
  } else {
    appStore.dialogDelete = true;
  }
}

function formatPrice(price) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}
</script>

<style scoped>
.table {
  height: 80vh;
  width: 95%;
}
</style>

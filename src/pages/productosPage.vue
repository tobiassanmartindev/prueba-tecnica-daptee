<template>
  <BasicTable
    :title="'Productos'"
    :records="products"
    :headers="headers"
    :loading="loading"
    :search="appStore.searchProducts"
  >
  </BasicTable>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAppStore } from "@/stores/app";
import axios from "axios";

const products = ref([]);
const loading = ref(true);
const appStore = useAppStore();

const headers = [
  { title: "Id", value: "id", align: "center", sortable: true },
  { title: "Nombre", value: "name", align: "center", sortable: true },
  { title: "Stock", value: "stock", align: "center", sortable: true },
  { title: "Precio", value: "price", align: "center", sortable: true },
  { title: "Categoria", value: "category", align: "center", sortable: true },
  { title: "Opciones", value: "options", align: "center", sortable: true },
];

const fetchProducts = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_APP_PRODUCTOS_URL);
    appStore.localRecords = response.data;
  } catch (error) {
    alert("no se pudo traer los productos");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

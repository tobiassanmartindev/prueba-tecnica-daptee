<template>
  <BasicTable
    :title="'Usuarios'"
    :records="appStore.localRecords"
    :headers="headers"
    :loading="loading"
    :search="appStore.searchUsers"
  ></BasicTable>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import BasicTable from "@/components/BasicTable.vue";
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
const users = ref([]);
const loading = ref(true);
const searchUsers = ref("");

const headers = [
  { title: "Id", value: "id", align: "center", sortable: true },
  { title: "Nombre", value: "name", align: "center", sortable: true },
  { title: "Usuario", value: "user", align: "center", sortable: true },
  { title: "Ciudad", value: "city", align: "center", sortable: true },
  { title: "Opciones", value: "options", align: "center", sortable: true },
];

const fetchUsers = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_APP_USUARIOS_URL);
    appStore.localRecords = response.data;
  } catch (error) {
    console.error("Error trayendo los datos:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

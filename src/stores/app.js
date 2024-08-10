// Utilities
import DialogView from "@/components/DialogView.vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    search: {
      products: "",
      users: "",
    },
    dialogView: false,
    dialogDelete: false,
    localRecords: [],
    itemSelected: {},
    showAlert: false,
  }),

  actions: {
    setSearch(type, value) {
      if (type === "products") {
        this.search.products = value;
      } else if (type === "users") {
        this.search.users = value;
      }
    },
  },
});

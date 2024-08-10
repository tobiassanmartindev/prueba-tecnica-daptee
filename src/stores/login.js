// Utilities
import { defineStore } from "pinia";
import router from "@/router";

export const useLoginStore = defineStore("login", {
  state: () => ({
    user: "",
    pass: "",
  }),
  actions: {
    login() {
      if (this.user === "Daptee" && this.pass === "Daptee2024") {
        localStorage.setItem("authToken", "dummy-token");
        router.push("/usuarios");
      } else {
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 2500);
      }
    },
  },
});

<template>
  <div
    class="d-flex justify-center align-center"
    style="height: 100vh; width: 100%; padding: 0"
  >
    <v-row class="d-flex align-center" no-gutters>
      <v-col cols="12" md="6" class="d-flex align-center pr-5 col-card">
        <v-card
          class="pa-12 pb-8"
          elevation="8"
          rounded="lg"
          max-width="380"
          width="100%"
          height="450"
        >
          <div class="text-h5 mb-6 font-weight-bold text-center">LOGIN</div>
          <div class="text-subtitle-1 text-medium-emphasis mb-1">Usuario</div>

          <v-text-field
            density="compact"
            placeholder="Ingresa tu usuario"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            v-model="loginStore.user"
          ></v-text-field>

          <div
            class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between mb-1"
          >
            Contraseña
          </div>

          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Ingresa tu contraseña"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
            class="mb-4"
            v-model="loginStore.pass"
          ></v-text-field>

          <v-btn
            class="mb-4"
            color="blue"
            size="large"
            variant="tonal"
            block
            @click="loginStore.login()"
            :disabled="!isFormValid"
          >
            Ingresar
          </v-btn>

          <transition name="fade">
            <v-alert
              v-if="loginStore.alert"
              text="Credenciales incorrectas"
              type="error"
              class="mb-4"
            ></v-alert>
          </transition>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" class="d-flex justify-start align-start">
        <v-img
          class="rounded d-none d-md-block"
          max-width="570"
          src="../../public/daptee_cover.jpg"
        ></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useLoginStore } from "@/stores/login";

const loginStore = useLoginStore();
const visible = ref(false);

const isFormValid = computed(() => {
  return loginStore.user.trim() !== "" && loginStore.pass.trim() !== "";
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.col-card {
  justify-content: end;
}

@media (max-width: 960px) {
  .col-card {
    justify-content: center;
  }
}
</style>

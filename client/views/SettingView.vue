<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import UpdateUserForm from "../components/Setting/UpdateUserForm.vue";

const { currentUsername } = storeToRefs(useUserStore());
const { logoutUser, deleteUser } = useUserStore();

async function logout() {
  await logoutUser();
  void router.push({ name: "Home" });
}

async function delete_() {
  await deleteUser();
  void router.push({ name: "Home" });
}
</script>

<template>
  <main class="column">
    <h1>Settings for {{ currentUsername }}</h1>
    <UpdateUserForm />
    <br />
    <button class="button-yellow exit" @click="logout">Logout</button>
    <button class="button-error exit" @click="delete_">Delete User</button>
    <br />
  </main>
</template>

<style scoped>
.column {
  max-width: 60em;
  margin: 0 auto;
}
button.exit {
  width: 20em;
}

h1 {
  padding-top: 0.5em;
}
</style>

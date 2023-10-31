<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const name = ref("");
const bio = ref("");
const avatar = ref("");
const { createUser, loginUser, updateSession } = useUserStore();

async function register() {
  await createUser(username.value, password.value, name.value, avatar.value, bio.value);
  await loginUser(username.value, password.value);
  void updateSession();
  void router.push({ name: "Home" });
}
// TODO: Add in profile
</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="register">
    <h3>Register User</h3>
    <fieldset>
      <div class="pure-control-group">
        <label for="aligned-username">Username</label>
        <input v-model.trim="username" type="text" id="aligned-username" placeholder="Username" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-password">Password</label>
        <input type="password" v-model.trim="password" id="aligned-password" placeholder="Password" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-name">Name</label>
        <input v-model.trim="name" id="aligned-name" placeholder="Display name" />
      </div>
      <div class="pure-control-group">
        <label for="aligned-bio">Bio</label>
        <input v-model.trim="bio" id="aligned-bio" placeholder="Profile bio" />
      </div>
      <div class="pure-control-group">
        <label for="aligned-avatar">Avatar</label>
        <input v-model.trim="avatar" id="aligned-avatar" placeholder="Profile avatar" />
      </div>
      <div class="pure-controls">
        <button type="submit" class="button-blue">Register</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
h3 {
  display: flex;
  justify-content: center;
}
</style>

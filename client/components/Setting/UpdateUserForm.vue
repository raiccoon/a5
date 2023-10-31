<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";

let username = ref("");
let name = ref("");
let bio = ref("");
let avatar = ref("");
let password = ref("");

const { updateUser, updateSession } = useUserStore();

async function updateUsername() {
  await updateUser({ username: username.value });
  await updateSession();
  username.value = "";
}

async function updateName() {
  try {
    await fetchy(`/api/profiles/name`, "PATCH", { body: { name: name.value } });
  } catch (e) {
    return;
  }
  name.value = "";
}

async function updateBio() {
  try {
    await fetchy(`/api/profiles/bio`, "PATCH", { body: { bio: bio.value } });
  } catch (e) {
    return;
  }
  bio.value = "";
}

async function updateAvatar() {
  try {
    await fetchy(`/api/profiles/avatar`, "PATCH", { body: { avatar: avatar.value } });
  } catch (e) {
    return;
  }
  avatar.value = "";
}

async function updatePassword() {
  await updateUser({ password: password.value });
  await updateSession();
  password.value = "";
}
</script>

<template>
  <h2>Update user details</h2>
  <form @submit.prevent="updateUsername" class="pure-form">
    <fieldset>
      <legend>Change your username</legend>
      <input type="text" placeholder="New username" v-model="username" required />
      <button type="submit" class="button-blue">Update</button>
    </fieldset>
  </form>

  <form @submit.prevent="updateName" class="pure-form">
    <fieldset>
      <legend>Change your display name</legend>
      <input type="text" placeholder="New name" v-model="name" required />
      <button type="submit" class="button-blue">Update</button>
    </fieldset>
  </form>

  <form @submit.prevent="updateBio" class="pure-form">
    <fieldset>
      <legend>Change your bio</legend>
      <input type="text" placeholder="New bio" v-model="bio" required />
      <button type="submit" class="button-blue">Update</button>
    </fieldset>
  </form>

  <form @submit.prevent="updateAvatar" class="pure-form">
    <fieldset>
      <legend>Change your avatar</legend>
      <input type="text" placeholder="New link to avatar image" v-model="avatar" required />
      <button type="submit" class="button-blue">Update</button>
    </fieldset>
  </form>

  <form @submit.prevent="updatePassword" class="pure-form">
    <fieldset>
      <legend>Change your password</legend>
      <input type="password" placeholder="New password" v-model="password" required />
      <button type="submit" class="button-blue">Update</button>
    </fieldset>
  </form>
</template>

<script setup lang="ts">
import UserAvatar from "@/components/UserAvatar.vue";
import router from "@/router";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";

const props = defineProps(["username"]);

const loaded = ref(false);
let name = ref("");
let avatar = ref("");
let bio = ref("");

// TODO: Show all users / make a user search, and add "add to collection" to main profile

async function getProfile() {
  let profileResults;
  try {
    profileResults = await fetchy("/api/profiles", "GET", { query: { username: props.username } });
  } catch (_) {
    return;
  }
  name.value = profileResults.profile.name;
  avatar.value = profileResults.profile.avatar;
  bio.value = profileResults.profile.bio;
}

async function viewUser() {
  void router.push({ name: "Profile", query: { username: props.username } });
}

onBeforeMount(async () => {
  await getProfile();
  loaded.value = true;
});
</script>

<template>
  <section class="profile">
    <section id="avatar">
      <UserAvatar :img="avatar" width="70" />
    </section>
    <section id="info">
      <p class="user">{{ name }} @{{ props.username }}</p>
      <button class="pure-button pure-button-primary" @click="viewUser()">View User</button>
    </section>
  </section>
</template>

<style>
.profile {
  display: flex;
  flex-direction: row;
  gap: 1em;
  align-items: center;
}
.user {
  font-weight: bold;
  font-size: 1.2em;
  padding-bottom: 1em;
}
</style>

<script setup lang="ts">
import UserAvatar from "@/components/UserAvatar.vue";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";

const props = defineProps(["username"]);

const loaded = ref(false);
let name = ref("");
let avatar = ref("");
let bio = ref("");

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
    <section>
      <h2>{{ name }} @{{ props.username }}</h2>
    </section>
  </section>
</template>

<style>
.profile {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
</style>

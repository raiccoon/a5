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
  <section class="header">
    <section id="avatar">
      <UserAvatar :img="avatar" width="100" />
    </section>
    <section>
      <h1>{{ name }} @{{ props.username }}</h1>
      <p>{{ bio }}</p>
    </section>
  </section>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  margin: 0 auto;
  max-width: 60em;
  padding: 1em 0 1em;
}
</style>

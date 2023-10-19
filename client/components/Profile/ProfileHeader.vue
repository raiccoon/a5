<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";

const props = defineProps(["username"]);

const loaded = ref(false);
let name = ref("");
let bio = ref("");

async function getProfile() {
  let profileResults;
  try {
    profileResults = await fetchy("/api/profiles", "GET", { query: { username: props.username } });
  } catch (_) {
    return;
  }
  name.value = profileResults.profile.name;
  bio.value = profileResults.profile.bio;
}

onBeforeMount(async () => {
  await getProfile();
  loaded.value = true;
});
</script>

<template>
  <h1>{{ name }} @{{ props.username }}</h1>
  <p>{{ bio }}</p>
</template>

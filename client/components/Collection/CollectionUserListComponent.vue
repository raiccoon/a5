<script setup lang="ts">
import MiniProfileComponent from "@/components/Profile/MiniProfileComponent.vue";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";

const loaded = ref(false);
let users = ref<Array<Record<string, string>>>([]);
const props = defineProps(["collection"]);

async function getUsers(collection: string) {
  let collectionResults;
  try {
    collectionResults = await fetchy(`api/user_collections/${collection}/users`, "GET");
  } catch (_) {
    return;
  }
  users.value = collectionResults;
}

onBeforeMount(async () => {
  await getUsers(props.collection);
  loaded.value = true;
});
</script>

<template>
  <section class="users" v-if="loaded && users.length !== 0">
    <h2>{{ collection.name }}</h2>
    <article v-for="user in users" :key="user._id">
      <MiniProfileComponent :username="user.username" />
    </article>
  </section>
</template>

<style scoped>
.users {
  padding: 1em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}
</style>

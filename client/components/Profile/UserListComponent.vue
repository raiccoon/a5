<script setup lang="ts">
import MiniProfileComponent from "@/components/Profile/MiniProfileComponent.vue";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";
import SearchUserForm from "./SearchUserForm.vue";

const loaded = ref(false);
let users = ref<Array<Record<string, string>>>([]);
let searchUsername = ref("");

async function getUsers(user?: string) {
  let query: Record<string, string> = user !== undefined ? { user } : {};
  let userResults;
  try {
    userResults = await fetchy("/api/users", "GET", { query });
  } catch (_) {
    return;
  }
  searchUsername.value = user ? user : "";
  users.value = userResults;
}

onBeforeMount(async () => {
  await getUsers();
  loaded.value = true;
});
</script>

<template>
  <div class="row">
    <h2 v-if="!searchUsername">Users:</h2>
    <h2 v-else>Users by {{ searchUsername }}:</h2>
    <SearchUserForm @getUserByUsername="getUsers" />
  </div>
  <section class="users" v-if="loaded && users.length !== 0">
    <article v-for="user in users" :key="user._id">
      <MiniProfileComponent :username="user.username" @refreshUsers="getUsers" />
    </article>
  </section>
  <p v-else-if="loaded">No users found</p>
  <p v-else>Loading...</p>
</template>

<style>
.users {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
}

.users,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
}
</style>

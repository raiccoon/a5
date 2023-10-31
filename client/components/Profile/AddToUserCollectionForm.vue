<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["username"]);
const collection = ref("");
let collections = ref<Array<Record<string, string>>>([]);
const emit = defineEmits(["addUserToCollection"]);

const { currentUsername } = storeToRefs(useUserStore());

async function getUserCollections() {
  // TODO: Filter out collections that already contain user
  let collectionResults;
  try {
    collectionResults = await fetchy(`api/user_collections/${currentUsername.value}`, "GET");
  } catch (_) {
    return;
  }
  collections.value = collectionResults.collections;
}

const addToCollection = async (collection: string) => {
  try {
    await fetchy(`/api/user_collections/${collection}/users`, "POST", { body: { username: props.username } });
  } catch (e) {
    return;
  }
  emit("addUserToCollection");
};

onBeforeMount(async () => {
  await getUserCollections();
});
</script>

<template>
  <form @submit.prevent="addToCollection(collection)">
    <select id="collection" v-model="collection">
      <option disabled value="">Add to collection:</option>
      <option v-for="collection in collections" :key="collection._id" :value="collection._id">{{ collection.label }}</option>
    </select>
    <button class="btn-small button-yellow" type="submit">Save</button>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  max-width: 60em;
  margin: 0 auto;
}
</style>

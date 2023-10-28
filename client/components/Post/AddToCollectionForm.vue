<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post"]);
const collection = ref("");
let collections = ref<Array<Record<string, string>>>([]);
const emit = defineEmits(["addPostToCollection", "refreshPosts"]);

const { currentUsername } = storeToRefs(useUserStore());

async function getPostCollections() {
  let collectionResults;
  try {
    collectionResults = await fetchy(`api/post_collections/${currentUsername.value}`, "GET");
  } catch (_) {
    return;
  }
  collections.value = collectionResults.collections;
}

const addToCollection = async (collection: string) => {
  try {
    await fetchy(`/api/post_collections/${collection}/posts`, "POST", { body: { post: props.post._id } });
  } catch (e) {
    return;
  }
  emit("addPostToCollection");
  emit("refreshPosts");
};

onBeforeMount(async () => {
  await getPostCollections();
});
</script>

<template>
  <p class="author">{{ props.post.author }}</p>
  <p>{{ props.post.content }}</p>
  <form @submit.prevent="addToCollection(collection)">
    <select id="collection" v-model="collection">
      <option disabled value="">Add to collection:</option>
      <option v-for="collection in collections" :key="collection._id" :value="collection._id">{{ collection.label }}</option>
    </select>
    <button class="btn-small pure-button-primary pure-button" type="submit">Save</button>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  border-radius: 4px;
  resize: none;
}

p {
  margin: 0em;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}
</style>

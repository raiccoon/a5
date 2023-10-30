<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const { currentUsername } = storeToRefs(useUserStore());

const content = ref("");
const image = ref("");
const selectedCollections = ref<Array<string>>([]);
let collections = ref<Array<Record<string, string>>>([]);
const makePublic = ref(true);

const createPost = async (content: string) => {
  try {
    await fetchy("/api/posts", "POST", {
      body: { content, isPublic: makePublic.value, viewerCollections: selectedCollections.value, image: image.value },
    });
  } catch (_) {
    return;
  }
  void router.push({ name: "Profile" });
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
};

async function getUserCollections() {
  let collectionResults;
  try {
    collectionResults = await fetchy(`api/user_collections/${currentUsername.value}`, "GET");
  } catch (_) {
    return;
  }
  collections.value = collectionResults.collections;
}

onBeforeMount(async () => {
  await getUserCollections();
});
</script>

<template>
  <h2>Create a post:</h2>
  <form @submit.prevent="createPost(content)">
    <label for="content">Post Contents:</label>
    <textarea id="content" v-model="content" placeholder="Create a post!" required> </textarea>

    <textarea id="image" v-model="image" placeholder="Add an image URL if you'd like!"> </textarea>

    <section class="makePublic">
      <label for="makePublic">Make public?</label>
      <input type="checkbox" id="makePublic" v-model="makePublic" />
    </section>

    <select v-if="!makePublic" id="collection" v-model="selectedCollections" multiple>
      <option disabled value="">Add to collection:</option>
      <option v-for="collection in collections" :key="collection._id" :value="collection._id">{{ collection.label }}</option>
    </select>

    <button type="submit" class="pure-button-primary pure-button">New Post</button>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}

.makePublic {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
}
</style>

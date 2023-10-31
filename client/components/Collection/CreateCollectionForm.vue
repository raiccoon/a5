<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const { currentUsername } = storeToRefs(useUserStore());

const type = ref("");
const content = ref("");
const selectedCollections = ref<Array<string>>([]);
let collections = ref<Array<Record<string, string>>>([]);
const makePublic = ref(true);

const createCollection = async (type: string, content: string) => {
  if (type == "post") {
    try {
      await fetchy("/api/post_collections", "POST", {
        body: { label: content, isPublic: makePublic.value, viewerCollections: selectedCollections.value },
      });
    } catch (_) {
      return;
    }
    void router.push({ name: "Profile" });
    emptyForm();
  } else if (type == "user") {
    try {
      await fetchy("/api/user_collections", "POST", {
        body: { label: content, isPublic: makePublic.value, viewerCollections: selectedCollections.value },
      });
    } catch (_) {
      return;
    }
    void router.push({ name: "Profile" });
    emptyForm();
  }
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
  <h2>Create a collection:</h2>
  <form @submit.prevent="createCollection(type, content)">
    <label for="content">Collection Name:</label>
    <textarea id="content" v-model="content" placeholder="Enter a name for your new collection!" required> </textarea>
    <label for="type">Collection Type</label>
    <select v-model="type">
      <option disabled value="">Please select one</option>
      <option value="post">Post Collection</option>
      <option value="user">User Collection</option>
    </select>

    <section class="makePublic">
      <label for="makePublic">Make public?</label>
      <input type="checkbox" id="makePublic" v-model="makePublic" />
    </section>

    <select v-if="!makePublic" id="collection" v-model="selectedCollections" multiple>
      <option disabled value="">Add to collection:</option>
      <option v-for="collection in collections" :key="collection._id" :value="collection._id">{{ collection.label }}</option>
    </select>
    <button type="submit" class="button-blue">Create Collection</button>
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

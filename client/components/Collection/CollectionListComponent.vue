<script setup lang="ts">
import router from "@/router";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";
import CollectionItemComponent from "./CollectionItemComponent.vue";

const loaded = ref(false);
let collections = ref<Array<Record<string, string>>>([]);
const props = defineProps(["isPostCollection", "owner"]);

async function getPostCollections(owner: string) {
  let collectionResults;
  try {
    collectionResults = await fetchy(`api/post_collections/${owner}`, "GET");
  } catch (_) {
    return;
  }
  collections.value = collectionResults.collections;
}

async function getUserCollections(owner: string) {
  let collectionResults;
  try {
    collectionResults = await fetchy(`api/user_collections/${owner}`, "GET");
  } catch (_) {
    return;
  }
  collections.value = collectionResults.collections;
}

// async function viewCollection(collection: string, isPostCollection: bool) {
//   void router.push({ name: "Home" });
// }

async function viewCollection() {
  void router.push({ name: "Home" });
}

onBeforeMount(async () => {
  if (props.isPostCollection) {
    await getPostCollections(props.owner);
  } else {
    await getUserCollections(props.owner);
  }
  loaded.value = true;
});
</script>

<template>
  <section class="collections" v-if="loaded && collections.length !== 0">
    <h2 v-if="isPostCollection">Post Collections:</h2>
    <h2 v-else>User Collections:</h2>
    <article v-for="collection in collections" :key="collection._id">
      <CollectionItemComponent :collection="collection" @click="viewCollection()" />
    </article>
  </section>
</template>

<style scoped>
.collections {
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

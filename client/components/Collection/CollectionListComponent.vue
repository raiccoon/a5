<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";
import CollectionItemComponent from "./CollectionItemComponent.vue";

const loaded = ref(false);
let collections = ref<Array<Record<string, string>>>([]);
const props = defineProps(["type", "owner"]);

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

onBeforeMount(async () => {
  if (props.type == "post") {
    await getPostCollections(props.owner);
  } else if (props.type == "user") {
    await getUserCollections(props.owner);
  }
  loaded.value = true;
});
</script>

<template>
  <section class="collections" v-if="loaded && collections.length !== 0">
    <h2 v-if="props.type == 'post'">Post Collections:</h2>
    <h2 v-else-if="props.type == 'user'">User Collections:</h2>
    <article v-for="collection in collections" :key="collection._id">
      <CollectionItemComponent :type="props.type" :collection="collection" />
    </article>
  </section>
</template>

<style scoped>
.collections {
  padding: 1em;
  margin: 0 auto;
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
</style>

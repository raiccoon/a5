<script setup lang="ts">
import PostComponent from "@/components/Post/PostComponent.vue";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";

const loaded = ref(false);
let posts = ref<Array<Record<string, string>>>([]);
const props = defineProps(["collection"]);

async function getPosts(collection: string) {
  let collectionResults;
  try {
    collectionResults = await fetchy(`api/post_collections/${collection}/posts`, "GET");
  } catch (_) {
    return;
  }
  posts.value = collectionResults.posts;
}

onBeforeMount(async () => {
  await getPosts(props.collection);
  loaded.value = true;
});
</script>

<template>
  <section class="posts" v-if="loaded && posts.length !== 0">
    <article v-for="post in posts" :key="post._id">
      <PostComponent :post="post" />
    </article>
  </section>
  <section v-else-if="loaded">No posts in collection</section>
</template>

<style scoped>
section {
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
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

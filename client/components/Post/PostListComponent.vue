<script setup lang="ts">
import EditPostForm from "@/components/Post/EditPostForm.vue";
import PostComponent from "@/components/Post/PostComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import AddToCollectionForm from "./AddToCollectionForm.vue";
import SearchPostForm from "./SearchPostForm.vue";

const { currentUsername } = storeToRefs(useUserStore());

const loaded = ref(false);
let posts = ref<Array<Record<string, string>>>([]);
let editing = ref("");
let adding = ref("");
let searchAuthor = ref("");
let searchAuthorCollection = ref("");
let collections = ref<Array<Record<string, string>>>([]);
const props = defineProps(["profileAuthor"]);

async function getPosts(author?: string) {
  let query: Record<string, string> = author !== undefined ? { author } : {};
  let postResults;
  try {
    postResults = await fetchy("/api/posts", "GET", { query });
  } catch (_) {
    return;
  }
  searchAuthor.value = author ? author : "";
  searchAuthorCollection.value = "";
  posts.value = postResults;
}

async function getPostsByAuthorCollection(collection: string) {
  let postResults;
  try {
    postResults = await fetchy("/api/posts/byAuthor", "GET", { query: { author_collection: collection } });
    console.log("filtered");
  } catch (_) {
    return;
  }
  searchAuthor.value = "";
  searchAuthorCollection.value = collection;
  posts.value = postResults;
  console.log("filtered by collection");
}

async function getUserCollections() {
  let collectionResults;
  try {
    collectionResults = await fetchy(`api/user_collections/${currentUsername.value}`, "GET");
  } catch (_) {
    return;
  }
  collections.value = collectionResults.collections;
}

function updateEditing(id: string) {
  editing.value = id;
}

function updateAdding(id: string) {
  adding.value = id;
}

onBeforeMount(async () => {
  if (props.profileAuthor) {
    await getPosts(props.profileAuthor);
  } else {
    await getPosts();
  }
  await getUserCollections();
  loaded.value = true;
});
</script>

<template>
  <div class="row">
    <h2 v-if="!searchAuthor">Posts:</h2>
    <h2 v-else>Posts by {{ searchAuthor }}:</h2>
    <SearchPostForm v-if="loaded && !props.profileAuthor" :collections="collections" @getPostsByAuthor="getPosts" @getPostsByAuthorCollection="getPostsByAuthorCollection" />
  </div>
  <section class="posts" v-if="loaded && posts.length !== 0">
    <article v-for="post in posts" :key="post._id">
      <PostComponent v-if="editing !== post._id && adding !== post._id" :post="post" @refreshPosts="getPosts" @editPost="updateEditing" @addPostToCollection="updateAdding" />
      <AddToCollectionForm v-else-if="adding === post._id" :post="post" @addPostToCollection="updateAdding" />
      <EditPostForm v-else :post="post" @refreshPosts="getPosts" @editPost="updateEditing" />
    </article>
  </section>
  <p v-else-if="loaded">No posts found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
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

.posts {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
}
</style>

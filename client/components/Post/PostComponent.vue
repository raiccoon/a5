<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post"]);
const emit = defineEmits(["editPost", "refreshPosts", "addPostToCollection"]);
const { currentUsername } = storeToRefs(useUserStore());

const deletePost = async () => {
  try {
    await fetchy(`/api/posts/${props.post._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshPosts");
};
</script>

<template>
  <p class="author">{{ props.post.author }}</p>
  <p>{{ props.post.content }}</p>
  <img class="postImg" v-if="props.post.image && $props.post.image != ''" :src="props.post.image" />
  <div class="base">
    <menu>
      <li><button class="btn-small pure-button" @click="emit('addPostToCollection', props.post._id)">Add To Collection</button></li>
      <li><button class="btn-small pure-button" v-if="props.post.author == currentUsername" @click="emit('editPost', props.post._id)">Edit</button></li>
      <li><button class="button-error btn-small pure-button" v-if="props.post.author == currentUsername" @click="deletePost">Delete</button></li>
    </menu>
    <article class="timestamp">
      <p v-if="props.post.dateCreated !== props.post.dateUpdated">Edited on: {{ formatDate(props.post.dateUpdated) }}</p>
      <p v-else>Created on: {{ formatDate(props.post.dateCreated) }}</p>
    </article>
  </div>
</template>

<style scoped>
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

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
}

.base article:only-child {
  margin-left: auto;
}

.postImg {
  border-radius: 0;
}
</style>

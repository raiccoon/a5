<script setup lang="ts">
import CollectionListComponent from "@/components/Collection/CollectionListComponent.vue";
import PostListComponent from "@/components/Post/PostListComponent.vue";
import ProfileHeader from "@/components/Profile/ProfileHeader.vue";
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

let profileUsername = ref("");
const props = defineProps(["username"]);

const { currentUsername } = storeToRefs(useUserStore());

async function getUser() {
  if (props.username) {
    profileUsername.value = props.username;
  } else {
    profileUsername.value = currentUsername.value;
  }
}

async function toNewPost() {
  void router.push({ name: "New Post" });
}

async function toNewCollection() {
  void router.push({ name: "New Collection" });
}

onBeforeMount(async () => {
  await getUser();
});
</script>

<template>
  <ProfileHeader :username="profileUsername" />
  <hr />
  <section class="addButton">
    <button class="pure-button-primary pure-button" v-if="profileUsername == currentUsername" @click="toNewPost()">New Post</button>
  </section>
  <PostListComponent :profileAuthor="profileUsername" />
  <section class="addButton">
    <button class="pure-button-primary pure-button" v-if="profileUsername == currentUsername" @click="toNewCollection()">New Collection</button>
  </section>
  <CollectionListComponent type="post" :owner="profileUsername" />
  <CollectionListComponent type="user" :owner="profileUsername" />
</template>

<style>
.addButton {
  max-width: 60em;
  display: flex;
  justify-content: flex-end;
  margin: 0 auto;
}
</style>

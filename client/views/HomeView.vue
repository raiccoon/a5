<script setup lang="ts">
import PostListComponent from "@/components/Post/PostListComponent.vue";
import UserListComponent from "@/components/Profile/UserListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet" />
  <main>
    <section>
      <h1 v-if="isLoggedIn">Welcome {{ currentUsername }}!</h1>
      <h1 v-else>Please login!</h1>
    </section>
    <PostListComponent v-if="isLoggedIn" />
    <UserListComponent v-if="isLoggedIn" />
  </main>
</template>

<style scoped>
h1 {
  padding-top: 0.5em;
  text-align: center;
}
</style>

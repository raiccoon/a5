<script setup lang="ts">
import PostListComponent from "@/components/Post/PostListComponent.vue";
import ProfileHeader from "@/components/Profile/ProfileHeader.vue";

import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername } = storeToRefs(useUserStore());
</script>

<template>
  <main class="column">
    <ProfileHeader :username="currentUsername" />
    <PostListComponent :own="true" />
  </main>
</template>

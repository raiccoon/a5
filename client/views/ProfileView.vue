<script setup lang="ts">
import CollectionListComponent from "@/components/Collection/CollectionListComponent.vue";
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
    <CollectionListComponent :isPostCollection="true" :owner="currentUsername" />
    <CollectionListComponent :isPostCollection="false" :owner="currentUsername" />
  </main>
</template>

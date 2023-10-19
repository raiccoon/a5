<script setup lang="ts">
import ProfileHeader from "@/components/Profile/ProfileHeader.vue";

import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername } = storeToRefs(useUserStore());
</script>

<template>
  <main class="column">
    <ProfileHeader :username="currentUsername" />
  </main>
</template>

<script setup lang="ts">
import ProfileComponent from "@/components/Profile/ProfileComponent.vue";
</script>

<template>
  <main class="column">
    <ProfileComponent :username="$route.query.username" />
  </main>
</template>

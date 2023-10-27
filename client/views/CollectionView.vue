<script setup lang="ts">
import CollectionPostListComponent from "@/components/Collection/CollectionPostListComponent.vue";
import CollectionUserListComponent from "@/components/Collection/CollectionUserListComponent.vue";
</script>

<template>
  <main class="column">
    <CollectionPostListComponent v-if="$route.query.type == 'post'" :collection="$route.query.collection" />
    <CollectionUserListComponent v-else-if="$route.query.type == 'user'" :collection="$route.query.collection" />
  </main>
</template>

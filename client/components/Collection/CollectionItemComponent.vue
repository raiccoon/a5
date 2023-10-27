<script setup lang="ts">
import router from "@/router";

const props = defineProps(["type", "collection"]);

async function viewCollection(type: string, collectionId: string) {
  void router.push({ name: "Collection", query: { type: type, collection: collectionId } });
}
</script>

<template>
  <p class="owner">{{ props.collection.owner }}</p>
  <p>{{ props.collection.label }}</p>
  <button class="pure-button pure-button-primary" @click="viewCollection(props.type, props.collection._id)">View Collection</button>
</template>

<style scoped>
.owner {
  font-weight: bold;
  font-size: 1.2em;
}
</style>

<script setup lang="ts">
const props = defineProps(["collection"]);
</script>

<template>
  <p class="owner">{{ props.collection.owner }}</p>
  <p>{{ props.collection.label }}</p>
</template>

<style scoped>
.owner {
  font-weight: bold;
  font-size: 1.2em;
}
</style>

<script setup lang="ts">
const props = defineProps(["user"]);
</script>

<template>
  <p class="user">{{ props.user }}</p>
</template>

<style scoped>
.user {
  font-weight: bold;
  font-size: 1.2em;
}
</style>

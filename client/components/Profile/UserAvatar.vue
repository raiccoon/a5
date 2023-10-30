<script setup lang="ts">
const blankAvatar = "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";

const props = defineProps(["img"]);
</script>

<template>
  <img v-if="props.img" :src="props.img" />
  <img v-else :src="blankAvatar" />
</template>

<style>
img {
  border-radius: 50%;
  object-fit: cover;
}
</style>

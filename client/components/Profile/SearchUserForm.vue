<script setup lang="ts">
import { ref } from "vue";

const user = ref("");
const emit = defineEmits(["getUserByUsername"]);
</script>

<template>
  <form @submit.prevent="emit('getUserByUsername', user)" class="pure-form">
    <fieldset>
      <legend>Search for Users</legend>
      <input id="user" type="text" v-model="user" placeholder="Username" />
      <button type="submit" class="button-yellow">Search</button>
    </fieldset>
  </form>
</template>

<style scoped>
form {
  display: flex;
  gap: 0.5em;
  padding: 1em;
  align-items: center;
}
</style>

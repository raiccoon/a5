<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["collections"]);
const searchBy = ref("author");
const author = ref("");
const collection = ref("");
const emit = defineEmits(["getPostsByAuthor", "getPostsByAuthorCollection"]);
</script>

<template>
  <section class="searchForm">
    <section class="searchby">
      <div>Search by:</div>

      <input type="radio" id="author" value="author" v-model="searchBy" />
      <label for="author">Author</label>

      <input type="radio" id="collection" value="collection" v-model="searchBy" />
      <label for="collection">User Collection</label>
    </section>
    <form v-if="searchBy == 'author'" @submit.prevent="emit('getPostsByAuthor', author)" class="pure-form">
      <fieldset>
        <input id="author" type="text" v-model="author" placeholder="Username" />
        <button type="submit" class="pure-button pure-button-primary">Search</button>
      </fieldset>
    </form>
    <form v-if="searchBy == 'collection'" @submit.prevent="emit('getPostsByAuthorCollection', collection)" class="pure-form">
      <fieldset>
        <select id="collection" v-model="collection" placeholder="Collection">
          <option disabled value="">Select collection:</option>
          <option v-for="collection in props.collections" :key="collection._id" :value="collection._id">{{ collection.label }}</option>
        </select>
        <button type="submit" class="pure-button pure-button-primary">Search</button>
      </fieldset>
    </form>
  </section>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  align-items: flex-end;
  width: 20em;
}
.searchby {
  display: flex;
  gap: 0.5em;
  align-items: center;
}

.searchForm {
  display: flex;
  align-items: flex-end;
  margin: 0;
}
</style>

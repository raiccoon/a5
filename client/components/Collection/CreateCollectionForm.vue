<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const type = ref("");
const content = ref("");

const createCollection = async (type: string, content: string) => {
  if (type == "post") {
    try {
      await fetchy("/api/post_collections", "POST", {
        body: { label: content },
      });
    } catch (_) {
      return;
    }
    void router.push({ name: "Profile" });
    emptyForm();
  } else if (type == "user") {
    try {
      await fetchy("/api/user_collections", "POST", {
        body: { label: content },
      });
    } catch (_) {
      return;
    }
    void router.push({ name: "Profile" });
    emptyForm();
  }
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <h2>Create a collection:</h2>
  <form @submit.prevent="createCollection(type, content)">
    <label for="content">Collection Name:</label>
    <textarea id="content" v-model="content" placeholder="Enter a name for your new collection!" required> </textarea>
    <label for="type">Collection Type</label>
    <select v-model="type">
      <option disabled value="">Please select one</option>
      <option value="post">Post Collection</option>
      <option value="user">User Collection</option>
    </select>
    <button type="submit" class="pure-button-primary pure-button">Create Collection</button>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
</style>

<script setup lang="ts">
import CollectionListComponent from "@/components/Collection/CollectionListComponent.vue";
import PostListComponent from "@/components/Post/PostListComponent.vue";
import ProfileHeader from "@/components/Profile/ProfileHeader.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

let profileUserName = ref("");
const props = defineProps(["username"]);

const { currentUsername } = storeToRefs(useUserStore());

async function getUser() {
  if (props.username) {
    profileUserName.value = props.username;
  } else {
    profileUserName.value = currentUsername.value;
  }
}

onBeforeMount(async () => {
  await getUser();
});
</script>

<template>
  <main class="column">
    <ProfileHeader :username="profileUserName" />
    <PostListComponent :profileAuthor="profileUserName" />
    <CollectionListComponent type="post" :owner="profileUserName" />
    <CollectionListComponent type="user" :owner="profileUserName" />
  </main>
</template>

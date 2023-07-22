<template>
  <div class="row">
    <div class="col-11 m-auto my-3 d-flex justify-content-between">
      <button @click="changePage(newer)" class="btn btn-secondary" :disabled="!newer">Newer</button>
      <div>{{ page }} | {{ totalPages }}</div>
      <button @click="changePage(older)" class="btn btn-secondary" :disabled="!older">Older</button>
    </div>
  </div>
  <div class="row d-flex flex-column">
    <div v-if="account.id">
      <CreatePost />
    </div>

    <div class="overflow-y-auto postField">
      <div v-for="post in posts" :key="post.id" class="col-8 m-auto card mb-3 p-3 bg-white elevation-3 ">
        <PostCard :postProp="post" />

      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, ref } from "vue";
import { postService } from "../services/PostService.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import PostCard from "../components/PostCard.vue";
import CreatePost from "../components/CreatePost.vue";
import { useRoute } from "vue-router";
import { profileService } from "../services/ProfileService.js";


export default {
  setup() {
    const route = useRoute()

    async function getActiveProfilebyId() {
      try {
        const profileId = route.params.profileId
        await profileService.getActiveProfilebyId(profileId)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    async function getPosts() {
      try {
        await postService.getPosts();
      }
      catch (error) {
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getActiveProfilebyId()
      getPosts();
    });
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      newer: computed(() => AppState.newer),
      older: computed(() => AppState.older),
      page: computed(() => AppState.page),
      totalPages: computed(() => AppState.totalPages),

      async changePage(url) {
        try {
          await postService.changePage(url);
        }
        catch (error) {
          Pop.error(error.message);
        }
      }
    };
  },
  components: { PostCard, CreatePost }
}
</script>


<style lang="scss" scoped>
.postField {
  height: 65vh;
}
</style>

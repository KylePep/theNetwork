<template>
  <div class="row">
    <div class="col-9 m-auto my-3 d-flex justify-content-between">
      <button @click="changePage(newer)" class="btn btn-secondary" :disabled="!newer">Newer</button>
      <div>{{ page }} | {{ totalPages }}</div>
      <button @click="changePage(older)" class="btn btn-secondary" :disabled="!older">Older</button>
    </div>
  </div>
  <div class="row ">
    <!-- <div v-if="account.id">
      <CreatePost />
    </div> -->
    <div class="overflow-y-auto postField">

      <div v-for="post in posts" :key="post.id" class="col-8 m-auto card mb-3 p-3 bg-white elevation-3 ">

        <PostCard :postProp="post" />

      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import { postService } from "../services/PostService.js";
import Pop from "../utils/Pop.js";
import PostCard from "../components/PostCard.vue";
import { useRoute } from "vue-router";
import { profileService } from "../services/ProfileService.js";
import { logger } from "../utils/Logger.js";

export default {
  setup() {
    const route = useRoute()

    // watchEffect(() => {
    //   if (AppState.query) {
    //     getPostByQuery()
    //   }
    // })

    async function getPostsByQuery() {
      try {
        const query = route.params.query
        logger.log('[query-SearchPage]', route.params.query)
        await postService.getPostsByQuery(query)
      } catch (error) {
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getPostsByQuery()
    })
    return {
      posts: computed(() => AppState.posts),
      activeProfile: computed(() => AppState.activeProfile),
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
    }
  }
}
</script>


<style lang="scss" scoped>
.postField {
  height: 80vh;
}
</style>
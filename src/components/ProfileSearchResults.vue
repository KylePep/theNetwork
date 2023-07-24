<template>
  <div class="row">
    <div class="col-11 m-auto my-3 d-flex justify-content-between">
      <button @click="changePage(newer)" class="btn btn-secondary" :disabled="!newer">Newer</button>

      <div class="d-flex flex-column align-items-center">
        <form @submit.prevent="getPostsByQuery()" class="bg-light rounded py-1 px-2 ">
          <input v-model="editable.query" class="border border-none" type="text" placeholder="Search" minlength="3"
            maxlength="100">
          <button class="mdi mdi-magnify btn btn-light" type="submit"></button>
        </form>

        <div>{{ page }} | {{ totalPages }}</div>
      </div>

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
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState.js";
import { postService } from "../services/PostService.js";
import Pop from "../utils/Pop.js";
import PostCard from "../components/PostCard.vue";
import { useRoute } from "vue-router";
import { profileService } from "../services/ProfileService.js";

export default {
  setup() {
    const editable = ref({})

    return {
      posts: computed(() => AppState.posts),
      activeProfile: computed(() => AppState.activeProfile),
      newer: computed(() => AppState.newer),
      older: computed(() => AppState.older),
      page: computed(() => AppState.page),
      totalPages: computed(() => AppState.totalPages),
      editable,

      async getPostsByQuery() {
        try {
          const query = editable.value.query
          postService.getPostsByQuery(query)
          editable.value = {}
        } catch (error) {
          Pop.error(error.message)
        }
      },
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


<style lang="scss" scoped></style>
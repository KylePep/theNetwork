<template>
  <section class="row">
    <div class="col-4">
      <router-link :to="{ name: 'Profile', params: { profileId: postProp.creator.id } }"
        @click="getActiveProfilebyId(postProp.creator.id)">
        <img class="avatar" :src="postProp.creator.picture" :alt="postProp.creator.name">
      </router-link>
    </div>

    <div class="col-6">
      <div> {{ postProp.creator.name }}</div>
      <div> Posted:{{ new Date(postProp.createdAt).toLocaleDateString() }}</div>
      <div v-if="postProp.creator.graduated"> <i class="mdi mdi-school"></i></div>
    </div>

    <div class="col-2">
      <div v-if="account.id == postProp.creatorId" class="d-flex flex-row justify-content-between">
        <i class="mdi mdi-pencil text-primary fs-5"></i>
        <i @click="removePostById(postProp.id)" class="mdi mdi-delete text-danger fs-5"></i>
      </div>
    </div>

  </section>
  <section class="row ">
    <div class="col-10 my-3 m-auto fs-5">{{ postProp.body }}</div>
  </section>
  <section class="row">
    <img class="postImage" :src="postProp.imgUrl" alt="">
  </section>
  <section class="row">
    <div class="d-flex flex-row justify-content-end">
      <div v-if="account.id" @click="likeButton(postProp.id)" class="text-end">
        <i v-if="postProp.likeIds.includes(account.id)" class="mdi mdi-sword-cross fs-3"> </i>
        <i v-else class="mdi mdi-sword fs-3"> </i>
      </div>
      <div class="text-end fs-3">
        {{ postProp.likes.length }}
      </div>
    </div>
  </section>
</template>


<script>
import { computed, popScopeId } from "vue";
import { Post } from "../models/Post.js";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { profileService } from "../services/ProfileService.js";
import { postService } from "../services/PostService.js";

export default {
  props: {
    postProp: { type: Post, required: true }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      async getActiveProfilebyId(postPropId) {
        try {
          await profileService.getActiveProfilebyId(postPropId)
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async likeButton(postId) {
        try {
          await postService.likeButton(postId)
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async removePostById(postId) {
        try {
          const confirmRemove = await Pop.confirm('DeletePost?')
          if (!confirmRemove) {
            return
          }
          await postService.removePostById(postId)
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }

  }
}
</script>


<style lang="scss" scoped>
.avatar {
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

.postImage {
  max-height: 40vh;
  object-fit: cover;
  object-position: center;
}
</style>
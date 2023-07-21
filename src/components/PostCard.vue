<template>
  <section class="row">
    <div class="col-4">
      <router-link :to="{ name: 'Profile', params: { profileId: postProp.creator.id } }"
        @click="getActiveProfilebyId(postProp.creator.id)">
        <img class="avatar" :src="postProp.creator.picture" :alt="postProp.creator.name">
      </router-link>
    </div>

    <div class="col-7">
      <div> {{ postProp.creator.name }}</div>
      <div> Posted:{{ new Date(postProp.createdAt).toLocaleDateString() }}</div>
      <div v-if="postProp.creator.graduated"> <i class="mdi mdi-school"></i></div>
    </div>

    <div class="col-1">
      <div v-if="account.id == postProp.creatorId" class="mdi mdi-pencil"></div>
    </div>

  </section>
  <section class="row ">
    <div class="col-10 my-3 m-auto fs-5">{{ postProp.body }}</div>
  </section>
  <section class="row">
    <img class="postImage" :src="postProp.imgUrl" alt="">
  </section>
  <section class="row">
    <div class="text-end">
      <!-- TODO add click that sends off to api to handle like -->
      <i v-if="postProp.likeIds.includes(account.id)" class="mdi mdi-sword-cross fs-3"> </i>
      <i v-else class="mdi mdi-sword fs-3"> </i>
      {{ postProp.likes.length }}
    </div>
  </section>
</template>


<script>
import { computed } from "vue";
import { Post } from "../models/Post.js";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { profileService } from "../services/ProfileService.js";

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
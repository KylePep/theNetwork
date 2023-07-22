<template>
  <div class="col-8 m-auto card mb-3 p-3 bg-white elevation-3 ">
    <!-- <section class="row ">
      <div class="col-4 d-flex">
        <div>
          <img class="avatar mb-3" :src="account.picture" :alt="account.name">
        </div>
      </div>
      <div class="fs-2 col-4 text-center"> {{ account.name }}</div>
    </section> -->
    <form @submit.prevent="createPost()" class="form-control">
      <section class="row d-flex flex-column">

        <div class="col-11 m-auto justify-content-center ">
          <input v-model="editable.imgUrl" type="url" minlength="3" maxlength="1000" placeholder="image URL">
        </div>

        <div class="col-11 m-auto justify-content-center">
          <textarea class=" bg-white textArea" placeholder="Body of post" id="body"></textarea>
          <label for="body"></label>
        </div>

        <div class="col-11 m-auto">
          <button class="btn btn-secondary mdi mdi-plus-thick" type="submit"></button>
        </div>
      </section>

    </form>



  </div>
</template>


<script>
import { computed, ref } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { postService } from "../services/PostService.js";

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      account: computed(() => AppState.account),

      async createPost() {
        try {
          const formData = editable.value.query
          await postService.createPost(formData)
          editable.value = {}
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
}

.textArea {
  height: 10vh;
}
</style>
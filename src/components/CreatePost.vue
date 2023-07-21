<template>
  <div class="container-fluid col-8 m-auto card mb-3 p-3 bg-white elevation-3 ">
    <section class="row ">
      <div class="col-4 d-flex">
        <div>
          <img class="avatar mb-3" :src="account.picture" :alt="account.name">
        </div>
      </div>
      <div class="fs-2 col-4 text-center"> {{ account.name }}</div>
    </section>
    <form @submit.prevent="createPost()">
      <section class="row">
        <div class="col-11 m-auto d-flex flex-column justify-content-around">



          <input v-model="editable.imgUrl" type="url" minlength="3" maxlength="1000" placeholder="image URL">
        </div>


        <section class="row ">
          <div class="col-12 m-auto">
            <textarea v-model="editable.body" name="body" id="body" cols="65" rows="10" placeholder="post"
              class="textArea" minlength="3" maxlength="500" required></textarea>
          </div>
        </section>
      </section>
      <div class="col-12">
        <button class="btn btn-secondary mdi mdi-plus-thick" type="submit"></button>
      </div>

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
          const formData = editable.value
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
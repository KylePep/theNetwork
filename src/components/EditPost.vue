<template>
  <div class="col-8 m-auto card mb-3 p-3 bg-white elevation-3 ">
    <form @submit.prevent="editPostById(editProp.id)" class="">
      <section class="row d-flex flex-column">

        <div class="col-11 m-auto justify-content-center">
          <input class="form-control" v-model="editable.imgUrl" type="url" minlength="3" maxlength="1000"
            placeholder="image URL">
        </div>

        <div class="col-11 m-auto justify-content-center">
          <textarea class=" bg-white form-control" v-model="editable.body" name="body" placeholder="Body of post"
            id="body"></textarea>
        </div>

        <div class="col-11 m-auto d-flex flex-row justify-content-end">
          <button class="btn btn-secondary mdi mdi-plus-thick" type="submit"></button>
        </div>
      </section>

    </form>
  </div>
</template>


<script>
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { postService } from "../services/PostService.js";
import { Post } from "../models/Post.js";
import { logger } from "../utils/Logger.js";

export default {
  props: {
    editProp: { type: Post, required: true }
  },
  setup(props) {
    const editable = ref({})
    function setEdit() {
      editable.value.body = props.editProp.body
      editable.value.imgUrl = props.editProp.imgUrl
      logger.log('[editProp]', props.editProp)
    }
    onMounted(() => {
      setEdit()
    })
    return {
      editable,
      account: computed(() => AppState.account),

      async editPostById(postId) {
        try {
          const formData = editable.value
          await postService.editPostById(postId, formData)
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
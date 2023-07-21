<template>
  <div class="my-3">
    <img class="img-fluid" :src="adProp.tall" :alt="adProp.title">
  </div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { Ad } from "../models/Ad.js";

export default {
  props: {
    adProp: { type: Ad, required: true }
  },
  setup() {
    return {

    }
  }
}
</script>


<style lang="scss" scoped>
img {
  object-fit: fill;
}
</style>
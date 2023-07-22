<template>
  <img class="img-fluid" :src="adProp.tall" :alt="adProp.title">
</template>


<script>
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
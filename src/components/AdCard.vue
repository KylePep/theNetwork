<template>
  <div v-for="ad in ads" :key="ad" class="p-0">
    <a :href="`https://${ad.linkURL}`">
      <img class="img-fluid p-0" :src="ad.tall" :alt="ad.title">
    </a>
  </div>
</template>


<script>
import { computed } from "vue";
import { Ad } from "../models/Ad.js";
import { AppState } from "../AppState.js";

export default {
  // props: {
  //   adProp: { type: Ad, required: true }
  // },
  setup() {
    return {
      ads: computed(() => AppState.ads),
      // adlink: computed(() => `https://boisecodeworks.com`),

    }
  }
}
</script>


<style lang="scss" scoped>
img {
  object-fit: fill;
}
</style>
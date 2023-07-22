<template>
  <div v-if="activeProfile"
    class=" col-3 d-flex flex-column align-items-center card profileCard elevation-5 profileCoverImg  ">
    <div class=" ">
      <div class="fs-1 mt-5 mb-3 text-center bg-white rounded">{{ activeProfile.name }}</div>
      <div v-if="activeProfile.graduated" class="text-center"> <i class="mdi mdi-school fs-1 "></i></div>
      <img class="avatar mb-5" :src="activeProfile.picture" alt="Profile Image">
    </div>
    <div class="bg-light rounded p-3 d-flex flex-column">
      <a v-if="activeProfile.github" :href="activeProfile.github" class="fs-6 mb-2"> <i class="fs-1 mdi mdi-github"></i>
        git/{{
          activeProfile.name }}</a>
      <a v-if="activeProfile.linkedin" :href="activeProfile.linkedin" class="fs-6 mb-2"> <i
          class="fs-1 mdi mdi-linkedin"></i> in/{{ activeProfile.name
          }}</a>
      <a v-if="activeProfile.resume" :href="activeProfile.resume" class="fs-6 mb-2"> <i
          class="fs-1 mdi mdi-script-text"></i> {{ activeProfile.name
          }}</a>
      <div>
        {{ activeProfile.bio }}
      </div>
    </div>
  </div>

  <div v-else class="col-3 d-flex flex-column align-items-center card profileCard elevation-5">
    <div class="fs-1">Please Login or create an account</div>
  </div>
</template>


<script>
import { computed, onMounted, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { profileService } from "../services/ProfileService.js";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute()

    async function getActiveProfilebyId() {
      try {
        const profileId = route.params.profileId
        await profileService.getActiveProfilebyId(profileId)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    onMounted(() => {

    })
    watchEffect(() => {
      if (AppState.account) {
        getActiveProfilebyId()
      }
      logger.log('[Lets try a watcher]')
    })
    return {
      account: computed(() => AppState.account),
      appState: computed(() => AppState),
      ads: computed(() => AppState.ads),
      activeProfile: computed(() => AppState.activeProfile),
      coverImg: computed(() => `url(${AppState.activeProfile?.coverImg})`)
    }
  }
}
</script>


<style lang="scss" scoped>
.profileCoverImg {
  background-image: v-bind(coverImg);
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
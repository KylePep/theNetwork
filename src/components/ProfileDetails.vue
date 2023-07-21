<template>
  <div v-if="activeProfile" class="col-3 d-flex flex-column align-items-center card profileCard elevation-5">
    <div class="fs-1 mt-5 mb-3">{{ activeProfile.name }}</div>
    <img class="avatar mb-5" :src="activeProfile.picture" alt="Profile Image">
    <a v-if="activeProfile.github" :href="activeProfile.github" class="fs-6 mb-2"> <i class="fs-1 mdi mdi-github"></i>
      git/{{
        activeProfile.name }}</a>
    <a v-if="activeProfile.linkedin" :href="activeProfile.linkedin" class="fs-6 mb-2"> <i
        class="fs-1 mdi mdi-linkedin"></i> in/{{ activeProfile.name
        }}</a>
    <a v-if="activeProfile.resume" :href="activeProfile.resume" class="fs-6 mb-2"> <i
        class="fs-1 mdi mdi-script-text"></i> {{ activeProfile.name
        }}</a>
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

export default {
  setup() {
    async function getActiveProfilebyId() {
      try {
        await profileService.getActiveProfilebyId()
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
      activeProfile: computed(() => AppState.activeProfile)
    }
  }
}
</script>


<style lang="scss" scoped></style>
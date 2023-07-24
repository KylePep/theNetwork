<template>
  <div v-if="activeProfile"
    class="col-3 d-flex flex-column align-items-center justify-content-between card elevation-5 profileCoverImg">
    <h1 class="fs-3 mt-5 mb-3 px-2 text-center glassBackground rounded">{{ activeProfile.name }}</h1>
    <div v-if="activeProfile.graduated" class="text-center"> <i class="mdi mdi-school fs-1 "></i>
    </div>


    <router-link :to="{ name: 'Profile', params: { profileId: AppState.activeProfile?.id } }"
      @click="getActiveProfilebyId(AppState.activeProfile?.id)">
      <img class="avatar mb-5" :src="activeProfile.picture" alt="Profile Image">
    </router-link>

    <div class="glassBackground rounded p-3 d-flex flex-column align-items-center flex-grow-1">
      <h2>-Profile Details-</h2>
      <div>
        Class: {{ activeProfile?.class }}
      </div>
      <a v-if="activeProfile.github" :href="activeProfile.github" class="fs-6 mb-2 selectable"> <i
          class="fs-3 mdi mdi-github"></i>
        git/{{
          activeProfile.name }}</a>
      <a v-if="activeProfile.linkedin" :href="activeProfile.linkedin" class="fs-6 mb-2 selectable"> <i
          class="fs-3  mdi mdi-linkedin"></i> in/{{ activeProfile.name
          }}</a>
      <a v-if="activeProfile.resume" :href="activeProfile.resume" class="fs-6 mb-2 selectable"> <i
          class="fs-3  mdi mdi-script-text"></i> {{ activeProfile.name
          }}</a>
      <h4 v-if="activeProfile.bio">
        {{ activeProfile.bio }}
      </h4>
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
      AppState: computed(() => AppState),
      ads: computed(() => AppState.ads),
      activeProfile: computed(() => AppState.activeProfile),
      coverImg: computed(() => `url(${AppState.activeProfile?.coverImg})`),
      async getActiveProfilebyId(postPropId) {
        try {
          await profileService.getActiveProfilebyId(postPropId)
        } catch (error) {
          Pop.error(error.message)
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>
div,
a {
  color: white;
  text-shadow: -1px 1px 0 #000,
    1px 1px 0 #000,
    1px -1px 0 #000,
    -1px -1px 0 #000;
}

h1 {
  font-family: 'Bungee Inline', cursive;
}

h4 {
  font-family: 'Bebas Neue', sans-serif;
}

.glassBackground {
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.profileCoverImg {
  background-image: v-bind(coverImg);
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
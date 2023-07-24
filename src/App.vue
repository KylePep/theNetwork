<template>
  <header>
    <section class="row">

      <Navbar />
    </section>
  </header>
  <main>
    <section class="row">
      <ProfileDetails />

      <div class="col-7 bg-secondary">
        <router-view />
      </div>

      <div class="col-2 bg-white p-0">
        <AdCard />
      </div>
    </section>
  </main>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import AdCard from "./components/AdCard.vue"
import Pop from "./utils/Pop.js"
import { adsService } from "./services/AdsService.js"
import ProfileDetails from "./components/ProfileDetails.vue"



export default {
  setup() {

    async function getAds() {
      try {
        await adsService.getAds()
      } catch (error) {
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getAds()
    })
    return {
      appState: computed(() => AppState),
      account: computed(() => AppState.account),
      activeProfile: computed(() => AppState.activeProfile)
    }
  },
  components: { Navbar, AdCard, ProfileDetails }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

.avatar {
  height: 20vh;
  width: 20vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

.profileCard {
  background-color: white;
  // height: 80vh;
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>

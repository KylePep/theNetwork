<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <!-- <img alt="logo" src="../assets/img/cw-logo.png" height="45" /> -->
        <h1>The Network</h1>
      </div>
    </router-link>

    <!-- <router-link :to="{name: 'Search', params: {query: editable.value.query}}"> -->
    <form @submit.prevent="getPostsByQuery()" class="bg-light py-1 px-2 ">
      <input v-model="editable.query" type="text" placeholder="Search" minlength="3" maxlength="100">
      <button class="mdi mdi-magnify" type="submit"></button>
    </form>
    <!-- </router-link> -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <!-- <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
            About
          </router-link> -->
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
import Pop from "../utils/Pop.js";
import Login from './Login.vue';
import { postService } from "../services/PostService.js";
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async getPostsByQuery() {
        try {
          const query = editable.value.query
          postService.getPostsByQuery(query)
          editable.value = {}
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>

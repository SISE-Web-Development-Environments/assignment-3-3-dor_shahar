<template>
  <div class="container">
    <h1 class="h1">My Favorites</h1>
    <vue-horizontal-list
      class='list'
      :items="favorites"
    >
      <template v-slot:default="{ item }">
        <RecipePreview class="recipePreview" :recipe="item" />
      </template>
    </vue-horizontal-list>
  </div>
</template>

<script>
import { serverAddress } from "../globals";
import VueHorizontalList from '../components/VueHorizontalList'
import RecipePreview from "../components/RecipePreview";

export default {
  data() {
    return {
      favorites: [],
    };
  },
  async mounted() {
    let response = await this.axios.get(serverAddress + "/user/getFavorites");
    if(response.data == 401) {
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
      return;
    }
    this.favorites.push(...response.data);
  },
  components: {
    VueHorizontalList,
    RecipePreview
  },
};
</script>

<style scoped>
@import "../scss/main-container.scss";
@import "../scss/userPages.scss";
</style>

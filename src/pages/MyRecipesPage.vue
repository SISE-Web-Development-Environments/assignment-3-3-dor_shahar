<template>
  <div class="container">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lobster&effect=brick-sign" />
    <h1 class="h1">My Recipes</h1>
    <vue-horizontal-list
      :items="recipes"
    >
      <template v-slot:default="{ item }">
        <RecipePreview class="recipePreview" :recipe="item" :isFavoritable="false" />
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
      recipes: [],
      false: false
    };
  },
  async mounted() {
    let response = await this.axios.get(serverAddress + "/user/myRecipes");
    this.recipes.push(...response.data);
  },
  components: {
    VueHorizontalList,
    RecipePreview
  },
};
</script>

<style scoped>
@import "../scss/recipePages.scss";
</style>

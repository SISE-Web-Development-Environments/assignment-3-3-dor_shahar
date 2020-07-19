<template>
  <div class="container">
    <h1 class="title">My Recipes</h1>
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

</style>

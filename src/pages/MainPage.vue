<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <RecipePreviewList title="Randome Recipes" :recipes="random_recipes" class="RandomRecipes center" />
    <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
   
    <RecipePreviewList
      title="Last Viewed Recipes"
      :recipes="last_viewed_recipes"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      disabled
    ></RecipePreviewList>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { serverAddress } from "../globals.js"
export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      random_recipes: [],
      last_viewed_recipes: []
    };
  },
  async mounted() {
    const recipes = await this.getRandomRecipes();
    const last_viewed = await this.getLastViewed();
    this.random_recipes = [];
    this.random_recipes.push(...recipes);
    this.last_viewed_recipes = [];
    this.last_viewed_recipes.push(...last_viewed);
  },
  methods: {
    async getRandomRecipes() {
      let response = await this.axios.get(serverAddress + "/recipe/randomRecipes");
      if (response.data == 503){
        console.log("replace api key");
        return [];
      }
      else {
        return response.data;
      }
    },
    async getLastViewed() {
      if(this.$root.store.username) {
        let response = await this.axios.get(serverAddress + "/user/lastViewedRecipes");
        if (response.data == 503){
        console.log("replace api key");
        return [];
        }
        return response.data;
      } else {
        return this.getRandomRecipes();
      }      
    }
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>

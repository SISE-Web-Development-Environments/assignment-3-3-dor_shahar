<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <RecipePreviewList 
      id='randomList'
      title="Random Recipes"
      :recipes="random_recipes"
      class="RandomRecipes"
    />
    <b-button 
        v-on:click='refreshRandom()'
        id='refreshBtn'
        type="button"
        >Refresh</b-button
      >
    <!-- <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link> -->

    <RecipePreviewList
      id='lastViewedList'
      title="Last Viewed Recipes"
      :recipes="last_viewed_recipes"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      disabled
    />
    <router-link v-if="!$root.store.username" to="/login" id='loginLink'>You need to Login to vue this</router-link>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { serverAddress } from "../globals.js";
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
    this.random_recipes = [];
    this.random_recipes.push(...recipes);
    const last_viewed = await this.getLastViewed();
    this.last_viewed_recipes = [];
    this.last_viewed_recipes.push(...last_viewed);
  },
  methods: {
    async refreshRandom(){
      const recipes = await this.getRandomRecipes();
      this.random_recipes = [];
      this.random_recipes.push(...recipes);
    },
    async getRandomRecipes() {
      let response = await this.axios.get(
        serverAddress + "/recipe/randomRecipes"
      );
      if (response.data == 503 || response.data == 500) {
        console.log("replace api key");
        return [];
      } else {
        return response.data;
      }
    },
    async getLastViewed() {
      let response = await this.axios.get(
        serverAddress + "/user/lastViewedRecipes"
      );
      if (response.data == 503 || response.data == 500) {
        console.log("replace api key");
        return [];
      } else if (response.data == 401 || !this.$root.store.username) {
        this.$root.store.logout();
        return this.getRandomRecipes();
      }
      return response.data;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/form-style.scss";
@import "@/scss/recipePages.scss";
.container {
    padding-top: 40px;
    max-width: 30%;
    text-align: center;
}

#randomList{
  position: absolute;
  right: 22%;
}
#lastViewedList{
  position: absolute;
  left: 22%;
}

#refreshBtn{
  position: absolute;
  right: 30px;
}
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

#loginLink {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="container">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fredericka the Great">
    <h1 class="title">Be Your Own Chef</h1>
    <div id="listWrapper">
    <RecipePreviewList 
      id='randomList'
      title="Explore and Cook"
      :recipes="random_recipes"
      class="RandomRecipes"
    />
    <!-- <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link> -->

    <RecipePreviewList
      id='lastViewedList'
      title="Intrested In Lately"
      :recipes="last_viewed_recipes"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      disabled
    />
    </div>
        <b-button 
        v-on:click='refreshRandom()'
        id='refreshBtn'
        type="button"
        >Refresh</b-button
      >
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
  width: 70%;
}

.title {
  padding-top: 4%;
  font-family: "Fredericka the Great";
font-size: 55px;
letter-spacing: -0.8px;
word-spacing: 0.4px;
color: #000000;
font-weight: 700;
text-decoration: none;
font-style: normal;
font-variant: normal;
text-transform: none;
}

#listWrapper {
  display: flex;
  padding-right: 15%;
  padding-top: 5%;
}

#randomList {
  flex: 2;
}

#lastViewedList {
  flex: 1;
}

#refreshBtn {
  margin-right: 44%;
  margin-bottom: 2%;
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

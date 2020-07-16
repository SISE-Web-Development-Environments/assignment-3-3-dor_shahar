<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import { serverAddress } from "../globals.js";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        let response = undefined;
        if (this.$root.store.username && this.title == "Last Viewed Recipes") {
          response = await this.axios.get(serverAddress + "/user/lastViewedRecipes");
        } else {
          response = await this.axios.get(serverAddress + "/recipe/randomRecipes");
        }
        if (response.data == 503){
          console.log("replace api key");
        } else {
          let recipes = response.data;
          this.recipes = [];
          this.recipes.push(...recipes);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>

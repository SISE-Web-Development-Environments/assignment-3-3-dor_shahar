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
    try {
    let response = await this.axios.get(serverAddress + "/user/myRecipes");
    debugger
    if(response.data == 401) {
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
      return;
    }
    this.recipes.push(...response.data);
    } catch(err) {
      console.log(err);
    }
  },
  components: {
    VueHorizontalList,
    RecipePreview
  },
};
</script>

<style scoped>
.recipePreview{
  max-width: 350px;
  /* max-height: 150px; */
  /* padding-top: 100px; */
}
</style>

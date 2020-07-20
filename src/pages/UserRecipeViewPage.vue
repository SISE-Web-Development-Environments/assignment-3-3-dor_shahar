<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1 class='h1'>{{ recipe.name }}</h1>
        <img :src="recipe.image" id="center" class='img'/>
        <ul class="indicators">
          <img
            src="https://cdn1.iconfinder.com/data/icons/flat-green-organic-natural-badges/500/100-vegan-4-512.png"
            class="indicator"
            id="vegan_img"
            v-if="recipe.vegan"
          />
          <img
            src="https://i.ibb.co/ZxB52g7/500-F-99661652-72q7f6r-Ga-Q571-KYVkh4s-F1-WPy26-Su-Aks-removebg-preview.png"
            class="indicator"
            id="vegeterian_img"
            v-if="recipe.Vegetarian"
          />
          <img
            src="https://i.ibb.co/VgR7VWD/d078f17c1a725f24c8c52961c1bbcee1-400x400-removebg-preview.png"
            class="indicator"
            id="gluten_img"
            v-if="recipe.isGlutenFree"
          />
        </ul>
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div class='inLine'>Ready in {{ recipe.preperation_time }} minutes</div>
              <div class='inLine'>Likes: {{ recipe.popularity }} likes</div>
              <div class='inLine'>servings: {{ recipe.serving_num }} dishes</div>
            </div><h2 class='h2'>Ingredients:</h2>
            <ul>
              <li
                v-for="(r, index) in recipe._ingredients"
                :key="index"
              >{{ r }}</li>
            </ul>
          </div>
          <div class="wrapped">
            <h2 class='h2'>Instructions:</h2><br>
            <ul>
              <li
                v-for="(r, index) in recipe._instructions"
                :key="index"
              ><h3 class='h3'>Step {{index+1}}</h3>{{ r }}</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      >-->
    </div>
  </div>
</template>

<script>
import { serverAddress } from "../globals.js";

export default {
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      let response;
      try {
        response = await this.axios.get(
          serverAddress + "/recipe/recipeDetails/" + this.$route.params.recipeId
        );

        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        analyzedInstructions,
        name,
        preperation_time,
        popularity,
        Vegetarian,
        vegan,
        isGlutenFree,
        image,
        ingredients,
        instructions,
        serving_num
      } = response.data[0];

      let _ingredients = response.data[0].ingredients.split(',');
      let instructions_spilt = response.data[0].instructions.split('\n');
      let _instructions = instructions_spilt.filter(function (el) {
        return !el.includes('\\n') && !el.includes('Step ');
      });
      
      let _recipe = {
        instructions,
        _instructions,
        _ingredients,
        analyzedInstructions,
        name,
        preperation_time,
        popularity,
        Vegetarian,
        vegan,
        isGlutenFree,
        image,
        ingredients,
        serving_num
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
@import "../scss/recipePages.scss";
</style>

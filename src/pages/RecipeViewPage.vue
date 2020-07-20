<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header">
        <div id="title">
          <h1 class="h1">{{ recipe.name }}</h1>
        </div>
        <img :src="recipe.image" class="img" />
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
            v-if="recipe.vegetarian"
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
        <div class="mb-3">
          <div class="inLine">
            <img src="https://cdn4.iconfinder.com/data/icons/security-color-set/128/alarm_clock_security_color_b-512.png" class="icon" />
            {{ recipe.preperation_time }} minutes
          </div>
          <div class="inLine">
            <img src="https://cdn1.iconfinder.com/data/icons/facebook-social-media-set/142/facebook_like-512.png" class="icon" />
            {{ recipe.popularity }} likes
          </div>
          <div class="inLine">
            <img src="https://image.flaticon.com/icons/svg/3081/3081347.svg" class="icon" />
            {{ recipe.serving_num }} dishes
          </div>
        </div>
        <div class="wrapper">
          <div class="wrapped">
            <h2 class="h2">Ingredients</h2>
            <div class="pageText">
              <ul>
                <li 
                  class='li'
                  v-for="(r, index) in recipe.ingredients"
                  :key="index + '_' + r.id"
                >{{ r.original }}</li>
              </ul>
            </div>
          </div>
          <div class="wrapped">
            <h2 class="h2">Instructions</h2>
            <div class="pageText">
              <ol>
                <li class='li' v-for="(s, index) in recipe._instructions" :key="index">{{ s.step }}</li>
              </ol>
            </div>
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
        vegetarian,
        vegan,
        isGlutenFree,
        image,
        ingredients,
        instructions,
        serving_num
      } = response.data[0];

      let _instructions = response.data[0].analyzedInstructions
        .map(fstep => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        name,
        preperation_time,
        popularity,
        vegetarian,
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
@import "../scss/main-container.scss";
@import "../scss/form-style.scss";
@import "../scss/recipePages.scss";
</style>

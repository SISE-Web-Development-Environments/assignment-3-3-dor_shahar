<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.name }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.preperation_time }} minutes</div>
              <div>Likes: {{ recipe.popularity }} likes</div>
            </div>Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.ingredients"
                :key="index + '_' + r.id"
              >{{ r.original }}</li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">{{ s.step }}</li>
            </ol>
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
        vegeterian,
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
        vegeterian,
        vegan,
        isGlutenFree,
        image,
        ingredients,
        serving_num
      };

      // if (!_recipe.readyInMinutes) _recipe.readyInMinutes = 30;
      // if (!_recipe.vegeterian) _recipe.vegeterian = false;
      // if (!_recipe.vegan) _recipe.vegan = false;
      // if (!_recipe.glutenFree) _recipe.glutenFree = false;
      // if (!_recipe.aggregateLikes) _recipe.aggregateLikes = 0;
      // if (!_recipe.servings) _recipe.servings = '-';

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
/* .recipe-header{

} */
</style>

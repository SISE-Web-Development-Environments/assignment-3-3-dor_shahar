<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.name }}</h1>
        <img :src="recipe.image" class="center" />
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
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.preperation_time }} minutes</div>
              <div>Likes: {{ recipe.popularity }} likes</div>
              <div>servings: {{ recipe.serving_num }} dishes</div>
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
              <li v-for="(s, index) in recipe._instructions" :key="index">{{ s.step }}</li>
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
/* ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
} */

.icon {
  padding: 1px;
  margin-bottom: 3px;
}

.indicators {
  position: relative;
  left: 2%;
  top: 70%;
  padding: 0;
}

.indicator {
  width: 50px;
  z-index: 10000;
}
/* .recipe-header{

} */
</style>

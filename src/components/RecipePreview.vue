<template id="container">
  <div>
    <router-link v-on:click.native="addToSeen" :to="route_to" class="recipe-preview">
      <div class="recipe-body">
        <img :src="recipe.image" class="recipe-image" />
        <ul class="top_indicators">
          <img
            src="https://i.ibb.co/hfPmKrk/favorite-1.png"
            class="top_icons"
            v-if="this.$root.store.username && this.recipe.isFavorite"
          />
          <img
            src="https://i.ibb.co/ZX0dgsw/visibility.png"
            class="top_icons"
            v-if="this.$root.store.username && this.recipe.isSeen"
          />
        </ul>
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
      <div class="recipe-footer">
        <div :title="recipe.title" class="recipe-title">{{ recipe.name }}</div>
        <ul class="recipe-overview">
          <li>
            <img src="https://i.ibb.co/wrwQ4C2/stopwatch.png" class="icon" />
            {{ recipe.preperation_time }}m
          </li>
          <li>
            <img src="https://i.ibb.co/VJtzTQZ/like.png" class="icon" />
            {{ recipe.popularity }}
          </li>
        </ul>
      </div>
    </router-link>
    <input
      type="image"
      src="https://i.ibb.co/4SjF7Sd/favorite.png"
      @click="addToFavorite"
      v-if="this.$root.store.username && !this.recipe.isFavorite && isFavoritable"
    />
  </div>
</template>

<script>
import { serverAddress } from "../globals.js";

export default {
  data() {
    return {
      route_to: {}
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    isFavoritable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    async addToFavorite() {
      this.recipe.isFavorite = true;
      let response = await this.axios.post(
        serverAddress + "/user/addToFavorites",
        {
          recipe: this.recipe.id
        }
      );
    },
    async addToSeen() {
      console.log("Seen");
      let response = await this.axios.post(serverAddress + "/user/addToSeen", {
        recipe: this.recipe.id
      });
      if (response.status == 200) this.recipe.isSeen = true;
    }
  },
  mounted() {
    if (this.recipe.id >= 0) {
      this.route_to = { name: "recipe", params: { recipeId: this.recipe.id } };
    } else {
      this.route_to = { name: "my_recipe", params: { recipeId: this.recipe.id } };
    }
  }
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
  border: 2px solid black;
  border-radius: 5px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  max-width: 556;
  max-height: 270;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 100%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  font-family: "Comic Sans MS", cursive, sans-serif;
}

.recipe-preview .recipe-footer ul.recipe-overview {
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

.recipe-preview .recipe-footer ul.recipe-overview li {
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
}

.icon {
  padding: 1px;
  margin-bottom: 3px;
}

.indicators {
  position: absolute;
  left: 2%;
  top: 70%;
  padding: 0;
}

.indicator {
  width: 50px;
}

.top_icons {
  padding: 1px;
  margin-bottom: 3px;
}

.top_indicators {
  position: absolute;
  left: 2%;
  top: 2%;
  padding: 0;
}
</style>

<template>
  <div class="container">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fredericka the Great" />
    <h1 class="title">Be Your Own Chef</h1>
    <div id="listWrapper">
      <RecipePreviewList
        id="randomList"
        title="Explore and Cook"
        :recipes="random_recipes"
        class="RandomRecipes"
      ></RecipePreviewList>

      <RecipePreviewList
        id="lastViewedList"
        title="Intrested In Lately"
        :recipes="last_viewed_recipes"
        :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
        disabled
      ></RecipePreviewList>
    </div>
    <div id="btns">
      <b-button v-on:click="refreshRandom()" id="refreshBtn" class="btn" type="button">Refresh</b-button>
      <b-button
        v-if="!$root.store.username"
        v-on:click="toLogin()"
        id="loginBtn"
        class="btn"
        type="button"
      >Login to Vue</b-button>
    </div>
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
    async toLogin() {
      this.$router.push("/login").catch(() => {
        this.$forceUpdate();
      });
    },
    async refreshRandom() {
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
@import "../scss/main-container.scss";

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

#btns {
  height: 70px;
  width: 100%;
}
.btn {
  padding: 8px 14px 8px 14px;
  font-family: "Indie Flower", cursive;
  font-weight: bold;
  background-color: #17a2b8;
  border-color: white;
}

#refreshBtn {
  position: absolute;
  left: 31.5%;
}

#loginBtn {
  position: absolute;
  right: 31%;
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

<template>
  <div class="container">
    <FamilyRecipesBook :family_recipes="family_recipes" id="family_notebook"/>
  </div>
</template>

<script>
import { serverAddress } from "../globals"
import FamilyRecipesBook from "../components/FamilyRecipesBook"

export default {
  data() {
      return {
          family_recipes: []
      }
  },
  async mounted() {
      let response = await this.axios.get(serverAddress + "/user/myFamilyRecipes");
      if(response.data == 401) {
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
      return;
    }
      this.family_recipes.push(...response.data);
  },
  components: {
      FamilyRecipesBook
  }
};
</script>

<style>

</style>

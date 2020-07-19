<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-col id='cols'>
      <b-row v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-row>
    </b-col>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    recipes: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/form-style.scss";
// #cols{
//   max-width: 30%;
// }
#cols {
  align-items: center;
}
.recipePreview{
  padding: 10px;
  margin: auto;
}
</style>

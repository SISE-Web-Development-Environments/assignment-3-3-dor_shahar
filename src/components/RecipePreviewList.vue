<template>
  <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rock Salt">
    <h3 id="title">
      {{ title }}
      <slot></slot>
    </h3>
    <b-col id='cols'>
      <b-row v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-row>
    </b-col>
  </div>
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
#cols {
  align-items: center;
}
.recipePreview{
  padding: 10px;
  margin: auto;
}

#title {
font-family: "Rock Salt";
font-size: 25px;
letter-spacing: -0.8px;
word-spacing: 0.4px;
color: #000000;
font-weight: 600;
text-decoration: none;
font-style: normal;
font-variant: normal;
text-transform: none;
padding-bottom: 3%;
}
</style>

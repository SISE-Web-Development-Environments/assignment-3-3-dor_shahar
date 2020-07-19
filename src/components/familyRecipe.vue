<template>
  <div id="wrapper">
    <link
      href="http://fonts.googleapis.com/css?family=Cookie"
      rel="stylesheet"
      type="text/css"
    />
    <h4>{{ recipe.name }}</h4>

    <div class="lines"></div>

    <ul class="list">
      <li>Recieved with love from: {{ recipe.givenBy }}</li>
      <li>Mainly made at: {{ recipe.preperationEvents }}</li>
      <li style="text-decoration: underline;">Ingridients:</li>
      <li>{{ this.recipe_ingredients }}</li>
      <li style="text-decoration: underline;">Instructions:</li>
      <li>{{ recipe.instructions }}</li>
      <img :src="recipe.image" class="recipe_image" />
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      recipe_ingredients: "",
      recipe_prep: "",
    };
  },
  mounted() {
    let temp = this.recipe.ingredients;
    debugger;
    this.recipe_ingredients = temp;
  },
};
</script>

<style>
body {
  background-color: #f5f5f5;
  margin: 0 auto;
  padding: 0;
}
h4 {
  color: #cd0000;
  font-size: 42px;
  letter-spacing: -2px;
  text-align: left;
}
.list {
  color: #555;
  font-size: 22px;
  padding: 0 !important;
  font-family: courier, monospace;
  border: 1px solid #dedede;
}
.list li {
  list-style: none;
  border-bottom: 1px dotted #ccc;
  height: auto;
  padding: 10px;
  text-transform: capitalize;
  font: 100 35px/1 "Cookie", Helvetica, sans-serif;
  color: black;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
  text-align: left;
  padding-left: 50px;
}
.list li:hover {
  background-color: #f0f0f0;
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -ms-transition: all 0.2s;
  -o-transition: all 0.2s;
}
.lines {
  border-left: 1px solid #ffaa9f;
  border-right: 1px solid #ffaa9f;
  width: 2px;
  float: left;
  height: 800px;
  margin-left: 40px;
}

.recipe_image {
  width: 40%;
}
</style>

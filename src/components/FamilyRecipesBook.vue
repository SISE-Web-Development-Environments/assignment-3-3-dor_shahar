<template>
    <hooper id="slideshow" class="family_notebook" arro>
        <slide v-for="(r, index) in family_recipes" :key="index">
            <FamilyRecipe :recipe="r"/>
        </slide>
        <hooper-navigation slot="hooper-addons" class="family_notebook"></hooper-navigation>
    </hooper>
</template>

<script>
import FamilyRecipe from "../components/familyRecipe";
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper"
import 'hooper/dist/hooper.css';

export default {
  props: {
    family_recipes: {
      type: Array,
      required: true,
    },
  },
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    FamilyRecipe
  },
  data() {
    return {

    };
  },
};
</script>

<style>
.family_notebook {
    height: 10%;
    outline:none !important;
    outline-width: 0 !important;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
}
</style>

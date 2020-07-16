<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <b-form @submit.prevent="onSearch">
      <b-form-group id="input-group-search" label-for="query">
        <b-form-input
          id="query"
          type="search"
          placeholder="Search for a recipe..."
          v-model="query"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-result-number"
        label="Number of Results: "
        class="select-class"
      >
        <b-form-select id="result_number" v-model="result_number_selected" :options="result_options">
        </b-form-select>
      </b-form-group>
      <br>
      <b-form-group
        id="input-group-cuisine"
        label-for="cuisine"
        class="select-class"
      >
        <b-form-select id="cuisine" v-model="cuisine_selected" :options="cuisines">
          <template v-slot:first>
            <b-form-select-option :value="null" disabled>Cuisine</b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>
      <b-form-group id="input-group-diet" label-for="diet" class="select-class">
        <b-form-select id="diet" v-model="diet_selected" :options="diets">
          <template v-slot:first>
            <b-form-select-option :value="null" disabled>Diet</b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>
      <b-form-group
        id="input-group-intolerence"
        label-for="intolerence"
        class="select-class"
      >
        <b-form-select id="intolerence" v-model="intolerence_selected" :options="intolerences">
          <template v-slot:first>
            <b-form-select-option :value="null" disabled>Intolerence</b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        >Search</b-button
      >
    </b-form>
    <RecipePreviewList title="Search Results" :recipes="search_results" />
  </div>
</template>

<script>
import cuisines from '../assets/cuisines';
import diets from '../assets/diets';
import intolerences from '../assets/intolerences';
import RecipePreviewList from "../components/RecipePreviewList";
import { serverAddress } from "../globals"

export default {
  data() {
    return {
      cuisine_selected: null,
      diet_selected: null,
      intolerence_selected: null,
      result_number_selected: 5,
      cuisines: [],
      diets: [],
      intolerences: [],
      search_results: [],
      result_options: [5, 10, 15],
      query: ""
    };
  },
  mounted() {
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.intolerences.push(...intolerences);
  },
  methods: {
    async onSearch() {
      try {
        let request = serverAddress + "/recipe/searchRecipe/query/"+this.query+"/recipesNum/"+this.result_number_selected;
        if(this.cuisine_selected)
          request = request + "?cuisine="+this.cuisine_selected;
        if(this.diet_selected)
          request = request + "?diet="+this.diet_selected;
        if(this.intolerence_selected)
          request = request + "?intolerence="+this.intolerence_selected;
        let response = await this.axios.get(request);
        let results = response.data;
        this.search_results = [];
        this.search_results.push(...results)
      } catch (err) {
        console.log(err);
      }
    }
  },
  components: {
    RecipePreviewList
  }
};
</script>

<style>
.select-class {
  display: inline-block;
  width: 20%;
  margin-right: 10px;
}

#input-group-result-number {
  width: 100%;
}

#result_number {
  width: 20%;
}
</style>

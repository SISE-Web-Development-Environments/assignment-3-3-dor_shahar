<template>
  <div class="container">
    <h1 class="h1">Search For Your Recipe</h1>
    <b-form @submit.prevent="onSearch" id="form">
      <b-form-group id="input-group-search" label-for="query">
        <b-form-input
          id="query"
          type="search"
          placeholder="Search for a recipe..."
          v-model="query"
        ></b-form-input>
      </b-form-group>
      <div id="sec-raw-input-div">
      <b-form-group
        id="input-group-result-number"
        label="Number of Results: "
        class="select-class"
      >
        <b-form-select id="result_number" v-model="result_number_selected" :options="result_options">
        </b-form-select>
      </b-form-group>
      <b-form-group
        id="input-group-sort"
        label="Sort By: "
      >
      <BFormRadioGroup
        id="sort_radio"
        v-model="sort_by"
        :options="sort_by_values"
        @change="sortChanged"
        name="sort_radio"
      ></BFormRadioGroup>
    </b-form-group>
      </div>
      <br>
      <b-form-group
        id="input-group-cuisine"
        label-for="cuisine"
        class="select-class"
      >
        <b-form-select id="cuisine" v-model="cuisine_selected" :options="cuisines">
          <template v-slot:first>
            <b-form-select-option :value="null">Cuisine</b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>
      <b-form-group id="input-group-diet" label-for="diet" class="select-class">
        <b-form-select id="diet" v-model="diet_selected" :options="diets">
          <template v-slot:first>
            <b-form-select-option :value="null">Diet</b-form-select-option>
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
            <b-form-select-option :value="null">Intolerence</b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>
      <p></p>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="buttons"
        >Search</b-button
      >
    </b-form>
    <vue-horizontal-list class='list' :items="search_results" v-if="this.search_results.length!=0">
        <template v-slot:default="{item}">
          <RecipePreview class="recipePreview" :recipe="item" />
        </template>
    </vue-horizontal-list>
  </div>
</template>

<script>
import cuisines from '../assets/cuisines';
import diets from '../assets/diets';
import intolerences from '../assets/intolerences';
import RecipePreviewList from "../components/RecipePreviewList";
import { serverAddress } from "../globals"
import VueHorizontalList from '../components/VueHorizontalList';
import RecipePreview from "../components/RecipePreview";
import { BFormRadioGroup } from 'bootstrap-vue';

export default {
  data() {
    return {
      cuisine_selected: null,
      diet_selected: null,
      intolerence_selected: null,
      result_number_selected: 5,
      sort_by: 'time',
      cuisines: [],
      diets: [],
      intolerences: [],
      search_results: [],
      result_options: [5, 10, 15],
      sort_by_values: [{text: 'Prep Time', value: 'time'}, {text: 'Popularity', value: 'popularity'}],
      query: "",
      last_searched: ""
    };
  },
  mounted() {
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.intolerences.push(...intolerences);
    this.restoreIfConnected();
  },
  methods: {
    async onSearch() {
      try {
        if(this.query === "") {
          this.$root.toast("Search", "Can't search for nothing 🤷‍♂️", "empty");
          return;
        }
        let request = serverAddress + "/recipe/searchRecipe/query/"+this.query+"/recipesNum/"+this.result_number_selected;
        if(this.cuisine_selected)
          request = request + "?cuisine="+this.cuisine_selected;
        if(this.diet_selected)
          request = request + "?diet="+this.diet_selected;
        if(this.intolerence_selected)
          request = request + "?intolerence="+this.intolerence_selected;
        let response = await this.axios.get(request);
        if(response.data == 503) {
          console.log('replace api key')
          return;
        }
        let results = response.data;
        if(this.sort_by === 'time')
          results.sort(function(res1, res2) {return res1["preperation_time"]-res2["preperation_time"]});
        else
          results.sort(function(res1, res2) {return res2["popularity"]-res1["popularity"]});
        this.search_results = [];
        this.search_results.push(...results)
        if(this.search_results.length==0)
          this.$root.toast("Search", "Sorry, no recipe was found", "empty");
        this.storeIfConnected();
      } catch (err) {
        if(err.response.status == 503)
          console.log("Replace api key");
      }
    },
    sortChanged() {
      let results = this.search_results.slice();
      if(this.sort_by === 'popularity')
        results.sort(function(res1, res2) {return res1["preperation_time"]-res2["preperation_time"]});
      else
        results.sort(function(res1, res2) {return res2["popularity"]-res1["popularity"]});
      this.search_results = [];
      this.search_results.push(...results);
    },
    restoreIfConnected() {
      if(this.$root.store.username && localStorage.getItem(this.$root.store.username+"_last") != null) {
        this.query = localStorage.getItem(this.$root.store.username+"_last");
        this.result_number_selected = localStorage.getItem(this.$root.store.username+"_resNum");
        this.sort_by = localStorage.getItem(this.$root.store.username+"_sort");
        if(localStorage.getItem(this.$root.store.username+"_cuisine") === "null")
          this.cuisine_selected = null;
        else
          this.cuisine_selected = localStorage.getItem(this.$root.store.username+"_cuisine");
        if(localStorage.getItem(this.$root.store.username+"_diet") === "null")
          this.diet_selected = null;
        else
          this.diet_selected = localStorage.getItem(this.$root.store.username+"_diet");
        if(localStorage.getItem(this.$root.store.username+"_intolerence") === "null")
          this.intolerence_selected = null;
        else
          this.intolerence_selected = localStorage.getItem(this.$root.store.username+"_intolerence");
        this.onSearch();
      }
    },
    storeIfConnected() {
      if(this.$root.store.username) {
          localStorage.setItem(this.$root.store.username+"_last", this.query);
          localStorage.setItem(this.$root.store.username+"_resNum", this.result_number_selected);
          localStorage.setItem(this.$root.store.username+"_sort", this.sort_by);
          localStorage.setItem(this.$root.store.username+"_cuisine", this.cuisine_selected);
          localStorage.setItem(this.$root.store.username+"_diet", this.diet_selected);
          localStorage.setItem(this.$root.store.username+"_intolerence", this.intolerence_selected);
      }
    }
  },
  components: {
    VueHorizontalList,
    RecipePreview,
    BFormRadioGroup
  }
};
</script>

<style>
@import "../scss/main-container.scss";
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');

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

#input-group-search {
  width: 80%;
  display: inline-block;
  margin-right: 10px;
}

.buttons {
	box-shadow:inset 0px 1px 0px 0px #97c4fe;
	background:linear-gradient(to bottom, #3d94f6 5%, #1e62d0 100%);
	background-color:#3d94f6;
	border-radius:6px;
	border:1px solid #337fed;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:15px;
	font-weight:bold;
	padding:6px 24px;
	text-decoration:none;
  text-shadow:0px 1px 0px #1570cd;
  height: 60px;
  width: 20px;
}
.buttons:hover {
	background:linear-gradient(to bottom, #1e62d0 5%, #3d94f6 100%);
	background-color:#1e62d0;
}
.buttons:active {
	position:relative;
	top:1px;
}

.list{
    max-width: 90%;
    margin: auto;
    margin-top: 20px;
}

#form {
  font-family: "Cabin Sketch";
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 30px;
}

#sec-raw-input-div {
  display: flex;
  width: 65%;
  margin-left: 12%;
};

#input-group-sort {
  flex: 2;
}

#input-group-result-number {
  flex: 1;
}

.h1 {
  margin-bottom: 30px;
}
</style>

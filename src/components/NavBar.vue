<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#/">Vue Recipes</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#/search">Search</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-nav-item href="#/register">Register</b-nav-item>
          <b-nav-item href="#/login">Login</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="$root.store.username">
          <b-nav-item-dropdown text="Personal" right>
            <b-dropdown-item href="#/favorites">My Favorites</b-dropdown-item>
            <b-dropdown-item href="#/myRecipes">My Recipes</b-dropdown-item>
            <b-dropdown-item href="#/familyRecipes">My Family Recipes Notebook</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>{{ $root.store.username }}</em>
            </template>
            <b-dropdown-item @click="$emit('logout')">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-nav class="ml-auto">
        <b-nav-item  href="#/about">About</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

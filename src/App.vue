<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'main' }">Vue Recipes</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>
      <span v-if="!$root.store.username" class="guest">
        Guest:
        <router-link :to="{ name: 'register' }" >Register</router-link>|
        <router-link :to="{ name: 'login' }" >Login</router-link>
      </span>
      <span v-else >
        <span class='welcomeTitle'>Welcome Back {{ $root.store.username }}</span>
        <button @click="Logout" id='logoutBtn' class='guest'>Logout</button>
      </span>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
  background-color: black;
  color: white;
  font-weight: bold;
  font-size: 18px;
}

#nav a {
  font-weight: bold;
  display: inline;
  padding: 8px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#nav .guest{
  position: absolute;
  right: 30px;  
}

#nav .welcomeTitle{
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 25px;
}

#nav #logoutBtn{
  border-radius: 4px;
  font-size: 14px;
  transition-duration: 0.4s;
  background-color: black; /* Green */
  color: white;
  border: 2px solid #066DF8;
}

#nav #logoutBtn:hover {
  border-radius: 4px;
  background-color: white;
  color: #066DF8;
  border: 2px solid black;
}
</style>

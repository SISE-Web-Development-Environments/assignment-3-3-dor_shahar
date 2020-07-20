<template>
  <div id="app">
    <NavBar @logout="this.Logout"/>
    <router-view />
    <NavBar/>
    <div id="routerView">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar"

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
  },
  components: {
    NavBar
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
  background-image: url('https://coverfiles.alphacoders.com/757/75768.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
#routerView{
    margin-top: 50px;
}
</style>

<template>
  <div class="container">
    <LoginComponent id="login"/>
  </div>
</template>

<script>
import LoginComponent from "../components/LoginComponent";

export default {
  components: {
    LoginComponent
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/main-container.scss";
@import "@/scss/form-style.scss";


.container {
  margin-top: 40px;
  max-width: 600px;
  text-align: center;
  background-color: white;
  border-radius: 50px;
  padding: 50px;
}

#login {
  width: 60%;
  margin-left: 20%;
  margin-top: -7%;
}
</style>

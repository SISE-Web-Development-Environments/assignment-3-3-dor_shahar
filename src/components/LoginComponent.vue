<template>
  <div>
    <h1 :class="title" >Login</h1>
    <b-form @submit.prevent="onLogin" id="form">
      <div id="input_wrap">
        <b-form-group
          id="input-group-Username"
          label-cols-sm="3"
          label="Username:"
          label-for="Username"
          class="input"
        >
          <b-form-input
            id="Username"
            v-model="$v.form.username.$model"
            type="text"
            :state="validateState('username')"
            class="text_input"
          ></b-form-input>
          <b-form-invalid-feedback>
            Username is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-Password"
          label-cols-sm="3"
          label="Password:"
          label-for="Password"
          class="input"
        >
          <b-form-input
            id="Password"
            type="password"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
            class="text_input"
          ></b-form-input>
          <b-form-invalid-feedback>
            Password is required
          </b-form-invalid-feedback>
        </b-form-group>
      </div>

      <b-button type="submit" variant="primary" class="mx-auto w-100"
        >Login</b-button
      >
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register </router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { serverAddress } from "../globals.js";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined,
      },
    };
  },
  props: {
    title: {
      type: String,
      default: 'h1'
    }
  },
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        let response = await this.axios.post(serverAddress + "/login", {
          username: this.form.username,
          password: this.form.password,
        });
        if (response.status == 200) {
          this.$root.store.login(this.form.username);
          this.$router.push("/");
        } else {
          throw Error;
        }
      } catch (err) {
        this.$root.toast("Login Failed", err.response.data, "empty");
      }
    },
    onLogin() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");

      this.Login();
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap');

.h1.h1 {
    font-family: "Fredericka the Great";
    font-weight: bolder;
    font-size: 60px;
    margin-right: 1%;
    padding-bottom: 30px;
}

.h2 {
    font-family: "Rock Salt";
    padding-bottom: 20px;
    margin-right: 1%;
}

#form {
  font-family: "Cabin Sketch";
  font-size: 20px;
  font-weight: 600;
}

.mt-2 {
  padding-top: 3%;
}

.input {
  margin-right: 10%;
  max-width: 250px;
  margin-left: 2%;
}

.text_input {
  margin-left: 50px;
}

#input_wrap {
    max-width: 100%;
    text-align: center;
}
</style>

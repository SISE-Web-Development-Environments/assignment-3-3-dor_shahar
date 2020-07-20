<template>
  <div class="container">
    <h1 class="h1">Register</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset" class="form">
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
        class="form-group"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          class="inputs"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username alpha
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
        class="form-group"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
          class="inputs"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
        class="form-group"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
          class="inputs"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
          Have length between 5-10 characters long
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
        class="form-group"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
          class="inputs"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="input-group-email"
        label-cols-sm="3"
        label="Email:"
        label-for="email"
        class="form-group"
      >
        <b-form-input
          id="email"
          type="email"
          v-model="$v.form.email.$model"
          :state="validateState('email')"
          class="inputs"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">
          email is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.email.emailFormat"
        >
          Not a valid email address
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="input-group-firstName"
        label-cols-sm="3"
        label="First Name:"
        label-for="firstName"
        class="form-group"
      >
        <b-form-input
          id="firstName"
          type="text"
          v-model="$v.form.firstName.$model"
          :state="validateState('firstName')"
          class="inputs"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstName.required">
          First name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.firstName.alpha"
        >
          Not a valid name - Alpha only
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="input-group-lastName"
        label-cols-sm="3"
        label="Last Name:"
        label-for="lastName"
        class="form-group"
      >
        <b-form-input
          id="lastName"
          type="text"
          v-model="$v.form.lastName.$model"
          :state="validateState('lastName')"
          class="inputs"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastName.required">
          Last name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.lastName.alpha"
        >
          Not a valid name - Alpha only
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="input-group-picture"
        label-cols-sm="3"
        label="Profile Picture:"
        label-for="picture"
        class="form-group"
      >
        <b-form-input
          id="picture"
          type="url"
          v-model="$v.form.picture.$model"
          :state="validateState('picture')"
          class="inputs"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.picture.required">
          Profile Picture is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.picture.url">
          Not a valid URL
        </b-form-invalid-feedback>
      </b-form-group>
      <div class="button-wrap">
      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        class="ml-5 w-75"
        id="submit_button"
        >Register</b-button
      >
      </div>
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import countries from "../assets/countries";
import { serverAddress } from "../globals.js";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
  url
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        picture: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      country: {
        required
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      picture: {
        required,
        url
      },
      email: {
        required,
        email
      },
      firstName: {
        required,
        alpha
      },
      lastName: {
        required,
        alpha
      }
    }
  },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await this.axios.post(
          serverAddress + "/register",
          {
            username: this.form.username,
            firstname: this.form.firstName,
            lastname: this.form.lastName,
            country: this.form.country,
            password: this.form.password,
            email: this.form.email,
            profile_image: this.form.picture
          }
        );
        this.$router.push("/login");
      } catch (err) {
        this.$root.toast("Register Failed", err.response.data, "empty");
      }
    },
    onRegister() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/main-container.scss";
@import "@/scss/form-style.scss";

.container {
    padding-top: 10px;
    max-width: 700px;
    text-align: center;
}

.h1 {
  padding-bottom: 20px;
}

.form {
    font-family: "Cabin Sketch";
  font-size: 20px;
  font-weight: 600;
  margin-left: 20%;
}

.inputs {
  width: 60%;
  margin-bottom: 1%;
}

.form-group {
  text-align: left;
}

#input-group-country label {
  margin-right: 2px;
}

#input-group-country input {
  margin-left: 2px;
}

.button-wrap {
  margin-right: 28%;
  margin-bottom: 20px;
}

#input-group-confirmedPassword input {
  margin-top: 15px;
}

#input-group-picture input {
  margin-top: 15px;
}

.mt-2 {
  margin-right: 25%;
}

#submit_button {
  max-width: 50%;
}
</style>

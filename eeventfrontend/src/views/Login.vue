<template>
  <div class="wrapper">
    <div class="title-text">
      <div class="title login">Login Form</div>
    </div>
    <div class="form-container">
      <div class="form-inner">
        <form class="login">
          <div class="field">
            <input
              type="text"
              placeholder="Email Address"
              v-model="email"
              required
            />
          </div>
          <div class="field">
            <input
              type="password"
              placeholder="Password"
              v-model="password"
              required
            />
          </div>
          <div class="pass-link">
            <a href="#">Forgot password?</a>
          </div>
          <div class="field btn">
            <div class="btn-layer"></div>
            <input type="submit" @click="login" value="Login" />
          </div>
          <div class="signup-link">
            Not a member?
            <router-link :to="{ name: 'Register' }">Signup now!</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/styles/authViews.css";
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      //TODO: Validate format
      console.log(this.email, "BeforeSending");
      axios
        .post(`${process.env.VUE_APP_BACKEND_ADDRESS}/auth/login`, {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          //TODO: add to VueX store
          console.log(response.data);
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>

<style>
</style>
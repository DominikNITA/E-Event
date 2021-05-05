<template>
  <div class="wrapper">
    <div class="title-text">
      <div class="title signup">Signup Form</div>
    </div>
    <div class="form-container">
      <div class="form-inner">
        <form class="signup">
          <div v-if="error != null" class="alert alert-danger">{{ error }}</div>
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
              type="text"
              placeholder="First Name"
              v-model="firstName"
              required
            />
          </div>
          <div class="field">
            <input
              type="text"
              placeholder="Last Name"
              v-model="lastName"
              required
            />
          </div>
          <div class="field">
            <input type="text" placeholder="Nick" v-model="nick" required />
          </div>
          <div class="field">
            <input
              type="password"
              placeholder="Password"
              v-model="password"
              required
            />
          </div>
          <div class="field">
            <input
              type="password"
              placeholder="Confirm password"
              v-model="passwordConfirm"
              required
            />
          </div>
          <div class="field">
            <multiselect
              label="title"
              v-model="category"
              :options="categoryOptions"
              :multiple="true"
              placeholder="Favourites Categories"
            ></multiselect>
          </div>
          <div class="field btn">
            <div class="btn-layer"></div>
            <input type="submit" value="Signup" @click="register" />
          </div>
          <div class="signup-link">
            Already have an account?
            <router-link :to="{ name: 'Login' }">Login in!</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/styles/authViews.css";
import axios from "axios";
import Multiselect from "vue-multiselect";

export default {
  components: { Multiselect },
  data() {
    return {
      email: "",
      firstName: "",
      lastName: "",
      nick: "",
      password: "",
      passwordConfirm: "",
      error: null,
      groupOptions: [],
      categoryOptions: [{ title: "kappa" }],
      category: [],
    };
  },
  mounted() {
    this.getCategoryOptions();
  },
  methods: {
    getGroupOptions() {
      axios
        .get(`${process.env.VUE_APP_BACKEND_ADDRESS}/groups`)
        .then((response) => {
          this.groupOptions = response.data;
        })
        .catch((err) => (this.error = err.response.data));
    },
    getCategoryOptions() {
      axios
        .get(`${process.env.VUE_APP_BACKEND_ADDRESS}/categories`)
        .then((response) => {
          this.categoryOptions = response.data.categories;
          console.log(response.data.categories);
        })
        .catch((err) => (this.error = err.response.data));
    },
    register() {
      console.log(this.category);

      this.error = null;
      if (this.password !== this.passwordConfirm) {
        this.error = "Passwords do not match!";
        return;
      }

      axios
        .post(`${process.env.VUE_APP_BACKEND_ADDRESS}/auth/register`, {
          user: {
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            nick: this.nick,
          },
          password: this.password,
        })
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "Login" });
        })
        .catch((err) => (this.error = err.response.data));
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
</style>
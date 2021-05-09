<!-- Inscription d'un utilisateur -->
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
              v-model="categories"
              :options="categoryOptions"
              :multiple="true"
              placeholder="Favourites Categories"
            ></multiselect>
          </div>
          <div class="field">
            <multiselect
              label="group_name"
              v-model="groups"
              :options="groupOptions"
              :multiple="true"
              placeholder="Groups"
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
// import "@/assets/styles/authViews.css";
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
      groups: [],
      categoryOptions: [],
      categories: [],
    };
  },
  mounted() {
    this.getCategoryOptions();
    this.getGroupOptions();
  },
  methods: {
    getGroupOptions() {
      axios
        .get(`${process.env.VUE_APP_BACKEND_ADDRESS}/groups`)
        .then((response) => {
          console.log(response.data);
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
.multiselect__input {
  border: none !important;
}

@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Rock Salt", cursive;
}

.head-page {
  display: none !important;
}

html,
body {
  display: grid;
  height: 100%;
  width: 100%;
  place-items: center;
  background: -webkit-linear-gradient(left, #f5a254, #f0742c);
}
::selection {
  background-color: #f5a254;
  color: #fff;
}
.wrapper {
  overflow: hidden;
  max-width: 390px;
  background: #fff6f3;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
}
.wrapper .title-text {
  display: flex;
  width: 200%;
}
.wrapper .title {
  width: 50%;
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  color: #2b3f56;
}
.wrapper .slide-controls {
  position: relative;
  display: flex;
  height: 50px;
  width: 100%;
  overflow: hidden;
  margin: 30px 0 10px 0;
  justify-content: space-between;
  border: 1px solid lightgrey;
  border-radius: 5px;
}
.slide-controls .slide {
  height: 100%;
  width: 100%;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  line-height: 48px;
  cursor: pointer;
  z-index: 1;
  transition: all 0.6s ease;
}
.slide-controls label.signup {
  color: #2b3f56;
}
.slide-controls .slider-tab {
  position: absolute;
  height: 100%;
  width: 50%;
  left: 0;
  z-index: 0;
  border-radius: 5px;
  background: -webkit-linear-gradient(left, #f5a254, #f0742c);
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
input[type="radio"] {
  display: none;
}
#signup:checked ~ .slider-tab {
  left: 50%;
}
#signup:checked ~ label.signup {
  color: #fff;
  cursor: default;
  user-select: none;
}
#signup:checked ~ label.login {
  color: #2b3f56;
}
#login:checked ~ label.signup {
  color: #2b3f56;
}
#login:checked ~ label.login {
  cursor: default;
  user-select: none;
}
.wrapper .form-container {
  width: 100%;
  overflow: hidden;
}
.form-container .form-inner {
  display: flex;
  width: 200%;
}
.form-container .form-inner form {
  width: 50%;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.form-inner form .field {
  height: 50px;
  width: 100%;
  margin-top: 20px;
}
.form-inner form .field input {
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 15px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  font-size: 17px;
  transition: all 0.3s ease;
}
.form-inner form .field input:focus {
  border-color: #f5a254;
  /* box-shadow: inset 0 0 3px #fb6aae; */
}
.form-inner form .field input::placeholder {
  color: #999;
  transition: all 0.3s ease;
}
form .field input:focus::placeholder {
  color: #b3b3b3;
}
.form-inner form .pass-link {
  margin-top: 5px;
}
.form-inner form .signup-link {
  text-align: center;
  margin-top: 30px;
}
.form-inner form .pass-link a,
.form-inner form .signup-link a {
  color: #2b3f56;
  text-decoration: none;
}
.form-inner form .pass-link a:hover,
.form-inner form .signup-link a:hover {
  text-decoration: underline;
}
form .btn {
  height: 50px;
  width: 100%;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
}
form .btn .btn-layer {
  height: 100%;
  width: 300%;
  position: absolute;
  left: -100%;
  background: -webkit-linear-gradient(
    right,
    #f5a254,
    #f0742c,
    #f5a254,
    #f0742c
  );
  border-radius: 5px;
  transition: all 0.4s ease;
}
form .btn:hover .btn-layer {
  left: 0;
}
form .btn input[type="submit"] {
  height: 100%;
  width: 100%;
  z-index: 1;
  position: relative;
  background: none;
  border: none;
  color: #fff;
  padding-left: 0;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
}
</style>
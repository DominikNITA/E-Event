<template>
  <div class="wrapper">
    <div class="title-text">
      <div class="title login">E-Event</div>
    </div>
    <div class="form-container">
      <div class="form-inner">
        <form class="login">
          <div v-if="error != null" class="alert alert-danger">{{ error }}</div>
          <div class="field">
            <input
              type="text"
              placeholder="Adresse mail"
              v-model="email"
              required
            />
          </div>
          <div class="field">
            <input
              type="password"
              placeholder="Mot de passe"
              v-model="password"
              required
            />
          </div>
          <div class="pass-link">
            <a href="#">Mot de passe oublié ?</a>
          </div>
          <div class="field btn">
            <div class="btn-layer"></div>
            <input type="submit" @click="login" value="Connexion" />
          </div>
          <div class="signup-link">
            Pas encore de compte ?
            <router-link :to="{ name: 'Register' }"
              >Inscrivez-vous !</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import "@/assets/styles/authViews.css";
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    login() {
      //TODO: Validate format

      this.error = null;
      axios
        .post(`${process.env.VUE_APP_BACKEND_ADDRESS}/auth/login`, {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.$store.commit("setAuthToken", response.data.accessToken);
          this.$store.commit("setUser", response.data.user);

          axios.defaults.headers.common["auth"] = response.data.accessToken;

          if (this.$route.params.nextUrl != null) {
            this.$router.push(this.$route.params.nextUrl);
          } else {
            this.$router.push({ name: "Home" });
          }
        })
        .catch((err) => (this.error = err.response.data));
    },
  },
};
</script>

<style scoped>
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
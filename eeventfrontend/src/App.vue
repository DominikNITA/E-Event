<!-- Composant principal -->
<template>
  <div id="app">
    <Head
      url_courrant="/"
      url_accueil="/"
      url_evenements="events"
      url_profil="/profile/2"
      url_groups="/groups"
    ></Head>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<script>
import Head from "@/components/Head.vue";

export default {
  components: {
    Head,
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body {
  background-color: #f5a254 !important;
  font-family: "Rock Salt", cursive;
}

.event-title {
  font-size: 40px;
}

h1 {
  text-align: center;
  font-size: 400%;
  letter-spacing: 2%;
}

h2 {
  margin-left: 4%;
}

.head-page {
  /*background-image: linear-gradient(to bottom, rgba(255,255,0,0.5), #f5a254), url('./images/city.png');*/
  background-color: white;
  height: 180px;
}

.langues {
  padding-top: 0.8%;
  padding-left : 0.8%;
}

.langues a {
  color: black;
  font-size: 120%;
}

.liste_evenements {
  padding: 3%;
}

.logo {
  padding-left: 10%;
}

/*Raccourci*/
.raccourci a {
  color: black;
  font-size: 120%;
}

.recherche {
  background-color: #d8d8d8;
}

.retour {
  padding: 2%;
}

.retour path {
  padding: 5%;
}

.les_evenements {
  padding: 2% 15%;
}

.event {
  cursor: pointer;
}

table {
  table-layout: fixed;
  width: 100%;
  border-spacing: 80%;
  border: 3px solid grey;
  background-color: lightgrey;
}

td {
  text-align: left;
  padding: 2%;
}

#image_event {
  text-align: right;
}

#searchbox {
  background: #d8d8d8;
  border: 4px solid #e8e8e8;
  padding: 20px 10px;
  width: 250px;
  margin-left: 75%;
}

input:focus::-webkit-input-placeholder {
  color: transparent;
}

input:focus:-moz-placeholder {
  color: transparent;
}

input:focus::-moz-placeholder {
  color: transparent;
}

#searchbox input {
  outline: none;
}

#searchbox input[type="text"] {
  background: url(http://2.bp.blogspot.com/-xpzxYc77ack/VDpdOE5tzMI/AAAAAAAAAeQ/TyXhIfEIUy4/s1600/search-dark.png)
    no-repeat 10px 6px #fff;
  border-width: 1px;
  border-style: solid;
  border-color: #fff;
  font: bold 12px Arial, Helvetica, Sans-serif;
  color: #bebebe;
  width: 55%;
  padding: 8px 15px 8px 30px;
}

#button-submit {
  background: #6a6f75;
  border-width: 0px;
  padding: 9px 0px;
  width: 23%;
  cursor: pointer;
  font: bold 12px Arial, Helvetica;
  color: #fff;
  text-shadow: 0 1px 0 #555;
}

#button-submit:hover {
  background: #4f5356;
}

#button-submit:active {
  background: #5b5d60;
  outline: none;
}

#button-submit::-moz-focus-inner {
  border: 0;
}

.info-form {
  display: flex;
  flex-direction: column;
  width: 65%;
  padding: 2%;
  margin-left: 15%;
  border: 2% solid #d8d8d8;
  background-color: white;
  -webkit-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 2px 15px -12px rgba(0, 0, 0, 0.57);
}

.info-form label {
  padding-top: 3%;
}

.info-form input {
  padding-top: 2%;
}

.retour a {
  text-decoration: none;
  color: black;
  text-align: right;
  font-size: 150%;
}

#fleche-retour {
  width: 1%;
  height: 1%;
  padding-left: 5%;
}
</style>

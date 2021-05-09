<template>
  <div class="container informations">
    <h1>Profil</h1>
    
    <button type="button" class="btn btn-primary" id="liveToastBtn">Show live toast</button>

    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 5">
      <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <img src="..." class="rounded me-2" alt="...">
          <strong class="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          Hello, world! This is a toast message.
        </div>
      </div>
    </div>

    <div class="row">
      <form class="row g-3 form" v-if="user != null" >
        <div class="col-md-6">
          <label for="name" class="form-label">Prénom</label>
          <input
            type="name"
            class="form-control"
            v-model="user.firstName"
            :readonly=this.modif
          />
        </div>
        <div class="col-md-6">
          <label for="surname" class="form-label">Nom</label>
          <input
            type="surname"
            class="form-control"
            id="surname"
            v-model="user.lastName"
            :readonly=this.modif
          />
        </div>
        <div class="col-12">
          <label for="mail" class="form-label">Email</label>
          <input
            type="mail"
            class="form-control"
            id="mail"
            v-model="user.email"
            :readonly=this.modif
          />
        </div>
        <!--<div class="col-12">
          <label for="adress" class="form-label">Localisation</label>
          <input 
            type="address" 
            class="form-control" 
            id="adress"
            :readonly=this.modif />
        </div>-->
        <div class="col-md-6">
          <label for="centres-interet" class="form-label">Mes Centre(s) d'intérêt</label>
          <input 
            type="text" 
            class="form-control" 
            id="centres-interet"
            :readonly=this.modif 
            v-model="user.categories"/>
        </div>
        <div class="col-md-6">
          <label for="mes_groupes" class="form-label">Mes Groupes</label>
          <input
            type="text" 
            class="form-control" 
            id="mes_groupes" 
            :readonly=this.modif 
            />
        </div>
        <div class="col-6 submit-btn">
          <button type="button" class="btn btn-outline-dark position-absolute end-0" v-on:click="setModif()" v-if="isHidden">Modifier mes infos</button>
        </div>
        <div class="col-6 submit-btn">
          <button type="button" class="btn btn-outline-success position-absolute end-0" v-if="!isHidden" v-on:click="valider()">Valider</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    url_mes_evenements: {
      type: String,
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      user: [],
      centreInteret: [],
      modif: true,
      isHidden: true,
    };
  },
  methods: {
    loadUser() {
      axios.get(`${process.env.VUE_APP_BACKEND_ADDRESS}/users/5`)
        .then(response => this.user = response.data)
        .catch((err) => console.log(err))
      this.user.categories = ['sport']
        
    },
    setModif() {
      this.modif = !this.modif
      this.isHidden = !this.isHidden
    },
    valider() {
      this.modif = !this.modif
      this.isHidden = !this.isHidden
      axios.put(`${process.env.VUE_APP_BACKEND_ADDRESS}/users/5`,
          {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            nick: this.user.nick,
            email: this.user.email
          })
                .then(reponse => console.log(reponse))
                .catch(erreur => console.log(erreur))
    },
    deleteUser() {
      axios.put(`${process.env.VUE_APP_BACKEND_ADDRESS}/users/5/anonymise`)
            .then(reponse => console.log(reponse))
            .catch(erreur => console.log(erreur))
    },
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
      //this.loadUser();
    },
  },
  mounted() {
    this.loadUser();
  }
};
</script>
<style>
h1 {
  text-align: center;
  font-size: 400%;
}
.informations {
  text-align: left;
}
.form-label, .submit-btn {
  padding-top: 2%;
}
.nav-link {
  color: black;
}
.form {
  background-color: lightgray;
}

</style>
<!-- Profil de l'utilisateur -->
<template>
  <div class="container informations">
      <h1>Profil</h1>
      <div col-md-12>
        <div :v-if=!deleted class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide=false>
          <div class="toast-body">
            Le profil a bien été supprimé !
            <div class="mt-2 pt-2 border-top">
              <router-link
                :to="{ name: 'Login'}">
                <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="toast">Close</button>
              </router-link>
              
            </div>
          </div>
        </div>
      </div>
      <ul class="nav justify-content-end">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" v-on:click="deletUser()" href="#">Supprimer le profil</a>
        </li>
      </ul>
      <div class="row">
        <form class="row g-3" v-if="user != null" >
          <div class="col-md-6">
            <label for="prenom" class="form-label">Prénom</label>
            <input
              type="name"
              class="form-control"
              v-model="user.firstName"
              :readonly=this.modif
            />
          </div>
          <div class="col-md-6">
            <label for="nom" class="form-label">Nom</label>
            <input
              type="surname"
              class="form-control"
              id="nom"
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
          <div class="col-md-12 field">
            <div class="field">
              <label class="label">Mes Centre(s) d'intérêt</label>
              <div class="control">
                <div class="select is-multiple">
                  <select class="form-select" multiple>
                      <option v-for="cat in user.categories" v-bind:key="cat.id">{{ cat.title }} </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          
          <div class="col-6 submit-btn">
            <button type="button" class="btn btn-outline-dark position-absolute end-0" v-on:click="setModif()" v-if="isHidden">Modifier mes infos</button>
          </div>
          <div class="col-6 submit-btn">
            <button type="button" class="btn btn-outline-success position-absolute end-0" v-if="!isHidden" v-on:click="valider()">Valider</button>
          </div>
        </form>
    </div>

    <div class="row">
      <br />
      <br />
      <br />
      <h2 class ="col-12" id="myGroups">Mes Groupes</h2>

      <div class="row group" v-for="group in user.memberOf" v-bind:key="group.id">
        <div class="col-lg-4">
          <div class="circle">
              {{ group.group_name }}
          </div>
          <router-link
            :to="{ name: 'Group Details', params: { groupId: group.id } }">
            <button type="button" class="btn btn-secondary btn-sm plus-info">Plus d'infos</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from 'jquery';

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
      localisation: [],
      centreInteret: [],
      modif: true,
      isHidden: true,
      deleted: false,
    };
  },
  methods: {
    // récupère les données de l'utilisateur
    loadUser() {
      axios
        .get(
          `${process.env.VUE_APP_BACKEND_ADDRESS}/users/1`
        )
        .then((response) => (this.user = response.data))
        .catch((err) => console.log(err))
            },
    setModif() {
      this.modif = !this.modif
      this.isHidden = !this.isHidden
    },
    // mets à jour les données de l'utilsateur avec les nouvelles
    valider() {
      this.modif = !this.modif
      this.isHidden = !this.isHidden
      axios.put(`${process.env.VUE_APP_BACKEND_ADDRESS}/users/${this.$props.userId}`,
          {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            nick: this.user.nick,
            email: this.user.email
          })
                .then(reponse => console.log(reponse))
                .catch(erreur => console.log(erreur))
    },
    // permet de supprimer l'utilisateur
    deletUser() {
      axios.put(`${process.env.VUE_APP_BACKEND_ADDRESS}/users/${this.$props.userId}/anonymise`)
            .then(reponse => console.log(reponse))
            .catch(erreur => console.log(erreur))
      this.deleted = true
      $(document).ready(function() {
                $('.toast').toast('show');
        });
      this.$store.state.authToken = null;
      this.$store.state.user = null
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
.retour {
  padding: 2%;
}
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
#myGroups {
  padding-right: 4%;
}
.form-select {
  padding-right: 100px;
}
</style>
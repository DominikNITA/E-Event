<template>
  <div class="container informations">
    <h1>Profil</h1>
    <ul class="nav justify-content-end">
      <li class="nav-item">
        <a
          class="nav-link active"
          aria-current="page"
          v-on:click="setModif()"
          href="#"
          >Supprimer le profil</a
        >
      </li>
    </ul>
    <div class="row">
      <form class="row g-3" v-if="user != null">
        <div class="col-md-6">
          <label for="prenom" class="form-label">Prénom</label>
          <input
            type="name"
            class="form-control"
            v-model="user.firstName"
            :readonly="this.modif"
          />
        </div>
        <div class="col-md-6">
          <label for="nom" class="form-label">Nom</label>
          <input
            type="surname"
            class="form-control"
            id="nom"
            v-model="user.lastName"
            :readonly="this.modif"
          />
        </div>
        <div class="col-12">
          <label for="mail" class="form-label">Email</label>
          <input
            type="mail"
            class="form-control"
            id="mail"
            v-model="user.email"
            :readonly="this.modif"
          />
        </div>
        <div class="col-12">
          <label for="adresse" class="form-label">Localisation</label>
          <input
            type="address"
            class="form-control"
            id="adresse"
            :readonly="this.modif"
          />
        </div>
        <div class="col-md-6">
          <label for="centres-interet" class="form-label"
            >Mes Centre(s) d'intérêt</label
          >
          <input
            type="text"
            class="form-control"
            id="centres-interet"
            :readonly="this.modif"
          />
        </div>
        <div class="col-md-6">
          <label for="mes_groupes" class="form-label">Mes Groupes</label>
          <input
            type="text"
            class="form-control"
            id="mes_groupes"
            :readonly="this.modif"
          />
        </div>
        <div class="col-6 submit-btn">
          <button
            type="button"
            class="btn btn-outline-dark position-absolute end-0"
            v-on:click="setModif()"
            v-if="isHidden"
          >
            Modifier mes infos
          </button>
        </div>
        <div class="col-6 submit-btn">
          <button
            type="button"
            class="btn btn-outline-success position-absolute end-0"
            v-if="!isHidden"
            v-on:click="valider()"
          >
            Valider
          </button>
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
      localisation: [],
      centreInteret: [],
      modif: true,
      isHidden: true,
    };
  },
  methods: {
    loadUser() {
      axios
        .get(
          `${process.env.VUE_APP_BACKEND_ADDRESS}/users/${this.$props.userId}`
        )
        .then((response) => (this.user = response.data))
        .catch((err) => console.log(err));
    },
    setModif() {
      this.modif = !this.modif;
      this.isHidden = !this.isHidden;
    },
    valider() {
      this.modif = !this.modif;
      this.isHidden = !this.isHidden;
      axios
        .put(
          `${process.env.VUE_APP_BACKEND_ADDRESS}/users/${this.$props.userId}`,
          {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            nick: this.user.nick,
            email: this.user.email,
          }
        )
        .then((reponse) => console.log(reponse))
        .catch((erreur) => console.log(erreur));
    },
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
      this.loadUser();
    },
  },
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
.form-label,
.submit-btn {
  padding-top: 2%;
}
.nav-link {
  color: black;
}
</style>
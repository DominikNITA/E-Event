<template>
  <div class="container informations">
    <h1>Profil</h1>
    <div class="row retour">
      <button type="button" class="btn btn-outline-dark col-md-2" onclick="window.location.href='mes_evenements.html';">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-left-circle-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
          />
        </svg>
        Retour
      </button>
    </div>
    <div class="row">
      <form class="row g-3" v-if="user != null">
        <div class="col-md-6">
          <label for="prenom" class="form-label">Nom</label>
          <input
            type="name"
            class="form-control"
            id="prenom"
            v-model="user.firstName"
          />
        </div>
        <div class="col-md-6">
          <label for="nom" class="form-label">Prénom</label>
          <input
            type="surname"
            class="form-control"
            id="nom"
            placeholder="nameUser"
            v-model="user.lastName"
          />
        </div>
        <div class="col-12">
          <label for="mail" class="form-label">Email</label>
          <input
            type="mail"
            class="form-control"
            id="mail"
            v-model="user.email"
          />
        </div>
        <div class="col-12">
          <label for="adresse" class="form-label">Localisation</label>
          <input type="address" class="form-control" id="adresse" />
        </div>
        <div class="col-md-6">
          <label for="centres-interet" class="form-label"
            >Mes Centre(s) d'intérêt</label
          >
          <input type="text" class="form-control" id="centres-interet" />
        </div>
        <div class="col-md-6">
          <label for="mes_groupes" class="form-label">Mes Groupes</label>
          <input type="text" class="form-control" id="mes_groupes" />
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary position-absolute end-0">
            Sign in
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
  },
  mounted() {
    this.loadUser();
    console.log(this.user);
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
</style>
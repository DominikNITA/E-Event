<!-- en-tête de nos pages permettant de les unifier -->
<template>
  <div class="container-fluid head-page">
    <div class="row justify-content-end">
      <ul class="nav justify-content-end">
        <!-- boutons permettant de choisir la langue de navigation -->
        <li class="nav-item">
          <a
            class="nav-link"
            aria-current="page"
            :href="url_courrant"
            >
              <img class="lg-img" src="../assets/fr.png" alt="FR">
          </a>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="url_courrant"
            >
              <img class="lg-img" src="../assets/eng.png" alt="ENG">
            </router-link
          >
        </li>
      </ul>
    </div>
    <nav class="navbar navbar-light">
      <!-- logo du site et son nom -->
      <div class="container-fluid">
        <router-link id="title" class="navbar-brand fs-2" :to="url_accueil">
          E-Event
          <img
            src="../assets/logo copy.png"
            height="60"
            class="d-inline-block align-text-center logo"
          />
        </router-link>
      </div>
    </nav>
    <!-- définition des onglets de navigation -->
    <div class="raccourci">
      <ul class="nav nav-tabs justify-content-end">
        <li class="nav-item">
          <router-link class="nav-link" aria-current="page" :to="url_accueil"
            >Accueil</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Events List' }"
            >Mes événements</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="url_groups"
            >Groupes</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="url_profil"
            >Mon profil</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// exportation des urls des onglets de navigation
export default {
  name: "Head",
  props: {
    url_courrant: {
      type: String,
      required: true,
    },
    url_accueil: {
      type: String,
      required: true,
    },
    url_evenements: {
      type: String,
      required: true,
    },
    url_groups: {
      type: String,
      required: true,
    },
    url_profil: {
      type: String,
      required: true,
    },
  }
};
</script>

<style>
.lg-img {
  width:30px;
  height:25px;
  border: 1px solid;
}
#title {
  font-size:45px;
}
</style>
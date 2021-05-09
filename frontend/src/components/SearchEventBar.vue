<!-- définition de la barre de recherche des événements utilisée dans l'onglet accueil -->
<template>
  <div class="navbar navbar-light bg-light">
    <div class="container-fluid recherche">
      <form class="d-flex">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Recherche..."
          aria-label="Recherche..."
          v-model="searchTerm"
        />
        <button class="btn btn-outline-success" @click="searchEvent">
          Valider
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchEventBar",
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    // méthode de recherche des événements correspondants à la recherche 
    searchEvent() {
      if (this.searchTerm == null || this.searchTerm == "") {
        return;
      }

      this.$router
        .push({ path: "/" })
        .catch(() => this.$emit("searchEvent", this.searchTerm));
    },
  },
};
</script>

<style>
</style>
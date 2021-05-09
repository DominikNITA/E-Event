<!-- groupes de l'utilisateur -->
<template>
  <section>
    <h1>Mes groupes</h1> <br>
    <div v-for="group in groups" v-bind:key="group.id">
      
      <div class="container-fluid" v-if="group != null">
        <div class="container">
            <div class="row">

            <div class="col-8">
                <br><br>
                <big> - {{ group.group_name }}</big>
                <p v-if="isAdmin(group)">(Vous êtes administrateur de ce groupe)</p>
            </div>

            <div class="col-2">
                <br><br>
                <router-link
                :to="{ name: 'Group Details', params: { groupId: group.id } }"
                ><button type="button" class="btn btn-secondary">Plus d'infos</button>
                </router-link> 
            </div>


            </div>
        </div>
      </div>
      <div class="container-fluid" v-else> Vous ne faîtes partie d'aucun groupe...</div>
      
    </div>

    <div>
        <router-link
        :to="{ name: 'Create Group' }"
        ><button type="button" class="btn btn-secondary">Créer un groupe</button></router-link
        > 
    </div>

  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Groups",
  props: {},
  data() {
    return {
        groups: [],
        groupsAdmin: [],
    };
  },
  methods: {
    //méthode pour récupérer les groupes dont l'utilisateur est membre
    getAllGroupsAsMember() {
      axios
        .get(`${process.env.VUE_APP_BACKEND_ADDRESS}/users/${this.$store.state.user.id}/groupsMember`)
        .then((response) => {
          this.groups = response.data
        })
        .catch((err) => console.error(err))
    },
    //méthode pour récupérer les groupes dont l'utilisateur est administrateur
    getAllGroupsAsAdmin() {
      axios
        .get(`${process.env.VUE_APP_BACKEND_ADDRESS}/users/${this.$store.state.user.id}/groupsAdmin`)
        .then((response) => {
          this.groupsAdmin = response.data
        })
        .catch((err) => console.error(err));
    },
    //méthode pour vérifier si l'utilisateur est l'administrateur du groupe
    isAdmin(group) {
        return this.groupsAdmin.some((grAdmin) => group.id == grAdmin.id)
    }
  },
  mounted() {
    this.getAllGroupsAsMember();
    this.getAllGroupsAsAdmin();
  },
};
</script>


<style>
</style>
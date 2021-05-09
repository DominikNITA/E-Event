<template>
  <div class="container informations">
      <h1> Création d'un groupe </h1>

        <div>

            <br><br>
            <!-- formulaire de création d'un groupe -->
            <form>

                <label for="Nom du groupe" class="form-label">Nom du groupe</label><br>
                <input
                    type="text"
                    class="form-control"
                    v-model="groupName"
                />

                <br><br>

                <div>
                    <router-link
                    :to="{ name: 'Group Details' , params: { groupId: group.id } }"
                    >
                    <button type="button" class="btn btn-secondary" :disabled="checkInput()" @click="createGroup()">Créer le groupe</button>
                    </router-link>
                </div>
                <br><br>

                <!--
                <label for="Catégories" class="form-label">Catégories</label>
                <input
                    type="Catégories"
                    v-model="categories"
                />
                -->

            </form>

        </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
    data() {
        return {
            groupName : '',
            group : [],
        }
    },
    methods: {
        // méthode permettant de créer le nouveau groupe dans la base de données
        createGroup() {
            axios
                .put(`${process.env.VUE_APP_BACKEND_ADDRESS}/groups`,
                {
                    userId: 2, //RETIRER LE 2 C'EST POUR TEST -> this.$store.state.user.id
                    groupName: this.groupName,
                })
                .then((response) => {
                    this.group = response.data
                    alert("Le groupe a bien été créé")
                })
                .catch((err) => {
                    console.log(err)
                    return;
                })
        },
        checkInput() {
            return this.groupName == ''
        }
    },
}
</script>


<style>
</style>
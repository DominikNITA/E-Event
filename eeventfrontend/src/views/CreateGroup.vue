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
                    v-model="group.name"
                />

                <br><br>
            
                <div>
                    <button type="button" class="btn btn-secondary" @click.prevent="group.name == ''" @click="createGroup()">Créer l'événement</button>
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
            group : null,
        }
    },
    methods: {
        // méthode permettant de créer le nouveau groupe dans la base de données
        createGroup() {
            axios
                .put(`${process.env.VUE_APP_BACKEND_ADDRESS}/groups`,
                {
                    userId: 2, //RETIRER LE 2 C'EST POUR TEST -> this.$store.state.user.id
                    groupName: this.group.name,
                })
                .catch((err) => {
                    console.log(err)
                    return;
                })
                alert("Votre groupe a bien été créé")
        },
    },
}
</script>


<style>
</style>
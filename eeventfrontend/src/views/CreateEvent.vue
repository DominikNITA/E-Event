<template>
  <div class="container informations">
      <h1 v-if="group!=null"> Création d'un événement pour le groupe {{ group.name }} </h1>

        <div>

            <form>

                <label for="Nom de l'événement" class="form-label">Nom de l'événement</label><br>
                <input
                    type="text"
                    v-model="event.name"
                />

                <br><br>

                <label for="Nombre de places" class="form-label">Nombre de places</label><br>
                <input
                    type="number"
                    v-model="event.availablePlaces"
                />

                <br><br>

                <label for="Date de début" class="form-label">Date de début</label><br>
                <input
                    type="date"
                    v-model="event.startDate"
                />

                <br><br>

                <label for="Date de fin" class="form-label">Date de fin</label><br>
                <input
                    type="date"
                    v-model="event.endDate"
                />

                <br><br>

                <label for="Prix" class="form-label">Prix</label><br>
                <input
                    type="number"
                    v-model="event.price"
                />

                <br><br>

                <label for="Infos" class="form-label">Infos</label><br>
                <input
                    type="text"
                    v-model="event.information"
                />

                <br><br>

                <label for="Nom du lieu" class="form-label">Nom du lieu</label><br>
                <input
                    type="text"
                    v-model="place.name"
                />

                <br><br>

                <label for="Adresse du lieu" class="form-label">Adresse du lieu</label><br>
                <input
                    type="text"
                    v-model="place.address"
                />

                <br><br>

                <div>
                    <button type="button" v-on:click="createEvent()">Créer l'événement</button>
                </div>

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
    props: {
        groupId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            group : null,
            event : [],
            place : [],
            categories : [],
        }
    },

    methods: {

        createEvent() {
            axios
                .put(`${process.env.VUE_APP_BACKEND_ADDRESS}/events`,
                {
                    name: this.event.name,
                    availablePlaces: this.event.availablePlaces,
                    startDate: this.event.startDate,
                    endDate: this.event.endDate,
                    price: this.event.price,
                    information: this.event.information,
                    placeId: this.place.id,
                    organizerId: this.$props.groupId,
                })
                .catch((err) => {
                    console.log(err)
                    return;
                })
                alert("L'événement a bien été créé")
        },

        getGroupName() {
            axios
                .get(`${process.env.VUE_APP_BACKEND_ADDRESS}/groups/${this.$props.groupId}`)
                .then((response) => 
                    this.group = response.data)
                .catch((err) => console.log(err));
        },

        // Pour l'instant, on créé un nouvel objet place dans la DB à chaque création -> à améliorer
        createPlace() {
            axios
                .put(`${process.env.VUE_APP_BACKEND_ADDRESS}/places` ,
                {
                    name: this.place.name,
                    address: this.place.address
                })
                .then((response) =>
                    this.place = response.data
                )
                .catch((err) => console.log(err))  
        }

    },

    mounted() {
        this.getGroupName()
    }
}
</script>


<style>

</style>
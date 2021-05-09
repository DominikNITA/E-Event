
<template>
  <section>
    <search-event-bar @searchEvent="searchEvent"></search-event-bar>
    <h1 v-if="search != null">Recherche d'événements avec "{{ search }}"</h1>
    <h1 v-else>Prochains événements</h1> <br>
    <div v-for="event in events" v-bind:key="event.id">
      
      <div class="container-fluid" v-if="event != null">
      <div class="container">
        <div class="row">

          <!-- carré avec le centre d'intérêt de l'événement -->
          <div class="circle">
          {{event.categories[0].title}}
          </div>

          <div class="col-8">
            <br><br>
            <big>{{ event.name }}  à {{ event.place.place_name }}, {{ event.place.address }}</big>

          </div>

          <div class="col-2">
            <br><br>
            <router-link
            :to="{ name: 'Event Details', params: { eventId: event.id } }"
            ><button>Plus d'infos</button></router-link
            > 
          </div>


          

        </div>
      </div>
      </div>
      
      
      
      
      
      
    </div>
  </section>
</template>

<script>
import SearchEventBar from "../components/SearchEventBar.vue";
import axios from "axios";

export default {
  components: { SearchEventBar },
  name: "EventsList",
  props: {
    search: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      events: [],
      user: [],
    };
  },
  methods: {
    searchEvent(searchTerm) {
      this.events = [];
      //TODO: should not mutate property => push to route?
      this.search = searchTerm;
      axios
        .get(`${process.env.VUE_APP_BACKEND_ADDRESS}/events`, {
          params: {
            include: "place,organizer,participants,categories",
            search: this.search,
          },
        })
        .then((response) => {
          this.events = response.data;
        })
        .catch((err) => console.error(err));
    },
    getAllEvents() {
      axios
        .get(`${process.env.VUE_APP_BACKEND_ADDRESS}/events`, {
          params: {
            include: "place,organizer,participants,categories",
          },
        })
        .then((response) => {
          console.log(response.data);
          this.events = response.data;
        })
        .catch((err) => console.error(err));
    },
  },
  mounted() {
    if (this.search) {
      this.searchEvent(this.search);
    } else {
      this.getAllEvents();
    }
  },
};
</script>

<style>
body{
    font-family: Avenir, Helvetica, Arial, sans-serif;

}

.circle{
    margin:10px;
    width:100px;
    background:white;
    height:100px;
    text-align:center;
    border-radius:100px;
    line-height:30px;
    padding-top:30px;
}
</style>

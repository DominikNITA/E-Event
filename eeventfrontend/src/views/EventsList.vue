<!-- liste des événements auxquels l'utilisateur est inscrit -->
<template>
  <section>
    <h1>Mes événements</h1> <br>
    <div v-for="event in user.subscribedEvents" v-bind:key="event.id">
      
      <div class="container-fluid" v-if="event != null">
      <div class="container">
        <div class="row">

          <!-- carré avec le centre d'intérêt de l'événement -->
          <div class="circle">
          {{event.categories.title}}
          </div>

          <div class="col-8">
            <br><br>
            <big>{{ event.event_name }}  à {{ event.place.place_name }}</big>

          </div>

          <div class="col-2">
            <br><br>
            <router-link
            :to="{ name: 'Event Details Register', params: { eventId: event.id } }"
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
import axios from "axios";

export default {
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
      subscribedEvents: [],
    };
  },
  methods: {

    getSubscribedEvents() {
      axios
        .get(`${process.env.VUE_APP_BACKEND_ADDRESS}/users/${this.$store.state.user.id}/subscribedEvents`)
        .then((response) => {
          console.log(response.data);
          this.subscribedEvents = response.data;
        })
        .catch((err) => console.error(err));
    },

  },
  mounted() {
    this.getSubscribedEvents();
  },
};
</script>

<style>
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
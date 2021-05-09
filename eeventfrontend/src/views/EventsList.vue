<template>
  <section>
    <h1>Mes événements</h1> <br>
    <div v-for="event in subscribedEvents" v-bind:key="event.id">
      
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
        .get(`${process.env.VUE_APP_BACKEND_ADDRESS}/events/${this.$props.eventId}/participants`, {
          params: {
            include: "place,organizer,participants,categories,subscribedEvents",
          },
        })
        .then((response) => {
          console.log(response.data);
          this.subscribedEvents = response.data.subscribedEvents;
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
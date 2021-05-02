<template>
  <section>
    <search-event-bar @searchEvent="searchEvent"></search-event-bar>
    <h1 v-if="search != null">Events with "{{ search }}"</h1>
    <h1 v-else>Your events</h1>
    <div v-for="event in events" v-bind:key="event.id">
      {{ event.name }} in {{ event.place.place_name }}
      <router-link
        :to="{ name: 'Event Details', params: { eventId: event.id } }"
        ><button>More info</button></router-link
      >
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
</style>
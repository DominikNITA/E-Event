<template>
  <section>
    <search-event-bar></search-event-bar>
    <h1 v-if="search != null">Events with "{{ search }}"</h1>
    <h1 v-else>Your events</h1>
    <div v-for="event in events" v-bind:key="event.id">
      {{ event.name }} in {{ event.place.place_name }}
      <button>More info</button>
    </div>
  </section>
</template>

<script>
import SearchEventBar from "../components/SearchEventBar.vue";
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

  mounted() {
    if (this.search) {
      // Search by text
    } else {
      this.$http
        .get(`${process.env.VUE_APP_BACKEND_ADDRESS}events`, {
          params: {
            include: "place,organizer,participants,categories",
          },
        })
        .then((response) => {
          console.log(response.data);
          this.events = response.data;
        })
        .catch((err) => console.error(err));
    }
  },
};
</script>

<style>
</style>
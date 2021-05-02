<template>
  <div>
    <search-event-bar></search-event-bar>

    <div class="container-fluid" v-if="event != null">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h1>{{ event.name }}</h1>
          </div>

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <p>{{ event.information }}</p>

            <p id="linkPlace">
              <a href="https://google.com/maps">Lieu</a>
            </p>

            <p>
              <!-- Inscription link button -->
              <button
                onclick="window.location.href = 'https://www.google.com';"
              >
                S'inscire à l'événement
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchEventBar from "../components/SearchEventBar.vue";
import axios from "axios";

export default {
  components: { SearchEventBar },
  props: {
    eventId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      event: null,
    };
  },
  mounted() {
    axios
      .get(
        `${process.env.VUE_APP_BACKEND_ADDRESS}/events/${this.$props.eventId}`,
        {
          params: {
            include: "place,organizer,participants,categories",
          },
        }
      )
      .then((response) => {
        this.event = response.data;
        console.log(this.event);
      })
      .catch((err) => console.error(err));
  },
};
</script>

<style>
</style>
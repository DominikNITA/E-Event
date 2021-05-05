<template>
  <div>
    <div class="container-fluid">
      <div class="container">
        <div class="row">

          <div v-if="group" class="col-12">
            <h1> {{ group.name }} </h1>
            <br>
          </div>

          <div class="col-7">

            <h4>Membres du groupe</h4>

            <div v-for="member in groupMembers" v-bind:key="member.id">
                <p>
                     {{ member.nick }} <br> 
                </p>
            </div>
            
            <div v-if="groupMembers.length == 0">
                <p> Ce groupe n'a pas encore de membre :'( </p>
            </div>

            <h4>Evènements du groupes</h4>

            <div v-for="event in groupEvents" v-bind:key="event.id">
                <p>
                  {{ event.event_name }} 
                </p>

                <div class="col-12">
                    <router-link
                    :to="{ name: 'Event Details', params: { eventId: event.id } }"
                    ><button>Plus d'infos</button></router-link
                    > 
                </div>
            </div>

            <div v-if="groupEvents.length == 0">
                <p> Ce groupe n'a pas encore d'évènement :'( </p>
            </div>
            
          </div>
          
        </div>
      </div>
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
      group: null,
      groupMembers: [],
      groupEvents: [],
    };
  },
  
  methods: {
    getGroupName() {
        axios
        .get(`${process.env.VUE_APP_BACKEND_ADDRESS}/groups/${this.$props.groupId}`)
        .then((response) => 
            this.group = response.data)
        .catch((err) => console.log(err));
    },
    getGroupMembers() {
        axios
        .get(`${process.env.VUE_APP_BACKEND_ADDRESS}/groups/${this.$props.groupId}/members`)
        .then((response) => 
          this.groupMembers = response.data) 
        .catch((err) => console.log(err));
    },
    getGroupEvents() {
        axios
        .get(`${process.env.VUE_APP_BACKEND_ADDRESS}/groups/${this.$props.groupId}/events`)
        .then((response) => 
          this.groupEvents = response.data)
        .catch((err) => console.log(err));
    }
  },
  mounted() {
    this.getGroupName();
    this.getGroupMembers();
    this.getGroupEvents();
  },
};
</script>



<style>
</style>
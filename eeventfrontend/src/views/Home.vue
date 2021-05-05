<template>
  <div>
    <h1>Bienvenue sur E-Event !</h1>
  </div>
  <ul>
    <li v-for ="event in events">{{ event }}</li>
  </ul>
 </template>

<script>
  import axios from "axios";

  export default {
    el: '#app',
    data(){
        events: ["e","e1","e3"]
    },
    methods:{
      loadEvents(){
        axios
          .get(
            `${process.env.VUE_APP_BACKEND_ADDRESS}/events`)
          .then((response) => (this.events = response.data))
          .catch((err) => console.log(err))
      }
    }
  };
</script>

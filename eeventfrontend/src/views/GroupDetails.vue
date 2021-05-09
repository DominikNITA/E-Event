<!-- détails d'un groupe -->
<template>
  <div>
    <div class="container-fluid">
      <div class="container">
        <div class="row">
          
          <div v-if="group" class="col-12">
            <br>
            <h1> {{ group.name }} </h1>
            <br>
          </div>

          <div class="col-12">

            <h4>Administrateurs du groupe</h4>

            <div v-for="admin in groupAdmins" v-bind:key="admin.id+'A'"> <!-- 'A' is to avoid duplicate keys warning-->
                <p>
                     - {{ admin.nick }} 
                     <i v-if="isCurrentUser(admin.id)"> (Vous) </i>
                     &nbsp;
                     <button type="button" class="btn btn-secondary binfo" v-if="isCurrentUserAdmin()" @click="removeUserAdminRole(admin.id)">Retirer le rôle d'admin</button>
                </p>
            </div>
            
            <div v-if="groupAdmins.length == 0">
                <p> Ce groupe n'a pas d'admin :'( </p>
            </div>

            <br>

            <h4>Membres du groupe</h4>

            <div v-for="member in groupMembers" v-bind:key="member.id">
                <p>
                     - {{ member.nick }} 
                     <i v-if="isCurrentUser(member.id)"> (Vous) </i>
                     &nbsp;
                     <button type="button" class="btn btn-secondary binfo" v-if="isCurrentUserAdmin()" @click="removeUserFromGroup(member.id)">Retirer le membre du groupe</button>
                     &nbsp;
                     <button type="button" class="btn btn-secondary binfo" v-if="isCurrentUserAdmin()" @click="giveUserAdminRole(member.id)">Donner le rôle d'admin</button>
                </p>
            </div>
            
            <div v-if="groupMembers.length == 0">
                <p> Ce groupe n'a pas encore de membre :'( </p>
            </div>

            <br>

            <h4>Evènements du groupes</h4>

            <div v-for="event in groupEvents" v-bind:key="event.id+'A'"> <!-- 'A' is to avoid duplicate keys warning-->
                <p>
                  - {{ event.event_name }} : &nbsp;
                
                    <router-link
                    :to="{ name: 'Event Details', params: { eventId: event.id } }"
                    ><button type="button" class="btn btn-secondary binfo">Plus d'infos</button></router-link
                    > 
                </p>
            </div>

            <div v-if="groupEvents.length == 0">
                <p> Ce groupe n'a pas encore d'évènement :'( </p>
            </div>

            <br><br>
            
            <div v-if="group && isCurrentUserAdmin()">
                    <router-link
                    :to="{ name: 'Create Event', params: { groupId: group.id } }"
                    ><button type="button" class="btn btn-secondary">Créer un événement</button></router-link
                    > 
            </div>

            <br>

            <div>
                    <router-link
                    :to="{ name: 'Groups' }"
                    ><button type="button" class="btn btn-secondary" @click="removeCurrentUserFromGroup()">Quitter le groupe</button></router-link
                    > 
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
      groupAdmins: []
    };
  },
  
  methods: {
    // méthodes qui récupérent les détails du groupe
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
    },
    getGroupAdmins() {
        axios
        .get(`${process.env.VUE_APP_BACKEND_ADDRESS}/groups/${this.$props.groupId}/administrators`)
        .then((response) => 
          this.groupAdmins = response.data)
        .catch((err) => console.log(err));
    },
    // méthodes pour retirer et ajouter le rôle administrateur à l'utilisateur
    giveUserAdminRole(userId) {
        axios
        .post(`${process.env.VUE_APP_BACKEND_ADDRESS}/groups/${this.$props.groupId}/administrators`,
        {
          userId: userId
        }
        )
        .then((response) => {
          if (response) //CHECK IF RESPONSE IS OK
            alert("L'utilisateur a bien été promu administrateur du groupe")})
        .catch((err) => {
          console.log(err)
          return;
        });
    },
    removeUserAdminRole(userId) {
      if (this.groupAdmins.length == 1) {
        alert("Impossible de retirer le rôle d'admin, un groupe doit toujours avoir au minimum 1 administrateur")
        return;
      }
      axios
        .delete(`${process.env.VUE_APP_BACKEND_ADDRESS}/groups/${this.$props.groupId}/administrators`,
        {
          userId: userId
        }
        )
        .then((response) => {
          if (response) //CHECK IF RESPONSE IS OK
            alert("L'utilisateur a bien été rétiré comme administrateur du groupe")})
        .catch((err) => {
          console.log(err)
          return;
        });
       
    },
    
    isCurrentUserAdmin() {
      return this.groupAdmins.some((admin) => this.$store.state.user.id == admin.id) 
    },
    isUserAdmin(user) {
      return this.groupAdmins.some((admin) => user.id == admin.id)
    },
    isCurrentUser(userId) {
      return (this.$store.state.user.id == userId) 
    },
    removeUserFromGroup(userId) {
      if(this.isUserAdmin(userId)) {
        alert("L'utilisateur est admin, veuillez retirez son rôle d'admin avant de pouvoir le supprimer du groupe")
        return
      }
      axios
        .delete(`${process.env.VUE_APP_BACKEND_ADDRESS}/groups/${this.$props.groupId}/members`,
        {
          userId: userId
        }
        )
        .then((response) => {
          if (response) //CHECK IF RESPONSE IS OK
            alert("L'utilisateur a bien été rétiré comme membre du groupe")})
        .catch((err) => {
          console.log(err)
          return;
        });
    },
    removeCurrentUserFromGroup() {
      if(this.isCurrentUserAdmin()) {
        alert("Vous êtes administrateur, veuillez retirez votre rôle d'admin avant de pouvoir quitter le groupe")
        return
      }
      axios
        .delete(`${process.env.VUE_APP_BACKEND_ADDRESS}/groups/${this.$props.groupId}/members`,
        {
          userId: this.$store.state.user.id 
        }
        )
        .then((response) => {
          if (response) //CHECK IF RESPONSE IS OK
            alert("Vous avez bien quitté le groupe")})
        .catch((err) => {
          console.log(err)
          return;
        });
    }
  },
  mounted() {
    this.getGroupName();
    this.getGroupAdmins();
    this.getGroupMembers();
    this.getGroupEvents();
  },
};
</script>



<style>
.binfo {
  font-size: 100%; 
  line-height: 100%; 
}
</style>
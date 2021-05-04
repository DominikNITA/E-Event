<template>
  <div>
    <search-event-bar></search-event-bar>

    <div class="container-fluid" v-if="event != null">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h1>{{ event.name }}</h1>
          </div>

          <!-- carré avec le centre d'intérêt de l'événement -->
          <div class="circle">
          {{event.categories[0].title}}
          </div>


          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <p>
              Description : {{ event.information }} <br />
              Nombre de places disponibles : {{event.availablePlaces}} <br />
              Lieu : {{event.place.address}}. {{event.place.place_name}}. {{event.place.description}} <br />
              Organisateur : {{event.organizer.name}} <br />

            </p>
          </div>

          <div>

            <p id="linkPlace">
              <a href="https://www.google.fr/maps/">Lieu</a>
            </p>

            <p>
              <!-- REMPLACER LIEN GOOGLE PAR LIEN POUR S'INSCRIRE -->
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
  .logo
{
    width:2em;
    float:left;

    color: black;
    font-size: 1.5em;
    font-family: 'MaPolice','Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    display:flex;
    justify-content: space-around;
    
}

.im2
{
    width:40em;
    float:left;
}

h1
{
    
    font-family: 'MaPolice','Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    text-decoration:transparent;
    color: black;
    font-size: 1.8em;
    margin: 1.5em;
}

ul#menulang
{
	height: 35px ;
	margin: 0 ;
	padding: 0 ;
	list-style-type: none ;
  float: right;
}

ul#menulang li
{
	float: left ;
	text-align: center ;
}

ul#menu li a
{
	width: 130px ;
	line-height: 25px ;
	font-size: 1.2em ;
	font-weight: bold ;
	letter-spacing: 2px ;
	color: #fff ;
	display: block ;
	text-decoration: none ;
	border-right: 2px solid #dea ;
}


/* Apparence au survol des liens */
a:hover 
{
   text-decoration: solid;
   color: black;
}

/*Quand le visiteur clique sur le lien*/ 
a:active  
{
    text-decoration: solid;
    color:green;
}


/*Quand le visiteur a déjà vu la page concernée */
/*
a:visited 
{
    text-decoration: solid;
    color:red; 
}
*/

/* Bouton rechercher */

label {
    display: block;
    font: 1rem 'Fira Sans', sans-serif;
}

input,
label {
    margin: .4rem 0;
}

input:invalid ~ span:after {
    content: '✖';
    padding-left: 5px;
    position: absolute;
}
  
input:valid ~ span:after {
    content: '✓';
    padding-left: 5px;
    position: absolute
}


.col-size {
  width: 100%;
  padding: 100% 0 0 0 !important;
  background: #f5a254;
}

.vert-center {
	position: absolute !important;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
}
.vert-center p {
	font-size: 24px;
	color: #fff;
	text-align: center;
	padding-left: 30px;
	padding-right: 30px
}


.circle{
    margin:10px;
    width:100px;
    background:white;
    height:100px;
    text-align:center;
    border-radius:100px;
    line-height:15px;
    padding-top:30px;
}

</style>
<template>
  <div>
    <search-event-bar></search-event-bar>

    <div class="container-fluid" v-if="event != null">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2>{{ event.name }}</h2>
            <br>
          </div>

          <!-- carré avec le centre d'intérêt de l'événement -->
          <div class="circle">
          {{event.categories[0].title}}
          </div>


          <div class="col-7">
            <p>
              Description : {{ event.information }} <br />
              Places disponibles : {{event.availablePlaces}} <br />
              Lieu : {{event.place.address}} <br />
              Organisateur : {{event.organizer.name}} <br />

            </p>
          </div>

           <!-- <div class="col-3">

           
            <p id="linkPlace">
            <a href="https://www.google.fr/maps/">Lieu</a>
            </p>
            

            
            <p id="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11172.599302718305!2d2.3068553458687435!3d48.860675033232255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1617726360303!5m2!1sfr!2sfr" width="300" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </p>
            

 
          </div>-->

          <div class="col-3">
            <p>
              <!-- S'INSCRIRE fonction TODO -->
              <button onclick="subscription()"> 
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
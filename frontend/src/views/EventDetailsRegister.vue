<!-- détail des événements auquel l'utilisateur est inscrit -->
<template>
  <div>
    <div class="container-fluid" v-if="event != null">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h1>{{ event.name }} </h1> 
            <br>
          
          </div>

          <!-- carré avec le centre d'intérêt de l'événement -->
          <div class="circle">
          {{event.categories[0].title}}
          </div>


          <div class="col-7">
            <h4> Description de l'événement : </h4>
            <p>
              {{ event.information }} <br />
            </p>

            <h4> Nombre de places disponibles : </h4>
            <p>
              {{event.availablePlaces}} <br />
            </p> 

            <h4> Organisateur : </h4>
            <p>
              {{event.organizer.name}} <br />
            </p> 

          </div>

          <div class="col-3">
            <p>
              Vous êtes inscrit !
            </p>

          <div>

            <h4> Lieu : </h4>
            <p>
              {{event.place.address}} <br />
            </p>
 
          </div>
          
            
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
//récupère les détails de l'événement dans la base de donnée
export default {
  props: {
    eventId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      user: [],
      event: null,
      eventName : [],
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
      })
      .catch((err) => console.error(err));
  },
  methods: {
    say: function (message) {
      alert(message)
    },
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
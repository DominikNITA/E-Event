app.component('plus-info', {
    props: {
        url_profil: {
            type: String,
            required: true
        }
    },
    template:
    /*html*/
    `
    <div class="informations">

        <h1>Plus d'information...</h1>
        <div class="retour"><img id="fleche-retour" src="C:\\Users\\User\\Documents\\GitHub\\E-Event\\frontend\\Laurie\\assets\\images\\retour.png"> <a :href="url_profil">Retour</a></div>
        <form class="info-form" @submit.prevent="onSubmit" readonly="modif">
            <h2>Mes informations personnelles</h2>
            <label for="nom">Nom :</label>
            <input
            id="nom"
            v-model="nom"
            @ondblclick="setModif">

            <label for="prenom">Prenom :</label>
            <input id="prenom" v-model="prenom">

            <label for="email">E-mail :</label>
            <input type="email" id="email" v-model="email">

            <label for="localisation">Localisation(s) :</label>
            <input id="localisation" v-model="localisation">

            <label for="centre-interet">Centre d'intérêt(s):</label>
            <input type="url" id="centre-interet" v-model="centreInteret">

            <input class="button" type ="submit" value= "Soumettre">
        </form>
    </div>
    `,
    data() {
        return {
            modif: false,
            nom: "",
            prenom: "",
            email: "",
            localisation: [],
            centreInteret: []
        }
    },
    methods: {
        setModif() {
            this.modif=!this.modif
        }
    }
})
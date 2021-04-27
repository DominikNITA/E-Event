app.component('profil', {
    props: {
        url_mes_evenements: {
            type: String,
            required: true
        }
    },
    template:
    /*html*/
    `
    <div class="container informations">
        <div class="row retour">
            <h1>Profil</h1>
            <button type="button" class="btn btn-outline-dark col-md-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                </svg>
                Retour
            </button>
        </div>
        <div class="row">
            <form class="row g-3">
                <div class="col-md-6">
                    <label for="prenom" class="form-label">Prenom</label>
                    <input type="name" class="form-control" id="prenom">
                </div>
                <div class="col-md-6">
                <label for="nom" class="form-label">Nom</label>
                <input type="surname" class="form-control" id="nom">
                </div>
                <div class="col-12">
                    <label for="mail" class="form-label">E-mail</label>
                    <input type="mail" class="form-control" id="mail">
                </div>
                <div class="col-12">
                    <label for="adresse" class="form-label">Localisation</label>
                    <input type="address" class="form-control" id="adresse">
                </div>
                <div class="col-md-6">
                    <label for="centres-interet" class="form-label">Mes Centre(s) d'intérêt</label>
                    <input type="text" class="form-control" id="centres-interet">
                </div>
                <div class="col-md-6">
                    <label for="mes_groupes" class="form-label">Mes Groupes</label>
                    <input type="text" class="form-control" id="mes_groupes">
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary position-absolute end-0">Sign in</button>
                </div>
            </form>
            <!--<form class="info-form" @submit.prevent="onSubmit" readonly="modif">
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
            </form>-->
        </div>
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
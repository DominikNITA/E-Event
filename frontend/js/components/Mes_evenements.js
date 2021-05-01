app.component('mes_evenements', {
    props: {
        url_profil: {
            type: String,
            required: true
        }
    },
    template:
    /*html*/
    `
    <div class="mes_evenements">

        <h1>Mes évènements</h1>
        <!--<img id="pp" src="./assets/images/exemple.png"/>
        <h2>Mes évènements</h2>-->
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid  recherche">
                <a class="navbar-brand" :href="url_profil">Plus d'infos...</a>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Recherche..." aria-label="Recherche...">
                    <button class="btn btn-outline-success" type="submit">Valider</button>

                </form>
            </div>
        </nav>
    </div>
    <span v-for="n in nbEvent"><display-event></display-event></span>
    `,
    
    data() {
        return {
            nbEvent: 8
        }
    },

    methods: {
        display_event() {
            return "<display-event></display-event>"
        }
    }
})
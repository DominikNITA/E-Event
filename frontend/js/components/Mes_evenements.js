app.component('mes_evenements', {
    template:
    /*html*/
    `
    <div class="mes_evenements">

        <h1>Mes évènements</h1>
        <!--<img id="pp" src="./assets/images/exemple.png"/>
        <h2>Mes évènements</h2>-->
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid  recherche">
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Recherche..." aria-label="Recherche...">
                    <button class="btn btn-outline-success" type="submit">Valider</button>
                </form>
            </div>
        </nav>
    </div>
    {{display_event()}}
    `,
    
    data() {
        return {
            nbEvent: 0
        }
    },

    methods: {
        display_event() {
            return "<display-event></display-event>"
        }
    }
})
app.component('head-page', {
    template:
    /*html*/
    `
    <div class="head-page">
        <div class = "langues">
            <a href='url_courrant' @click="langue('fr')"> FR </a>
            <a href='url_courrant' @click="langue('eng')"> ENG </a>
        </div>
        <div class = "logo"> E-Event </div>
            <img src="./assets/images/logo.png" />
        <div class = "racourci">
            <ul>
                <li><a href='url_accueil'> Accueil </a></li>
                <li><a href='url_evenements'> Evenements </a></li>
                <li><a href='url_gdp'> Gestion du profil </a></li>
            </ul>
        </div>
    </div>
    `,

    methods: {
        langue(lg) {
            this.$emit('changerLangage', lg)
        }
    }
})
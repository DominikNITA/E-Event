app.component('head-page', {
    props: {
        url_courrant: {
            type: String,
            required: true
        },
        url_accueil: {
            type: String,
            required: true
        },
        url_evenements: {
            type: String,
            required: true
        },
        url_gdp: {
            type: String,
            required: true
        }
    },
    template:
    /*html*/
    `
    <div class="head-page">
        <div class = "langues">
            <a :href="url_courrant" @click="langue('fr')"> FR </a>
            <a :href="url_courrant" @click="langue('eng')"> ENG </a>
        </div>
        <div class = "logo"> E-Event </div>
            <img src="./assets/images/logo.png" />
        <div class = "raccourci">
            <a :href="url_accueil"> Accueil </a>
            <a :href='url_evenements'> Evenements </a>
            <a :href='url_gdp'> Gestion du profil </a>
        </div>
    </div>
    `,

    methods: {
        langue(lg) {
            this.$emit('changerLangage', lg)
        }
    }
})
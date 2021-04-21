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
        url_profil: {
            type: String,
            required: true
        }
    },
    template:
    /*html*/
    `
    <div class="container-fluid head-page">
        <div class = "row langues">
            <ul class="nav justify-content-end">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" :href="url_courrant" @click="langue('fr')">FR</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :href="url_courrant" @click="langue('eng')">ENG</a>
                </li>
            </ul>
        </div>
        <nav class="navbar navbar-light">
            <div class="container-fluid">
                <a class="navbar-brand fs-2" :href="url_accueil"> E-Event
                <img src="./assets/images/logo.png" height="50" class="d-inline-block align-text-center justify-content-center logo">
                </a>
            </div>
        </nav>
        <div class = "raccourci">
            <ul class="nav nav-tabs justify-content-end">
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" :href="url_accueil">Accueil</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :href="url_evenements">Evenements</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" :href="url_profil">Gestion du profil</a>
                </li>
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
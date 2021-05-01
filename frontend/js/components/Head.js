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
        url_mes_evenements: {
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
                    <a class="nav-link" aria-current="page" :href="url_courrant" @click="langue('fr')">FR</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :href="url_courrant" @click="langue('eng')">ENG</a>
                </li>
            </ul>
        </div>
        <nav class="navbar navbar-light">
            <div class="container-fluid">
                <a class="navbar-brand fs-2" :href="url_accueil"> E-Event
                <img src="../images/logo.png" height="50" class="d-inline-block align-text-center justify-content-center logo">
                </a>
            </div>
        </nav>
        <div class = "raccourci">
            <ul class="nav nav-tabs justify-content-end">
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: isActive(url_accueil) }" aria-current="page" :href="url_accueil">Accueil</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{active: isActive(url_evenements)}" :href="url_evenements">Evenements</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{active: isActive(url_mes_evenements)}" :href="url_mes_evenements">Mes évènements</a>
                </li>
            </ul>
        </div>
    </div>
    `,

    computed: {
        update_url() {
            var urlcourant = document.location.href; 
            // Supprimons l'éventuel dernier slash de l'URL
            var urlcourant = urlcourant.replace("/", "");
            // Gardons dans la variable queue_url uniquement la portion derrière le dernier slash de urlcourante
            url = urlcourant.substring (urlcourant.lastIndexOf( "/" )+1 );
            this.url_courrant = ("../html/") + url
        }
    },
    methods: {
        langue(lg) {
            this.$emit('changerLangage', lg)
        },
        isActive(autreURL) {
            var urlcourant = document.location.href; 
            // Supprimons l'éventuel dernier slash de l'URL
            var urlcourant = urlcourant.replace("/", "");
            // Gardons dans la variable queue_url uniquement la portion derrière le dernier slash de urlcourante
            url = urlcourant.substring (urlcourant.lastIndexOf( "/" )+1 );
            url = ("../html/") + url
            if(autreURL == url) {
                return true
            }
            else {
                return false
            }
        }
    }
})
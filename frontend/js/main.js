const app = Vue.createApp({
    data() {
        return {
            langue: "fr",
            url_courrant: "../../frontend/e-Event_accueil.html",
            url_accueil: "../../frontend/e-Event_accueil.html",
            url_evenements: "../../frontend/page_event.html",
            url_gdp:"./gdp.html",
            url_profil:"./profil.html"
        }
    },

    methods: {
        changerLangage(newLangue) {
            if(newLangue != langue)
            switch(newLangue) {
                case 'fr':
                    langue=newLangue;
                case 'eng':
                    langue=newLangue;
                default :
            }
        }
    }
})
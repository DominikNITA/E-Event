const app = Vue.createApp({
    data() {
        return {
            langue: "fr",
            url_courrant: "../html/liste_events.html",
            url_accueil: "../html/liste_events.html",
            url_evenements: "../html/page_event.html",
            url_gdp:"../html/gdp.html",
            url_profil:"../html/profil.html"
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
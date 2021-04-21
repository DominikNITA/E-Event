const app = Vue.createApp({
    data() {
        return {
            langue: "fr",
            url_courrant: "../html/e-Event_accueil.html",
            url_accueil: "../html/e-Event_accueil.html",
            url_evenements: "../html/page_event_v2.html",
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
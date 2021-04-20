const app = Vue.createApp({
    data() {
        return {
            langue: "fr",
            url_courrant: "C:\\Users\\User\\Documents\\GitHub\\E-Event\\frontend\\e-Event_accueil.html",
            url_accueil: "C:\\Users\\User\\Documents\\GitHub\\E-Event\\frontend\\e-Event_accueil.html",
            url_evenements: "C:\\Users\\User\\Documents\\GitHub\\E-Event\\frontend\\page_event.html",
            url_gdp:"C:\\Users\\User\\Documents\\GitHub\\E-Event\\frontend\\Laurie\\gdp.html",
            url_profil:"C:\\Users\\User\\Documents\\GitHub\\E-Event\\frontend\\Laurie\\profil.html"
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
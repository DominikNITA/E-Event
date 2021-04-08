const app = Vue.createApp({
    data() {
        return {
            langue: "fr",
            url_courrant: "file:///C:/Users/User/Documents/ET4/Projet_Spe/Site/index.html"
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
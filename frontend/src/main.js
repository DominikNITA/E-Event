import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/src/jquery.js";
import "bootstrap/dist/js/bootstrap.min.js";

import VueResource from "vue-resource";
Vue.use(VueResource);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");

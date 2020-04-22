import Vue from "vue";
import Vuex from 'vuex'
import VueRouter from "vue-router";
import Vuetify from 'vuetify'
import DaySpanVuetify from 'dayspan-vuetify'
import App from "./App";
import VueToast from 'vue-toast-notification';

/* Styles */
import '@/scss/main.scss'
import '@mdi/font/css/materialdesignicons.css'



// router setup
import routes from "./routes/routes";

// Plugins
import GlobalDirectives from "./globalDirectives";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'dayspan-vuetify/dist/lib/dayspan-vuetify.min.css';
import 'vue-toast-notification/dist/theme-default.css';

// Vuex Store
import store from './store/store';

Vue.use(BootstrapVue);
Vue.config.productionTip = false

// Firebase
import firebase from 'firebase';
import '@/firebase/firebaseConfig'
import Buefy from 'buefy'
import './assets/scss/app.scss'

Vue.use(Buefy)
firebase.auth().onAuthStateChanged(user => {
    store.dispatch("fetchUser", user);
});

// configure router
const router = new VueRouter({
  mode: 'history',
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

Vue.prototype.$Chartist = Chartist;
Vue.config.productionTip = false;

Vue.use(VueToast, {
  // One of options
  position: 'top'
});
Vue.$toast.open('You did it!');
Vue.$toast.open({/* options */});

// Close all opened toast immediately
Vue.$toast.clear();

Vue.use(Vuex)
Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalDirectives);
Vue.use(DaySpanVuetify, {
  methods: {
    getDefaultEventColor: () => '#1976d2'
  }
});

// firebase.initializeApp({
//     apiKey: "AIzaSyDndH7Svdrup3iy5t1UejbE2G9-ODXSBKc",
//     authDomain: "younus-144b9.firebaseapp.com",
//     databaseURL: "https://younus-144b9.firebaseio.com",
//     projectId: "younus-144b9",
//     storageBucket: "younus-144b9.appspot.com",
//     messagingSenderId: "100706729397",
//     appId: "1:100706729397:web:57cff026c19cad38d66dfc",
//     measurementId: "G-RJ91H0B48C"
// });

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store,
  data: {
    Chartist: Chartist
  }
});

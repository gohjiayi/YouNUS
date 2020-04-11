import Vue from "vue";
import App from "./App.vue";
import store from "./store/store.js";
import routes from "./routes/routes";
import VueRouter from "vue-router";
import firebase from "firebase";
import '@/firebase/firebaseConfig';

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

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

Vue.use(BootstrapVue);
Vue.config.productionTip = false

// configure router
const router = new VueRouter({
  mode: 'history',              //newly added
  base: process.env.BASE_URL,   //newly added
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

Vue.prototype.$Chartist = Chartist;

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

// Login
firebase.auth().onAuthStateChanged(user => {
    store.dispatch("fetchUser", user);
});

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

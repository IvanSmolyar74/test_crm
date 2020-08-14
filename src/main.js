import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
// импорт firebase
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)

// инициализация firebase
firebase.initializeApp({
  apiKey: "AIzaSyBMrUYPgs3OAuH6ys382SxCQXKQY9fsRNE",
  authDomain: "my--vue-crm.firebaseapp.com",
  databaseURL: "https://my--vue-crm.firebaseio.com",
  projectId: "my--vue-crm",
  storageBucket: "my--vue-crm.appspot.com",
  messagingSenderId: "1019090550575",
  appId: "1:1019090550575:web:70c847e7bab9eda0102bda",
  measurementId: "G-LJZMK94L3B"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})



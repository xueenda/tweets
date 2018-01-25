import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

Vue.use(VueLocalStorage)

export { app, router, store }

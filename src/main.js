import Vue from 'vue'
import VueRouter from 'vue-router'
import Notifications from 'vue-notification'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Notifications)

const routes =  [
  { name: "home", path: '/', component: App.components.NFTExplorer },
  { name: "explorer", path: '/explorer', component: App.components.NFTExplorer },
  { name: "foundry", path: '/foundry', component: App.components.TokenFoundry },
  { name: "details", path: '/details/:contract_hash/:id', component: App.components.TokenDetails}
]

const router = new VueRouter({
  routes 
})

new Vue({
  components: {
    Notifications
  },
  render: h => h(App),
  router,
}).$mount('#app')

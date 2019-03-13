import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)
const routes =  [
  { path: '/', component: App.components.NFTExplorer },
  { path: '/explorer', component: App.components.NFTExplorer },
  { path: '/foundry', component: App.components.TokenFoundry },
  { path: '/details', component: App.components.TokenDetails}
]

const router = new VueRouter({
  routes 
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

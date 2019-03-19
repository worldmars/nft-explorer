<template>
  <div id="app">
    <dAPIProgress v-if="waitingForDapi"> </dAPIProgress>
    <AppHeader></AppHeader>
    <keep-alive>
      <router-view v-on:isWaitingForDapi="setWaiting(true)"  v-on:isNotWaitingForDapi="setWaiting(false)"></router-view>
    </keep-alive>
    <AppFooter></AppFooter>
  </div>
  
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import NFTExplorer from './components/NFTExplorer/NFTExplorer.vue'
import AppFooter from './components/AppFooter.vue'
import TokenFoundry from './components/TokenFoundry.vue'
import TokenDetails from './components/TokenDetails.vue'
import dAPIProgress from './components/dAPIProgress.vue'



export default {
  name: 'app',
  components: {
    AppHeader,
    NFTExplorer,
    TokenFoundry,
    TokenDetails,
    dAPIProgress,
    AppFooter
  }, data: function() {
    return {
      waitingForDapi: false
    }
  }, methods: {
    setWaiting(isWaitingForDapi) {
      this.waitingForDapi = isWaitingForDapi
    }
  }
}
</script>

<style>
#app {
		font-family: 'Nunito', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
}
</style>

<template>
  <div id="app">
    <AppHeader></AppHeader>
    <keep-alive>
      <router-view></router-view>
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



export default {
  name: 'app',
  components: {
    AppHeader,
    NFTExplorer,
    TokenFoundry,
    TokenDetails,
    AppFooter
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

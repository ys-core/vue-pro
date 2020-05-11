<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <Loading v-if="loading"></Loading>
    <router-view/>

  </div>
</template>

<script>
import Loading from './components/Loading'
import { mapState } from 'vuex'
export default {
  name: 'App',
  data(){
    return{
      
    }
  },
  components:{
    Loading
  },
  computed:{
    ...mapState([
      'loading'
    ])
  }
}
</script>

<style>

html,body{
  /* background: black; */
  /* background: rgb(245,245,245); */
  margin: 0;
  padding: 0;
  border: 0;
  /* background-image: linear-gradient(to bottom right, rgb(255,255,255), rgb(170, 170, 139)); */
}
#app {
  font-family: 'Monospace,Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* margin: 0 auto; */
  /* margin-top: 5rem; */
  /* border-top: 1px  solid #888888; */

  
}
</style>

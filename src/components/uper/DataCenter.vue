<template>
  <div class="data-center">
        <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    //   this.enableLoading()
    //   this.loadingData()
    //   this.disableLoading()
    // this.drawChart()
  },
  methods:{
       ...mapActions([
        'enableLoading',
        'disableLoading'
      ]),
      async loadingData(){
  
      },
      drawChart() {

    }

}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@media only screen and (min-width:540px){


}
@media only screen and (max-width:540px){


}
</style>

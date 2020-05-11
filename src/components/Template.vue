<template>
  <div class="">
    
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
      this.enableLoading()
      this.loadingData()
      this.disableLoading()
  },
  methods:{
       ...mapActions([
        'enableLoading',
        'disableLoading'
      ]),
      async loadingData(){
        await this.$axios.get('/api/getAllArticles').then(res => {
        if(res.data.status == 'true'){
          // console.log(res.data.allArticles)
          for(let item of res.data.allArticles){
            this.articles.push(item)
          }          
          this.footerShowing = true
        }
      })
   
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

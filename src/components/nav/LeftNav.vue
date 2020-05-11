<template>
  <div class="left-nav">
        <ul>
            <li><router-link tag="li" to="/">主页</router-link></li>
            <li><router-link tag="li" to="/blog">博客</router-link></li>
            <li><router-link tag="li" to="/note">笔记</router-link></li>
            <li><router-link tag="li" to="/mood">心情</router-link></li>
            <li><router-link tag="li" to="/board">留言板</router-link></li>
            <li><router-link tag="li" to="/more">更多..</router-link></li>
        </ul>
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
  
  },
  methods:{
       ...mapActions([
        'enableLoading',
        'disableLoading'
      ]),
    
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@media only screen and (min-width:540px){

.left-nav{
        height: 100vh;
        width: 10%;
        position: fixed;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-shadow:  inset 0px 10px 20px gray;
        // background-image: linear-gradient(to top right, rgb(229, 255, 255), rgb(214, 227, 230));
        // color: black;
        ul{
            li{
                list-style-type: none;
                line-height: 5vh;
                padding-left: 1rem;
                font-size: 0.8rem;
                &:hover{
                    cursor: pointer;
                }
            }
        }
}

}
@media only screen and (max-width:540px){
.left-nav{
    display: none
}

}
</style>

<template>
<div class="mood-warpper">
    <left-nav />
    <div class="mood-core">
        <div v-for="(mood,index) in moods" :key="index" class="mood-item"> 
               <span v-if="mood.showYear" class="year">{{ mood.contentDate ? mood.contentDate.substring(0,4) + '年': '' }}</span>
               <span class="date">{{ mood.contentDate ? mood.contentDate.substring(5,10).replace(/-/g,'月') + '日' : ''  }}</span>
               <div v-html="mood.content" class="mood-content"></div>
               <ul>
                   <li><Icon type="ios-contact"></Icon>{{ mood.username }}</li>
                   <li @click="submitLikes(mood,index)"><Icon type="ios-thumbs-up"></Icon>{{ mood.likes }}</li>
                   <li  @click="submitDislikes(mood,index)" ><Icon type="ios-thumbs-down"></Icon>{{ mood.dislikes }}</li>
                   <li></li>
               </ul>
        </div>
    </div>
    <foot-nav v-if="footerShowing" class="foot-nav"></foot-nav>
</div>
</template>

<script>

import FootNav from './foot-nav/Footer.vue'
import LeftNav from './nav/LeftNav'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      moods: [],
      footerShowing: false
    
    }
  },
  components:{
     FootNav,
     LeftNav
  },
  computed:{
   
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
        await this.$axios.get('/api/getAllMoods').then(res => {
            if(res.data.status == 'true'){
            // console.log(res.data.Moods)
             let  year = new Set()
             this.moods.splice(0,this.moods.length)
            for(let item of res.data.Moods){
                let _year = item.contentDate.substring(0,4)  
                if(year.has(_year)){
                    this.moods.push({showYear: false,...item})
                }else{
                    year.add(_year)
                    this.moods.push({showYear: true,...item})
                }
                // this.moods.push(item)
            }          
            }   
      })
      this.footerShowing = true
    },
    submitLikes(mood,index){
        let  _id = mood._id || 0
        let likes = mood.likes || 0
        this.$axios.post('/api/mood/update_mood_likes',{ _id, likes }).then(res => {
                if(res.data.status == 'true'){
                    // console.log(res.data.likes)
                    this.moods[index].likes = res.data.likes
                }
        }).catch(err => {

        })
    },
    submitDislikes(mood,index){
        let  _id = mood._id || 0
        let dislikes = mood.dislikes || 0
        this.$axios.post('/api/mood/update_mood_dislikes',{ _id, dislikes }).then(res => {
                if(res.data.status == 'true'){
                    // console.log(res.data.likes)
                    this.moods[index].dislikes = res.data.dislikes
                }
        }).catch(err => {

        })
    },
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@media only screen and (min-width:540px){
.mood-warpper{
    .mood-core{
        width: 60%;
        margin: 0 auto;
        padding-left: 1%;
        padding-top: 2rem;
        min-height: 100vh;
        .mood-item{
            margin-bottom: 2rem;
            margin-left: 3rem;
            min-height: 10vh;
            border-bottom: 1px solid lime;
            font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
            .year{
                font-size: 2rem;
                font-style: italic;
                display: block;
                position: relative;
                left: -3rem;
            }
            .date{
                font-style: italic;
                display: block;
            }
            .mood-content{
                padding: 1rem 2rem 1rem 1rem;
            }
            ul{
                li{
                    list-style-type: none;
                    display: inline-block;
                    width: 5rem;
                    &:hover{
                        cursor: pointer;
                    }
                    // background-color: lime;
                    &:nth-child(1){
                        margin-left: 1rem;
                    }
                }
            }

        }
    }
}

}


@media only screen and (max-width:540px){
.mood-warpper{
    .mood-core{
        padding-top: 2rem;
        min-height: 100vh;
        .mood-item{
            margin-bottom: 2rem;
            min-height: 10vh;
            margin-left: 1rem;
            border-bottom: 1px solid lime;
            font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
            .year{
                font-size: 1rem;
                font-style: italic;
                font-weight: bolder;
                display: block;
                position: relative;
                left: -1rem;
            }
            .date{
                font-style: italic;
                display: block;
                font-size: 0.6rem;
            }
            .mood-content{
                padding: 1rem 0;
            }
            ul{
                li{
                    list-style-type: none;
                    display: inline-block;
                    padding-right: 4vw;
                }
            }

        }
    }
    .foot-nav{
        font-size: 0.6rem;
    }
}

}
</style>

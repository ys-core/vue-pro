<template>
  <div class="note-warpper">
        <left-nav />
        <div v-for="(item,index) in notes" :key="index" class="note-item"> 
            <span v-if="item.showYear" class="year">{{ item.time ? item.time.substring(0,4) + '年': '' }}</span>
            <span class="date">{{ item.time ? item.time.substring(5,10).replace(/-/g,'月') + '日' : ''  }}</span>
            <div v-html="item.note" class="note-content"></div>
            <hr />
        </div>
        <foot-nav v-if="footerShowing"></foot-nav>
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
      notes: [],
      footerShowing: false,
    }
  },
  components:{
      FootNav,
      LeftNav
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
        await this.$axios.get('/api/getAllNotes').then(res => {
           if(res.data.status == 'true'){
                let  year = new Set()
                this.notes.splice(0, this.notes.length)
                for(let item of res.data.Notes){
                    let _year = item.time.substring(0,4)  
                    if(year.has(_year)){
                        this.notes.push({showYear: false,...item})
                    }else{
                        year.add(_year)
                        this.notes.push({showYear: true,...item})
                    }
                }          
        }
      })
      this.footerShowing = true
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@media only screen and (min-width:540px){

@keyframes flashBorder {
   0%{ }
    25%{  }
    50%{  }
    75%{  }
}
@-webkit-keyframes flashBorder {
    0%{  }
    25%{  }
    50%{  }
    75%{  }
}
.note-warpper{
	background: url("../assets/wbg.jpg") repeat;
    .note-item{
        width: 1000px;
        max-width: 80%;
        min-height: 100%;
        margin: 0 auto;
        padding: 2rem 0;
        padding: 2rem 0;
        font-family: "Microsoft Yahei";
        .year{
          font-family:  ceil;
          display: block;
          font-weight: bolder;
          font-style: italic;
          font-size: 1.5rem;
          position: relative;
          left: -2rem;
          margin-bottom: 2rem;
          color: lime;
        }
        .date{
            display: block;
            font-size: 0.8rem;
            margin-bottom: 1rem;
        }
        .note-content{
          padding-bottom: 1rem;
          & >>> pre {
             background-color: black;
             color: white;
             padding: 1rem;
             font-style: italic;
             font-family:  ceil;
          }
        }
    }

}

}

@media only screen and (max-width:540px){
.note-warpper{
    padding: 1rem 0;
    overflow-x: auto;
    .note-item{
        padding: 1rem 0 1rem 1rem;
        .year{
          display: block;
          font-weight: bolder;
          font-style: italic;
          font-size: 1.5rem;
          position: relative;
          left: -1rem;
          margin-bottom: 2rem;
          color: lime;
        }
        .date{
              display: block;
              font-size: 0.8rem;
              margin-bottom: 1rem;
        }
        .note-content{
          padding-bottom: 1rem;
        }
    }

}

}
</style>

<template>
  <div class="blog_warpper animated zoomIn">
    <left-nav />
    <div class="blog_core">
        <div class="blog_nav">
            <li @click="loadingData()">All</li>
            <li @click="submitCategory('React')">React</li>
            <li @click="submitCategory('Vuejs')">Vuejs</li>
            <li @click="submitCategory('Angular')">Angular</li>
            <li @click="submitCategory('Js')">Js</li>
            <li @click="submitCategory('Ts')">Ts</li>
            <li @click="submitCategory('css')">css</li>
            <li @click="submitCategory('Linux')">Linux</li>
            <li @click="submitCategory('NodeJs')">NodeJs</li>
            <li @click="submitCategory('Other')">Other..</li>
        </div>
        <!-- <hr /> -->
        <div v-for="(article,index) in articles"  :key="index" class="blog bounceInUp">
          <div v-if="article.showYear" class="year"><h1>{{article.showYear ? article.createDate.substring(0,4)+'年' : ''}}</h1></div>
          <router-link :to="{path: '/blog/'+article._id, query:{blogger: article}}" ><h2>{{article.articleTitle}}</h2></router-link> 
        </div>
    </div>
    <Footer v-if="footerShowing" class="foot-nav animated bounceInUp"></Footer >
    <!-- <Spin size="large" fix v-if="spinShow"></Spin> -->
  </div>

</template>

<script>
import Footer from './foot-nav/Footer.vue'
import Loading from './Loading'
import LeftNav from './nav/LeftNav'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'blog',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App blog',
      articles: [],
      footerShowing: false,
      spinShow: true
    }
  },
  components:{
    Footer,
    LeftNav
  },
  mounted(){
      // this.enableLoading()
      this.$Spin.show();
      this.loadingData()
      // this.disableLoading()
  },
  computed:{
    ...mapState([
      'loading'
    ])
  },
  methods:{
    ...mapActions([
      'enableLoading',
      'disableLoading'
    ]),
    async loadingData(){
        await this.$axios.get('/api/getAllArticlesBriefInfo').then(res => {
           this.articles.splice(0,this.articles.length)
            if(res.data.status == 'true'){
              // console.log(res.data.allArticles)
              let  year = new Set()
              for(let item of res.data.allArticles){
                  let _year = item.createDate.substring(0,4)            // year
                  if(!year.has(_year)){
                      year.add(_year)
                      this.articles.push({...item,'showYear':true})
                  }else{
                      this.articles.push({...item,'showYear':false})
                  }
              }
              this.footerShowing = true
            }
          })
          this.$Spin.hide();

        // this.disableLoading()

    },
    submitCategory(_category){
      // console.log(_category)
      this.$Spin.show();
      this.$axios.get('/api/getArticles/' + _category,{ params: { _category }}).then(res => {
            // console.log(res.data.articles)
             this.articles.splice(0,this.articles.length)
            if(res.data.status == 'true'){
                    let  year = new Set()
                    for(let item of res.data.articles){
                      let _year = item.createDate.substring(0,4)            // year
                      if(!year.has(_year)){
                          year.add(_year)
                          this.articles.push({...item,'showYear':true})
                      }else{
                          this.articles.push({...item,'showYear':false})
                      }
                  }
            }
            this.footerShowing = true
      }).catch(err => {

      })
      this.$Spin.hide();
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@media only screen and (min-width:540px){
.blog_warpper{
    // background: rgba(236, 142, 126, 0.9);
	 background: url("../assets/wbg.jpg") repeat;
     font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
     .blog_core{
		width: 1000px;
        min-height: 100vh;
        margin: 0 auto;
        padding-bottom: 2rem;
        /* box-shadow: inset 0 1rem 2rem gray;*/    /* #abb8c4a6 */
        .blog_nav{
            position: sticky;
            padding: 5rem 0 2rem 0;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 2rem;
            z-index: 1000;
            // box-shadow: inset 0px 28px 40px #76c8d1;
            // background-image: linear-gradient(to bottom right, rgb(229, 255, 255), rgb(214, 227, 230));
             li {
                display: inline-block;
                list-style-type: none;
                padding: 0 1rem;
                text-align: center;
                height: 1.5rem;
                &:hover{
                  cursor: pointer;
                  transform: scale(1.2);
                  background: transparent;
                  // text-shadow: 2px 4px red;
                  // box-shadow: 0 1px 2px rgb(232, 19, 240);
                }
                // text-shadow: 0.12rem 0.28rem rgb(128, 42, 8);
                /* font-size: 0.9rem; */
            }
        }
        .blog{   
              padding-left: 6rem;
              margin: 2rem 0 3rem 0;
              .year{
                      position: relative;
                      left: -5rem;
                      margin-bottom: 2rem;
                      /* background: yellow; */
                      font-family:Verdana, Geneva, Tahoma, sans-serif;
               }
              .router-link-active{
                     text-decoration: none;
               }
               a{
                    text-decoration: none;
                    color: rgb(88, 43, 43);
               }

        }

    }
}

}


@media only screen and (max-width:540px){
.blog_warpper{
     font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
     .blog_core{
        min-height: 100vh;
        padding-bottom: 2rem;
        box-shadow: inset 0 0 40rem #abb8c4a6;    /* #abb8c4a6 */
        .blog_nav{
            position: sticky;
            padding: 5rem 0 2rem 0;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 2rem;
            box-shadow: inset 0px 28px 40px #76c8d1;
            background-image: linear-gradient(to bottom right, rgb(229, 255, 255), rgb(214, 227, 230));
             li {
                display: inline-block;
                list-style-type: none;
                text-align: center;
                padding: 2vw;
                height: 1.5rem;
                font-size: 0.6rem;
              
            }
        }
        .blog{   
              padding-left: 2rem;
              margin: 2rem 0 3rem 0;
              font-size: 0.7rem;
              .year{
                      position: relative;
                      left: -2rem;
                      font-size: 0.5rem;
                      margin-bottom: 2rem;
                      font-family:Verdana, Geneva, Tahoma, sans-serif;
               }
              .router-link-active{
                     text-decoration: none;
               }
               a{
                    text-decoration: none;
                    color: rgb(88, 43, 43);
               }

        }

    }
    .foot-nav{
      font-size: 0.6rem;
    }
}

}


</style>

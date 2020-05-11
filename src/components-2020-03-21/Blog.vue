<template>
  <div class="blog_warpper animated zoomIn">
    <div class="blog_core">
        <div class="blog_nav">
            <li>React</li>
            <li>VueJs</li>
            <li>JavaScript</li>
            <li>NodeJs</li>
            <li>Other..</li>
        </div>
        <div v-for="(article,index) in articles"  :key="index" class="blog bounceInUp">
          <div v-if="article.showYear" class="year"><h1>{{article.showYear ? article.createDate.substring(0,4)+'年' : ''}}</h1></div>
          <router-link :to="{path: '/blog/'+article._id, query:{blogger: article}}" ><h2>{{article.articleTitle}}</h2></router-link> 
          <!-- <div class="article_description">
                <li>作者:{{article.author}}</li>
                <li>创建日期:{{article.createDate.substring(0,10)}}</li>
                <li>点赞:{{article.starsNum || 0}}</li>
                <li>浏览:{{article.views || 0}}</li>
          </div> -->
      </div>
    </div>
    <Footer v-if="footerShowing" class="footer animated bounceInUp"></Footer >
  </div>
</template>

<script>
import Footer from './Footer.vue'
export default {
  name: 'blog',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App blog',
      articles: [],
      footerShowing: false
    }
  },
  components:{
    Footer
  },
  mounted(){
    this.$axios.get('/api/getAllArticles').then(res => {
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
          this.footerShowing = ! this.footerShowing
        }
        
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@media only screen and (min-width:540px){
.blog_warpper{
    background: rgba(236, 142, 126, 0.9);
     font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
    .blog_core{
        width: 60%;
        margin: 0 auto;
        padding-bottom: 2rem;
        box-shadow: inset 0 0 40rem #abb8c4a6;    /* #abb8c4a6 */
        .blog_nav{
            /* background:rgb(209, 159, 172); */
            background: white;
            position: sticky;
            padding: 5rem 0 2rem 0;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 2rem;
            z-index: 100;
             li {
                display: inline-block;
                list-style-type: none;
                padding: 0 1rem;
                text-align: center;
                // text-shadow: 0.12rem 0.28rem rgb(128, 42, 8);
                /* font-size: 0.9rem; */
            }
        }
        .blog{   
              padding-left: 6rem;
              margin-bottom: 3rem;
              .year{
                      position: relative;
                      left: -6rem;
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
</style>

<template>
<div class="homepage">
    <div class="head_nav  bounceInDown">
      <ul>
          <li><router-link to="/">主页</router-link></li>
          <li><router-link to="blog">博客</router-link></li>
          <li><router-link to="article">文章</router-link></li>
           <li><router-link to="note">笔记</router-link></li>
          <li><router-link to="mood">心情</router-link></li>
          <li><router-link to="/uper">管理员</router-link></li>
          <li><router-link to="board">留言板</router-link></li>
          <li><router-link to="more">更多..</router-link></li>
           <li><router-link to="login">
              <Avatar style="background-color: #37d068" size="small" icon="ios-person" ></Avatar>
              <span>登录</span></router-link>
          </li>
          <li class="uper"><router-link to="/contact">前端小智</router-link></li>
      </ul>
      
    </div>
    <div v-for="(article,index) in articles"  :key="index" class="body  animated zoomIn">
        <h2>{{article.articleTitle}}</h2>
        <div class="article_description">
              <li>作者:{{article.author}}</li>
              <li>创建日期:{{article.createDate.substring(0,10)}}</li>
              <li>点赞:{{article.starsNum || 0}}</li>
              <li>浏览:{{article.views || 0}}</li>
        </div>
        <router-link :to="{path: '/blog/'+article._id, query:{ _id : article._id, views: article.views }}" ><p id="article_content" v-html="article.content" :key="article._id" ></p></router-link>     
    </div>
    <FootNav v-if="footerShowing" class=" animated bounceInUp"></FootNav >
  </div>
</template>


<script>
import FootNav from './foot-nav/Footer.vue'
export default {
  name: 'home',
  data () {
    return {
      articles: [],
      footerShowing: false,
    }
  },
  components:{
     FootNav,
  },
  mounted(){
      console.log('mounted..')
      this.$axios.get('/api/getAllArticles').then(res => {
        
        if(res.data.status == 'true'){
          console.log(res.data.allArticles)
          for(let item of res.data.allArticles){
            this.articles.push(item)
          }          
          this.footerShowing = true
        }
        
      })
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

@media only screen and (min-width:540px){
.homepage{
    overflow-x: hidden;;
    overflow-y: hidden;
    .head_nav{
        width: 100%;
        padding: 2rem 10% 0 10%;
        min-height: 15vh;
        max-height: 30vh;
        box-shadow: inset 0px 28px 40px #76c8d1;
        background-image: linear-gradient(to bottom right, rgb(229, 255, 255), rgb(214, 227, 230));
        /* background-image: linear-gradient(to bottom right, rgb(196, 235, 235), rgba(17, 178, 184, 0.863)); */
        ul{
              li{
                  list-style-type: none;
                  display: inline-block;
                  padding: 0.8rem;
                  font-size: 0.8rem;
                  // font-family: monospace;
                  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
                  line-height: 5rem;
                  &:hover{
                    cursor: pointer;

                  }
                 
              }
        }
        .router-link-active{
            text-decoration: none;
        }
        a{
            text-decoration: none;
        }
    }
    .body{
        margin: 0 auto;
        margin-top: 2rem;
        margin-bottom: 2rem;
        padding: 2rem 1rem 3rem 2rem;
        min-height: 30vh;
        width: 70%;
        box-shadow: inset 0 0 400rem #05f762a6;
        /* background-image: linear-gradient(to bottom right, rgb(213, 230, 227), rgb(158, 236, 11)); */
         .article_description {
              padding: 1rem 8rem 1.5rem 0;
              box-shadow: inset 0 0.4rem 15px white;
              font-size: 0.6rem;
              li {   
                  display: inline-block;
                  list-style-type: none;
                  float: right;
                  padding: 0 0.5rem;
              }
          }
          #article_content{
              font-size: 0.8rem;
              &:hover{
                 cursor: pointer;
              }
          }
    }
    .footer{
        text-align: center;
        min-height: 10vh;
    }
}



ul > li:last-child{
    font-size: 0.8rem;
    font-family: monospace;
    // background: yellow;
    float: right;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;;
}
ul > li:nth-last-child(2){
    // background: red;
    font-size: 0.8rem;
    float: right;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;;
}


}

@media only screen and (max-width:540px){
.head-nav{
    min-height: 2rem;
    width: 100%;
    display: flex;
}
ul > li {
    list-style-type: none;
    display: block;
    width: 100%;
    /* display: inline-block; */
    /* padding: 0.2rem; */
    font-size: 2rem;
    letter-spacing: 0.5rem;
    margin-top: 1rem;
    padding: 2rem;
    background: rgb(43, 187, 187);
    border-radius: 4rem;

}

}

</style>

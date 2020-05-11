<template>
<div class="homepage">
    <div class="head_nav  bounceInDown">
      <ul>
          <li><router-link to="/">主页</router-link></li>
          <li><router-link to="blog">博客</router-link></li>
          <!-- <li><router-link to="article">文章</router-link></li> -->
           <li><router-link to="note">笔记</router-link></li>
          <li><router-link to="mood">心情</router-link></li>
          <!-- <li><router-link to="contact">联系</router-link></li> -->
          <li><router-link to="board">留言板</router-link></li>
          <li><router-link target="_blank" to="about">关于</router-link></li>
          <li><router-link to="more">更多..</router-link></li>
          <li v-if="logged_user" @click="logout">
                  <Avatar style="background-color: #37d068" size="small" icon="ios-person" ></Avatar>
                  <span>退出</span>
          </li>
          <li v-else>
              <router-link to="login">
                  <Avatar style="background-color: #37d068" size="small" icon="ios-person" ></Avatar>
                  <span>登录</span>
              </router-link>
          </li>
          <li class="uper"><router-link to="uper">{{ logged_user }}</router-link></li>
      </ul>
      
    </div>
    <div id="carousel-warpper">
          <div id="carousel">
            <el-carousel :interval="2200" type="card" height="50vh">
                <el-carousel-item v-for="item in 11" :key="item">
                    <img src="../assets/images/1.jpg" alt="" width="100%">
                </el-carousel-item>
            </el-carousel>
          </div>        
    </div>
    <div class="body-warpper">
          <div v-for="(article,index) in articles"  :key="index" class="body  animated zoomIn">
            <router-link  :to="{path: '/blog/'+article._id, query:{ _id : article._id, views: article.views }}" >
              <h2> {{ article.articleTitle }} </h2>
              <div class="article_description">
                    <li>作者:{{article.author}}</li>
                    <li>创建日期:{{article.createDate.substring(0,10)}}</li>
                    <li>点赞:{{article.starsNum || 0}}</li>
                    <li>浏览:{{article.views || 0}}</li>
              </div>
              <hr />
              <vue-clamp :max-lines="8">
                  <router-link :to="{path: '/blog/'+article._id, query:{ _id : article._id, views: article.views }}" >
                    <p id="article_content" v-html="article.content" :key="article._id" class="content-text" ></p>
                  </router-link>     
              </vue-clamp>
           </router-link>
          </div>
          
    </div>
    <BackTop :height="40" :bottom="40">
        <div class="return_top_btn">返回顶端</div>
    </BackTop>
    <FootNav v-if="footerShowing" class=" animated bounceInUp foot-nav"></FootNav >
  </div>
</template>


<script>
import VueClamp from 'vue-clamp'
import FootNav from './foot-nav/Footer.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      articles: [],
      footerShowing: false,
    }
  },
  components:{
    VueClamp,
     FootNav,
  },
  mounted(){
      // console.log('mounted..')
      // console.log(this.$store.state.loading)
      // this.$store.dispatch('enableLoading')
      this.$Spin.show();
      this.enableLoading()
      this.loadingData()
      this.disableLoading()
  },
  computed:{
    ...mapState([
      'logged_user'
    ])
  },
  methods:{
      ...mapActions([
        'enableLoading',
        'disableLoading',
        'logoutLoggedUser'
      ]),
      async loadingData(){
        await this.$axios.get('/api/getAllArticlesBriefInfo').then(res => {
            if(res.data.status == 'true'){
               // console.log(res.data.allArticles)
              for(let item of res.data.allArticles){
                this.articles.push(item)
              }          
              this.footerShowing = true
            }
        })
        this.$Spin.hide();
      },
      logout(){
          // console.log("logout")
          this.$Modal.confirm({
                    title: '确定要退出账号么？',
                    content: '<p>退出账号后需要重新再次登录哦~</p>',
                    onOk: () => {
                        this.logoutLoggedUser()
                        this.$Message.info('退出成功！')
                    },
                    onCancel: () => {
                       
                    }
            });
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

@media only screen and (min-width:540px){
.homepage{
    // overflow-x: hidden;
    // overflow-y: hidden;
    .head_nav{
        width: 100%;
        padding: 2rem 10% 0 10%;
        min-height: 15vh;
        max-height: 30vh;
        // border: 1px solid red;
        box-shadow: inset 0px 28px 40px #76c8d1;
        background-image: linear-gradient(to bottom right, rgb(229, 255, 255), rgb(214, 227, 230));
		/* background-image: linear-gradient(to bottom right, rgb(196, 235, 235), rgba(17, 178, 184, 0.863)); */
        position: sticky;
        top: -2rem;
        z-index: 100;
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
                  &:last-child{
                      font-size: 0.8rem;
                      font-family: monospace;
                      // background: yellow;
                      float: right;
                      font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;;
                  }
                  &:nth-last-child(2){
                      font-size: 0.8rem;
                      float: right;
                      font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;;
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
    #carousel-warpper{
        height: 80vh;
        width: 88vw;
        margin:  0 auto;
        margin-top: 5vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // padding: 4rem 0 0;
        min-height: 70vh;
        // border: 1px solid red;
        #carousel{
          width: 100%;
          // background-color: green;
        }
    }
    .body-warpper{
        display: grid;
        grid-template-columns: repeat(3, 33.33%);
        grid-template-rows: repeat(3, 25vh);
        .body{
            margin: 0 auto;
            margin-top: 2rem;
            margin-bottom: 1rem;
            min-height: 20vh;
            /* background-image: linear-gradient(to bottom right, rgb(213, 230, 227), rgb(158, 236, 11)); */
            &:hover{
              box-shadow: inset 0px 4px 8px gray;
              cursor: pointer;
              //  background-image: linear-gradient(to bottom right, rgb(230, 116, 159), rgb(117, 190, 150)); 
            }
            h2{
              padding-bottom: 0.8rem;
            }
            .article_description {
                  padding: 1rem 8rem 1.5rem 0;
                  // box-shadow: inset 0 0.4rem 15px white;
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
                  // max-height: 15rem;
                  &:hover{
                    cursor: pointer;
                  }
              }
        }
    }
    .return_top_btn{
        padding: 10px;
        background: rgba(0, 153, 229, .9);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
    .footer{
        text-align: center;
        min-height: 10vh;
    }
}


}

@media only screen and (max-width:540px){
.homepage{
    .head_nav{
        padding-top: 4rem;
        height: 8rem;
        min-height: 6rem;
        width: 100%;
        // background-color: rgba(242,232,242,0.5);
        box-shadow: inset 0px 28px 40px #76c8d1;
        background-image: linear-gradient(to bottom right, rgb(229, 255, 255), rgb(214, 227, 230));
        border-bottom: 2px solid white;
        position: sticky;
        top: -2rem;
        z-index: 1000;
        ul{
          li{
              list-style-type: none;
              display: inline-block;
              font-size: 0.7rem;
              &:last-child{
                font-size: 0.8rem;
                font-family: monospace;
                float: right;
                font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;;
            }
            &:nth-last-child(2){
                font-size: 0.8rem;
                float: right;
                font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;;
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
     #carousel-warpper{
       display: none
    }
    .body-warpper{
          .body{
              margin: 0 auto;
              width: 95%;
              display: flex;
              flex-direction: row;
              h2{
                  margin: 1rem 0;
                  font-size: 1rem;
              }
              // background-color:red;
              .article_description {
                    font-size: 0.6rem;
                    display: none;

             }
          }
    }
    .return_top_btn{
        padding: 10px;
        background: rgba(0, 153, 229, .9);
        color: #fff;
        font-size: 0.8rem;
        text-align: center;
        border-radius: 2px;
    }
    .foot-nav{
        text-align: center;
        font-size: 0.6rem;
    }
  

}


}

</style>

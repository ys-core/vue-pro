<template>
  <div class="blogger_warpper">
        <LeftNav />
        <div id="blogger_core">
            <h2 >{{article.articleTitle}}</h2>
            <div id="article_description">
                <li><Icon type="ios-contact" />:{{article.author}}</li>
                <li><Icon type="ios-clock" />:{{article.createDate ? article.createDate.substring(0,10).replace(/-/g, "/") : ''}}</li>
                <li class="thumb-up"><Icon type="ios-thumbs-up" @click="thumbUpArticle"></Icon>:{{article.starsNum ?  article.starsNum  : 0 }}</li>
                <li><Icon type="ios-book" />:{{article.views ? article.views : 0}}</li>
            </div>
             <p v-html="article.content" class="content"></p>
        </div>
        <div class="blog-board-warpper">
            <BloggerBoard :comments="article.comments" :_id="article._id" @reloading-article="reloadingArticle" />
        </div>
        <BackTop :height="100" :bottom="200">
                <div class="return_top_btn">返回顶端</div>
       </BackTop>
       <Footer v-if="footerShowing" class="foot-nav"></Footer>
  </div>
</template>

<script>
import BloggerBoard from './BloggerBoard'
import LeftNav from './nav/LeftNav'
import Footer from './foot-nav/Footer.vue'

export default {
  name: 'blog',
  data () {
    return {
      msg: 'Welcome to blogger',
      article: {},
      comments: [],
      views: -100,
      footerShowing: false
    }
  },
  components:{
      Footer,
      BloggerBoard,
      LeftNav
  },
  computed:{
    
  },
  mounted(){
    // console.log(this.$route.params._id)
     let ws = window.sessionStorage
     let _id =  this.$route.query._id ? this.$route.query._id : this.$route.params._id
     let views = this.$route.query.views ? this.$route.query.views : -100
     if(ws.getItem("_id") && ws.getItem("views")){                   // will not add the views of this article
          this.$axios.get('/api/getOneArticleById',{params:{ _id : _id }}).then(res => {
                    if(res.data.status == 'true'){
                        console.log(res.data.article.comments)
                        this.article = {...res.data.article}
                        // this.comments.splice(0,this.comments.length)
                        // for(let i=0; i < res.data.article.comments.length; i++){
                        //     this.comments.unshit(res.data.article.comments[i])
                        // }
                    }       
           }).catch(err => {
           })
     }else{                                                              // will add the views num of this article for the first time to access this article
            this.$axios.get("/api/getOneArticle/" + _id, {params:{views: views}}).then(res => {
                        //  console.log(res.data)
                        if(res.data.status == 'true'){
                            this.article = {...res.data.article}
                            // this.articleComments = [...res.data.article.comments]
                            // this.comments.splice(0,this.articleComments.length)
                            // for(let i=0; i < res.data.article.comments.length; i++){
                            //     this.comments.unshit(es.data.article.comments[i])
                            // }
                            ws.setItem("_id",this.article._id)
                            ws.setItem("views",this.article.views)
                            // console.log(this.article._id,this.article.views)
                        } 
            }).catch(err => {
            })
     }
     this.footerShowing = true
  },
  methods:{
      thumbUpArticle(){
        //   console.log(this.article._id)
          let id = this.article._id
          let stars = this.article.starsNum
          this.$axios.post('/api/article/update_stars',{_id: id, starsNum: stars }).then(res => {
                  if(res.data.status == 'true'){
                        this.article.starsNum = res.data.starsNum
                  }
          }).catch(err => {

          })
      },
     reloadingArticle(_id){
            // console.log("the parent component has been trigged ", _id)
            this.footerShowing = false
            if(_id){                   // will not add the views of this article
                this.$axios.get('/api/getOneArticleById',{params:{ _id : _id }}).then(res => {
                            if(res.data.status == 'true'){
                                // console.log(res.data.article)
                                this.article = {...res.data.article}
                                // this.comments.splice(0,this.articleComments.length)
                                // for(let i=0; i < res.data.article.comments.length; i++){
                                //     this.comments.unshit(es.data.article.comments[i])
                                // }
                                this.footerShowing = true
                            }       
                }).catch(err => {
                })
            }
            this.footerShowing = true
    }
  },
  beforeDestroy(){
      let ws = window.sessionStorage
      ws.setItem('_id','')
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@media only screen and (min-width:540px){

.blogger_warpper{
    #blogger_core{
        width: 70%;
        background: rgba(235, 192, 235, 0.08);
        padding: 2rem 2rem 4rem 3rem;
        margin: 0 auto;
        margin-bottom: 4rem;
        min-height: 1000px;
        box-shadow: inset 0px 16px 12px gray;
        border-bottom-left-radius: 2rem;
        border-bottom-right-radius: 2rem;
        h2{
            position: sticky;
            top: 0;
            z-index: 1000;
            font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
        }
        #article_description{
            padding: 4rem 5rem 3rem 4rem;
                li{
                    list-style-type: none;
                    display: inline-block;
                    padding: 0.5rem;
                    font-size: 0.8rem;
                    float: right;
                }
                .thumb-up{
                    &:hover{
                        cursor: pointer;
                    }
                }
        }
        .content{
            padding-top: 4rem;
            border-top:  1px solid gray;
            line-height: 2rem;
            font-size: 1rem;
            span{
                font-size: 30rem !important;
            }
            & >>> pre{
                padding-left: 4rem;
                background-color: black;
                color: white;
            }
            & >>> li{
                margin-left: 4rem;
            }
            & >>> * {
                font-size: 0.8rem;
            }

        }

        
    }
    .blog-board-warpper{
        width: 68%;
        margin: 0 auto;
    }
    .return_top_btn{
        padding: 10px;
        background: rgba(0, 153, 229, .9);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
}
}

@media only screen and (max-width:540px){

.blogger_warpper{
    #blogger_core{
        width: 100%;
        background: rgba(235, 192, 235, 0.45);
        padding: 2rem 1rem 4rem 1rem;
        margin: 0 auto;
        margin-bottom: 2rem;
        min-height: 100vh;
        h2{
            position: sticky;
            top: 0;
            font-size: 0.8rem;
            margin-bottom: 2rem;
            font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
        }
        #article_description{
            // padding: 4rem 5rem 3rem 4rem;
            overflow: hidden;
                li{
                    list-style-type: none;
                    display: inline-block;
                    padding: 0.5rem;
                    font-size: 0.7rem;
                    float: right;
                }
        }
        .content{
            padding-top: 4rem;
            border-top:  1px solid gray;
            line-height: 2rem;
            font-size: 0.8rem;
        }
    }
    .return_top_btn{
        padding: 10px;
        background: rgba(0, 153, 229, .9);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
    .foot-nav{
        font-size: 0.6rem;
    }
}

}

</style>

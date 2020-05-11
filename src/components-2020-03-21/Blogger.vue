<template>
  <div class="blogger_warpper animated slideInUp">
        <div id="blogger_core">
            <h2 >{{article.articleTitle}}</h2>
            <div id="article_description">
                <li><Icon type="ios-contact" />:{{article.author}}</li>
                <li><Icon type="ios-clock" />:{{article.createDate ? article.createDate.substring(0,10).replace(/-/g, "/") : ''}}</li>
                <li><Icon type="ios-thumbs-up" @click="thumbUpArticle"></Icon>:{{article.starsNum || 0}}</li>
                <li><Icon type="ios-book" />:{{article.views || 0}}</li>
            </div>
             <p v-html="article.content"></p>
        </div>
        <Footer v-if="footerShowing" ></Footer>
  </div>
</template>

<script>
import Footer from './Footer.vue'
export default {
  name: 'blog',
  data () {
    return {
      msg: 'Welcome to blogger',
      article: {},
      footerShowing: false
    }
  },
  components:{
      Footer
  },
  mounted(){

     let ws = window.sessionStorage
     let _id = this.$route.query.blogger._id
     let views = this.$route.query.blogger.views
    //  console.log(_id)
      if(_id){
           ws.setItem('_id',_id)  // in case of F5 refresh
       }
     if(typeof _id === 'undefined'){   // use F5 refresh the page.
           let id = ws.getItem('_id')
        //    console.log(id)
           this.$axios.get('/api/getOneArticleById',{params:{_id:id}}).then(res => {
                    // console.log(res.data)
                    if(res.data.status == 'true'){
                        // console.log(this.article)
                        this.article = {...res.data.article}
                        this.footerShowing = true
                    }       
           }).catch(err => {
           })
     }
     else{
         console.log(views)
         this.$axios.get("/api/getOneArticle/" + _id, {params:{views: views}}).then(res => {
            //  console.log(res.data)
             if(res.data.status == 'true'){
                 this.article = res.data.article
                 this.footerShowing = true
             } 
         }).catch(err => {
         })
     }
     
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
      }
  },
  beforeDestroy(){
      let ws = window.sessionStorage
      ws.setItem('_id','')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.blogger_warpper{
    #blogger_core{
        width: 65%;
        background: rgba(235, 192, 235, 0.65);
        padding: 2rem 1rem 4rem 5rem;
        margin: 0 auto;
        margin-bottom: 4rem;
        min-height: 1000px;
        h2{
            position: sticky;
            top: 0;
            font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
        }
        #article_description{
            padding: 2rem 5rem 3rem 4rem;
                li{
                    list-style-type: none;
                    display: inline-block;
                    padding: 0.5rem;
                    font-size: 0.8rem;
                    float: right;
                }
        }
    }
}



</style>

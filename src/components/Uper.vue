<template>
  <div class="uper-center animated zoomIn">
      <div class="uper-top">
           <span>管理员中心</span>
      </div>
      <div class="uper-body">

            <div id="uper-body-left">
                <ul>
                    <li><router-link to="/uper/data-center">DATA CENTER</router-link></li>
                    <li><router-link to="/uper/manage-mood">MOOD MANAGEMENT</router-link></li>
                    <li><router-link to="/uper/manage-board">BOARD MANAGEMENT</router-link></li>
                    <li><router-link to="/uper/manage-note">NOTE MANAGEMENT</router-link></li>
                    <li><router-link to="/uper/info-center">INFO CENTER</router-link></li>
                    <li><router-link to="">RECENT</router-link></li>
                    <li><router-link to="/uper/create-article-tinymce">NEW -tinymce</router-link></li>
                    <li><router-link to="/uper/create-article-quill">NEW -quill</router-link></li>
                    <li><router-link to="/">HOMEPAGE</router-link></li>
                </ul>
            </div>
            <div id="uper-body-right">
                <div v-for="(article,index) in articles"  :key="index" class="blog-item bounceInUp">
                    <div v-if="article.showYear" class="year"><span>{{ article.showYear ? article.createDate.substring(0,4)+'年' : '' }}</span></div>
                        <div class="title-warpper">
                            <router-link :to="{path: '/blog/'+article._id, query:{blogger: article}}" >
                            <span class="title">{{ article.articleTitle }}</span>
                            </router-link> 
                            <div class="btn-group">
                                <Button class="btn" type="error" @click="deleteThisArticle(article)">删除</Button>
                                <Button class="btn" type="warning" @click="modifyArticleContent(article)">修改</Button>
                            </div>
                            <li class="category"><span>类别:{{ article.articleType }}</span></li>
                            <li><span>{{ article.createDate ? "创建日期:" + article.createDate.substring(5,10).replace(/-/g,"/") : '' }}</span></li>
                            <li><span>浏览量:{{ article.views }}</span></li>
                        </div>
                    
                </div>
            </div>
      </div>
      <foot-nav v-if="footerShowing" class="foot-nav"></foot-nav>
  </div>
</template>

<script>

import FootNav from './foot-nav/Footer.vue'
import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      msg: '前端小智',
      articles: [],
      footerShowing: false,

    }
  },
  components:{
      FootNav
  },
  mounted(){
    //   this.enableLoading()
      this.$Spin.show();
      this.loadingData()
    //   this.disableLoading()
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
       },
       deleteThisArticle(article){
            let { _id, createDates } = article
            this.$axios.post('/api/delete_article', { _id, createDates }).then(res => {
                if(res.data.status == 'true'){
                   this.$Message.success('deleted the article sucessfully !!');
                    this.$route.push({ path: '/uper' })
                }
            }).catch(err =>{

            })
       },
       modifyArticleContent(article){
           this.$router.push({ path :'/uper/update-article', query: {
               article: article
           }})
       }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

@media only screen and (min-width:540px){

.uper-center{
    .uper-top{
        height: 8rem;
        display: flex;
        position: sticky;
        top: 0;
        // flex-direction: column;
        // justify-content: center;
        // align-items: center;
        box-shadow: inset 0px 28px 40px #76c8d1;
        background-image: linear-gradient(to bottom right, rgb(229, 255, 255), rgb(214, 227, 230));
        span{
            // background-color: red;
            margin-left: 1.5rem;
            font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
            font-size: 1.5rem;
            // font-style: italic;
            line-height: 8rem;
            // letter-spacing: 0.6rem;
        }
    }
    .uper-body{
        margin-bottom: 2rem;
        #uper-body-left{
            width: 14%;
            float: left;
            ul{
                li{
                    list-style-type: none;
                    // background-color: blue;
                    margin: 1rem 0 0 1.5rem;
                    height: 2rem;
                    color: blue;
                    font-size: 0.8rem;
                    line-height: 2rem;
                    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
                }
            }
            .router-link-active{
                text-decoration: none;
            }
            a{
                text-decoration: none;
            }
        }
        #uper-body-right{
            width: 82%;
            margin: 0 1% 0 1%;
            overflow: hidden;
            // border: 2px solid yellow;
            font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
            .blog-item{
                // margin-left: 3rem;
                .year{
                    padding: 1rem 0 1rem 0rem;
                    span{
                            font-size: 2rem;
                            font-style: italic;
                    }
                }
                .title-warpper{
                        height: 3rem;
                        margin: 0 2rem 0.2rem 8rem;
                        min-height: 6vh;
                        .title{
                            // background-color: red;
                            font-size: 1.5rem;
                            line-height: 3rem;
                            letter-spacing: 0.1rem;
                        }
                        li{
                            list-style-type: none;
                            // display: inline-block;
                            line-height: 3rem;
                            padding: 0 0.4rem 0 0.4rem;
                            float: right;
                        }
                        .category{
                            width: 8rem;
                            // background-color: red;
                        }
                        .btn-group{
                            padding-right: 4rem;
                            line-height: 3rem;
                            float: right;
                            .btn{
                                padding: 0 0.5rem 0 0.5rem;
                            }
                        }
                        &:hover{
                            // box-shadow: 0 10px 60px rgb(86, 7, 235);
                            box-shadow: 0 10px 60px rgb(4, 153, 223);
                            transform: scale(0.99);
                        } 
                }


            }

        }
    }
}

}

@media only screen and (max-width:540px){
.uper-center{
    .uper-top{
            height: 6em;
            display: flex;
            position: sticky;
            top: 0;
            box-shadow: inset 0px 28px 40px #76c8d1;
            background-image: linear-gradient(to bottom right, rgb(229, 255, 255), rgb(214, 227, 230));
            span{
                margin-left: 1.5rem;
                font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
                font-size: 1.5rem;
                line-height: 6rem;
            }
        }
        .uper-body{
            #uper-body-left{
                padding-top: 1rem;
                min-height: 90vh;
                ul{
                    li{
                        list-style-type: none;
                        margin: 1rem 0 0 1.5rem;
                        height: 2rem;
                        font-size: 0.8rem;
                        line-height: 2rem;
                        font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
                    }
                }
                .router-link-active{
                    text-decoration: none;
                }
                a{
                    text-decoration: none;
                }
            }
            #uper-body-right{
                display: none;
                width: 82%;
                margin: 0 1% 0 1%;
                overflow: hidden;
                font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
                .blog-item{
                    .year{
                        padding: 1rem 0 1rem 0rem;
                        span{
                                font-size: 2rem;
                                font-style: italic;
                        }
                    }
                    .title-warpper{
                            height: 3rem;
                            margin: 0 2rem 0.2rem 8rem;
                            min-height: 6vh;
                            .title{
                                // background-color: red;
                                font-size: 1.5rem;
                                line-height: 3rem;
                                letter-spacing: 0.1rem;
                            }
                            li{
                                list-style-type: none;
                                // display: inline-block;
                                line-height: 3rem;
                                padding: 0 0.4rem 0 0.4rem;
                                float: right;
                            }
                            .category{
                                width: 8rem;
                                // background-color: red;
                            }
                            .btn-group{
                                padding-right: 4rem;
                                line-height: 3rem;
                                float: right;
                                .btn{
                                    padding: 0 0.5rem 0 0.5rem;
                                }
                            }
                            &:hover{
                                // box-shadow: 0 10px 60px rgb(86, 7, 235);
                                box-shadow: 0 10px 60px rgb(4, 153, 223);
                                transform: scale(0.99);
                            } 
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

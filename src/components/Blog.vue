<template>
  <div class="blog_warpper animated zoomIn">
    <left-nav />
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

    <div class="container">
          <div class="card-core blog bounceInUp"   v-for="(article,index) in articles"  :key="index" >
                 <!-- <div v-if="article.showYear" class="year"><h1>{{article.showYear ? article.createDate.substring(0,4)+'年' : ''}}</h1></div><br/> -->
                  <div class="card">
                      <router-link :to="{path: '/blog/'+article._id, query:{blogger: article}}" >
                          <div class="imgBx">
                                  <img src="../images/article-3.png" alt="">
                                  <h3>{{ article.articleTitle }}</h3>
                          </div>
                          <div class="content"><p>{{ article.content ? article.content.toString().substring(0,150) : '' }}</p></div>
                      </router-link>
                </div>
          </div>
    </div>

    <!-- <div class="blog_core">
        <div v-for="(article,index) in articles"  :key="index" class="blog bounceInUp">
          <div v-if="article.showYear" class="year"><h1>{{article.showYear ? article.createDate.substring(0,4)+'年' : ''}}</h1></div>
          <router-link :to="{path: '/blog/'+article._id, query:{blogger: article}}" ><h2>{{article.articleTitle}}</h2></router-link> 
        </div>
    </div> -->
    <Footer v-if="footerShowing" class="foot-nav animated bounceInUp"></Footer >

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
      spinShow: true,
      arr: [1,2,3,4,5,6,7,8,9,10,11,21,3,211,144,11,111,14,444]
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
        await this.$axios.get('/api/getAllArticles').then(res => {
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
	 background: url("../assets/wbg.jpg") repeat;
   font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
  //  min-height: 100vh;
  //  background: #f3f3f3;
	 .blog_nav{
            position: sticky;
            padding: 5rem 0 2rem 0;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 2rem;
			      background-image: url("../images/s2.jpg");
            z-index: 1000;
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
                }
            }
     }
     .container{
          box-sizing: border-box;
          width: 1050px;
          min-height: 100vh;
          margin: 5rem auto 0;
          padding-bottom: 2rem;
          position: relative;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .card-core{
                .year{
                  // height: 10vh;
                  // background: blue;
                  // align-self: center;

                }
                .card{
                      position: relative;
                      width: 300px;
                      height: 400px;
                      background: #fff;
                      transition: 0.5s;
                      margin-bottom: 10vh;
                      &:hover{
                          transform: translateY(-40px);
                      }
                      &:hover .content::before{
                          transform: translateY(40px) skewX(45deg);
                          filter: blur(4px);
                          opacity: 0.8;
                      }
                      &::before{
                          content: '';
                          position: absolute;
                          top: -15px;
                          left: 0;
                          width: 100%;
                          height: 15px;
                          background: #00c0f6;
                          transform-origin: bottom;
                          transform: skewX(45deg);
                          transition: 0.5s;
                          z-index: 10;
                      }
                      &::after{
                          content: '';
                          position: absolute;
                          top: -15px;
                          left: -15px;
                          width: 15px;
                          height: 50%;
                          background: #00c0f6;
                          // background: red;
                          transform-origin: left;
                          transform: skewX(45deg);
                          transform: skewY(45deg);
                          transition: 0.8s;
                          // border-bottom: 200px solid purple;
                      }
                      .imgBx{
                            position: relative;
                            width: 300px;
                            height: 200px;
                            background: #00c7ff;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            img{
                              // width: 100%;
                                max-width: 100px;
                                height: auto;
                            }
                            h3{
                                position: relative;
                                color: #fff;
                                margin-top: 10px;
                            }
                      }
                      .content{
                            position: relative;
                            height: 200px;
                            width: 100%;
                            padding: 20px;
                            // overflow: hidden;
                            &::before{
                                content: '';
                                position: absolute;
                                left: 0;
                                top: 0;
                                width: 100%;
                                height: 200px;
                                background: linear-gradient(transparent,transparent,rgba(0,0,0,.1));
                                transform-origin: bottom;
                                transform: skewX(45deg);
                                transition: 0.5s;
                                pointer-events: none;
                                z-index: -1;
                            }
                            &::after{
                                content: '';
                                position: absolute;
                                left: -15px;
                                top: -15px;
                                bottom: 0;
                                width: 15px;
                                height: 100%;
                                background: #d9d9d9;
                                transform-origin: bottom;
                                transform: skewX(45deg);
                                transform:skewY(45deg);
                                transition: 0.5s;
                                // border-bottom: 15px solid red;
                            
                            }
                      }
              }
          }
     }
    



}

}


@media only screen and (max-width:540px){
.blog_warpper{
     font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
	 .blog_nav{
            position: sticky;
            padding: 5rem 0 2rem 0;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 2rem;
		      	background-image: url("../images/s2.jpg");
             li {
                display: inline-block;
                list-style-type: none;
                text-align: center;
                padding: 2vw;
                height: 1.5rem;
                font-size: 0.6rem;
              
            }
     }
          .container{
          box-sizing: border-box;
          width: 1050px;
          min-height: 100vh;
          margin: 5rem auto 0;
          padding-bottom: 2rem;
          position: relative;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .card-core{
                .year{
                  // height: 10vh;
                  // background: blue;
                  // align-self: center;

                }
                .card{
                      position: relative;
                      width: 300px;
                      height: 400px;
                      background: #fff;
                      transition: 0.5s;
                      margin-bottom: 10vh;
                      &:hover{
                          transform: translateY(-40px);
                      }
                      &:hover .content::before{
                          transform: translateY(40px) skewX(45deg);
                          filter: blur(4px);
                          opacity: 0.8;
                      }
                      &::before{
                          content: '';
                          position: absolute;
                          top: -15px;
                          left: 0;
                          width: 100%;
                          height: 15px;
                          background: #00c0f6;
                          transform-origin: bottom;
                          transform: skewX(45deg);
                          transition: 0.5s;
                          z-index: 10;
                      }
                      &::after{
                          content: '';
                          position: absolute;
                          top: -15px;
                          left: -15px;
                          width: 15px;
                          height: 50%;
                          background: #00c0f6;
                          // background: red;
                          transform-origin: left;
                          transform: skewX(45deg);
                          transform: skewY(45deg);
                          transition: 0.8s;
                          // border-bottom: 200px solid purple;
                      }
                      .imgBx{
                            position: relative;
                            width: 300px;
                            height: 200px;
                            background: #00c7ff;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            img{
                              // width: 100%;
                                max-width: 100px;
                                height: auto;
                            }
                            h3{
                                position: relative;
                                color: #fff;
                                margin-top: 10px;
                            }
                      }
                      .content{
                            position: relative;
                            // display: none;
                            height: 200px;
                            width: 100%;
                            padding: 20px;
                            overflow: hidden;
                            &::before{
                                content: '';
                                position: absolute;
                                left: 0;
                                top: 0;
                                width: 100%;
                                height: 200px;
                                background: linear-gradient(transparent,transparent,rgba(0,0,0,.1));
                                transform-origin: bottom;
                                transform: skewX(45deg);
                                transition: 0.5s;
                                pointer-events: none;
                                z-index: -1;
                            }
                            &::after{
                                content: '';
                                position: absolute;
                                left: -15px;
                                top: -15px;
                                bottom: 0;
                                width: 15px;
                                height: 100%;
                                background: #d9d9d9;
                                transform-origin: bottom;
                                transform: skewX(45deg);
                                transform:skewY(45deg);
                                transition: 0.5s;
                                // border-bottom: 15px solid red;
                            
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

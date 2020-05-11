<template>
   <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide item1">
                <div class="left-nav">
                    <ul>
                    <li><router-link to="/">主页</router-link></li>
                    <li><router-link to="blog">博客</router-link></li>
                    <li><router-link to="note">笔记</router-link></li>
                    <li><router-link to="mood">心情</router-link></li>
                    <li><router-link to="board">留言板</router-link></li>
                    <li><router-link target="_blank" to="about">关于</router-link></li>
                    <li><router-link to="more">更多..</router-link></li>
                </ul>
            </div>
            <div class="core-item wow slideInLeft" data-wow-duration="2s" data-wow-delay="1s">
                 <p>真正的朋友，懂得沉默，懂得等待，他知道你想跟他说的话自然会跟他说，他会对你的好适可而止，它知道你好的比坏的多，但永远不会告诉你你有多好，就像他永远不会告诉你他有多爱你一样。时间把人划分成一个又一个圈，只有永远和你站在同一个圈子里的人，才能成为你可以守护一生的朋友。</p>
            </div>
                
            </div>
            <div class="swiper-slide item2">
                <div class="core-item2">
                    <p>也许你想成为太阳，可你却只是一颗星辰；也许你想成为大树，可你却是一棵小草。于是，你有些自卑。其实，你和别人一样，也是一片风景：做不了太阳，就做星辰，在自己的星座发光发热；做不了大树，就做小草，以自己的绿色装点希望……</p>
               </div>
            </div>
            <div class="swiper-slide item3">
                <div class="core-item3">
                    <p>夕阳缓缓地沉了下去，它似乎怕勾起我们无限的离愁，于是选择了安静地离去。但这只是短暂的分别，明早它就会回来了，将以另一种方式回到我们的身边。</p>
                </div>
            </div>
            <div class="swiper-slide item4">
                <div class="core-item4 slideInLeft"  data-wow-duration="2s" data-wow-delay="5s">
                    <p>真正你好的比坏的多，但个又一个圈生的朋友。</p>
               </div>
            </div>
            <div class="swiper-slide item5">Slide 5</div>
            <div class="swiper-slide item6">Slide 6</div>
            <div class="swiper-slide item7">Slide 7</div>
        </div>

        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
    </div>

         
</template>


<script>

import { mapState, mapActions, mapMutations } from 'vuex'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import { WOW } from 'wowjs'
// import Swiper from 'swiper'
// import 'swiper/css/swiper.min.css'

export default {
  name: 'home',
  data () {
    return {
      articles: [],
      footerShowing: false,
       swiperOption: {
            direction: 'vertical',
            slidesPerView: 1,
            effect: 'fade',   // fade, cube , coverflow , flip 
            speed: 800,
            spaceBetween: 0,
            mousewheel: {
                forceToAxis: false,
                releaseOnEdges: false,
                invert: false,
                sensitivity: 100,
            },
            autoplay: {
                delay: 2000,	
            },
            pagination: {
                el: '.swiper-pagination',
                // clickable: true,
                type: 'bullets'
            },
       }
    }
  },
  computed:{
        
  },
  components:{
     Swiper,
     SwiperSlide,

  },
  directives: {
    swiper: directive
  },
  mounted(){
      new WOW({ live : false}).init()

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
html, body {
    position: relative;
    height: 100%;
}
body {
    background: #eee;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color:#000;
    margin: 0;
    padding: 0;
}
.swiper-container {
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
}
.swiper-slide {
    /* text-align: center; */
    /* font-size: 18px; */
    background: #fff;

}
.item1{
    background-image: url('../images/bulb.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.item2{
    background-image: url('../images/love.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.item3{
    background-image: url('../images/sunset-2.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.item4{
    background-image: url('../images/bg-3.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.item5{
    background-image: url('../images/heart.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.item6{
    background-image: url('../images/bg-2.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.item7{
    background-image: url('../images/stairs.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}


.left-nav{
    width: 10%;
    background-color: #fff;
    background:transparent;
    height: 100vh;
    float: left;
    /* border-right: 2px solid white; */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.left-nav>ul>li{
    list-style-type: none;
    color: white;
    line-height: 5vh;
    font-size: 0.8rem;
}
.left-nav>ul>li:hover{
    cursor: pointer;
}

.left-nav>ul>li>a{
    text-decoration:none;
    color:#fff;
}
.core-item{
    border: 1px solid #fff;
    width: 40%;
    padding: 16px 15px 10px 12px;
    position: absolute;
    bottom: 14vh;
    left: 20vw;
    box-shadow: 10px 10px 20px #fff;
}
.core-item>p{
    color: #fff;
    font-size: 0.8rem;
    text-indent: 2em;
    line-height: 1.6rem;
}
.core-item2{
    border: 1px solid #fff;
    width: 36%;
    height: 30vh;
    padding: 32px 25px 28px 22px;
    position: absolute;
    bottom: 40vh;
    left: 32%;
    box-shadow: 10px 10px 20px #fff;
}
.core-item2 > p{
    color: #fff;
    /* color: limegreen; */
    /* font-size: 0.8rem; */
    text-indent: 2em;
    line-height: 1.6rem;
}
.core-item3{
    border: 1px solid #fff;
    width: 40%;
    padding: 16px 15px 10px 12px;
    position: absolute;
    top: 8vh;
    right: 10vw;
    box-shadow: 10px 10px 20px #fff;
}
.core-item3 > p{
    color: #fff;
    font-size: 0.8rem;
    text-indent: 2em;
    line-height: 1.6rem;
}

}

@media only screen and (max-width:540px){

html,body{
    margin:0;
    padding: 0;
    border: 0;
    background: rgb(201, 201, 129);
}
body{
    height: 100%;
}
.swiper-container{
    height: 100vh;
    background: rgba(233, 130, 233,0.1);
}
.left-nav{
    background-color: #fff;
    background:transparent;
    height: 20vh;
    /* border-right: 2px solid white; */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    box-shadow: inset 0px 28px 40px #76c8d1;
    background-image: linear-gradient(to bottom right, rgb(229, 255, 255), rgb(214, 227, 230));
}
.core-item{
    //  background: rgb(151, 129, 201);
    border: 2px solid #fff;
    padding: 2vh 1vw 1vh 2vw;
     width: 80vw;
     margin: 0 auto;
     margin-top: 30vh;
}
.left-nav>ul>li{
    list-style-type: none;
    color: white;
    display: inline-block;
    line-height: 5vh;
    font-size: 0.8rem;
    padding: 0.1rem;
}





}




</style>

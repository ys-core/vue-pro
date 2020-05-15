<template>

<div class="home">

<full-page ref="fullpage" :options="options" id="fullpage">
    <div class="section homepage-1 animated zoomIn">
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
             <div class="core-item1"> <p>真正的朋友，懂得沉默，懂得等待，他知道你想跟他说的话自然会跟他说，他会对你的好适可而止，它知道你好的比坏的多，但永远不会告诉你你有多好，就像他永远不会告诉你他有多爱你一样。时间把人划分成一个又一个圈，只有永远和你站在同一个圈子里的人，才能成为你可以守护一生的朋友。</p>
            </div>
    </div>
    <div class="section homepage-2">
      <div class="core-item2">     <p>黄昏是此岸，是破晓前最飘逸的伏笔；黄昏是彼岸，是破灭前最惬意的结局。此岸，彼岸，连接起来，便是整个人生。笑叹红尘，东边，谁在为谁谱着歌；西边，依旧黄昏，烟云而过。</p>
	  <p>也许，我们总是认为生活平淡无比，当有色彩光临我们的生活时，无非就是过份的苦难和极少的快乐。每当这时候，乐观的人会用自己的方法，让自己在苦难中占优势，而悲伤的人只会在苦难中越陷越深，不能自拔。我不知道在这个时候你们有想过用数学符号来使我们的苦难消失，使我们的快乐更多吗？</p>
            </div>
    </div>
     <div class="section homepage-3">
      <div class="core-item3">
	  <p>黄昏就像是我们生命的隐语，它引导着人们去领悟人生那一份平静与淡泊。日暮的宁静如一束星光让人心灵寂寞而平和，黄昏不代表哀伤。我喜爱黄昏，它的光芒，它那柔和又充满希望的光芒，它以最美的景致结束了一天。</p>
            </div>
    </div>
     <div class="section homepage-4">
      <div class="core-item4">
	  <p>梦想像一粒种子，种在“心”的土壤里，尽管它很小，却可以生根开花，假如没有梦想，就像生活在荒凉的戈壁，冷冷清清，没有活力。有了梦想，也就有了追求，有了奋斗的目标，有了梦想，就有了动力。它会催人前进，也许在实现梦想的道路中，会遇到无数的挫折，但没关系，跌倒了自己爬起来，为自己的梦想而前进，毕竟前途是自己创造出来的。 </p>
            </div>
    </div>
  </full-page>
</div>

         
</template>


<script>

import { mapState, mapActions, mapMutations } from 'vuex'


export default {
  name: 'home',
  data () {
    return {
      articles: [],
      options:{
            licenseKey: 'YOUR_KEY_HEERE',
            menu: '#menu',
            anchors: ['', '', '', '', ''],    //['page1', 'page2', 'page3','page4'],
            sectionsColor: ['#41b883', '#ff5f45', '#0798ec','#811968'],
           

      }
    }
  },
  components:{
 

  },

  computed:{
  
  },
  mounted(){
      // console.log('mounted..')
      // console.log(this.$store.state.loading)
      // this.$store.dispatch('enableLoading')
      // this.$Spin.show();
      // this.enableLoading()
      // this.loadingData()
      // this.disableLoading()
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


@keyframes borderAnimation {
    0%{ box-shadow: 10px 10px 20px #fff; }
    50%{  box-shadow: 0 0 0 rgb(152, 212, 11); transform: translateX(-20deg); }
    100%{  box-shadow: 10px 10px 20px #fff; }
}
@-webkit-keyframes borderAnimation {
    0%{ box-shadow: 10px 10px 20px #fff; }
    50%{  box-shadow: 0 0 0 rgb(16, 107, 72); transform: translateX(-20deg);}
    100%{  box-shadow: 10px 10px 20px #fff; }
}


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
div[class*='homepage']{
    position: relative;
	background-size: 100% 100%;
}
.homepage-1{
    background: url("../images/bulb.png")  no-repeat;
}
.homepage-2{
    background: url("../images/love.jpg")  no-repeat;
}
.homepage-3{
    background: url("../images/sunset-2.jpg")  no-repeat;
}
.homepage-4{
    background: url("../images/stairs.jpg")  no-repeat;
}
div[class*='core-item']{
    font-family: ceil;
    line-height: 1.5rem;
}

div[class*='core-item']:hover{
	background: transparent;
	text-shadow: 1px 1px lightgreen;
}
div[class*='core-item'] p{
	text-indent: 2em;
}
.core-item1{
    border: 1px solid #fff;
    width: 40%;
    padding: 26px 15px 30px 32px;
    position: absolute;
    bottom: 14vh;
    left: 20vw;
    color:#fff;
    box-shadow: 0 0 0 #fff;
    animation: borderAnimation 6s infinite linear;
    -webkit-animation: borderAnimation 6s infinite linear;
}
.core-item2{
    border: 1px solid lightblue;
    width: 40%;
    padding: 26px 35px 30px 22px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color:#fff;
    box-shadow: 0 0 0 #fff;
    animation: borderAnimation 6s infinite linear;
    -webkit-animation: borderAnimation 6s infinite linear;
}
.core-item3{
    border: 1px solid #fff;
    width: 40%;
    padding: 20px 35px 30px 22px;
    position: absolute;
    top: 14vh;
    right: 6vw;
    color:#fff;
    box-shadow: 0 0 0 #fff;
    animation: borderAnimation 6s infinite linear;
    -webkit-animation: borderAnimation 6s infinite linear;
}
.core-item4{
    border: 1px solid #fff;
    width: 40%;
    padding: 36px 25px 30px 32px;
    position: absolute;
    top: 14vh;
    left: 20vw;
    color:#fff;
    box-shadow: 0 0 0 #fff;
    animation: borderAnimation 6s infinite linear;
    -webkit-animation: borderAnimation 6s infinite linear;
}




}

@media only screen and (max-width:540px){

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
.left-nav{
    background:transparent;
    padding-top: 5vh;
    text-align: center;
}
.left-nav>ul>li{
    list-style-type: none;
    color: white;
    line-height: 5vh;
    font-size: 0.8rem;
    display: inline-block;
    padding: 0  5px;
}

.left-nav>ul>li>a{
    text-decoration:none;
    color:#fff;
}
div[class*='homepage']{
    position: relative;
}
// .homepage-1{
//     background: url("../images/bulb.png")  no-repeat;
// }
// .homepage-2{
//     background: url("../images/love.jpg")  no-repeat;
// }
// .homepage-3{
//     background: url("../images/sunset-2.jpg")  no-repeat;
// }
// .homepage-4{
//     background: url("../images/stairs.jpg")  no-repeat;
// }
div[class*='core-item']{
    font-family: ceil;
    line-height: 1.5rem;
}
div[class*='core-item'] p{
	text-indent: 2em;
}
.core-item1{
    border: 1px solid #fff;
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 0.5rem 2rem;
    color:#fff;
    box-shadow: 0 0 0 #fff;
    animation: borderAnimation 6s infinite linear;
    -webkit-animation: borderAnimation 6s infinite linear;
}
.core-item2{
    border: 1px solid lightblue;
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 0.5rem 2rem;
    color:#fff;
    box-shadow: 0 0 0 #fff;
    animation: borderAnimation 6s infinite linear;
    -webkit-animation: borderAnimation 6s infinite linear;
}
.core-item3{
    border: 1px solid #fff;
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 0.5rem 2rem;
    color:#fff;
    box-shadow: 0 0 0 #fff;
    animation: borderAnimation 6s infinite linear;
    -webkit-animation: borderAnimation 6s infinite linear;
}
.core-item4{
    border: 1px solid #fff;
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 0.5rem 2rem;
    color:#fff;
    box-shadow: 0 0 0 #fff;
    animation: borderAnimation 6s infinite linear;
    -webkit-animation: borderAnimation 6s infinite linear;
}



}




</style>

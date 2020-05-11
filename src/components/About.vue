<template>
  <div class="about-uper">
      <div class="about-left">
          <!-- <div class="uper-avatar">          </div> -->
          <img src="../assets/avatar.jpg" class="uper-avatar"  alt="头像加载失败">
          <span>前端小智</span>
      </div>
      <div class="about-right">
          <ul>
              <li>笔名: 前端小智</li>
              <li>破壳日: 1994-04-**</li>
              <li>籍贯: 四川·广元</li>
              <li>毕业学校/专业: 江南大学JNU/信息与计算科学</li>
              <li>邮箱: yonnsongLee@163.com  (欢迎骚扰)</li>
              <li>爱好: 听歌,  户外, Coding, 球类, 侃牛</li>
              <li>博客技术: Vue + Vuex + Iview + Element-UI + Axios + Vue-Router + Express + MongoDB</li>
              <li>技术栈: Node, Vuejs, React, 前端三大件, Python</li>
              <li>GitHub: <a href="https://github.com/youngcaden">前端小智‘s GitHub</a></li>
              <li>目标: 立志成为一个有志向有理想有追求的前端Coder</li>
              <li>座右铭: 没有帅气的脸庞, 只能依仗着才华闯天下。<br /><br />
                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 
                    不要将希望总是寄托于明天,做好当下才是最必要的。</li>
                   
                <!-- <li>2017- {{ new Date().toString().substring(10,15)}}</li> -->
          </ul>
      </div>
      <foot-nav class="foot-nav"></foot-nav>
  </div>
</template>

<script>
import FootNav from './foot-nav/Footer.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      metto: `
            没有帅气的脸庞, 只能依仗着才华闯天下。
            不要将希望总是寄托于明天,做好当下才是最必要的。
      `
    }
  },
 components:{
     FootNav
  },
  mounted(){
      this.enableLoading()
    //   this.loadingData()
      this.disableLoading()
  },
  methods:{
       ...mapActions([
        'enableLoading',
        'disableLoading'
      ]),

}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

@media only screen and (min-width:540px){

.about-uper{
    width: 70%;
    padding-top: 10vh;
    margin: 0 auto;
    // background: red;
    // border: 1px solid yellowgreen;
    overflow: hidden;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;;
    .about-left{
        width: 20%;
        padding-top:3rem;
        height: 80vh;
        float: left;
        margin: 10px;
        background: rgba(173,216,230,0.5);
        display: flex;
        flex-direction: column;
        align-items: center;
        .uper-avatar{
            height: 80px;
            width: 80px;
            border-radius: 40px;
            margin-bottom: 2rem;
            &:hover{
                transform: scale(1.2);
            }
        }
        span{
            font-size: 0.8rem;
        }
    }
    .about-right{
        overflow: hidden;
        background: rgb(228, 228, 228);
        margin-top: 10px;
        padding-top: 4vh;
        padding-right: 80px;
        height: 80vh;
        display: flex;
        flex-direction: column;
        align-items: center;

        ul{
            li{
                list-style-type: none;
                display: block;
                height: 6vh;
                font-size: 0.8rem;
            }
        }
       
    }
   .foot-nav{
        display: none;
    }
}

}


@media only screen and (max-width:540px){

.about-uper{
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;;
    .about-left{
        width: 100%;
        padding-top:2rem;
        height: 200px;
        background: rgba(173,216,230,0.5);
        display: flex;
        flex-direction: column;
        align-items: center;
        .uper-avatar{
            height: 80px;
            width: 80px;
            border-radius: 40px;
            margin-bottom: 2rem;
            &:hover{
                transform: scale(1.2);
            }
        }
        span{
            font-size: 0.7rem;
        }
    }
    .about-right{
        background: rgb(228, 228, 228);
        padding-top: 6vh;
        padding-bottom: 5vh;
        padding-left: 10vw;
        display: flex;
        flex-direction: column;
        align-items: center;

        ul{
            li{
                list-style-type: none;
                display: block;
                font-size: 0.7rem;
                // height: 6vh;
                line-height: 6vh;
            }
        }
       
    }
    .foot-nav{
        font-size: 0.6rem;
    }
}


}

</style>

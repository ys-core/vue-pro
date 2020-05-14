<template>
  <div class="login-core">
        <div class="loginPage animated zoomIn">
             <span @click="returnLastPage"><Icon type="ios-arrow-round-back"/></span>
            <h1>登录</h1>
            <el-form>
                <el-form-item label="username">
                    <el-input type="text" id="user" v-model="formName.user" @blur="inputBlur('user',formName.user)" placeholder="username or email.."></el-input>
                    <p>{{formName.userError}}</p>
                </el-form-item>
                <el-form-item label="password">
                    <el-input type="password" id="password" v-model="formName.password" @blur="inputBlur('password',formName.password)" placeholder="input password.."></el-input>
                    <p>{{formName.passwordError}}</p>
                </el-form-item>
                <el-button type="primary" @click="submitForm('formName')" v-bind:disabled="formName.beDisabled">登录</el-button>
                <el-button type="primary" @click="registerForm('formName')" v-bind:disabled="formName.beDisabled">注册</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form>              
        </div>
</div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
        formName: {//表单中的参数
            user: '',
            userError: '',
            password: '',
            passwordError: '',
            beDisabled: true
        },
        beShow: false//传值给父组件
    }
  },
  computed:{
      ...mapState([
          'logged_user'
      ])
  },
  mounted(){
      this.enableLoading()
    //   this.loadingData()
      this.disableLoading()
  },
  methods:{
       ...mapActions([
        'enableLoading',
        'disableLoading',
        'registerLoggedUser'
      ]),
    async loadingData(){
        await this.$axios.get('/api/getAllArticles').then(res => {
        if(res.data.status == 'true'){
          // console.log(res.data.allArticles)
          for(let item of res.data.allArticles){
            this.articles.push(item)
          }          
          this.footerShowing = true
        }
      })
    },
    resetForm(){
        this.formName.user = ''
        this.formName.userError = ''
        this.formName.password = ''
        this.formName.passwordError = ''
    },
    submitForm(formName){
        let username = this.formName.user
        let password = this.formName.password
        this.enableLoading()
        this.validateLogin(username,password)
        this.disableLoading()
        console.log(this.$store.state.logged_user)
      
    },
    async validateLogin(username,password){
        await this.$axios.post('/api/verify_admin',{ username, password }).then(res => {
            if(res.data.status == 'true'){
                this.registerLoggedUser(username)
                this.$router.go(-1)
            }else{
                console.log(res.data)
            }
            
        }).catch(err => {

        })
    },
    registerForm(formName){
         let username = this.formName.user
         let password = this.formName.password
         this.$axios.post('/api/add_admin',{ username, password }).then(res => {
            if(res.data.status == 'true'){
                this.$router.go(-1)
            }else{
                console.log(res.data)
            }
            
        }).catch(err => {

        })
    },
    inputBlur(errorItem,inputContent){
        if (errorItem === 'user') {
            if (inputContent === '') {
                this.formName.userError = '用户名不能为空'
            }else{
                this.formName.userError = ''
            }
        }else if(errorItem === 'password') {
            if (inputContent === '') {
                this.formName.passwordError = '密码不能为空'
            }else{
                this.formName.passwordError = ''
            }
        }
        //对于按钮的状态进行修改
        if (this.formName.user != '' && this.formName.password != '') {
            this.formName.beDisabled = false
        }else{
            this.formName.beDisabled = true
        }
    },
    returnLastPage(){
        this.$router.go(-1)
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@media only screen and (min-width:540px){

    .login-core{
        width: 100%;
        height: 100%;
        // background: rgba(0,0,0,.8);
        // font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;;
        .loginPage{
            position: absolute;
            background: lightyellow;
            top: 50%;
            left: 50%;
            margin-top: -10rem;
            margin-left: -14rem;
            width: 28rem;
            min-height: 20rem;
            padding: 2rem;
            // border-radius: 8px;
            box-sizing: border-box;
            // border: 1px solid gray;
            // box-shadow: inset 0 10px 5px gray;
            // background-color: #fff;
            // background-color: purple;
            h1{
                font-size: 2rem;
                font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
            }           
            span{
                position: absolute;
                right: 1rem;
                transform: scale(2);
                &:hover{
                    transform: rotate(30);
                    transform: scale(2.3);
                }
            }
            .loginPage p{
                color: red;
                text-align: left;
            }
    }

 }



}

@media only screen and (max-width:540px){
    .login-core{
        font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;;
        .loginPage{
            span{
               display: none;
            }
            .loginPage p{
              
            }
    }

 }



}
</style>

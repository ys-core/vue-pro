<template>
<div class="mood-warpper">
    <div class="mood-core">
        <div class="editor-window">
                <quill-editor 
                        v-model="content" 
                        ref="myQuillEditor" 
                        :options="editorOption" 
                        @blur="onEditorBlur($event)" 
                        @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                </quill-editor>
                <div class="submit-btn">
                        <Button type="success" size="large" @click="submitMood">提交心情</Button>
                </div>
        </div>
        <div v-for="(mood,index) in moods" :key="index" class="mood-item"> 
               <span v-if="mood.showYear" class="year">{{ mood.contentDate ? mood.contentDate.substring(0,4) + '年': '' }}</span>
               <span class="date">{{ mood.contentDate ? mood.contentDate.substring(5,10).replace(/-/g,'月') + '日' : ''  }}</span>
               <div v-html="mood.content" class="mood-content"></div>
               <ul>
                   <li @click="submitLikes(mood,index)"><Icon type="ios-thumbs-up" /> {{ mood.likes }}</li>
                   <li @click="submitDislikes(mood,index)"><Icon type="ios-thumbs-down" />{{ mood.dislikes }}</li>
                   <li @click="deleteMood(mood,index)"><Icon type="ios-remove-circle"  />删除状态</li>
               </ul>
               <!-- <hr /> -->
        </div>
    </div>
    <foot-nav v-if="footerShowing" class="foot-nav"></foot-nav>
</div>
</template>

<script>
import FootNav from '../foot-nav/Footer.vue'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      content:null,
      moods: [],
      editorOption:{

      },
      footerShowing: false
    
    }
  },
  components:{
        quillEditor,
        FootNav
  },
  computed:{
      ...mapState([
          'logged_user'
      ])
  },
  mounted(){
      this.enableLoading()
      this.loadingData()
      this.disableLoading()
  },
  methods:{
       ...mapActions([
        'enableLoading',
        'disableLoading'
      ]),
      async loadingData(){
        await this.$axios.get('/api/getAllMoods').then(res => {
            if(res.data.status == 'true'){
                // console.log(res.data.Moods)
                let  year = new Set()
                this.moods.splice(0,this.moods.length)
                for(let item of res.data.Moods){
                    let _year = item.contentDate.substring(0,4)  
                    if(year.has(_year)){
                        this.moods.push({showYear: false,...item})
                    }else{
                        year.add(_year)
                        this.moods.push({showYear: true,...item})
                    }
                    // this.moods.push(item)
                }          
          }   
      })
      this.footerShowing = true
  },
  submitMood(){
     let info =  {
        username: this.logged_user, 
		avatarPath: '',
		contentDate: new Date(),
		content: this.content,
		imagePath: '',
		likes: 0,
        dislikes: 0
    }
    if(info.username && info.content){
        // console.log(info)
        this.$axios.post('/api/add_mood',{ ...info }).then(res => {
            if(res.data.status == 'true'){
                this.$Message.success('create new mood sucessfully !!');
            }else{
                this.$Message.error('failed to create new mood !!');
            }
        }).catch(err => {

        })
    }
        
        
  },
  submitLikes(mood,index){
        let  _id = mood._id || 0
        let likes = mood.likes || 0
        this.$axios.post('/api/mood/update_mood_likes',{ _id, likes }).then(res => {
                if(res.data.status == 'true'){
                    // console.log(res.data.likes)
                    this.moods[index].likes = res.data.likes
                }
        }).catch(err => {

        })
  },
  submitDislikes(mood,index){
        let  _id = mood._id || 0
        let dislikes = mood.dislikes || 0
        this.$axios.post('/api/mood/update_mood_dislikes',{ _id, dislikes }).then(res => {
                if(res.data.status == 'true'){
                    // console.log(res.data.likes)
                    this.moods[index].dislikes = res.data.dislikes
                }
        }).catch(err => {

        })
  },
  deleteMood(mood,index){
    let  _id = mood._id || 0
    this.$axios.post('/api/mood/delete_mood',{ _id  }).then(res => {
            if(res.data.status == 'true'){
            //   console.log(res.data.status)
                this.moods.splice(index,1)
                this.$Message.success('have deleted this mood state sucessfully !!');
            }
    }).catch(err => {

    })
  },
  onEditorBlur(){//失去焦点事件

  },
  onEditorFocus(){//获得焦点事件

  },
  onEditorChange(){//内容改变事件
    // console.log(this.content)
 }

  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@media only screen and (min-width:540px){
.mood-warpper{
    .mood-core{
        width: 70%;
        margin: 0 auto;
        padding-top: 2rem;
        min-height: 100vh;
        .editor-window{
            position: sticky;
            top: 0;
        }
        .submit-btn{
            margin: 1rem 0;
        }
        .mood-item{
            margin-bottom: 2rem;
            margin-left: 3rem;
            min-height: 10vh;
            border: 1px solid lime;
            font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
            .year{
                font-size: 2rem;
                font-style: italic;
                font-weight: bolder;
                display: block;
                position: relative;
                left: -3rem;
            }
            .date{
                font-style: italic;
                display: block;
            }
            .mood-content{
                padding: 1rem 2rem 1rem 1rem;
            }
            ul{
                li{
                    list-style-type: none;
                    display: inline-block;
                    width: 5rem;
                    // background-color: lime;
                    &:hover{
                        cursor: pointer;
                    }
                    &:nth-child(1){
                        margin-left: 1rem;
                    }
                }
            }

        }
    }
}

}
@media only screen and (max-width:540px){

.mood-warpper{
    .mood-core{
        padding-top: 1rem;
        min-height: 100vh;
        .editor-window{
            position: sticky;
            top: 0;
        }
        .submit-btn{
            margin: 1rem 0;
        }
        .mood-item{
            margin-bottom: 2rem;
            margin-left: 1rem;
            min-height: 10vh;
            // border: 1px solid lime;
            font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
            .year{
                font-size: 1rem;
                font-style: italic;
                font-weight: bolder;
                display: block;
                position: relative;
                left: -1rem;
                margin-bottom: 1rem;
            }
            .date{
                font-style: italic;
                display: block;
                font-size: 0.8rem;
            }
            .mood-content{
                padding: 1rem 2rem 1rem 1rem;
            }
            ul{
                li{
                    list-style-type: none;
                    display: inline-block;
                    width: 5rem;
                    // background-color: lime;
                    &:hover{
                        cursor: pointer;
                    }
                    &:nth-child(1){
                        margin-left: 1rem;
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

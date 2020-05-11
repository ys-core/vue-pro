<template>
<div class="blog-comment">
  <div class="board_inputting animated fadeInUp">
      <div class="comment_inputting_box">
           <!-- <editor
                    api-key="zz6kufduyz69ewv614r0rudtr2snd9pr3bzyeignjc1tgn5e"
                    output-format="html"
                    v-model="comment"
                    onChange="contentChanged"
                    @onSelectionChange="commentInputedChanged"
                    :init="{
                      height: 200,
                      menubar: false,
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount emoticons'
                      ],
                      toolbar:
                        'undo redo | formatselect | bold italic forecolor backcolor | \
                        alignleft aligncenter alignright alignjustify code | \
                        bullist numlist emoticons outdent indent | removeformat | help'
                    }"
           /> -->
            <quill-editor 
                    v-model="comment" 
                    ref="myQuillEditor" 
                    :options="editorOption" 
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)">
            </quill-editor>
          <div class="submit_reset_btn">
            <Button type="success" @click="submitComment(logged_user,_id)">留言</Button>
            <Button type="error" @click="resetBoard">重置</Button>
          </div>
      </div>
  </div>
  <div v-for="(item,index) in comments" :key="item._id" class="comment_item animated slideInUp">
        <div  class="avatar">
           <Avatar :style="randomColor(index)" size="small" icon="ios-person" ></Avatar>
        </div>
        <div class="comment_storey"><h4>{{ index + 1  }}楼</h4></div>
        <div class="comment">
          <!-- <p>{{ item._id }}</p> -->
           <div v-html="item.comment" class="comment-core"></div>
          <ul>
            <!-- <li><Icon type="ios-man-outline" /> {{ item.username ? item.username + '留言' : ''}}</li> -->
            <li><Icon type="ios-time-outline" /> {{ item.time ? item.time.substring(0,16).replace(/T/g,' ') : '' }}</li>
            <li @click="replyArticleComment(item,index,_id)"><Icon type="ios-create-outline" /> 回复</li>
           
          </ul>
        </div>
  </div>
</div>
</template>

<script>

// import Editor from '@tinymce/tinymce-vue'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: '',
  props: [ 'comments' , '_id' ],
  data () {
    return {
      msg: ' article comment board here. ',
      // comments: this.props.comments,
      comment: '',
    }
  },
  components:{
      // Editor,
      quillEditor
  },
  computed:{
    ...mapState([
      'logged_user'
    ]),
    // comments: {
    //     //   function compare(a, b) {
    //     //       if (a.time < b.time)  return -1;
    //     //       if (a.time > b.time) return 1;
    //     //       return 0;
    //     //   }
    //     // return this.comments.sort(compare);
    //       get () {
    //          return this.comments
    //       },
    //       set () {
    //       }
    // }
    sortedComments(){
      return comments
    }
  },
  mounted(){
  },
  methods:{
      commentInputedChanged(){
          // console.log(this.comment)
      },
      contentChanged(){

      },
     onEditorBlur(){//失去焦点事件

    },
    onEditorFocus(){//获得焦点事件

    },
    onEditorChange(){//内容改变事件
         console.log(this.content)
    },
      submitComment(logged_user,_id){
        // console.log( this.comment)
        const from = logged_user
        const comment = this.comment
        // console.log(from,_id)
        console.log(typeof this.comments)
        if(!from){
           this.$Message.success('请先完成登录！！');
          return
        }else if(comment){
           this.footerShowing = false
           this.$axios.post('/api/add_article_comment',{ from,  _id, time: new Date(), comment }).then(res => {
                // console.log(res.data.status)
                if(res.data.status === 'true'){
                    // trigger the parent comment to reload the article and refresh the article comments
                    this.$emit('reloading-article', _id)
                    this.comment = ''
                    
                  }
               }).catch(err => {
          })
        }
      },
      resetBoard(){
        this.comment = ''
      },
      randomColor(index){
         let R = Math.floor(Math.random() * 255);
         let G = Math.floor(Math.random() * 255);
         let B = Math.floor(Math.random() * 255);
          return {
            background: 'rgb(' + R + ',' + G + ',' + B + ')'
          }
      },
      replyBoardComment(item,index){

      },
      updateThumbDown(item,index){
          // const {_id, dislikes } = item
          let _id = item._id || 0
          let dislikes = item.dislikes || 0
          this.$axios.post('/api/board/update_comment_dislikes',{ _id , dislikes }).then(res => {
                  if(res.data.status == 'true'){
                        // console.log(res.data.dislikes)
                        this.comments[index].dislikes = res.data.dislikes
                  }
          }).catch(err => {

          })
      },
      updateThumbUp(item,index){
          // const {_id, likes } = item
          let  _id = item._id || 0
          let likes = item.likes || 0
          this.$axios.post('/api/board/update_comment_likes',{ _id, likes }).then(res => {
                  if(res.data.status == 'true'){
                        // console.log(res.data.likes)
                        this.comments[index].likes = res.data.likes
                  }
          }).catch(err => {

          })
      },

  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@media only screen and (min-width:540px){
.blog-comment{
    .board_inputting{
          margin-bottom: 2rem;
          .comment_inputting_box{
              .submit_reset_btn{
                margin-top: 1rem;
              }
          }
    }
    .comment_item{
        // background: yellow;
        margin-top: 1rem;
        padding-bottom: 2rem ;
        box-sizing: border-box;
        box-shadow: inset 0 10rem 50rem rgba(189, 189, 185, 0.1);
        border-radius: 0.5rem;
        &:last-child{
          margin-bottom: 5rem;
        }
        .avatar{
            width: 2rem;
            height: 2rem;
            // background: blue;
            float: left;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .comment_storey{
            height: 2rem;
            line-height: 2rem;
            overflow: hidden;
            // background-color: red;
            margin-bottom: 1rem;
        }
        .comment{
              .comment-core{
                margin-bottom: 1rem;
                padding-left: 1rem;
              }
              ul{
                li{
                  list-style-type: none;
                  display: inline-block;
                  padding-right: 1rem;
                  &:hover{
                    cursor: pointer;
                  }
              }
            }
        }
      
      }
}


}

@media only screen and (max-width:540px){
.blog-comment{
    .board_inputting{
          margin-bottom: 2rem;
          .comment_inputting_box{
              .submit_reset_btn{
                margin-top: 1rem;
              }
          }
    }
    .comment_item{
        margin-top: 1rem;
        padding-bottom: 2rem ;
        box-sizing: border-box;
        box-shadow: inset 0 10rem 50rem rgba(189, 189, 185, 0.1);
        border-radius: 0.5rem;
        &:last-child{
          margin-bottom: 2rem;
        }
        .avatar{
            width: 2rem;
            height: 2rem;
            float: left;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .comment_storey{
            height: 2rem;
            line-height: 2rem;
            overflow: hidden;
            // background-color: red;
            margin-bottom: 1rem;
        }
        .comment{
              .comment-core{
                margin-bottom: 1rem;
                padding-left: 1rem;
              }
              ul{
                li{
                  list-style-type: none;
                  display: inline-block;
                  padding-right: 1rem;
                  &:hover{
                    cursor: pointer;
                  }
                  &:first-child{
                    padding-left: 1rem;
                  }
              }
            }
        }
      
      }
}


}
</style>

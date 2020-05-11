<template>
  <div class="comment_warpper animated zoomIn">
  <div class="board_inputting animated fadeInDown">
      <div class="comment_inputting_box">
           <editor
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
           />
          <div class="submit_reset_btn">
            <Button type="success" @click="submitComment">留言</Button>
            <Button type="error" @click="resetBoard">重置</Button>
          </div>
      </div>
  </div>
  <div v-for="(item,index) in comments" :key="item._id" class="comment_item animated slideInRight">
        <div  class="avatar">
           <Avatar :style="randomColor(index)" size="small" icon="ios-person" ></Avatar>
        </div>
        <div class="comment_description"><h4>{{comments.length -index}}楼</h4></div>
        <div class="comment">
          <div v-html="item.comment"></div>
          <ul>
            <li><Icon type="ios-man-outline" /> {{item.username ? item.username + '留言' : ''}}</li>
            <li><Icon type="ios-time-outline" /> {{item.commentDate.substring(0,10)}}</li>
            <li @click="replyBoardComment(item,index)"><Icon type="ios-create-outline" /> 回复</li>
            <li @click="updateThumbDown(item,index)"><Icon type="ios-thumbs-down" /> 差评:{{ item.dislikes ? item.dislikes : 0 }}</li>
            <li @click="updateThumbUp(item,index)"><Icon type="ios-thumbs-up" /> 点赞:{{ item.likes ? item.likes : 0 }}</li>
          </ul>
        </div>
  </div>
  <Footer v-if="footerShowing"></Footer>
  </div>
</template>

<script>

import Editor from '@tinymce/tinymce-vue'
import Footer from './Footer.vue'

export default {
  name: 'board',
  data () {
    return {
      valueText: '',
      comment: '想说点什么呢..',
      comments: [],
      footerShowing: false
    }
  },
  components:{
    Footer,
    editor: Editor
  },
  mounted(){
    this.$axios.get('/api/getAllBoardComments').then(res => {
      if(res.status === 200 && res.data.status == 'true'){
          // console.log(res.data)
          // setTimeout(() =>{
          //     for(let comment of res.data.comments){
          //                 this.comments.push(comment)
          //               }
          //   this.footerShowing = true
          // },1000)
          for(let comment of res.data.comments){
                          this.comments.push(comment)
                        }
            this.footerShowing = true
      }
      
    }).catch(err => {
      
    })
  },
  methods:{
      commentInputedChanged(){
          // console.log(this.comment)
      },
      contentChanged(){

      },
      submitComment(){
        // console.log( this.comment)
        const username = 'Yong'
        const comment = this.comment
        if(!username){
          // console.log('没有登陆')
        }else if(comment){
           this.footerShowing = false
           this.$axios.post('/api/add_board_comment',{ username, comment, avatar: '匿名',commentDate: new Date(),  likes: 0, dislikes: 0,
              }).then(res => {
                // console.log(res.data.status)
                  if(res.data.status === 'true'){
                        this.$axios.get('/api/getAllBoardComments/').then(res => {
                            if(res.status === 200 && res.data.status === 'true'){
                            // console.log(res.data.comments)
                              this.comment = ''
                              this.comments.splice(0,this.comments.length)
                              for(let comment of res.data.comments){
                                  this.comments.push(comment)
                                }
                                this.footerShowing = true
                            }
                        }).catch(err => {

                        })
                  }
               }).catch(err => {
          })
        }
      },
      resetBoard(){
        this.comment = ''
        // console.log('reset done')
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
.comment_warpper{
    // background-image: url('../assets/images/board-bg.svg');
    background-attachment: fixed;
    // background: blue;
    // width: 100%;
    .board_inputting{
        width: 60%;
        margin: 2rem 10% 2rem 20%;
        position: sticky;
        top: 0;
        z-index: 10;
        .comment_inputting_box{
            margin-top: 1rem;
            font-size: 0.8rem;
            .submit_reset_btn{
              padding-top: 1rem;
            }
        }
    }
    .comment_item{
        width: 60%;
        margin: 0 10% 0 20%;
        padding: 1rem 1rem 0 1rem;
        min-height: 15vh;  
         .avatar{
              float: left;
              padding-right: 6px;
              height: 5rem;
          } 
          .comment_description{
          }  
          .comment{
              padding-bottom: 0.4rem;
              div{
                font-size: 1rem;
                padding: 1rem 0;
                // text-indent: 1rem;
                line-height: 2rem;
              }
              ul {
                   li{
                        list-style-type: none;
                        display: inline-block;
                        margin: 0 0.3rem;
                        padding: 0 0.2rem;
                        font-size: 0.8rem;
                        width: 6rem;
                        text-align: center;
                        &:hover{
                          cursor: pointer;
                          text-decoration: underline;
                        }
                    }
              }
          }

    }
}

}






</style>

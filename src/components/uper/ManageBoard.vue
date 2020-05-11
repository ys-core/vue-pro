<template>
  <div class="board-management-center">
        <div v-for="(item,index) in comments" :key="item._id" class="comment_item animated zoomIn">
            <div  class="avatar">
            <Avatar :style="randomColor(index)" size="small" icon="ios-person" ></Avatar>
            </div>
            <div class="comment_description"><h4>{{comments.length -index}}楼</h4></div>
            <div class="comment">
            <div v-html="item.comment" class="comment-core"></div>
            <ul>
                <li><Icon type="ios-man-outline" /> {{item.username ? item.username + '留言' : ''}}</li>
                <li><Icon type="ios-time-outline" /> {{item.commentDate.substring(0,10)}}</li>
                <li @click="replyBoardComment(item,index)"><Icon type="ios-create-outline" /> 回复</li>
                <li @click="updateThumbDown(item,index)"><Icon type="ios-thumbs-down" /> 差评:{{ item.dislikes ? item.dislikes : 0 }}</li>
                <li @click="updateThumbUp(item,index)"><Icon type="ios-thumbs-up" /> 点赞:{{ item.likes ? item.likes : 0 }}</li>
                <li @click="deleteBoardComment(item,index)"><Icon type="ios-remove-circle" />删除该评论</li>
            </ul>
            </div>
            <hr />
        </div>
        <Footer v-if="footerShowing" class="foot-nav"></Footer>
  </div>
</template>

<script>
import Footer from '../foot-nav/Footer.vue'
import { mapState, mapMutations, mapActions,mapGetters } from 'vuex'
export default {
  name: '',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      valueText: '',
      comments: [],
      footerShowing: false
    }
  },
  mounted(){
     this.enableLoading()
     this.loadingData()
     this.disableLoading()
  },
  components:{
    Footer
  },
  methods:{
      ...mapActions([
        'enableLoading',
        'disableLoading'
      ]),
      async loadingData(){
        await this.$axios.get('/api/getAllBoardComments').then(res => {
            if(res.status === 200 && res.data.status == 'true'){
                for(let comment of res.data.comments){
                        this.comments.push(comment)
                 }
                 this.footerShowing = true
            }
        }).catch(err => {
        })
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
      deleteBoardComment(item,index){
          let  _id = item._id || 0
          this.$axios.post('/api/board/delete_comment',{ _id  }).then(res => {
                  if(res.data.status == 'true'){
                    //   console.log(res.data.status)
                      this.comments.splice(index,1)
                      this.$Message.success('have deleted this board comment sucessfully !!');
                  }
          }).catch(err => {

          })
      }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@media only screen and (min-width:540px){

.board-management-center{
    margin-top: 2rem;
    .comment_item{
        width: 70%;
        margin: 0 10% 0 20%;
        padding: 1rem 1rem 0 0;
        margin-bottom: 1rem;
        // border: 1px solid red;
        min-height: 15vh;  
         .avatar{
              float: left;
              height: 2rem;
              width: 2rem;
              display: inline-block;
              display: flex;
              justify-content: center;
              align-items: center;
          } 
          .comment_description{
              h4{
                  line-height: 2rem;
                }
          }  
          .comment{
              padding-bottom: 0.4rem;
              margin-left: 0.5rem;
              .comment-core{
                padding: 1rem 0;
                font-size: 1rem;
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

@media only screen and (max-width:540px){

.board-management-center{
    margin-top: 2rem;
    .comment_item{
        margin: 0 1% 0 2%;
        margin-bottom: 1rem;
        min-height: 15vh;  
         .avatar{
              float: left;
              height: 2rem;
              width: 2rem;
              display: inline-block;
              display: flex;
              justify-content: center;
              align-items: center;
          } 
          .comment_description{
              h4{
                  font-size: 0.8rem;
                  line-height: 2rem;
                }
          }  
          .comment{
              padding-bottom: 0.4rem;
              // margin-left: 0.5rem;
              .comment-core{
                // padding: 1rem 0;
                font-size: 0.8rem;
                line-height: 2rem;
              }
              ul {
                   li{
                        list-style-type: none;
                        display: inline-block;
                        // margin: 0 0.3rem;
                        // padding: 0 0.2rem;
                        font-size: 0.6rem;
                        // width: 6rem;
                        text-align: center;
                        &:hover{
                          cursor: pointer;
                          text-decoration: underline;
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

<template>
  <div class="update-article animated zoomIn">
          <div id="title">
            <Row>
                 <Col span="1" >标题:</Col>
                 <Col span="16"><Input v-model="article.articleTitle"></Input></Col>
            </Row>            
          </div><br/>
          <div id="editor">
                <!-- <editor
                        api-key="zz6kufduyz69ewv614r0rudtr2snd9pr3bzyeignjc1tgn5e"
                        output-format="html"
                        v-model="article.content"
                        onChange="contentChanged"
                        @onSelectionChange="contentInputChanged"
                        :init="{
                            height: 600,
                            menubar: false,
                            image_list: [
                            
                            ],
                            plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount emoticons'
                            ],
                            toolbar:
                            'undo redo | formatselect | bold italic forecolor backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            table l \
                            link code |\
                            bullist numlist emoticons image outdent indent | removeformat | help'
                        }"
                /> -->
                <quill-editor 
                v-model="article.content" 
                ref="myQuillEditor" 
                :options="editorOption" 
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
                </quill-editor>

          </div>


          <div class="update-btn">
                <Button type="success" size="large" @click="submitUpdatedArticle">提交更新</Button>
           </div>
  </div>
</template>

<script>
//  import Editor from '@tinymce/tinymce-vue'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: '',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      article: {},
      editorOption:{}
    }
  },
  components:{
      // editor: Editor,
      quillEditor
  },
  mounted(){
      this.article = { ...this.$route.query.article}
      // console.log(this.article.content)
      // console.log(this.article._id)
  },
  methods:{
    onEditorBlur(){//失去焦点事件
    },
    onEditorFocus(){//获得焦点事件
    },
    onEditorChange(){//内容改变事件
      // console.log(this.article.content)

    },
      contentChanged(){

      },
      contentInputChanged(){

      },
      submitUpdatedArticle(){
          let { _id, articleTitle, articleType, content, author, createDate, starsNum, views } = this.article
          this.$axios.post('/api/update_article',{ _id, articleTitle, articleType, content, author, createDate, starsNum, views }).then(res => {
              if(res.data.status == "true"){
                  this.$Message.success('updated the article content to Mongodb sucessfully !!');
                  setTimeout(() => {
                     this.$router.go(-1)
                  },2500)
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
.update-article{
    width: 75%;
    margin: 0 auto;
    margin-top: 2rem;
    #editor{
        .quill-editor{
          height: 80vh;
        }
        margin-bottom: 2rem;
    }
    .update-btn{
        margin-top: 4rem;
        // background: yellow;
    }
}

}
</style>

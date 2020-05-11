<template>
  <div class="note-warpper">
        <div class="note-core">
            <div class="editor-window">
                    <quill-editor 
                            v-model="note" 
                            ref="myQuillEditor" 
                            :options="editorOption" 
                            @blur="onEditorBlur($event)" 
                            @focus="onEditorFocus($event)"
                            @change="onEditorChange($event)">
                    </quill-editor>
                    <div class="submit-btn">
                            <Button type="success" size="large" @click="submitNote">提交笔记</Button>
                    </div>
            </div>
            <div v-for="(item,index) in notes" :key="index" class="note-item"> 
                <span v-if="item.showYear" class="year">{{ item.time ? item.time.substring(0,4) + '年': '' }}</span>
                <span class="date">{{ item.time ? item.time.substring(5,10).replace(/-/g,'月') + '日' : ''  }}</span>
                <div v-html="item.note" class="note-content"></div>
                <ul>
                    <!-- <li @click="submitLikes(note,index)"><Icon type="ios-thumbs-up" /> {{ note.likes }}</li> -->
                    <!-- <li @click="submitDislikes(note,index)"><Icon type="ios-thumbs-down" />{{ note.dislikes }}</li> -->
                    <li @click="deleteNote(item,index)"><Icon type="ios-remove-circle"  />删除笔记</li>
                </ul>
                <hr />
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
      notes: [],
      footerShowing: false,
      note: '',
      editorOption:{

      }

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
        await this.$axios.get('/api/getAllNotes').then(res => {
           if(res.data.status == 'true'){
            //    console.log(res.data)
                let  year = new Set()
                this.notes.splice(0, this.notes.length)
                for(let item of res.data.Notes){
                    let _year = item.time.substring(0,4)  
                    // console.log(_year)
                    if(year.has(_year)){
                        this.notes.push({showYear: false,...item})
                    }else{
                        year.add(_year)
                        this.notes.push({showYear: true,...item})
                    }
                }          
                this.footerShowing = true
        }
      })
    },
    submitNote(){
        let info = {
            username: this.logged_user,
            time: new Date(),
            note: this.note
        }
        // console.log(info.username,info.note)
        if(info.username && info.note){
            this.$axios.post('/api/add_note',{...info}).then(res => {
            //    console.log(res.data)
               if(res.data.status === 'true'){
                    //   console.log("add note successfully")
                      this.note = ''
                      this.loadingData()
                      this.$Message.success('add the note to Mongodb sucessfully !!');
                }else{
                      this.$Message.warning('Failed to add the note !!');
                }
            }).catch(err => {

            })
        }
    },
    deleteNote(item,index){
        let _id = item._id
        this.$axios.post('/api/delete_note',{ _id }).then(res => {
            if(res.data.status === 'true'){
                this.notes.splice(index,1)
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
.note-warpper{
    .note-core{
        width: 70%;
        margin: 0 auto;
        padding-top: 2rem;
        min-height: 100vh;
        .editor-window{
            position: sticky;
            top: 0;
            .submit-btn{
                margin-top: 1rem;
                margin-bottom: 2rem;
            }
        }
        .note-item{
            margin-left: 2rem;
            .year{
                font-size: 2rem;
                font-style: italic;
                display: block;
                position: relative;
                left: -3rem;
            }
            .date{
                font-style: italic;
                display: block;
                margin-top: 1rem;
            }
            .note-content{
                padding: 1rem 2rem 1rem 1rem;
                & >>> pre{
                    padding-left: 4rem;
                    background-color: black;
                    color: white;
                }
                & >>> li{
                    margin-left: 4rem;
                }
                & >>> * {
                    font-size: 0.8rem;
                }
            }
            ul{
                    li{
                        list-style-type: none;
                        &:hover{
                            cursor: pointer;
                        }
                    }
                }
            &:last-child{
                // background-color: purple;
                margin-bottom: 4rem;
            }
        }
    }


}

}


@media only screen and (max-width:540px){

.note-warpper{
    .note-core{
        padding-top: 1rem;
        // min-height: 100vh;
        .editor-window{
            position: sticky;
            top: 0;
            .submit-btn{
                margin-top: 1rem;
                margin-bottom: 2rem;
            }
        }
        .note-item{
            margin-left: 0.5rem;
            .year{
                font-size: 1rem;
                font-style: italic;
                display: block;
                font-weight: bolder;
                position: relative;
                left: -0.5rem;
            }
            .date{
                font-style: italic;
                display: block;
                margin-top: 1rem;
                font-size: 0.8rem;
            }
            .note-content{
                padding: 1rem 0;
            }
            ul{
                    li{
                        list-style-type: none;
                        font-size: 0.8rem;
                        &:hover{
                            cursor: pointer;
                        }
                    }
                }
            &:last-child{
                // background-color: purple;
                margin-bottom: 4rem;
            }
        }
    }
    .foot-nav{
        font-size: 0.6rem;
    }


}

}
</style>

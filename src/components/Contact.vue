<template>
  <div class="contact">
     
     <quill-editor 
      v-model="content" 
      ref="myQuillEditor" 
      :options="editorOption" 
      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
      @change="onEditorChange($event)">
    </quill-editor>
  

  </div>
</template>

<script>

import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: '',
  data () {
    return {
      inputs: '想说点什么呢?',
      content:null,
      editorOption:{

      }
    }
  },
 components:{
       quillEditor
  },
  methods:{
    onEditorBlur(){//失去焦点事件
    },
    onEditorFocus(){//获得焦点事件
    },
    onEditorChange(){//内容改变事件
      console.log(this.content)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.contact{
    width: 65%;
    margin: 0 auto;
}
</style>

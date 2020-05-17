<template>
  <div class="contact">
      <quill-editor 
        v-model="content" 
        ref="myQuillEditor" 
        :options="editorOption" 
        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
        @change="onEditorChange($event)">
      </quill-editor>
      <!-- <div v-for="(item,index) in arr" :key="index" class="pic-bed">
                <img src="https://www.helloimg.com/images/2020/05/15/055f97b45038f3b92.md.jpg" />
      </div> -->
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
      arr: [1,2,3,4,5,6,7,8,9,10],
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
    .pic-bed{
      
      width: 100%;
      margin: 0 auto;
    }
}
</style>
